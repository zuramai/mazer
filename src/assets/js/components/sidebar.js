function slideToggle(t,e,o){0===t.clientHeight?j(t,e,o,!0):j(t,e,o)}function slideUp(t,e,o){j(t,e,o)}function slideDown(t,e,o){j(t,e,o,!0)}function j(t,e,o,i){void 0===e&&(e=400),void 0===i&&(i=!1),t.style.overflow="hidden",i&&(t.style.display="block");var p,l=window.getComputedStyle(t),n=parseFloat(l.getPropertyValue("height")),a=parseFloat(l.getPropertyValue("padding-top")),s=parseFloat(l.getPropertyValue("padding-bottom")),r=parseFloat(l.getPropertyValue("margin-top")),d=parseFloat(l.getPropertyValue("margin-bottom")),g=n/e,y=a/e,m=s/e,u=r/e,h=d/e;window.requestAnimationFrame(function l(x){void 0===p&&(p=x);var f=x-p;i?(t.style.height=g*f+"px",t.style.paddingTop=y*f+"px",t.style.paddingBottom=m*f+"px",t.style.marginTop=u*f+"px",t.style.marginBottom=h*f+"px"):(t.style.height=n-g*f+"px",t.style.paddingTop=a-y*f+"px",t.style.paddingBottom=s-m*f+"px",t.style.marginTop=r-u*f+"px",t.style.marginBottom=d-h*f+"px"),f>=e?(t.style.height="",t.style.paddingTop="",t.style.paddingBottom="",t.style.marginTop="",t.style.marginBottom="",t.style.overflow="",i||(t.style.display="none"),"function"==typeof o&&o()):window.requestAnimationFrame(l)})}

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
    document.querySelectorAll('.burger-btn').forEach(el => el.addEventListener('click', this.toggle.bind(this)))
    document.querySelectorAll('.sidebar-hide').forEach(el => el.addEventListener('click', this.toggle.bind(this)))
    window.addEventListener('resize', this.onResize.bind(this));

    // 
    let sidebarItems = document.querySelectorAll('.sidebar-item.has-sub');
    for(var i = 0; i < sidebarItems.length; i++) {
        let sidebarItem = sidebarItems[i];
      sidebarItems[i].querySelector('.sidebar-link').addEventListener('click', function(e) {
            e.preventDefault();
            
            let submenu = sidebarItem.querySelector('.submenu');
            if( submenu.classList.contains('active') ) submenu.style.display = "block"

            if( submenu.style.display == "none" ) submenu.classList.add('active')
            else submenu.classList.remove('active')
            slideToggle(submenu, 300)
        })
    }

    // Perfect Scrollbar Init
    if(typeof PerfectScrollbar == 'function') {
      const container = document.querySelector(".sidebar-wrapper");
      const ps = new PerfectScrollbar(container, {
          wheelPropagation: false
      });
    }

    // Scroll into active sidebar
    setTimeout(() => document.querySelector('.sidebar-item.active').scrollIntoView(false), 100);

    // check responsive
    this.onFirstLoad();
  }

  /**
   * On First Load
   */
  onFirstLoad() {
    var w = window.innerWidth;
    if(w < 1200) {
      this.sidebarEL.classList.remove('active');
    }
  }

  /**
   * On Sidebar Rezise Event
   */
  onResize() {
    var w = window.innerWidth
    if(w < 1200) {
      this.sidebarEL.classList.remove('active')
    } else {
      this.sidebarEL.classList.add('active')
    }

    // reset 
    this.deleteBackdrop()
    this.toggleOverflowBody(true)
  }

  /**
   * Toggle Sidebar
   */
  toggle() {
    const sidebarState = this.sidebarEL.classList.contains('active');
    if (sidebarState) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Show Sidebar
   */
  show() {
    this.sidebarEL.classList.add('active');
    this.createBackdrop();
    this.toggleOverflowBody();
  }

  /**
   * Hide Sidebar
   */
  hide() {
    this.sidebarEL.classList.remove('active');
    this.deleteBackdrop();
    this.toggleOverflowBody();
  }


  /**
   * Create Sidebar Backdrop
   */
  createBackdrop() {
    this.deleteBackdrop();
    const backdrop = document.createElement('div');
    backdrop.classList.add('sidebar-backdrop');
    backdrop.addEventListener('click', this.hide.bind(this));
    document.body.appendChild(backdrop);
  }

  /**
   * Delete Sidebar Backdrop
   */
  deleteBackdrop() {
    const backdrop = document.querySelector('.sidebar-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }

  /**
   * Toggle Overflow Body
   */
  toggleOverflowBody(active) {
    const sidebarState = this.sidebarEL.classList.contains('active');
    const body = document.querySelector('body');
    if (typeof active == 'undefined') {
      body.style.overflowY = sidebarState ? 'hidden' : 'auto';
    } else {
      body.style.overflowY = active ? 'auto' : 'hidden';
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
