    async function logWorks() {
        const reponse = await fetch("http://localhost:5678/api/works");
        const works = await reponse.json();
        const gallerie = document.getElementById("work"); // Récupere l'élément par son ID exemple === <div class="gallery" id="work"></div>
 

    //      <div id=work> 
    //         <figure> Xfois
    //            <img src="LA-SOURCE" alt="LE-TITRE"> OK
    //            <figcaption>LE-TITRE</figcaption> OK 
    //         </figure>
    //      </div>

        works.forEach((item)=>{ // Pour chaque travaux je récupere élément par élément
            const title = item["title"]; // Je récupère le titre de l'élément courant = "JE SUIS UN TITRE"
            const imageUrl = item["imageUrl"]; // Je récupère le lien de l'image de l'élement courant === "http://localhost:5678/MONIMAGE.png"
            let image = document.createElement("img"); // Création de l'élement image === <img />
            image.src=imageUrl; // J'applique la source de l'image === <img src='LA-SOURCE' />
            image.alt = title; // J'applique la source de l'image === <img src='LA-SOURCE'  alt='JE SUIS UNE IMAGE'/>
            let figcaption = document.createElement("figcaption"); // Création de l'élement figcaption === <figcaption></figcaption>
            figcaption.textContent = title;
            let div = document.createElement("figure"); // Création de l'élement figure === <figure></figure>
            div.appendChild(image); 
            div.appendChild(figcaption);
            gallerie.appendChild(div);
        });
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
