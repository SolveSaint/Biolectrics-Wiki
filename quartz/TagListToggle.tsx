import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const TagListToggle: QuartzComponent = (_props: QuartzComponentProps) => {
  const fn = function () {
    document.addEventListener("DOMContentLoaded", () => {
      const tagList = document.querySelector<HTMLElement>(".tag-list")
      if (!tagList) return

      const maxVisible = 20
      const items = Array.from(tagList.children)
      if (items.length <= maxVisible) return

      // collapsed state
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

  // inline the script
  return <script dangerouslySetInnerHTML={{ __html: `(${fn.toString()})()` }} />
}

export default (() => TagListToggle) satisfies QuartzComponentConstructor
