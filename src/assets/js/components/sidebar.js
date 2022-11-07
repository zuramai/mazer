function slideToggle(a, b, c) { 0 === a.clientHeight ? j(a, b, c, !0) : j(a, b, c) } function slideUp(a, b, c) { j(a, b, c) } function slideDown(a, b, c) { j(a, b, c, !0) } function j(c, a, k, d) { void 0 === a && (a = 400), void 0 === d && (d = !1), c.style.overflow = "hidden", d && (c.style.display = "block"); var l, b = window.getComputedStyle(c), e = parseFloat(b.getPropertyValue("height")), f = parseFloat(b.getPropertyValue("padding-top")), g = parseFloat(b.getPropertyValue("padding-bottom")), h = parseFloat(b.getPropertyValue("margin-top")), i = parseFloat(b.getPropertyValue("margin-bottom")), m = e / a, n = f / a, o = g / a, p = h / a, q = i / a; window.requestAnimationFrame(function s(r) { void 0 === l && (l = r); var b = r - l; d ? (c.style.height = m * b + "px", c.style.paddingTop = n * b + "px", c.style.paddingBottom = o * b + "px", c.style.marginTop = p * b + "px", c.style.marginBottom = q * b + "px") : (c.style.height = e - m * b + "px", c.style.paddingTop = f - n * b + "px", c.style.paddingBottom = g - o * b + "px", c.style.marginTop = h - p * b + "px", c.style.marginBottom = i - q * b + "px"), b >= a ? (c.style.height = "", c.style.paddingTop = "", c.style.paddingBottom = "", c.style.marginTop = "", c.style.marginBottom = "", c.style.overflow = "", d || (c.style.display = "none"), "function" == typeof k && k()) : window.requestAnimationFrame(s) }) }

/**
 * a Sidebar component
 * @param  {HTMLElement} el - sidebar element
 * @param  {object} options={} - options
 */
class Sidebar {
  constructor(el, options = {}) {
    this.sidebarEL = el instanceof HTMLElement ? el : document.querySelector(el)
    this.options = options
    this.init()
  }

  /**
   * initialize the sidebar
   */
  init() {
    // add event listener to sidebar
    document
      .querySelectorAll(".burger-btn")
      .forEach((el) => el.addEventListener("click", this.toggle.bind(this)))
    document
      .querySelectorAll(".sidebar-hide")
      .forEach((el) => el.addEventListener("click", this.toggle.bind(this)))
    window.addEventListener("resize", this.onResize.bind(this))

    //
    let sidebarItems = document.querySelectorAll(".sidebar-item.has-sub")
    for (var i = 0; i < sidebarItems.length; i++) {
      let sidebarItem = sidebarItems[i]
      sidebarItems[i]
        .querySelector(".sidebar-link")
        .addEventListener("click", (e) => {
          e.preventDefault()

          let submenu = sidebarItem.querySelector(".submenu")
          if (submenu.classList.contains("active"))
            submenu.style.display = "block"

          if (submenu.style.display == "none") submenu.classList.add("active")
          else submenu.classList.remove("active")
          slideToggle(submenu, 300, () =>
            this.forceElementVisibility(sidebarItem)
          )
        })
    }

    // Perfect Scrollbar Init
    if (typeof PerfectScrollbar == "function") {
      const container = document.querySelector(".sidebar-wrapper")
      const ps = new PerfectScrollbar(container, {
        wheelPropagation: false,
      })
    }

    // Scroll into active sidebar
    setTimeout(
      () =>
        document.querySelector(".sidebar-item.active")?.scrollIntoView(false),
      100
    )

    // check responsive
    this.onFirstLoad()
  }

  /**
   * On First Load
   */
  onFirstLoad() {
    var w = window.innerWidth
    if (w < 1200) {
      this.sidebarEL.classList.remove("active")
    }
  }

  /**
   * On Sidebar Rezise Event
   */
  onResize() {
    var w = window.innerWidth
    if (w < 1200) {
      this.sidebarEL.classList.remove("active")
    } else {
      this.sidebarEL.classList.add("active")
    }

    // reset
    this.deleteBackdrop()
    this.toggleOverflowBody(true)
  }

  /**
   * Toggle Sidebar
   */
  toggle() {
    const sidebarState = this.sidebarEL.classList.contains("active")
    if (sidebarState) {
      this.hide()
    } else {
      this.show()
    }
  }

  /**
   * Show Sidebar
   */
  show() {
    this.sidebarEL.classList.add("active")
    this.createBackdrop()
    this.toggleOverflowBody()
  }

  /**
   * Hide Sidebar
   */
  hide() {
    this.sidebarEL.classList.remove("active")
    this.deleteBackdrop()
    this.toggleOverflowBody()
  }

  /**
   * Create Sidebar Backdrop
   */
  createBackdrop() {
    if (window.innerWidth > 1200) return
    this.deleteBackdrop()
    const backdrop = document.createElement("div")
    backdrop.classList.add("sidebar-backdrop")
    backdrop.addEventListener("click", this.hide.bind(this))
    document.body.appendChild(backdrop)
  }

  /**
   * Delete Sidebar Backdrop
   */
  deleteBackdrop() {
    const backdrop = document.querySelector(".sidebar-backdrop")
    if (backdrop) {
      backdrop.remove()
    }
  }

  /**
   * Toggle Overflow Body
   */
  toggleOverflowBody(active) {
    const sidebarState = this.sidebarEL.classList.contains("active")
    const body = document.querySelector("body")
    if (typeof active == "undefined") {
      body.style.overflowY = sidebarState ? "hidden" : "auto"
    } else {
      body.style.overflowY = active ? "auto" : "hidden"
    }
  }

  isElementInViewport(el) {
    var rect = el.getBoundingClientRect()

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  forceElementVisibility(el) {
    if (!this.isElementInViewport(el)) {
      el.scrollIntoView(false)
    }
  }
}

/**
 * Create Sidebar Wrapper
 */
let sidebarEl = document.getElementById("sidebar")
if (sidebarEl) {
  window.sidebar = new Sidebar(sidebarEl)
}
