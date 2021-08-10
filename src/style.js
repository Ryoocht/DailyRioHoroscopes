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

// Accordion for Descriptions
let acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function(){
    this.classList.toggle("open");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}


// Flip cards
const cards = document.querySelectorAll('.card');
function transition() {
  if (!this.classList.contains('active')) {
    this.classList.add('active');
  } 
}
cards.forEach(card => card.addEventListener('click', transition));


