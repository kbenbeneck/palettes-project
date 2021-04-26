//Show Page************************************************************************
function attachClickToLinks() {
    let palettes = document.querySelectorAll('#index a')
    palettes.forEach(palette => {
        palette.addEventListener('click', showPalette)
    })
}

function showPalette() {
    clearMain()
    let id = event.target.dataset.id
        
    fetch(PALETTES_URL+`/${id}`)
    .then(resp => resp.json())
    .then(palette => {
        let p = new Pal(palette)
        main.innerHTML += p.renderPalette()
        let pdiv = document.querySelector(`section#palette-${p.id}`)  
        pdiv.style.background = `${p.background}`
        let ul = document.querySelector(`section #tones`)
        let counter = 0; counter < 9;
        p.tones.forEach(tone => {
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
    })
 
    
    
}