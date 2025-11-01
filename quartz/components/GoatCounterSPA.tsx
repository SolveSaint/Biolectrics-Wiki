import { QuartzComponent, QuartzComponentConstructor } from "./types"
import goatcounterNav from "./scripts/goatcounter.inline"

export default (() => {
  const C: QuartzComponent = {
    name: "GoatCounterSPA",
    afterDOMLoaded: goatcounterNav,
  }
  return C
}) satisfies QuartzComponentConstructor
