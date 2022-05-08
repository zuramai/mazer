const THEME_KEY = "theme";
const THEME_REGEX = /\btheme-[a-z0-9]+\b/g;
const toggler = document.getElementById("toggle-dark");

export function toggleDarkTheme() {
  setTheme(
    document.body.classList.contains("theme-dark")
      ? "theme-light"
      : "theme-dark"
  );
}

/**
 * Set theme for mazer
 * @param {"theme-dark"|"theme-light"} theme
 */
export function setTheme(theme, dontPersist = false) {
  document.body.className = document.body.className.replace(THEME_REGEX, "");
  console.log("change theme to ", theme);
  document.body.classList.add(theme);
  toggler.checked = theme == "theme-dark";

  if (!dontPersist) {
    localStorage.setItem(THEME_KEY, theme);
  }
}

toggler.addEventListener("input", (e) => {
  setTheme(e.target.checked ? "theme-dark" : "theme-light");
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("Dark Loaded");

  //If the user manually set a theme, we'll load that
  let storedTheme;
  if ((storedTheme = localStorage.getItem(THEME_KEY))) {
    return setTheme(storedTheme);
  }

  //Detect if the user set his preferred color scheme to dark
  if (!window.matchMedia) {
    return;
  }

  //Media query to detect dark preference
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  //Register change listener
  mediaQuery.addEventListener("change", (e) =>
    setTheme(e.matches ? "theme-dark" : "theme-light", true)
  );

  return setTheme(mediaQuery.matches ? "theme-dark" : "theme-light", true);
});
