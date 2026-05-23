const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");
const dataPath = path.join(rootDir, "data", "articles.json");
const templatePath = path.join(rootDir, "templates", "article-template.html");
const postsDir = path.join(rootDir, "posts");

const indexPath = path.join(rootDir, "index.html");
const blogPath = path.join(rootDir, "blog.html");
const sitemapPath = path.join(rootDir, "sitemap.xml");

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildArticleContent(article) {
  const relatedLinks = article.relatedLinks || [];
  const primaryRelated = relatedLinks[0] || {
    title: "Best Smart Home Devices for Lowering Energy Use",
    url: "/posts/best-smart-home-devices-for-lowering-energy-use.html",
  };

  if (!article.content || !Array.isArray(article.content)) {
    throw new Error(
      `Article "${article.slug}" is missing a valid content array in articles.json`
    );
  }

  const contentHtml = article.content
    .map((block) => {
      if (block.type === "paragraph") {
        return `          <p>
            ${block.text}
          </p>`;
      }

      if (block.type === "image") {
        return `          <figure class="article-image">
            <img
              src="/assets/images/${escapeHtml(article.image)}"
              alt="${escapeHtml(article.imageAlt)}"
              loading="eager"
              width="1536"
              height="864"
            >
            <figcaption>
              ${escapeHtml(article.imageCaption)}
            </figcaption>
          </figure>`;
      }

      if (block.type === "toc") {
        const items = block.items
          .map(
            (item) =>
              `              <li><a href="#${escapeHtml(item.id)}">${escapeHtml(item.label)}</a></li>`
          )
          .join("\n");

        return `          <nav aria-label="Table of contents">
            <h2>Table of Contents</h2>
            <ul>
${items}
            </ul>
          </nav>`;
      }

      if (block.type === "h2") {
        return `          <h2 id="${escapeHtml(block.id)}">${block.text}</h2>`;
      }

      if (block.type === "h3") {
        return `          <h3>${block.text}</h3>`;
      }

      if (block.type === "ul") {
        const items = block.items
          .map((item) => `            <li>${item}</li>`)
          .join("\n");

        return `          <ul>
${items}
          </ul>`;
      }

      if (block.type === "ol") {
        const items = block.items
          .map((item) => `            <li>${item}</li>`)
          .join("\n");

        return `          <ol>
${items}
          </ol>`;
      }

      if (block.type === "related") {
        return `          <p>
            Related guide:
            <a href="${escapeHtml(block.url)}">
              ${escapeHtml(block.title)}
            </a>.
          </p>`;
      }

      throw new Error(`Unsupported content block type: ${block.type}`);
    })
    .join("\n\n");

  return {
    html: contentHtml,
    relatedTitle: primaryRelated.title,
    relatedUrl: primaryRelated.url,
  };
}

function replaceTemplateVariables(template, article, contentData) {
  const replacements = {
    title: article.title,
    slug: article.slug,
    category: article.category,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    content: contentData.html.trimEnd(),
    relatedTitle: contentData.relatedTitle,
    relatedUrl: contentData.relatedUrl,
  };

  let output = template;

  for (const [key, value] of Object.entries(replacements)) {
    output = output.replaceAll(`{{${key}}}`, value);
  }

  return output;
}

function buildCard(article, headingLevel = "h2") {
  return `
            <article class="article-card">
              <p class="article-category">${escapeHtml(article.category)}</p>
              <${headingLevel}>
                <a href="/posts/${escapeHtml(article.slug)}.html">
                  ${escapeHtml(article.title)}
                </a>
              </${headingLevel}>
              <p>
                ${escapeHtml(article.excerpt)}
              </p>
              <a
                class="read-more"
                href="/posts/${escapeHtml(article.slug)}.html"
              >
                Read guide
              </a>
            </article>`;
}

function insertBeforeClosingArticleGrid(filePath, article, cardHtml) {
  const html = readFile(filePath);
  const articleUrl = `/posts/${article.slug}.html`;

  if (html.includes(articleUrl)) {
    return;
  }

  const gridOpen = '<div class="article-grid">';
  const articleGridIndex = html.lastIndexOf(gridOpen);

  if (articleGridIndex === -1) {
    throw new Error(`Could not find article grid in ${filePath}`);
  }

  const searchStart = articleGridIndex + gridOpen.length;
  const nextSectionIndex = html.indexOf('<section class="section', searchStart);

  if (nextSectionIndex === -1) {
    throw new Error(`Could not find next section after article grid in ${filePath}`);
  }

  const gridCloseIndex = html.lastIndexOf("</div>", nextSectionIndex);

  if (gridCloseIndex === -1 || gridCloseIndex < articleGridIndex) {
    throw new Error(`Could not find article grid closing div in ${filePath}`);
  }

  const updated =
    html.slice(0, gridCloseIndex) +
    `${cardHtml}\n` +
    html.slice(gridCloseIndex);

  writeFile(filePath, updated);
}

function addSitemapEntry(article) {
  const sitemap = readFile(sitemapPath);
  const url = `https://efficienthomeguide.com/posts/${article.slug}.html`;

  if (sitemap.includes(url)) {
    return;
  }

  const entry = `
  <url>
    <loc>${url}</loc>
    <lastmod>${article.dateModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
`;

  const updated = sitemap.replace("</urlset>", `${entry}\n</urlset>`);
  writeFile(sitemapPath, updated);
}

function generateArticles() {
  const articles = JSON.parse(readFile(dataPath));
  const template = readFile(templatePath);

  for (const article of articles) {
    const outputPath = path.join(postsDir, `${article.slug}.html`);

    if (fs.existsSync(outputPath)) {
      console.log(`Skipped existing article: ${article.slug}.html`);
      continue;
    }

    const contentData = buildArticleContent(article);
    const articleHtml = replaceTemplateVariables(template, article, contentData);

    writeFile(outputPath, articleHtml);

    const blogCard = buildCard(article, "h2");
    const indexCard = buildCard(article, "h3");

   insertBeforeClosingArticleGrid(blogPath, article, blogCard);

const categoryPath = path.join(rootDir, article.categoryPage);
insertBeforeClosingArticleGrid(categoryPath, article, blogCard);

insertBeforeClosingArticleGrid(indexPath, article, indexCard);

    addSitemapEntry(article);

    console.log(`Generated article: ${article.slug}.html`);
  }
}

generateArticles();