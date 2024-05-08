    async function logWorks() {
        const reponse = await fetch("http://localhost:5678/api/works");
        const works = await reponse.json();
        const gallerie = document.getElementById("work"); // Récupere l'élément par son ID exemple === <div class="gallery" id="work"></div>

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
            div.dataset.categoryId = item["categoryId"]; // J'applique à ma div figure l'attribut data-categoryId
            gallerie.appendChild(div);
            
        });
    }

    logWorks();

    async function getCategories(){
        const reponse = await fetch("http://localhost:5678/api/categories");
        const categories = await reponse.json();
        const filterbar = document.createElement("div"); // Création de l'élément <div></div>
        filterbar.className = "filterbar";

        categories.forEach((item)=>{
            const name = item["name"]; // Je récupère le nom de l'élément
            let lien = document.createElement("a"); //Création de l'élément a
            // lien.href = "#";
            lien.dataset.categoryId = item["id"]; // Je rajoute l'id sur le lien de mon élément
            lien.addEventListener("click", function () {
                triProjet(item["id"]);
            });
            let span = document.createElement("span"); // Création de l'élément <span></span>
            span.textContent = name;
            let filtertexticon = document.createElement("div"); // Création de l'élément <div></div>
            filtertexticon.className = "filtertexticon";
            lien.appendChild(filtertexticon);
            filtertexticon.appendChild(span);
            filterbar.appendChild(lien);
        });

        let lien = document.createElement("a"); //Création de l'élément a
        lien.href = "#";
        let span = document.createElement("span"); // Création de l'élément <span></span>
        span.textContent = "Tous";
        let filtertexticon = document.createElement("div"); // Création de l'élément <div></div>
        filtertexticon.className = "filtertexticon";
        filtertexticon.appendChild(span);
        lien.appendChild(filtertexticon);

        filterbar.insertBefore(lien, filterbar.children[0]); 

        const work = document.getElementById("work");
        work.insertAdjacentElement("beforebegin", filterbar);
    
    } 
    getCategories();

    function triProjet(stockage){
        const lestravaux = document.getElementById("work").getElementsByTagName("figure"); //je récupère mes figures qui sont ds l'élément id work et je les mets dans lestravaux
        
        for (i=0; i< lestravaux.length; i++)
            {
                const travail = lestravaux[i];
                const travailCategoryId = travail.dataset.categoryId;
                console.log(travailCategoryId, stockage);
                if (travailCategoryId==stockage){
                    console.log("c ca");
                } else 
                {
                    console.log("c pas ca");
                } 
            }



    }

//passe categoryid a la fonction tri projet et le voir afficher 
    // au clique du bouton on appelle la fonction triProjet, celle ci 
    // prend un paramètre qui est l'id catégorie, puis trier work