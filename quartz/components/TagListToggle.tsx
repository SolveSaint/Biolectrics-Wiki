import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const TagListToggle: QuartzComponent = (_props: QuartzComponentProps) => {
  const fn = function () {
    // run on first render and on SPA navigations
    const run = () => {
      const containers = document.querySelectorAll<HTMLElement>(".tag-list, .tags")
      containers.forEach((list) => {
        const maxVisible = 8 // ← change this number to control how many tags are shown
        const tags = Array.from(list.querySelectorAll<HTMLElement>("a.tag, .tag"))

        // already processed?
        if ((list as any)._tagToggleInit) return
        ;(list as any)._tagToggleInit = true

        if (tags.length <= maxVisible) return

        // hide extras
        tags.slice(maxVisible).forEach((el) => el.classList.add("tag-hidden"))

        // button
        const btn = document.createElement("button")
        btn.textContent = "Show more tags"
        btn.className = "expand-tags-btn"
        btn.addEventListener("click", () => {
          const expanded = btn.getAttribute("data-expanded") === "true"
          if (expanded) {
            tags.slice(maxVisible).forEach((el) => el.classList.add("tag-hidden"))
            btn.textContent = "Show more tags"
            btn.setAttribute("data-expanded", "false")
          } else {
            tags.slice(maxVisible).forEach((el) => el.classList.remove("tag-hidden"))
            btn.textContent = "Show fewer tags"
            btn.setAttribute("data-expanded", "true")
          }
        })

        list.after(btn)
      })
    }

    document.addEventListener("DOMContentLoaded", run)
    document.addEventListener("nav", run) // Quartz SPA navigation
  }

  return <script dangerouslySetInnerHTML={{ __html: `(${fn.toString()})()` }} />
}

export default (() => TagListToggle) satisfies QuartzComponentConstructor
