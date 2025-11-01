// fires on Quartz' SPA navigation event
document.addEventListener("nav", () => {
  // wait until the goatcounter script is on the page
  const gc = (window as any).goatcounter
  if (gc && typeof gc.count === "function") {
    gc.count({ path: location.pathname + location.search + location.hash })
  }
})
