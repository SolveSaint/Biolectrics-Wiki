// ===== Explorer zebra-striping across full hierarchy (FILES ONLY) =====
function applyExplorerZebra(): void {
  const root = document.querySelector(".explorer-content .explorer-ul");
  if (!root) return;

  // Gather all clickable blocks, then keep only file links (not folders)
  const all = root.querySelectorAll<HTMLElement>("li > a, li > .folder-container");
  const files: HTMLElement[] = Array.from(all).filter(el => el.matches("a:not(.folder-title)"));

  // Clear any old classes everywhere
  all.forEach(el => el.classList.remove("zebra-odd", "zebra-even"));

  // Apply stripes to files in DOM order
  let i = 0;
  files.forEach(el => el.classList.add((i++ % 2 === 0) ? "zebra-odd" : "zebra-even"));
}

// Run now, on SPA nav, and when explorer mutates (expand/collapse)
const start = () => {
  applyExplorerZebra();
  const explorer = document.querySelector(".explorer-content");
  if (explorer) {
    const mo = new MutationObserver(() => requestAnimationFrame(applyExplorerZebra));
    mo.observe(explorer, { childList: true, subtree: true });
  }
};
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
document.addEventListener("nav", applyExplorerZebra);

