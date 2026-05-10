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