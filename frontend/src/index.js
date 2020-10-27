const BASE_URL = "http://localhost:3000"
const PALETTES_URL = `${BASE_URL}/palettes`
const TONES_URL = `${BASE_URL}/tones`
const main = document.querySelector('main')


document.addEventListener('DOMContentLoaded', () => {
    getPalettes()
})

function getPalettes() {
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