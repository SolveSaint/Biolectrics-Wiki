import { QuartzComponent, QuartzComponentConstructor } from "./types"
import goatcounterNav from "./goatcounter.inline"

export default (() => {
  const C: QuartzComponent = {
    name: "GoatCounterSPA",
    // Render nothing into the HTML, we only need the hook
    render: () => null,
    // Attach SPA analytics after DOM is ready
    afterDOMLoaded: goatcounterNav,
  }
  return C
}) satisfies QuartzComponentConstructor
