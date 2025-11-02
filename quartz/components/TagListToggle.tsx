// quartz/components/TagListToggle.tsx
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default ((): QuartzComponentConstructor => {
  function TagListToggle(_props: QuartzComponentProps) {
    const script = `(() => {
      const MAX = 8; // change limit here

      function ensureButton(list: HTMLElement) {
        let btn = list.nextElementSibling as HTMLButtonElement | null
        if (!btn || !btn.classList.contains("expand-tags-btn")) {
          btn = document.createElement("button")
          btn.className = "expand-tags-btn"
          btn.type = "button"
          btn.textContent = "Show more tags"
          btn.addEventListener("click", () => toggle(list, btn!))
          list.after(btn)
        }
        return btn
      }

      function collapse(list: HTMLElement, btn: HTMLButtonElement) {
        const items = Array.from(list.children) as HTMLElement[]
        items.forEach((el, i) => el.classList.toggle("tag-hidden", i >= MAX))
        list.classList.add("tags-collapsed")
        list.classList.remove("tags-expanded")
        btn.textContent = "Show more tags"
      }

      function expand(list: HTMLElement, btn: HTMLButtonElement) {
        const items = Array.from(list.children) as HTMLElement[]
        items.forEach((el) => el.classList.remove("tag-hidden"))
        list.classList.remove("tags-collapsed")
        list.classList.add("tags-expanded")
        btn.textContent = "Show fewer tags"
      }

      function toggle(list: HTMLElement, btn: HTMLButtonElement) {
        if (list.classList.contains("tags-collapsed")) expand(list, btn)
        else collapse(list, btn)
      }

      function apply(list: HTMLElement) {
        const count = list.children.length
        // Only attach if there are more than MAX tags
        if (count <= MAX) {
          // If a button exists from previous nav, remove it and show all
          const btn = list.nextElementSibling as HTMLElement | null
          if (btn && btn.classList.contains("expand-tags-btn")) btn.remove()
          const items = Array.from(list.children) as HTMLElement[]
          items.forEach((el) => el.classList.remove("tag-hidden"))
          list.classList.remove("tags-collapsed", "tags-expanded")
          return
        }

        const btn = ensureButton(list)
        // Default to collapsed on page load/nav
        collapse(list, btn)
      }

      function run() {
        const lists = Array.from(document.querySelectorAll<HTMLElement>(".tag-list, .tags"))
        lists.forEach(apply)
      }

      document.addEventListener("DOMContentLoaded", run)
      document.addEventListener("nav", run) // Quartz SPA nav
    })();`

    return <script dangerouslySetInnerHTML={{ __html: script }} />
  }

  return TagListToggle
})()
