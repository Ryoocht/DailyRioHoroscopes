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
const cards = document.querySelectorAll('.card');
function transition() {
  if (this.classList.contains('active')) {
    this.classList.remove('active')
  } else {
    this.classList.add('active');
  }
}
cards.forEach(card => card.addEventListener('click', transition));


