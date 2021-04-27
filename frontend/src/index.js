

const BASE_URL = "http://localhost:3000"
const PALETTES_URL = `${BASE_URL}/palettes`
const TONES_URL = `${BASE_URL}/tones`
const main = document.querySelector('main')

//Home****************************************************************************

document.addEventListener('DOMContentLoaded', () => {
    displayGif()
})
function displayGif() {
    clearMain()
    main.innerHTML += `
        <div id="gifDiv">
            <p id="directive"> Click New to start building color palettes. </p>
            <img src="./media/elbow.gif" alt="elbow"  id="gif"/>
        </div>
        <section id="about">
            <p id="aboutText">
                I needed to bring together my passion for creating geometric opart with my desire to earn income as a developer one day. 
            </p>
        </section>
        `
        
        
        
}
    





//MainHelpers**********************************************************************

function clearMain() {
    main.innerHTML = ""
}

document.getElementById("palettes").addEventListener('click', getPalettes)
document.getElementById("home").addEventListener('click', displayGif)
document.getElementById("paletteForm").addEventListener('click', displayForm)
let navLinks = document.querySelectorAll('.topnav a')
for (let x = 0; x < navLinks.length; x++) {
    navLinks[x].addEventListener('click', function() {
        let current = document.getElementsByClassName("active")
        current[0].className = current[0].className.replace("active", "")
        this.className += "active"
    })
}
