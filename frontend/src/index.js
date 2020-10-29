const BASE_URL = "http://localhost:3000"
const PALETTES_URL = `${BASE_URL}/palettes`
const TONES_URL = `${BASE_URL}/tones`
const main = document.querySelector('main')


document.addEventListener('DOMContentLoaded', () => {
    displayGif()
})

function displayGif() {
    clearMain()
    main.innerHTML = `<img src="./media/elbow.gif" alt="elbow" width="100%" id="gif"/>`
}

function getPalettes() {
    clearMain()
    fetch(PALETTES_URL)
    .then(resp => resp.json())
    .then(ps => {
        ps.forEach(p =>{
            renderPalettes(p)
        })
    })
}

function getTones() {
    clearMain()
    fetch(TONES_URL)
    .then(resp => resp.json())
    .then(tones => renderTones(tones))
    
}

function renderPalettes(p) {
    let pDiv = document.createElement('div')
    pDiv.setAttribute('id', `${p.id}`)
    let pName = document.createElement('p')
    pName.innerText = p.name
    let pBackground = document.createElement('p')
    pBackground = p.background 
    let pTones = document.createElement('ul')
    pTones.setAttribute('id', `${p.id}`)
    p.tones.forEach(tone => {
        let toneLI = document.createElement('li')
        toneLI.innerText = `${tone.hex}`
        toneLI.setAttribute('id', `${tone.id}`)
        pTones.appendChild(toneLI)
    })
    pDiv.append(pName, pBackground, pTones)
    main.appendChild(pDiv)
}
function renderTones(tones) {
    let tUL = document.createElement('ul')
    tones.forEach(tone => {
    let tLI = document.createElement('li')
    tLI.setAttribute('id', `${tone.id}`)
    let tHex = document.createElement('p')
    tHex.innerText = `${tone.hex}`
    let pId = document.createElement('p')
    pId.innerText = `${tone.palette_id}`
    tUL.appendChild(tLI)
    tLI.append(tHex, pId)
    })
    main.appendChild(tUL)   
}

function displayForm() {
    clearMain()
    let formDiv = document.createElement('div')
    formDiv.setAttribute('id', "form")
    let html = `
            <label>Palette Name:</label>
            <input type="text" id="name" placeholder="or don't, just pick a color">
            <br>
            <label>Background Hex Code</label>
            <input type="text" id="background" placeholder="Pick a color =>">
            <input type="color" id="palcolor">
            <hr>
            <div id="newPal" class="square">
            </div>
    
            <label>Pick some color tones</label>
            <input type="color" id="tonecolor">
            <ul id="tonesList">

            </ul>
            ` 
    
    formDiv.innerHTML = html
    main.appendChild(formDiv) 
    let colorInput = document.querySelector("#palcolor")
    let bgInput = document.querySelector("input#background")
    let newPal = document.querySelector("div#newPal")
    colorInput.addEventListener('input', () => {
        let color = colorInput.value
        bgInput.value = color
        newPal.style.backgroundColor = color
    })

    let toneInput = document.querySelector("#tonecolor")
    let counter = 0; counter < 9;
    let ul = document.getElementById('tonesList')
    toneInput.addEventListener('input', () => {
        let toneColor = toneInput.value
        if (ul.childElementCount < 9 && ul.lastElementChild != toneColor) {
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
    }


}




function clearMain() {
    main.innerHTML = ""
}


document.getElementById("palettes").addEventListener('click', getPalettes)
document.getElementById("tones").addEventListener('click', getTones)
document.getElementById("home").addEventListener('click', displayGif)
document.getElementById("paletteForm").addEventListener('click', displayForm)
