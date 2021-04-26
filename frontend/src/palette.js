class Pal {
    constructor(palette) {
        this.id = palette.id
        this.background = palette.background
        this.tones = palette.tones
    }
    
    renderPalette() {
        return `
        <section id="palette-${this.id}" class="square">
        <a href="#" data-id="${this.id}">${this.background}</a>
            <ul id="tones"></ul>        
        </section>
        `    
    }

    renderTones() {
        let id = document.querySelector('a[data-id]').dataset.id
        fetch(PALETTES_URL+`/${id}`)
        .then(resp => resp.json())
        let ul = document.querySelector(`section #tones`)
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
        <section id="palette-${this.id}" class="index">
        <a href="#" data-id="${this.id}">${this.background}</a>
            <ul id="indexTones"></ul>        
        </section>
        `
    }
    
    renderIndexTones() {
       
        let counter = 0; counter < 9;

        this.tones.forEach(tone => {
            //create tone li
            let li = document.createElement('li')
            li.setAttribute('id', "itone" + counter++)
            li.setAttribute('class', "indexTone")
            li.setAttribute('hex', `${tone.hex}`)
            li.innerText = `${tone.hex}`
            let ul = document.querySelector(`section#palette-${this.id} ul`)
            ul.appendChild(li)
            let pdiv = document.querySelector(`section#palette-${this.id}`)  
            pdiv.style.background = `${this.background}`
            let fTones = document.querySelectorAll('li'); 
            for (let li of fTones){
                li.style.background = li.innerText 
            }
        })
    }
}

