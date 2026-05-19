/* =========================================================
   Efficient Home Guide - Main JavaScript
   Version: 1.0
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const currentYearElement = document.getElementById("current-year");

  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
});

// Theme toggle
const themeToggleButton = document.querySelector(".theme-toggle");
const storedTheme = localStorage.getItem("theme");

if (storedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

if (themeToggleButton) {
  themeToggleButton.addEventListener("click", () => {
  themeToggleButton.classList.remove("is-animating");
  void themeToggleButton.offsetWidth;
  themeToggleButton.classList.add("is-animating");

  document.body.classList.toggle("dark-mode");

  const isDarkMode = document.body.classList.contains("dark-mode");

  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  });
}