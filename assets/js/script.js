const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
const isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches;
const isNotSpecified = window.matchMedia("(prefers-color-scheme: no-preference)").matches;
const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;
let menu;

function darkMode(btn, meta) {
    btn.innerHTML = "dark mode: on";
    document.body.className = "dark-mode";
    meta.setAttribute("content" ,"#000000");	
}

function lightMode(btn, meta) {
    btn.innerHTML = "dark mode: off";
    document.body.className = "";
    meta.setAttribute("content" ,"#ffffff");
}

function defaultMode() {
    if(!(CSS.supports("backdrop-filter: invert(1)") || CSS.supports("-webkit-backdrop-filter: invert(1)"))) {
        console.log("firefox")
        var btn = document.getElementById("dark-mode-btn");
        btn.innerHTML = "" 
    } else {
		if(((localStorage.getItem("dark-mode") === null) && (isDarkMode)) || (localStorage.getItem("dark-mode") == 1)) {
            var metaThemeColor = document.querySelector("meta[name=theme-color]");
            var btn = document.getElementById("dark-mode-btn");
            darkMode(btn, metaThemeColor);
        }
    }
}

window.matchMedia("(prefers-color-scheme: dark)").addListener(e => {
    var metaThemeColor = document.querySelector("meta[name=theme-color]");
    var btn = document.getElementById("dark-mode-btn");
    
    e.matches && darkMode(btn, metaThemeColor)
});

window.matchMedia("(prefers-color-scheme: light)").addListener(e => {
    var metaThemeColor = document.querySelector("meta[name=theme-color]");
    var btn = document.getElementById("dark-mode-btn"); 
    e.matches && lightMode(btn, metaThemeColor);
});

function changeMode() {
    var metaThemeColor = document.querySelector("meta[name=theme-color]");
    document.getElementById("nav").classList.toggle("closed");
    var btn = document.getElementById("dark-mode-btn");
    
    if(btn.innerHTML == "dark mode: off") {
        darkMode(btn, metaThemeColor);
		localStorage.setItem("dark-mode", 1);
    } else {
        lightMode(btn, metaThemeColor);
		localStorage.setItem("dark-mode", 0);
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    defaultMode();
    menu = document.getElementById("menu-btn");

});

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 13) {
        console.log("button")
        console.log(document.activeElement)
        console.log(menu)
        if (document.activeElement == menu) {
            menu.click()

        }
    }

})