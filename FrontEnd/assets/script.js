document.addEventListener("DOMContentLoaded", function(event) {
    async function logWorks() {
        const reponse = await fetch("http://localhost:5678/api/works");
        const works = await reponse.json();
        const gallerie = document.getElementsByClassName("gallery");
        let html = "";

        works.forEach((item)=>{
            const title = item["title"];
            const image = item["imageUrl"];
            let figure =`<figure>
                <img src="${image}" alt="${title}">
                <figcaption>${title}</figcaption>
            </figure>`;
            html += figure;
       });
        gallerie[0].innerHTML = html;
    }
    logWorks();

    async function getCategories(){
        const reponse = await fetch("http://localhost:5678/api/categories");
        const categories = await reponse.json();
        const filters = document.getElementsByClassName("filterbar");

        categories.forEach((item)=>{
            const name = item["name"];
            let a = `<a href="#">
            <div class="filtertexticon">
                <span>${name}</span>
            </div>
        </a>`;

        filters[0].innerHTML += a;

        });
        

    } 
    getCategories();
});