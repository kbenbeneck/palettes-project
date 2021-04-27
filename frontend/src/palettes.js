function getPalettes() {
    clearMain()
    let grid = document.createElement('section')
    grid.setAttribute('id', "index")
    main.append(grid)
    let indexDiv = document.querySelector('#index')
    
    fetch(PALETTES_URL)
    .then(resp => resp.json())
    .then(palettes => {
        // let sortedPalettes = palettes.sort((a, b) => (a.background > b.background) ? 1 : -1)

        // sortedPalettes.forEach(palette =>{
            palettes.reverse().forEach(palette =>{
            let pal = new Pal(palette)
            indexDiv.innerHTML += pal.renderIndex()
            
            pal.renderIndexTones()
        })
        attachClickToLinks()
    })
}