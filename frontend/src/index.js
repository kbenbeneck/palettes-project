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
    console.log ('hi')
}