const input = document.querySelector("input");

function search(name){    
    const url = `https://itunes.apple.com/search?term=${name}&media=music&entity=album&attribute=artistTerm&limit=200`

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        const results = data.results.filter((e) => e.artistName);
        console.log(results);
        render(results);
        // console.log(data);
    })
}

function render(results){
    const arr = document.getElementById("list");
    arr.innerHTML = "";
    results.forEach(e => {

        const el = document.createElement("li");
        el.className = 'item';
        const divCard = document.createElement("div");
        divCard.className = 'card';
        let albumName = "";
        if(e.collectionName.length > 20) {
            albumName = e.collectionName.substring(0, 40) + "..."
        } else {
            albumName = e.collectionName;
        }
        el.innerHTML = `<img src="${e.artworkUrl60}" class="image"></img><p class="album-name">${albumName}</p>`;
        divCard.appendChild(el);
        arr.appendChild(divCard);
    })

    const info = document.querySelector(".searched-artist");
    info.innerHTML = `${results.length} results for "${input.value}"`

    if(results.length == 0) {
        info.innerHTML = "Search Albums by Artist Name : ";
    }
}


input.addEventListener('input', function(e) {
    e.preventDefault();
    // console.log(input.value);
    search(input.value);
})

document.addEventListener('keypress', function (e) {
    if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
    }
    
});