import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import goatcounterNav from "./goatcounter.inline"

// Must be a function component, not a plain object
const GoatCounterComponent: QuartzComponent = (_props: QuartzComponentProps) => {
  // nothing to render; we only hook SPA nav
  return null
}

// attach SPA hook
GoatCounterComponent.afterDOMLoaded = goatcounterNav

export default (() => GoatCounterComponent) satisfies QuartzComponentConstructor
