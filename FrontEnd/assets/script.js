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
            // const id = item["id"]; // Je récupère l'Id de l'élément
            let lien = document.createElement("a"); //Création de l'élément a
            lien.href = "#";
            let span = document.createElement("span"); // Création de l'élément <span></span>
            span.textContent = name;
            let filtertexticon = document.createElement("div"); // Création de l'élément <div></div>
            filtertexticon.className = "filtertexticon";
            filtertexticon.appendChild(span);
            lien.appendChild(filtertexticon);
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

        // categories.forEach((item)=>{
        //     const name = item["name"];
        //     let a = `<a href="#">
        //     <div class="filtertexticon">
        //         <span>${name}</span>
        //     </div>
        // </a>`;

        // filters[0].innerHTML += a;

		// <!-- <div class="filterbar">
		// 	<a href="#">
		// 		<div class="filtertexticon">
		// 			<span>Tous</span>
		// 		</div>
		// 	</a>
		// </div>
        

    } 
    getCategories();
