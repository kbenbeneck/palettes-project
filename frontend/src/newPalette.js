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
    console.log(palette)
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
        let pdiv = document.querySelector('section.square')
        pdiv.style.background = pdiv.innerText
        p.renderTones() 
        setTimeout(function() { getPalettes(); }, 3000);
    })
    
    
}