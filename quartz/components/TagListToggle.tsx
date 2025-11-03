import { QuartzComponentConstructor } from "./types"

type Options = {
  maxVisible?: number
  selector?: string
  durationMs?: number
  fadeHeightPx?: number
}

export default ((opts?: Options) => {
  const MAX = Number.isFinite(opts?.maxVisible as number) ? Number(opts!.maxVisible) : 20
  const SEL = (opts?.selector ?? ".tag-list, .tags").replace(/"/g, '\\"')
  const DUR = Number.isFinite(opts?.durationMs as number) ? Number(opts!.durationMs) : 240
  const FADE_H = Number.isFinite(opts?.fadeHeightPx as number) ? Number(opts!.fadeHeightPx) : 24

  const script = `
  (function () {
    var MAX = ${MAX}, SEL = "${SEL}", DUR=${DUR}, FADE_H=${FADE_H};

    function clamp(n){ return Math.max(0, n|0) }

    function collapsedHeight(container, max) {
      var kids = Array.prototype.filter.call(container.children, function(n){return n.nodeType===1})
      if (kids.length === 0) return 0
      var last = kids[Math.min(max, kids.length) - 1]
      // distance from container top to bottom of the last visible child
      return clamp((last.offsetTop - container.offsetTop) + last.offsetHeight)
    }

    function applyFade(container, on) {
      container.classList.toggle("tags-collapsed", on)
      container.classList.toggle("tags-expanded", !on)
      container.style.setProperty("--tags-fade-height", FADE_H + "px")
    }

    function initOnce(container) {
      if (!container || container.dataset.tltInit === "1") return

      var items = Array.prototype.filter.call(container.children, function (n) { return n.nodeType === 1 })
      if (items.length <= MAX) return // small lists: do nothing (no fade)

      container.dataset.tltInit = "1"
      container.style.overflow = "hidden"
      container.style.willChange = "max-height"
      container.style.transition = "max-height " + DUR + "ms ease"
      var prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReduce) container.style.transition = "none"

      // start collapsed
      var cH = collapsedHeight(container, MAX)
      container.style.maxHeight = cH + "px"
      applyFade(container, true)

      // button
      var btn = document.createElement("button")
      btn.textContent = "Show more tags"
      btn.className = "expand-tags-btn"
      container.after(btn)

      var expanded = false
      var animating = false

      function expand() {
        if (expanded || animating) return
        animating = true
        expanded = true
        applyFade(container, false) // remove fade immediately
        // from current to full height
        var from = container.getBoundingClientRect().height
        container.style.maxHeight = from + "px"
        // allow style to take hold
        requestAnimationFrame(function(){
          var to = container.scrollHeight
          container.style.maxHeight = to + "px"
        })
        container.addEventListener("transitionend", function te() {
          container.removeEventListener("transitionend", te)
          container.style.maxHeight = "none" // natural height after animation
          animating = false
        })
        btn.textContent = "Show fewer tags"
      }

      function collapse() {
        if (!expanded || animating) return
        animating = true
        // set a fixed start height
        var from = container.scrollHeight
        container.style.maxHeight = from + "px"
        // then shrink to collapsed
        requestAnimationFrame(function(){
          container.style.maxHeight = cH + "px"
          applyFade(container, true) // fade only when collapsing
        })
        container.addEventListener("transitionend", function tc() {
          container.removeEventListener("transitionend", tc)
          animating = false
        })
        expanded = false
        btn.textContent = "Show more tags"
      }

      btn.addEventListener("click", function(){ expanded ? collapse() : expand() })
    }

    function run() {
      requestAnimationFrame(function () {
        initOnce(document.querySelector(SEL))
      })
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", run, { once: true })
    } else {
      run()
    }
    document.addEventListener("nav", run) // Quartz SPA nav
  })();
  `

  const C = () => <script dangerouslySetInnerHTML={{ __html: script }} />
  return C
}) satisfies QuartzComponentConstructor
