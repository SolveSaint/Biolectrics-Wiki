import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export interface Options {
  maxVisible?: number
}

/**
 * Pure script-injector. No JSX rendering, no external imports.
 * Runs on initial load and on Quartz SPA "nav" events.
 */
export default ((opts: Options = {}) => {
  const max = Number.isFinite(opts.maxVisible) ? (opts.maxVisible as number) : 8

  const script = `
  (function(){
    function apply(maxVisible){
      document.querySelectorAll(".tag-list, .tags").forEach(function(wrap){
        var items = Array.prototype.slice.call(wrap.querySelectorAll("a, .tag"));
        // clean if short
        var btn = wrap.nextElementSibling;
        if (items.length <= maxVisible) {
          wrap.classList.remove("tags-collapsed","tags-expanded");
          items.forEach(function(el){ el.classList.remove("tag-hidden"); });
          if (btn && btn.classList && btn.classList.contains("expand-tags-btn")) btn.remove();
          return;
        }

        var expanded = wrap.getAttribute("data-expanded") === "true";
        wrap.classList.toggle("tags-collapsed", !expanded);
        wrap.classList.toggle("tags-expanded",  expanded);

        items.forEach(function(el, idx){
          if (!expanded && idx >= maxVisible) el.classList.add("tag-hidden");
          else el.classList.remove("tag-hidden");
        });

        if (!btn || !btn.classList || !btn.classList.contains("expand-tags-btn")) {
          btn = document.createElement("button");
          btn.type = "button";
          btn.className = "expand-tags-btn";
          wrap.after(btn);
          btn.addEventListener("click", function(){
            var isExpanded = wrap.getAttribute("data-expanded") === "true";
            wrap.setAttribute("data-expanded", (!isExpanded).toString());
            apply(maxVisible);
          });
        }
        btn.textContent = expanded ? "Show fewer tags" : "Show more tags";
      });
    }

    // initial
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function(){ apply(${max}); });
    } else {
      apply(${max});
    }
    // SPA nav re-apply (Quartz fires "nav")
    document.addEventListener("nav", function(){ apply(${max}); });
  })();
  `

  const C: QuartzComponent = (_props: QuartzComponentProps) => {
    return <script dangerouslySetInnerHTML={{ __html: script }} />
  }

  C.afterDOMLoaded = undefined // all logic lives in the injected script
  C.name = "TagListToggle"

  return C
}) satisfies QuartzComponentConstructor
