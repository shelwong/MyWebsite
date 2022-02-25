function darkMode() {

    // Get Checkbox value
    var checkBox = document.getElementById("dark-mode");

    // Get all items affected by dark mode.
    var site = document.getElementById("page-wrapper")
    var siteHeader = document.getElementById("site-header");
    var siteTitle = document.getElementById("site-title");
    var modeLabel = document.getElementById("mode-label");
    const siteNav = document.getElementsByClassName("nav-option");


    if (checkBox.checked === true) {
        console.log("Box Checked");
        site.style.backgroundColor = "#1c1d1f";
        siteHeader.style.backgroundColor = "#333";
        siteTitle.style.backgroundColor = "#333";
        siteTitle.style.color = "white";
        for(let i=0; i < siteNav.length; i++){
            siteNav[i].style.color = "white";
            siteNav[i].style.backgroundColor = "#333";
        }
        modeLabel.style.color = "white";
        modeLabel.innerHTML = "Light Mode"
    } else if (checkBox.checked === false) {
        console.log("Box Unchecked");
        site.style.backgroundColor = "white";
        siteHeader.style.backgroundColor = "white"
        siteTitle.style.backgroundColor = "white"
        siteTitle.style.color = "black";
        for(let i=0; i < siteNav.length; i++){
            siteNav[i].style.color = "black";
            siteNav[i].style.backgroundColor = "white";
        }
        modeLabel.style.color = "black";
        modeLabel.innerHTML = "Dark Mode"
    } else {
        console.log("Error! Value =/= True or False.")
    }
};