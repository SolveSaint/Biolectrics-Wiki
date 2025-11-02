// quartz/components/goatcounter.inline.ts
export default function goatcounterNav() {
  const send = () => {
    const gc = (window as any).goatcounter
    if (gc && typeof gc.count === "function") {
      gc.count({ path: location.pathname + location.search + location.hash })
    }
  }

  // count on first load
  send()

  // count on SPA navigations (Quartz fires a 'nav' event)
  document.addEventListener("nav", send)
}
