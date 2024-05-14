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
            div.dataset.categoryId = item["categoryId"]; // J'applique à figure l'attribut data-category-id
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
            lien.addEventListener("click", function () {
                triProjet(item["id"]); // j'appelle la fonction triProjet avec mon id en paramètre pour que tu EXECUTES
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
        let span = document.createElement("span"); // Création de l'élément <span></span>
        span.textContent = "Tous";
        lien.addEventListener("click", function () {
            triProjet(0);
        });
        let filtertexticon = document.createElement("div"); // Création de l'élément <div></div>
        filtertexticon.className = "filtertexticon";
        filtertexticon.appendChild(span);
        lien.appendChild(filtertexticon);

        filterbar.insertBefore(lien, filterbar.children[0]); 

        const work = document.getElementById("work");
        work.insertAdjacentElement("beforebegin", filterbar);
    
    } 
    getCategories();

    function triProjet(idFiltre){
        const lestravaux = document.getElementById("work").getElementsByTagName("figure"); //je récupère mes figures qui sont ds l'élément id work et je les mets dans lestravaux
        for (i=0; i< lestravaux.length; i++)//si i est < à la longueur du tableau; à la fin du tour de boucle tu incréments (tjrs de 1)
            {
                const travail = lestravaux[i]; // Récupération de l'élément courant
                const travailCategoryId = travail.dataset.categoryId;//Récupération de l'id de sa catégorie
                if (travailCategoryId==idFiltre){ // Si l'id de la catégorie est égal a l'id du filtre
                    if (travail.classList.contains("secacher")){
                        travail.classList.remove("secacher");
                    }
                    travail.classList.add("afficher");
                    // alors tu affiches l'élément = à l'id du filtre
                } else if (idFiltre===0) {
                        if (travail.classList.contains("secacher")){
                            travail.classList.remove("secacher");
                            travail.classList.add("afficher");
                        }
                }
                else // Sinon
                {
                    if (travail.classList.contains("afficher")){
                        travail.classList.remove("afficher");
                    }

                    travail.classList.add("secacher");
                    // Tu ne l'affiches pas 
                }
            }
    }

    if (window.localStorage.getItem("userToken")!==null){
        const logout = document.getElementById("logout");
        logout.style.display = "block";
        const login = document.getElementById("login");
        login.style.display = "none";
    }

    function logOut() {
        if (window.localStorage.getItem("userToken") !==null){
            window.localStorage.removeItem("userToken");
            const logout = document.getElementById("logout");
            logout.style.display = "none";
            const login = document.getElementById("login");
            login.style.display = "block";

        }
    }

