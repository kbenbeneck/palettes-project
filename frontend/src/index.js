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
    main.innerHTML = `<img src="./media/elbow.gif" alt="elbow" width="100%" id="gif"/>`
}
//PalettesIndex******************************************************************
function getPalettes() {
    clearMain()
    fetch(PALETTES_URL)
    .then(resp => resp.json())
    .then(palettes => {
        palettes.forEach(palette =>{
            let pal = new Pal(palette)
            main.innerHTML += pal.renderPalette()
        })
    })
}

//Form***************************************************************************
function displayForm() {
    clearMain()
    addFormHtml()
    let colorInput = document.querySelector("#palcolor")
    let bgInput = document.querySelector("input#background")
    let newPal = document.querySelector(".square")
    colorInput.addEventListener('input', () => {
        let color = colorInput.value
        bgInput.value = color
        newPal.style.backgroundColor = color
        
    })
    
    function addFormHtml() {
        let formDiv = document.createElement('div')
        formDiv.setAttribute('id', "form")
        let html = `
            <br>
            <form id="pform">
                <label>Palette Background</label>
                <input type="text" id="background" placeholder="Pick a color =>">
                <input type="color" id="palcolor">
                <div class="square">
                </div>
            </form>    
            <hr>
            <label>Pick 9 tones</label>
            <input type="color" id="tonecolor">
            <ul id="tonesList">
            </ul>
            <button type="button" id="reset">Reset</button>
            <button type="button" id="save">Save</button>        
            ` 
        formDiv.innerHTML = html
        main.appendChild(formDiv)

        
        let toneInput = document.querySelector("#tonecolor")
        let counter = 0; counter < 9;
        let ul = document.getElementById('tonesList')

        toneInput.addEventListener('input', () => {
            let toneColor = toneInput.value
            if (ul.childElementCount < 9 && ul.lastElementChild !== toneColor) {
            addTones(toneColor)
            }
        })

        function addTones(toneColor) {   
            let li = document.createElement('li')
            li.setAttribute('id', "tone" + counter++)
            li.setAttribute('hex', `${toneColor}`)
            li.innerText = `${toneColor}`
            li.setAttribute('class', "toneLI")
            ul.appendChild(li)
            document.querySelector('li:last-child').style.backgroundColor = toneColor    
        }

        document.getElementById("reset").addEventListener('click', clearPalette)
        document.getElementById("save").addEventListener('click', postPaletteTones)

        function clearPalette() {
            counter = 0
            ul.innerHTML = ""
        }
    }   
}




function postPaletteTones() {
    
}

//Helpers**********************************************************************
function clearMain() {
    main.innerHTML = ""
}

document.getElementById("palettes").addEventListener('click', getPalettes)
document.getElementById("home").addEventListener('click', displayGif)
document.getElementById("paletteForm").addEventListener('click', displayForm)

//Classes**********************************************************************

class Pal {
    constructor(palette) {
        this.id = palette.id
        this.background = palette.background
        this.tones = palette.tones
    }
    
    renderPalette() {
        return `
        <div id="palette-${this.id}" class="square>
            <a href="#" data-id="${this.id}">${this.background}</a>
            <ul id="tones"></ul>
            <button id="delete" data-id=${this.id}">Delete</button>
            <button id="update-palette" data-id=${this.id}">Edit</button>
            <button id="add-tones" data-id=${this.id}">Add Tones</button>        
        </div>
        `
    }
  
}

