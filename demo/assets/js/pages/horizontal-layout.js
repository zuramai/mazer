function slideToggle(a, b, c) { 0 === a.clientHeight ? j(a, b, c, !0) : j(a, b, c) } function slideUp(a, b, c) { j(a, b, c) } function slideDown(a, b, c) { j(a, b, c, !0) } function j(c, a, k, d) { void 0 === a && (a = 400), void 0 === d && (d = !1), c.style.overflow = "hidden", d && (c.style.display = "block"); var l, b = window.getComputedStyle(c), e = parseFloat(b.getPropertyValue("height")), f = parseFloat(b.getPropertyValue("padding-top")), g = parseFloat(b.getPropertyValue("padding-bottom")), h = parseFloat(b.getPropertyValue("margin-top")), i = parseFloat(b.getPropertyValue("margin-bottom")), m = e / a, n = f / a, o = g / a, p = h / a, q = i / a; window.requestAnimationFrame(function s(r) { void 0 === l && (l = r); var b = r - l; d ? (c.style.height = m * b + "px", c.style.paddingTop = n * b + "px", c.style.paddingBottom = o * b + "px", c.style.marginTop = p * b + "px", c.style.marginBottom = q * b + "px") : (c.style.height = e - m * b + "px", c.style.paddingTop = f - n * b + "px", c.style.paddingBottom = g - o * b + "px", c.style.marginTop = h - p * b + "px", c.style.marginBottom = i - q * b + "px"), b >= a ? (c.style.height = "", c.style.paddingTop = "", c.style.paddingBottom = "", c.style.marginTop = "", c.style.marginBottom = "", c.style.overflow = "", d || (c.style.display = "none"), "function" == typeof k && k()) : window.requestAnimationFrame(s) }) }

// Responsive burger btn onclick
document.querySelector(".burger-btn").addEventListener("click", (e) => {
  e.preventDefault()
  let navbar = document.querySelector(".main-navbar")

  slideToggle(navbar, 300)
})

window.onload = () => checkWindowSize()
window.addEventListener("resize", (event) => {
  checkWindowSize()
})

function checkWindowSize() {
  if (window.innerWidth < 1200) listener()
  if (window.innerWidth > 1200)
    document.querySelector(".main-navbar").style.display = ""
}

function listener() {
  let menuItems = document.querySelectorAll(".menu-item.has-sub")
  menuItems.forEach((menuItem) => {
    menuItem.querySelector(".menu-link").addEventListener("click", (e) => {
      e.preventDefault()
      let submenu = menuItem.querySelector(".submenu")
      submenu.classList.toggle("active")
    })
  })

  // Three level menu event listener
  let submenuItems = document.querySelectorAll(".submenu-item.has-sub")

  submenuItems.forEach((submenuItem) => {
    submenuItem
      .querySelector(".submenu-link")
      .addEventListener("click", (e) => {
        e.preventDefault()
        submenuItem.querySelector(".subsubmenu").classList.toggle("active")
      })
  })
}
