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
    let grid = document.createElement('div')
    grid.setAttribute('id', "index")
    main.append(grid)
    let indexDiv = document.querySelector('#index')
    
    fetch(PALETTES_URL)
    .then(resp => resp.json())
    .then(palettes => {
        palettes.forEach(palette =>{
            let pal = new Pal(palette)
            indexDiv.innerHTML += pal.renderIndex()
            
            pal.renderIndexTones()
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
                <h2>Step One</h2>
                <label>Palette Background</label>
                <input type="text" id="background" placeholder="Pick a color =>">
                <input type="color" id="palcolor">
                <div class="square">
                </div>
            </form>    
            <hr>
            <h2>Step Two</h2>
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
        document.getElementById("save").addEventListener('click', createPalette)

        function clearPalette() {
            counter = 0
            ul.innerHTML = ""
        }
    }   
}

function createPalette() {   
    let palette = {
        background: document.getElementById('background').value,
        tones_attributes: []
    }

    let fTones = document.getElementsByTagName('li')
    for (let li of fTones){
        let tone = {
            hex: li.innerText,    
        }
        palette.tones_attributes.push(tone)
    }        
    
    fetch(PALETTES_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
        },
        body: JSON.stringify(palette)
    })
    .then(res => res.json())
    .then(palette => {
        clearMain()
        let p = new Pal(palette)
        main.innerHTML += p.renderPalette()
        let pdiv = document.querySelector('div.square')
        pdiv.style.background = pdiv.innerText
        p.renderTones()  
    })
    
    
}

//MainHelpers**********************************************************************

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
        <div id="palette-${this.id}" class="square">
        <a href="#" data-id="${this.id}">${this.background}</a>
            <ul id="tones"></ul>        
        </div>
        
         
        `
    }

    renderTones() {
        let id = document.querySelector('a[data-id]').dataset.id
        fetch(PALETTES_URL+`/${id}`)
        .then(resp => resp.json())
        let ul = document.querySelector(`div #tones`)
        let counter = 0; counter < 9;
        this.tones.forEach(tone => {
            let li = document.createElement('li')
            li.setAttribute('id', "t" + counter++)
            li.setAttribute('class', "toneLI")
            li.setAttribute('hex', `${tone.hex}`)
            li.innerText = `${tone.hex}`
            ul.appendChild(li)  
            let fTones = document.querySelectorAll('li'); 
            for (let li of fTones){
                li.style.background = li.innerText 
            }   
        })
    }

  

    renderIndex() {
        return `
        <div id="palette-${this.id}" class="index">
        <a href="#" data-id="${this.id}">${this.background}</a>
            <ul id="indexTones"></ul>        
        </div>
        `
    }
    renderIndexTones() {
        let id = document.querySelector('a[data-id]').dataset.id
        fetch(PALETTES_URL+`/${id}`)
        .then(resp => resp.json())
        let ul = document.querySelector(`div #tones`)
        let counter = 0; counter < 9;

        this.tones.forEach(tone => {
            let li = document.createElement('li')
            li.setAttribute('id', "itone" + counter++)
            li.setAttribute('class', "indexTone")
            li.setAttribute('hex', `${tone.hex}`)
            li.innerText = `${tone.hex}`
            let ul = document.querySelector(`div#palette-${this.id} ul`)
            ul.appendChild(li)
            let pdiv = document.querySelector(`div#palette-${this.id}`)  
            pdiv.style.background = `${this.background}`
            let fTones = document.querySelectorAll('li'); 
            for (let li of fTones){
                li.style.background = li.innerText 
            }
        })
    }
}


