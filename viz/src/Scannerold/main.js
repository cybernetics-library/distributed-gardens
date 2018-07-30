import PaperCup from '../PaperCup'

window.onload = function() {
  document.getElementById("boopbutton").onclick = () => {
    PaperCup.sendToParent("heyyyyyyyyyyy");
  }
}


