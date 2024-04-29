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
});