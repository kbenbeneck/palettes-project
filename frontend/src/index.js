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

function clearMain() {
    main.innerHTML = ""
}

document.getElementById("palettes").addEventListener('click', getPalettes)
document.getElementById("tones").addEventListener('click', getTones)
document.getElementById("home").addEventListener('click', displayGif)
document.getElementById("paletteForm").addEventListener('click', displayForm)
