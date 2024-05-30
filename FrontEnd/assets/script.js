async function getWorks() {
  const reponse = await fetch("http://localhost:5678/api/works");
  const works = await reponse.json();
  return works;
}

async function getCategories() {
  const reponse = await fetch("http://localhost:5678/api/categories");
  const categories = await reponse.json();
  return categories;
}

async function displayWorks() {
  updateWorks("welcome");
}

displayWorks();

async function displayCategories() {
  const filterbar = document.createElement("div"); // Création de l'élément <div></div>
  const categories = await getCategories();
  filterbar.className = "filterbar";

  categories.forEach((item) => {
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
displayCategories();

function triProjet(idFiltre) {
  const lestravaux = document
    .getElementById("work")
    .getElementsByTagName("figure"); //je récupère mes figures qui sont ds l'élément id work et je les mets dans lestravaux
  for (
    i = 0;
    i < lestravaux.length;
    i++ //si i est < à la longueur du tableau; à la fin du tour de boucle tu incréments (tjrs de 1)
  ) {
    const travail = lestravaux[i]; // Récupération de l'élément courant
    const travailCategoryId = travail.dataset.categoryId; //Récupération de l'id de sa catégorie
    if (travailCategoryId == idFiltre) {
      // Si l'id de la catégorie est égal a l'id du filtre
      if (travail.classList.contains("secacher")) {
        travail.classList.remove("secacher");
      }
      travail.classList.add("afficher");
      // alors tu affiches l'élément = à l'id du filtre
    } else if (idFiltre === 0) {
      if (travail.classList.contains("secacher")) {
        travail.classList.remove("secacher");
        travail.classList.add("afficher");
      }
    } // Sinon
    else {
      if (travail.classList.contains("afficher")) {
        travail.classList.remove("afficher");
      }

      travail.classList.add("secacher");
      // Tu ne l'affiches pas
    }
  }
}

if (window.localStorage.getItem("userToken") !== null) {
  const logout = document.getElementById("logout");
  logout.style.display = "block";
  const login = document.getElementById("login");
  login.style.display = "none";
  const modif = document.getElementById("modif");
  modif.style.display = "block";
  modif.addEventListener("click", function () {
    displayModal();
  });
  logout.addEventListener("click", function () {
    logOut();
  });
  const editMode = document.getElementById("editMode");
  editMode.style.display="flex";
}

function logOut() {
  if (window.localStorage.getItem("userToken") !== null) {
    window.localStorage.removeItem("userToken");
    const logout = document.getElementById("logout");
    logout.style.display = "none";
    const login = document.getElementById("login");
    login.style.display = "block";
    const modif = document.getElementById("modif");
    modif.style.display = "none";

    const editMode = document.getElementById("editMode");
    editMode.style.display="none";
  }
}

async function displayModal() {
  const idmodal = document.getElementById("modal");
  idmodal.style.display = "block";
  updateWorks("modal");

  const closeModal = document.getElementById("closemodal");
  closeModal.addEventListener("click", function () {
    hiddenModal();
  });
  idmodal.addEventListener("click", function () {
    hiddenModal();
  });
  const stopPropagation = function (e) {
    e.stopPropagation();
  };
  idmodal.querySelector('.modalcontent').addEventListener('click', stopPropagation);

  const btnaddpicture = document.getElementById("btnAddPicture");
  btnaddpicture.addEventListener("click", function () {
    displayAddPicture();
  });
  
  const leftarrow = document.getElementById("leftArrow");
  leftarrow.style.display = "none";
}

function hiddenModal() {
  const idmodal = document.getElementById("modal");
  const pictures = document.getElementById("pictures");
  idmodal.style.display = "none";
  pictures.innerHTML = "";

  const addWork = document.getElementById("addWork");
  const photogallery = document.getElementById("photoGallery");
  photogallery.style.display = "block";
  addWork.style.display = "none";
  addWork.innerHTML = "";
}

async function displayAddPicture() {
  const addWork = document.getElementById("addWork");
  const photogallery = document.getElementById("photoGallery");
  photogallery.style.display = "none";
  addWork.style.display = "block";
  addWork.innerHTML = "";

const title = document.createElement("p");
addWork.appendChild(title);
title.textContent = "Ajout photo";
const formulaire2 = document.createElement("div");
addWork.appendChild(formulaire2);
formulaire2.className = "formulaire2";
const form = document.createElement("form");
formulaire2.appendChild(form);
const pictureBackground = document.createElement("div");
pictureBackground.className = "picturebackground";
const addPictureContent = document.createElement("div");
addPictureContent.id = "addPictureContent";
pictureBackground.appendChild(addPictureContent);
const previewImageContent = document.createElement("div");
previewImageContent.id = "previewImageContent";
previewImageContent.display = "none";
pictureBackground.appendChild(previewImageContent);
form.appendChild(pictureBackground);
const spanLogoPicture = document.createElement("span");
spanLogoPicture.id = "logopicture";
addPictureContent.appendChild(spanLogoPicture);
const i = document.createElement("i");
i.className = "fa-regular fa-image";
spanLogoPicture.appendChild(i);
const input = document.createElement("input");
input.type = "file";
input.id = "filebtnpicture";
input.hidden = true;
addPictureContent.appendChild(input);

input.addEventListener("change", function() {
const file = input.files[0];
const previewImage = document.createElement("img");
checkForm();
previewImage.src = window.URL.createObjectURL(file);
previewImageContent.appendChild(previewImage);

addPictureContent.style.display = "none";
previewImageContent.style.display = "block";
});

const buttonAddPicture = document.createElement("button");
buttonAddPicture.id = "addPicture";

buttonAddPicture.textContent = "+ Ajouter photo";
buttonAddPicture.addEventListener("click", function() {
  input.click();
});
const spanErrorPicture = document.createElement("span");
spanErrorPicture.id = "spanErrorPicture";
spanErrorPicture.className = "spanError";
spanErrorPicture.textContent = "Le contenu ne doit pas être vide";
addPictureContent.appendChild(buttonAddPicture);
form.appendChild(spanErrorPicture);
const spanSize = document.createElement("span");
spanSize.id = "size";
spanSize.textContent = "jpg, png : 4mo max";
addPictureContent.appendChild(spanSize);
const h3Title = document.createElement("h3");
h3Title.textContent = "Titre";
form.appendChild(h3Title);
const inputTitle = document.createElement("input");
inputTitle.id = "thetitle";
inputTitle.type = "text";
inputTitle.addEventListener("change", function() {
  checkForm();
});
form.appendChild(inputTitle);
const spanErrorTitle = document.createElement("span");
spanErrorTitle.id = "spanErrorTitle";
spanErrorTitle.className = "spanError";
spanErrorTitle.textContent = "le titre ne doit pas être vide";
form.appendChild(spanErrorTitle);
const h3Category = document.createElement("h3");
h3Category.textContent = "Catégorie";
form.appendChild(h3Category);
const select = document.createElement("select");
select.name = "categorie";
select.id = "choosecategory";
const spanErrorCategory = document.createElement("span");
spanErrorCategory.id = "spanErrorCategory";
spanErrorCategory.className = "spanError";
spanErrorCategory.textContent = "La catégorie ne doit pas être vide";
form.appendChild(select);
form.appendChild(spanErrorCategory);
choosecategory.addEventListener("change", function() {
  checkForm();
})
const optionValue = document.createElement("option");
optionValue.value = "";
optionValue.textContent = "";
select.appendChild(optionValue);

const categories = await getCategories();
categories.forEach((item)=> {
  const id = item["id"];
  const name = item["name"];
  const optionCategorie = document.createElement("option");
  optionCategorie.value = id;
  optionCategorie.textContent = name;
  select.appendChild(optionCategorie);
});

const divLine = document.createElement("div");
divLine.className = "line2";
formulaire2.appendChild(divLine);
const buttonValidation = document.createElement("button");
buttonValidation.disabled = true;
buttonValidation.id = "btnValidation";
buttonValidation.textContent = "Valider";
formulaire2.appendChild(buttonValidation);

buttonValidation.addEventListener("click", function() {
  createProject();
});

  const leftarrow = document.getElementById("leftArrow");
  leftarrow.addEventListener("click", function () {
    photogallery.style.display = "block";
    addWork.style.display = "none";
    addWork.innerHTML = "";
    leftarrow.style.display = "none";
  });
  leftarrow.style.display = "block";
}

async function deleteWorks(idwork) {
    try { 
      const response = await fetch(`http://localhost:5678/api/works/${idwork}`, {
        method: "DELETE",
        headers: { "Authorization": "Bearer "+window.localStorage.getItem("userToken") },
      }); 
      if (response.ok){
          updateWorks("welcome", true);
          updateWorks("modal", true);
      }
      
    } catch (error) {
          throw new Error("suppression impossible");
    }
};

async function updateWorks(type, clear=false) {
  const works = await getWorks();
  const gallerie = document.getElementById("work"); // Récupere l'élément par son ID exemple === <div class="gallery" id="work"></div>
  const pictures = document.getElementById("pictures");
  if (clear==true && type=="modal") {
    pictures.innerHTML="";
  }
  if (clear==true && type=="welcome") {
    gallerie.innerHTML="";
  }
  works.forEach((item)=> {
    const title = item["title"]; // Je récupère le titre de l'élément courant = "JE SUIS UN TITRE"
    const imageUrl = item["imageUrl"]; // Je récupère le lien de l'image de l'élement courant === "http://localhost:5678/MONIMAGE.png"
    let image = document.createElement("img"); // Création de l'élement image === <img />
    image.src = imageUrl; // J'applique la source de l'image === <img src='LA-SOURCE' />
    image.alt = title; // J'applique la source de l'image === <img src='LA-SOURCE'  alt='JE SUIS UNE IMAGE'/>
    if (type=="welcome") {
      let figcaption = document.createElement("figcaption"); // Création de l'élement figcaption === <figcaption></figcaption>
      figcaption.textContent = title;
      let div = document.createElement("figure"); // Création de l'élement figure === <figure></figure>
      div.appendChild(image);
      div.appendChild(figcaption);
      div.dataset.categoryId = item["categoryId"]; // J'applique à figure l'attribut data-category-id
      gallerie.appendChild(div);
    } else if (type=="modal") {
      let div = document.createElement("div"); // Création de l'élement div
      div.classList.add("picture");
      div.appendChild(image);
      let backgroundicon = document.createElement("div"); // Création de l'élément div
      backgroundicon.classList.add("backgroundicon");
      let icontrash = document.createElement("i");
      icontrash.classList.add("fa-solid", "fa-trash-can", "fa-xs");
      div.appendChild(backgroundicon);
      backgroundicon.appendChild(icontrash);
      const idwork = item["id"]; // je récupère l'id de chaque élément
      backgroundicon.addEventListener('click', function() {
          deleteWorks(idwork);
      });
      pictures.appendChild(div);
    } else {
      throw new Error("Mise à jour impossible");
    }
    
  });  
}

function checkForm() {
  const inputTitle = document.getElementById("thetitle");
  const spanErrorTitle = document.getElementById("spanErrorTitle");
  const btnValidation = document.getElementById("btnValidation");
  const chooseCategory = document.getElementById("choosecategory");
  const spanErrorCategory = document.getElementById("spanErrorCategory");
  const filebtnpicture = document.getElementById("filebtnpicture");
  const spanErrorPicture = document.getElementById("spanErrorPicture");
  let errorCount = 0;
  if (inputTitle.value !== "") {
    if (errorCount>0) {
      errorCount-1;
    } 
    spanErrorTitle.style.display = "none";
  } else {
    errorCount++;
    spanErrorTitle.style.display = "block";
  }

if (chooseCategory.value !== "") {
    if (errorCount>0) {
      errorCount-1;
    }
    spanErrorCategory.style.display = "none";
    } else {
      errorCount++;
      spanErrorCategory.style.display = "block";
    }
if (filebtnpicture.value !== "") {
  if (errorCount>0) {
    errorCount-1;
  }
  spanErrorPicture.style.display = "none";
} else {
  errorCount++;
  spanErrorPicture.style.display = "block";
}


  if (errorCount===0) {
    btnValidation.disabled=false;
    btnValidation.className = "btnValidationValid";
  } else {
    btnValidation.disabled=true;
    btnValidation.className = "";
  }
}

async function createProject() {

  const inputTitle = document.getElementById("thetitle").value;
  const chooseCategory = document.getElementById("choosecategory").value;
  const filebtnpicture = document.getElementById("filebtnpicture").files[0];
  const formData = new FormData();
  formData.append("image", filebtnpicture);
  formData.append("title", inputTitle);
  formData.append("category", chooseCategory);

  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: { "Authorization": "Bearer "+window.localStorage.getItem("userToken") },
    body: formData

  }); 

  if (response.status===201) {
    hiddenModal();
    updateWorks("welcome", true)
  } else 
  throw new Error("une erreur est survenue");
}