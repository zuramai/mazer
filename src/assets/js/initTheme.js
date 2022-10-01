const body = document.body;

if (localStorage.getItem('theme') == 'theme-dark') {
    body.classList.add("theme-dark");
} else {
    body.classList.add("theme-light");
};
