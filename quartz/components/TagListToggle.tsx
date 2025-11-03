// quartz/components/TagListToggle.tsx
import { QuartzComponentConstructor } from "./types"

type Options = {
  maxVisible?: number
  selector?: string
}

export default ((opts?: Options) => {
  const max = Number.isFinite(opts?.maxVisible as number) ? Number(opts!.maxVisible) : 20
  const selector = (opts?.selector ?? ".tag-list, .tags").replace(/"/g, '\\"')

  const script = `
  (function () {
    var MAX = ${max};
    var SEL = "${selector}";

    function initOnce(container) {
      if (!container || container.dataset.tltInit === "1") return;
      container.dataset.tltInit = "1";

      var items = Array.prototype.filter.call(container.children, function (n) { return n.nodeType === 1; });
      if (items.length <= MAX) return;

      // hide beyond MAX
      for (var i = MAX; i < items.length; i++) items[i].style.display = "none";

      // remove any prior button next to this container (defensive)
      var next = container.nextElementSibling;
      if (next && next.classList && next.classList.contains("expand-tags-btn")) next.remove();

      var btn = document.createElement("button");
      btn.textContent = "Show more tags";
      btn.className = "expand-tags-btn";

      var expanded = false;
      btn.addEventListener("click", function () {
        expanded = !expanded;
        for (var i = MAX; i < items.length; i++) items[i].style.display = expanded ? "" : "none";
        btn.textContent = expanded ? "Show fewer tags" : "Show more tags";
      });

      container.after(btn);
    }

    function run() {
      // defer to ensure SPA content is in the DOM
      requestAnimationFrame(function () {
        var container = document.querySelector(SEL);
        initOnce(container);
      });
    }

    // first load
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", run, { once: true });
    } else {
      run();
    }

    // Quartz SPA navigations
    document.addEventListener("nav", run);
  })();`

  const C = (_props: any) => <script dangerouslySetInnerHTML={{ __html: script }} />
  return C
}) satisfies QuartzComponentConstructor
