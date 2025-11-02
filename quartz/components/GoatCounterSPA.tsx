import { QuartzComponent, QuartzComponentConstructor } from "./types"
import goatcounterNav from "./goatcounter.inline"  // ⬅️ no “scripts/”

export default (() => {
  const C: QuartzComponent = { name: "GoatCounterSPA", afterDOMLoaded: goatcounterNav }
  return C
}) satisfies QuartzComponentConstructor


