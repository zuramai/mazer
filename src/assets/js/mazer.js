// Bootstrap JS
const bootstrap = require('bootstrap');

// We could import PerfectScrollbar directly in the sidebar module
window.PerfectScrollbar = require('perfect-scrollbar/dist/perfect-scrollbar.min.js');

// Make bootstrap's js available via the window object
// Used in the tooltip example
window.bootstrap = bootstrap;

let Sidebar  = require('./components/sidebar');

export {
    Sidebar
}