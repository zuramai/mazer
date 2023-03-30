// Responsive burger btn onclick
document.querySelector(".burger-btn").addEventListener("click", (e) => {
  e.preventDefault()
  let navbar = document.querySelector(".main-navbar")

  navbar.classList.toggle('active')
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
