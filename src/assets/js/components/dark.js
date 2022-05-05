let bodyClass = document.body.classList
let toggler = document.getElementById("toggle-dark")

export function toggleTheme() {
    if(bodyClass.contains("theme-dark"))
        bodyClass.remove("theme-dark")
    else 
        bodyClass.add("theme-dark")
}

/**
 * Set theme for mazer
 * @param {"theme-dark"|"theme-light"} theme 
 */
export function setTheme(theme) {
    document.body.className = ""
    console.log("change theme to ", theme);
    bodyClass.add(theme)
    localStorage.setItem(THEME_KEY, theme)
    toggler.checked = theme == "theme-dark"
}

toggler.addEventListener('input', e => {
    setTheme(e.target.checked ? "theme-dark" : "theme-light")
})

window.onload = () => {
    console.log("Dark Loaded");

    if(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    
        if(localStorage.getItem(THEME_KEY) == "theme-light") {
            return setTheme("theme-light")
        } 
        
        setTheme("theme-dark")
    } else {
        
        if(localStorage.getItem(THEME_KEY) == "theme-dark") {
            return setTheme("theme-dark")
        } 

        setTheme("theme-light")

    }
}

const THEME_KEY = "theme"


