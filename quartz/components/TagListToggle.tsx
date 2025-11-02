// quartz/components/TagListToggle.tsx
import { QuartzComponentConstructor } from "./types"

type Options = {
  maxVisible?: number
  selector?: string   // override if your tag container changes
}

export default ((opts?: Options) => {
  const max = Number.isFinite(opts?.maxVisible as number) ? Number(opts!.maxVisible) : 20
  const selector = (opts?.selector ?? ".tag-list, .tags").replace(/"/g, '\\"')

  const script = `
  (function () {
    document.addEventListener("DOMContentLoaded", function () {
      var container = document.querySelector("${selector}");
      if (!container) return;

      // element-only children (ignore text nodes)
      var items = Array.prototype.filter.call(container.children, function (n) { return n.nodeType === 1; });
      var max = ${max};
      if (items.length <= max) return;

      // hide beyond max
      for (var i = max; i < items.length; i++) {
        items[i].style.display = "none";
      }

      // button
      var btn = document.createElement("button");
      btn.textContent = "Show more tags";
      btn.className = "expand-tags-btn";

      var expanded = false;
      btn.addEventListener("click", function () {
        expanded = !expanded;
        for (var i = max; i < items.length; i++) {
          items[i].style.display = expanded ? "" : "none";
        }
        btn.textContent = expanded ? "Show fewer tags" : "Show more tags";
      });

      container.after(btn);
    });
  })();`

  const C = (_props: any) => <script dangerouslySetInnerHTML={{ __html: script }} />
  return C
}) satisfies QuartzComponentConstructor
