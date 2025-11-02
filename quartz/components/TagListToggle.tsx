import { QuartzComponent, QuartzComponentConstructor } from "./types"

// Cap how many tag pills show initially (change 8 if you want)
const MAX = 8

function installLimiter() {
  const containers = Array.from(
    document.querySelectorAll<HTMLElement>(".tags, .tag-list")
  )

  containers.forEach((wrap) => {
    // don’t install twice
    if (wrap.dataset.tagLimiterInstalled === "1") return
    wrap.dataset.tagLimiterInstalled = "1"

    const pills = Array.from(wrap.children) as HTMLElement[]
    if (pills.length <= MAX) return

    // hide extras
    pills.slice(MAX).forEach((el) => el.classList.add("tag-hidden"))

    // add collapsed class for fade
    wrap.classList.add("tags-collapsed")

    // add toggle button
    const btn = document.createElement("button")
    btn.className = "expand-tags-btn"
    btn.textContent = "Show more tags"
    let expanded = false

    btn.addEventListener("click", () => {
      expanded = !expanded
      pills.slice(MAX).forEach((el) =>
        el.classList.toggle("tag-hidden", !expanded)
      )
      wrap.classList.toggle("tags-expanded", expanded)
      btn.textContent = expanded ? "Show fewer tags" : "Show more tags"
    })

    wrap.after(btn)
  })
}

const TagListToggle: QuartzComponent = {
  name: "TagListToggle",
  afterDOMLoaded: () => {
    installLimiter()               // first load
    document.addEventListener("nav", installLimiter) // Quartz SPA navigations
  },
}

export default (() => TagListToggle) satisfies QuartzComponentConstructor
