import { QuartzComponent, QuartzComponentConstructor } from "./types"

export default (() => {
  // the inline JS that caps and toggles the tag list
  const fn = function () {
    document.addEventListener("DOMContentLoaded", () => {
      const tagList = document.querySelector<HTMLElement>(".tag-list, .tags")
      if (!tagList) return

      const maxVisible = 20 // ← change this to show more/less
      if (tagList.children.length <= maxVisible) return

      tagList.style.maxHeight = "150px"
      tagList.style.overflow = "hidden"
      tagList.style.position = "relative"

      const btn = document.createElement("button")
      btn.textContent = "Show more tags"
      btn.className = "expand-tags-btn"
      btn.addEventListener("click", () => {
        const expanded = tagList.style.maxHeight === "none"
        tagList.style.maxHeight = expanded ? "150px" : "none"
        btn.textContent = expanded ? "Show more tags" : "Show fewer tags"
      })

      tagList.after(btn)
    })
  }

  const C: QuartzComponent = {
    name: "TagListToggle",
    render: () => <script dangerouslySetInnerHTML={{ __html: `(${fn.toString()})()` }} />,
  }
  return C
}) satisfies QuartzComponentConstructor
