import isDesktop from '../helper/isDesktop'


/**
 * Calculate nested children height in sidebar menu
* @param {HTMLElement} el 
*/
const calculateChildrenHeight = (el, deep = false) => {
  const children = el.children

  let height = 0
  for (let i = 0; i < el.childElementCount; i++) {
    const child = children[i]
    height += child.querySelector('.submenu-link').clientHeight

    // 2-level menu
    if (deep && child.classList.contains('has-sub')) {
      const subsubmenu = child.querySelector('.submenu')

      if (subsubmenu.classList.contains('submenu-open')) {
        const childrenHeight = ~~[...subsubmenu.querySelectorAll('.submenu-link')].reduce((acc, curr) => acc + curr.clientHeight, 0)
        height += childrenHeight
      }
    }

  }
  el.style.setProperty('--submenu-height', height + 'px')
  return height
}

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


    const toggleSubmenu = (el) => {
      if (el.classList.contains("submenu-open")) {
        el.classList.remove('submenu-open')
        el.classList.add('submenu-closed')
      } else {
        el.classList.remove("submenu-closed")
        el.classList.add("submenu-open")
      }
    }

    let sidebarItems = document.querySelectorAll(".sidebar-item.has-sub")
    for (var i = 0; i < sidebarItems.length; i++) {
      let sidebarItem = sidebarItems[i]

      sidebarItems[i]
        .querySelector(".sidebar-link")
        .addEventListener("click", (e) => {
          e.preventDefault()
          let submenu = sidebarItem.querySelector(".submenu")
          toggleSubmenu(submenu)
        })


      // If submenu has submenu
      const submenuItems = sidebarItem.querySelectorAll('.submenu-item.has-sub')
      submenuItems.forEach(item => {
        item.addEventListener('click', () => {
          const submenuLevelTwo = item.querySelector('.submenu')
          toggleSubmenu(submenuLevelTwo)

          // Pass second .submenu
          const height = calculateChildrenHeight(item.parentElement, true)

        })
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
    setTimeout(() => {
      const activeSidebarItem = document.querySelector(".sidebar-item.active");
      if (activeSidebarItem) {
        this.forceElementVisibility(activeSidebarItem);
      }
    }, 300);


    if (this.options.recalculateHeight) {
      reInit_SubMenuHeight(sidebarEl)
    }

  }

  /**
   * On Sidebar Rezise Event
   */
  onResize() {
    if (isDesktop(window)) {
      this.sidebarEL.classList.add("active")
      this.sidebarEL.classList.remove("inactive")
    } else {
      this.sidebarEL.classList.remove("active")
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
    this.sidebarEL.classList.remove("inactive")
    this.createBackdrop()
    this.toggleOverflowBody()
  }

  /**
   * Hide Sidebar
   */
  hide() {
    this.sidebarEL.classList.remove("active")
    this.sidebarEL.classList.add("inactive")
    this.deleteBackdrop()
    this.toggleOverflowBody()
  }

  /**
   * Create Sidebar Backdrop
   */
  createBackdrop() {
    if (isDesktop(window)) return
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
    if (isDesktop(window)) return;
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



let sidebarEl = document.getElementById("sidebar")

/**
   * On First Load
   */
const onFirstLoad = (sidebarEL) => {
  if (!sidebarEl) return
  if (isDesktop(window)) {
    sidebarEL.classList.add("active")
    sidebarEL.classList.add('sidebar-desktop')
  }

  // Get submenus size
  let submenus = document.querySelectorAll(".sidebar-item.has-sub .submenu")
  for (var i = 0; i < submenus.length; i++) {
    let submenu = submenus[i]
    const sidebarItem = submenu.parentElement
    const height = submenu.clientHeight

    if (sidebarItem.classList.contains('active')) submenu.classList.add('submenu-open')
    else submenu.classList.add('submenu-closed')
    setTimeout(() => {
      const height = calculateChildrenHeight(submenu, true)
    }, 50);
  }
}

const reInit_SubMenuHeight = (sidebarEl) => {
  if (!sidebarEl) return

  // Get submenus size
  let submenus = document.querySelectorAll(".sidebar-item.has-sub .submenu")
  for (var i = 0; i < submenus.length; i++) {
    let submenu = submenus[i]
    const sidebarItem = submenu.parentElement
    const height = submenu.clientHeight

    if (sidebarItem.classList.contains('active')) submenu.classList.add('submenu-open')
    else submenu.classList.add('submenu-closed')
    setTimeout(() => {
      const height = calculateChildrenHeight(submenu, true)
    }, 50);
  }
}


if (document.readyState !== 'loading') {
  onFirstLoad(sidebarEl)
}
else {
  window.addEventListener('DOMContentLoaded', () => onFirstLoad(sidebarEl))
}
/**
 * Create Sidebar Wrapper
 */

// NOTE make Sidebar method as a global function
window.Sidebar = Sidebar

if (sidebarEl) {
  // initialize
  const sidebar = new window.Sidebar(sidebarEl)
}

// NOTE use this to reinitialize sidebar with recalculate height
// NOTE fixed dropdown smooth animation
/* 
const sidebar = new window.Sidebar(document.getElementById("sidebar"), {
  recalculateHeight: true
}) 
*/

