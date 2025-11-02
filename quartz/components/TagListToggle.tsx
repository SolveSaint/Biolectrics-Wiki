import { QuartzComponent, QuartzComponentConstructor } from "./types"

const makeLimiter = (MAX = 8) => {
  const apply = () => {
    const containers = Array.from(
      document.querySelectorAll<HTMLElement>(".tags, .tag-list")
    )

    containers.forEach((wrap) => {
      // do not install twice
      if (wrap.dataset.tagLimiterInstalled === "1") return
      wrap.dataset.tagLimiterInstalled = "1"

      const pills = Array.from(wrap.children) as HTMLElement[]
      if (pills.length <= MAX) return

      // hide extras
      pills.slice(MAX).forEach((el) => el.classList.add("tag-hidden"))

      // button
      const btn = document.createElement("button")
      btn.className = "expand-tags-btn"
      btn.textContent = "Show more tags"
      let expanded = false

      btn.addEventListener("click", () => {
        expanded = !expanded
        pills.slice(MAX).forEach((el) =>
          el.classList.toggle("tag-hidden", !expanded)
        )
        btn.textContent = expanded ? "Show fewer tags" : "Show more tags"
        wrap.classList.toggle("tags-expanded", expanded)
      })

      wrap.after(btn)
      // small fade when collapsed
      wrap.classList.add("tags-collapsed")
    })
  }

  // run now and on SPA nav
  apply()
  document.addEventListener("nav", apply, { once: false })
}

const TagListToggle: QuartzComponent = {
  name: "TagListToggle",
  // inject a tiny inline runner
  afterDOMLoaded: () => makeLimiter(8), // ← change number here if you want
}

export default (() => TagListToggle) satisfies QuartzComponentConstructor
