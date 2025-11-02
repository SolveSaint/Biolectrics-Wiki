import { QuartzComponent, QuartzComponentConstructor } from "./types"

const GoatCounterSPA: QuartzComponent = () => {
  const code = `
    (function () {
      function send() {
        var gc = (window as any).goatcounter
        if (gc && typeof gc.count === "function") {
          gc.count({ path: location.pathname + location.search + location.hash })
        }
      }
      // first load
      send()
      // Quartz SPA navigations
      document.addEventListener("nav", send)
    })();
  `
  return <script dangerouslySetInnerHTML={{ __html: code }} />
}

export default (() => GoatCounterSPA) satisfies QuartzComponentConstructor
