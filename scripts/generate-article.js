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

  return {
    html: `
          <p>
            Smart appliances are often marketed as convenient, efficient, and modern.
            Some can help reduce energy waste, but they do not automatically save money
            just because they connect to Wi-Fi or an app.
          </p>

          <p>
            The real value depends on the appliance, your habits, energy rates, usage
            patterns, and whether the smart features solve a specific problem. A smart
            appliance that helps you schedule, monitor, or avoid waste may be useful.
            A smart appliance bought only for convenience may not reduce costs at all.
          </p>

          <figure class="article-image">
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
          </figure>

          <nav aria-label="Table of contents">
            <h2>Table of Contents</h2>
            <ul>
              <li><a href="#quick-answer">Quick Answer</a></li>
              <li><a href="#what-smart-appliances-are">What Are Smart Appliances?</a></li>
              <li><a href="#when-they-save">When Smart Appliances Can Save Money</a></li>
              <li><a href="#when-they-do-not-save">When Smart Appliances Do Not Save Money</a></li>
              <li><a href="#features-that-matter">Smart Features That Actually Matter</a></li>
              <li><a href="#appliance-types">Appliance Types to Evaluate Carefully</a></li>
              <li><a href="#cost-vs-value">Upfront Cost vs Long-Term Value</a></li>
              <li><a href="#privacy-security">Privacy and Cybersecurity Considerations</a></li>
              <li><a href="#buying-checklist">Smart Appliance Buying Checklist</a></li>
              <li><a href="#faq">Frequently Asked Questions</a></li>
            </ul>
          </nav>

          <h2 id="quick-answer">Quick Answer</h2>

          <p>
            Smart appliances can save money when they reduce unnecessary runtime,
            support better scheduling, provide useful energy feedback, or help prevent
            wasteful habits. They are less likely to save money if the smart features
            are rarely used or if the appliance is already efficient and well managed.
          </p>

          <p>
            In many cases, the best reason to buy a smart appliance is not energy
            savings alone. Convenience, alerts, maintenance reminders, and better
            control may also matter. The key is to avoid paying extra for features that
            will not change how the appliance is used.
          </p>

          <h2 id="what-smart-appliances-are">What Are Smart Appliances?</h2>

          <p>
            Smart appliances are household appliances with connected features. They may
            use Wi-Fi, apps, notifications, sensors, energy reports, remote controls,
            or automation. Examples include smart refrigerators, washers, dryers,
            dishwashers, ovens, air conditioners, and water heaters.
          </p>

          <h3>Common smart appliance features</h3>

          <ul>
            <li>Remote monitoring through an app</li>
            <li>Cycle alerts and completion notifications</li>
            <li>Energy use reports on some models</li>
            <li>Scheduling or delayed start</li>
            <li>Maintenance reminders</li>
            <li>Diagnostic alerts</li>
            <li>Integration with smart home platforms</li>
          </ul>

          <p>
            These features are useful only when they support better decisions. A
            notification that helps you avoid unnecessary drying time can be valuable.
            A connected feature that you never use provides little practical benefit.
          </p>

          <h2 id="when-they-save">When Smart Appliances Can Save Money</h2>

          <p>
            Smart appliances are most likely to save money when they improve behavior
            or reduce waste. For example, a smart washer may help schedule laundry
            during lower-cost energy periods, while a smart dryer may provide reminders
            that reduce unnecessary extra cycles.
          </p>

          <h3>They may help when:</h3>

          <ul>
            <li>You use scheduling to avoid peak pricing.</li>
            <li>Energy reports help you change habits.</li>
            <li>Alerts prevent forgotten cycles or wasted runtime.</li>
            <li>Maintenance reminders keep equipment working efficiently.</li>
            <li>Diagnostics help identify problems earlier.</li>
            <li>The appliance replaces a very old or inefficient unit.</li>
          </ul>

          <p>
            The strongest savings usually come from the appliance being efficient and
            used well, not from connectivity alone.
          </p>

          <p>
            Related guide:
            <a href="${escapeHtml(primaryRelated.url)}">
              ${escapeHtml(primaryRelated.title)}
            </a>.
          </p>

          <h2 id="when-they-do-not-save">When Smart Appliances Do Not Save Money</h2>

          <p>
            Smart appliances may not save money if the smart features do not reduce
            actual energy use. A connected refrigerator that runs the same way as a
            regular efficient refrigerator may not lower your bill simply because it has
            an app.
          </p>

          <h3>They may not be worth it when:</h3>

          <ul>
            <li>The smart version costs much more than a comparable efficient model.</li>
            <li>You do not use the app, scheduling, or reports.</li>
            <li>The appliance already runs efficiently.</li>
            <li>Energy rates do not reward shifting usage times.</li>
            <li>The feature is mainly convenience, not efficiency.</li>
            <li>The appliance is oversized for your household needs.</li>
          </ul>

          <p>
            Paying more for a smart label does not guarantee lower operating cost.
            Compare efficiency ratings, capacity, reliability, and actual use patterns.
          </p>

          <h2 id="features-that-matter">Smart Features That Actually Matter</h2>

          <p>
            Some features are more useful than others for energy efficiency. The best
            features either reduce runtime, improve timing, or help you notice problems.
          </p>

          <h3>Useful features to look for</h3>

          <ul>
            <li>Energy usage reporting</li>
            <li>Delayed start or scheduling</li>
            <li>Maintenance and filter reminders</li>
            <li>Cycle completion alerts</li>
            <li>Leak or fault alerts</li>
            <li>Eco modes that are easy to use</li>
            <li>Compatibility with utility demand-response programs where available</li>
          </ul>

          <p>
            Features that only add remote control may be convenient, but they may not
            reduce energy use unless they change behavior.
          </p>

          <h2 id="appliance-types">Appliance Types to Evaluate Carefully</h2>

          <p>
            Different appliances offer different opportunities. Some run every day,
            while others run only occasionally. The more often an appliance runs, the
            more important efficiency and habits become.
          </p>

          <h3>Refrigerators</h3>

          <p>
            Smart refrigerator features may provide alerts or diagnostics, but energy
            savings usually depend more on efficiency rating, size, seals, temperature
            settings, and door habits.
          </p>

          <h3>Washers and dryers</h3>

          <p>
            Smart laundry appliances may help with cycle alerts, scheduling, and
            maintenance reminders. Dryer habits can matter significantly, especially if
            cycles run longer than necessary.
          </p>

          <h3>Dishwashers</h3>

          <p>
            Smart dishwashers may help with scheduling, cycle selection, and alerts.
            Efficient use still depends on full loads, appropriate cycles, and avoiding
            unnecessary pre-rinsing.
          </p>

          <h3>Ovens and cooking appliances</h3>

          <p>
            Smart cooking features are often more about convenience than energy savings.
            Usage habits, appliance size, and cooking method usually matter more.
          </p>

          <h2 id="cost-vs-value">Upfront Cost vs Long-Term Value</h2>

          <p>
            A smart appliance can cost more than a standard efficient model. Before
            paying extra, compare the expected benefit with the added cost. Energy
            savings alone may not justify the difference unless the appliance solves a
            real usage problem.
          </p>

          <h3>Questions to ask</h3>

          <ul>
            <li>Is the smart model more efficient, or just more connected?</li>
            <li>Will I use the smart features regularly?</li>
            <li>Does my utility plan reward scheduling or off-peak usage?</li>
            <li>Will alerts prevent waste or maintenance problems?</li>
            <li>Is the appliance the right size for my household?</li>
            <li>Does the brand provide updates and long-term support?</li>
          </ul>

          <p>
            Sometimes the best value is a highly efficient non-smart appliance. Other
            times, smart features are worth paying for because they improve control and
            prevent repeated waste.
          </p>

          <h2 id="privacy-security">Privacy and Cybersecurity Considerations</h2>

          <p>
            Smart appliances are connected devices. They may collect usage data, connect
            to cloud services, and require account access. Treat them as part of your
            home network.
          </p>

          <h3>Security basics</h3>

          <ul>
            <li>Use strong, unique passwords.</li>
            <li>Enable multi-factor authentication when available.</li>
            <li>Keep appliance firmware and apps updated.</li>
            <li>Buy from reputable brands with update support.</li>
            <li>Review app permissions and shared access.</li>
            <li>Remove the appliance from your account before selling or replacing it.</li>
          </ul>

          <p>
            Smart features should add useful control without creating unnecessary
            privacy or security risk.
          </p>

          <h2 id="buying-checklist">Smart Appliance Buying Checklist</h2>

          <p>
            Before buying a smart appliance, use this checklist:
          </p>

          <ul>
            <li>Does it have strong efficiency performance?</li>
            <li>Is the smart feature useful for how I actually live?</li>
            <li>Can scheduling reduce cost under my utility plan?</li>
            <li>Will alerts prevent wasted cycles or maintenance issues?</li>
            <li>Is the appliance correctly sized?</li>
            <li>Is the price difference reasonable?</li>
            <li>Does the brand provide security updates?</li>
            <li>Can the appliance still work normally if internet access is unavailable?</li>
          </ul>

          <h2>What to Avoid</h2>

          <ul>
            <li>Do not assume smart automatically means efficient.</li>
            <li>Do not pay extra for features you will not use.</li>
            <li>Do not ignore basic efficiency ratings and capacity.</li>
            <li>Do not connect appliances without securing the account.</li>
            <li>Do not use remote controls in unsafe or unattended ways.</li>
          </ul>

          <p>
            If an appliance involves gas, water, heat, heavy electrical loads, or
            installation changes, follow manufacturer instructions and use qualified
            professionals when needed.
          </p>

          <h2 id="faq">Frequently Asked Questions</h2>

          <h3>Do smart appliances really save money?</h3>

          <p>
            They can, but not automatically. Smart appliances save money when their
            features reduce waste, improve scheduling, support maintenance, or help you
            use the appliance more efficiently.
          </p>

          <h3>Are smart appliances more efficient than regular appliances?</h3>

          <p>
            Not always. Some smart appliances are efficient, but connectivity alone does
            not make an appliance more efficient. Compare efficiency ratings and actual
            operating behavior.
          </p>

          <h3>Which smart appliance features matter most?</h3>

          <p>
            Energy reports, scheduling, maintenance reminders, cycle alerts, diagnostics,
            and useful eco modes are usually more relevant than basic remote control.
          </p>

          <h3>Should I replace working appliances with smart appliances?</h3>

          <p>
            Usually not only for smart features. Replacement may make sense if the old
            appliance is inefficient, unreliable, incorrectly sized, or expensive to run.
          </p>

          <h3>Can smart appliances work without internet?</h3>

          <p>
            Many smart appliances can perform basic functions without internet, but app
            control, alerts, updates, and connected features may be limited.
          </p>

          <h2>Final Thoughts</h2>

          <p>
            Smart appliances can be useful, but they are not automatic money savers.
            Their value depends on efficiency performance, household habits, smart
            features, utility rates, and whether the appliance solves a real problem.
          </p>

          <p>
            Before buying, focus on the basics: efficiency, size, reliability,
            maintenance, and actual use. Then decide whether smart features provide
            enough practical value to justify the extra cost.
          </p>
`,
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

  const articleGridIndex = html.lastIndexOf('<div class="article-grid">');

  if (articleGridIndex === -1) {
    throw new Error(`Could not find article grid in ${filePath}`);
  }

  const closingSectionIndex = html.indexOf("</section>", articleGridIndex);

  if (closingSectionIndex === -1) {
    throw new Error(`Could not find section close after article grid in ${filePath}`);
  }

  const beforeSectionClose = html.lastIndexOf("</div>", closingSectionIndex);

  if (beforeSectionClose === -1) {
    throw new Error(`Could not find insertion point before section close in ${filePath}`);
  }

  const updated =
    html.slice(0, beforeSectionClose) +
    `${cardHtml}\n` +
    html.slice(beforeSectionClose);

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