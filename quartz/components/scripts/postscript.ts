// ===== Explorer zebra-striping across full hierarchy =====
console.log("✅ Biolectrics Explorer zebra script loaded");

function applyExplorerZebra(): void {
  const root = document.querySelector(".explorer-content .explorer-ul");
  if (!root) return;

  // All clickable rows, in document order
  const rows = root.querySelectorAll<HTMLElement>("li > a, li > .folder-container");

  let i = 0;
  rows.forEach(el => {
    el.classList.remove("zebra-odd", "zebra-even");
    el.classList.add((i++ % 2 === 0) ? "zebra-odd" : "zebra-even");
  });
}

// Re-apply when the SPA navigates
document.addEventListener("nav", applyExplorerZebra);

// Also re-apply when the explorer expands/collapses or list mutates
const startObserver = () => {
  const explorer = document.querySelector(".explorer-content");
  if (!explorer) return;

  const mo = new MutationObserver(() => {
    // Queue to next frame so DOM is settled
    requestAnimationFrame(applyExplorerZebra);
  });
  mo.observe(explorer, { childList: true, subtree: true });
};

// Run once after initial load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    applyExplorerZebra();
    startObserver();
  });
} else {
  applyExplorerZebra();
  startObserver();
}
