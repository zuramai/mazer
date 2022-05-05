// Bootstrap's JS'
const bootstrap = require('bootstrap');

// Make bootstrap's js available via the window object
// (Used in the tooltip example)
window.bootstrap = bootstrap;

// Feather icons are used on some pages
// Replace() replaces [data-feather] elements with icons
import featherIcons from "feather-icons"
featherIcons.replace();

// Mazer internal JS. Include this in your project to get
// the sidebar running.
require("./components/dark");
require("./mazer");