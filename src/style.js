// All result contents invisible till user submits + Loading animation
function visibilityOn(){
    let visible = document.querySelector("#visibility");
    const loading = document.querySelector(".loading");
    loading.classList.remove("hide")
    let fadeOut = function(){
        loading.classList.add("hide");
        visible.style.visibility = "visible";
    }
    let id = setTimeout(fadeOut, 2000);
    clearTimeout(id());
}


// Flip cards


