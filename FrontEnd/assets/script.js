async function getWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (response.ok) {
      const works = await response.json();
      return works;
    }
  } catch (error) {}
}

async function getCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    if (response.ok) {
      const categories = await response.json();
      return categories;
    }
  } catch (error) {}
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

if (getUserToken() !== null) {
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
  editMode.style.display = "flex";
}

function logOut() {
  if (getUserToken() !== null) {
    window.localStorage.removeItem("userToken");
    const logout = document.getElementById("logout");
    logout.style.display = "none";
    const login = document.getElementById("login");
    login.style.display = "block";
    const modif = document.getElementById("modif");
    modif.style.display = "none";

    const editMode = document.getElementById("editMode");
    editMode.style.display = "none";
  }
}

async function displayModal() {
  const idmodal = document.getElementById("modal");
  showOrNot(idmodal, true);
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
  idmodal
    .querySelector(".modalcontent")
    .addEventListener("click", stopPropagation);

  const btnaddpicture = document.getElementById("btnAddPicture");
  btnaddpicture.addEventListener("click", function () {
    displayAddPicture();
  });

  const leftarrow = document.getElementById("leftArrow");
  showOrNot(leftarrow, false);
}

function hiddenModal() {
  const idmodal = document.getElementById("modal");
  const pictures = document.getElementById("pictures");
  showOrNot(idmodal, false);
  pictures.innerHTML = "";

  const addWork = document.getElementById("addWork");
  const photogallery = document.getElementById("photoGallery");
  showOrNot(photogallery, true);
  showOrNot(addWork, false);
  addWork.innerHTML = "";
}

async function displayAddPicture() {
  const addWork = document.getElementById("addWork");
  const photogallery = document.getElementById("photoGallery");
  const title = document.createElement("p");
  const addWorkContent = document.createElement("div");
  const form = document.createElement("form");
  const h3Title = document.createElement("h3");
  const spanErrorTitle = document.createElement("span");
  const inputTitle = document.createElement("input");
  const h3Category = document.createElement("h3");
  const divLine = document.createElement("div");
  const buttonValidation = document.createElement("button");
  const leftarrow = document.getElementById("leftArrow");

  showOrNot(photogallery, false);
  showOrNot(addWork, true);
  addWork.innerHTML = "";

  title.textContent = "Ajout photo";
  addWorkContent.className = "addWorkContent";
  h3Title.textContent = "Titre";
  inputTitle.id = "thetitle";
  inputTitle.type = "text";
  spanErrorTitle.id = "spanErrorTitle";
  spanErrorTitle.className = "spanError";
  spanErrorTitle.textContent = "le titre ne doit pas être vide";
  h3Category.textContent = "Catégorie";
  divLine.className = "line2";
  buttonValidation.disabled = true;
  buttonValidation.id = "btnValidation";
  buttonValidation.textContent = "Valider";

  inputTitle.addEventListener("change", function () {
    checkForm();
  });

  buttonValidation.addEventListener("click", function () {
    createProject();
  });

  leftarrow.addEventListener("click", function () {
    showOrNot(photogallery, true);
    showOrNot(addWork, false);
    addWork.innerHTML = "";
    showOrNot(leftarrow, false);
  });
  showOrNot(leftarrow, true);

  addWork.appendChild(title);
  addWork.appendChild(addWorkContent);
  addWorkContent.appendChild(form);

  creaPicture(form);

  form.appendChild(h3Title);
  form.appendChild(inputTitle);
  form.appendChild(spanErrorTitle);
  form.appendChild(h3Category);

  createFormCategory(form);

  addWorkContent.appendChild(divLine);
  addWorkContent.appendChild(buttonValidation);
}

async function deleteWorks(idwork) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${idwork}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + getUserToken(),
      },
    });
    if (response.ok) {
      updateWorks("welcome", true);
      updateWorks("modal", true);
    }
  } catch (error) {
    throw new Error("suppression impossible");
  }
}

async function updateWorks(type, clear = false) {
  const works = await getWorks();
  const gallerie = document.getElementById("work"); // Récupere l'élément par son ID exemple === <div class="gallery" id="work"></div>
  const pictures = document.getElementById("pictures");
  if (clear == true && type == "modal") {
    pictures.innerHTML = "";
  }
  if (clear == true && type == "welcome") {
    gallerie.innerHTML = "";
  }
  works.forEach((item) => {
    const title = item["title"]; // Je récupère le titre de l'élément courant = "JE SUIS UN TITRE"
    const imageUrl = item["imageUrl"]; // Je récupère le lien de l'image de l'élement courant === "http://localhost:5678/MONIMAGE.png"
    let image = document.createElement("img"); // Création de l'élement image === <img />
    image.src = imageUrl; // J'applique la source de l'image === <img src='LA-SOURCE' />
    image.alt = title; // J'applique la source de l'image === <img src='LA-SOURCE'  alt='JE SUIS UNE IMAGE'/>
    if (type == "welcome") {
      let figcaption = document.createElement("figcaption"); // Création de l'élement figcaption === <figcaption></figcaption>
      figcaption.textContent = title;
      let div = document.createElement("figure"); // Création de l'élement figure === <figure></figure>
      div.appendChild(image);
      div.appendChild(figcaption);
      div.dataset.categoryId = item["categoryId"]; // J'applique à figure l'attribut data-category-id
      gallerie.appendChild(div);
    } else if (type == "modal") {
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
      backgroundicon.addEventListener("click", function () {
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
    if (errorCount > 0) {
      errorCount - 1;
    }
    showOrNot(spanErrorTitle, false);
  } else {
    errorCount++;
    showOrNot(spanErrorTitle, true);
  }

  if (chooseCategory.value !== "") {
    if (errorCount > 0) {
      errorCount - 1;
    }
    showOrNot(spanErrorCategory, false);
  } else {
    errorCount++;
    showOrNot(spanErrorCategory, true);
  }
  if (filebtnpicture.value !== "") {
    if (errorCount > 0) {
      errorCount - 1;
    }
    showOrNot(spanErrorPicture, false);
  } else {
    errorCount++;
    showOrNot(spanErrorPicture, true);
  }

  if (errorCount === 0) {
    btnValidation.disabled = false;
    btnValidation.className = "btnValidationValid";
  } else {
    btnValidation.disabled = true;
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

  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + getUserToken(),
      },
      body: formData,
    });

    if (response.ok) {
      hiddenModal();
      updateWorks("welcome", true);
    }
  } catch (error) {
    throw new Error("une erreur est survenue");
  }
}

function showOrNot(element, show) {
  if (show) {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

function getUserToken() {
  const userToken = window.localStorage.getItem("userToken");
  if (userToken !== null) {
    return userToken;
  } else {
    return null;
  }
}

function creaPicture(form) {
  const pictureBackground = document.createElement("div");
  const addPictureContent = document.createElement("div");
  const previewImageContent = document.createElement("div");
  const spanLogoPicture = document.createElement("span");
  const iconPlus = document.createElement("i");
  const inputPicture = document.createElement("input");
  const buttonAddPicture = document.createElement("button");
  const spanErrorPicture = document.createElement("span");
  const spanSize = document.createElement("span");

  pictureBackground.className = "picturebackground";
  addPictureContent.id = "addPictureContent";
  previewImageContent.id = "previewImageContent";
  spanLogoPicture.id = "logopicture";
  iconPlus.className = "fa-regular fa-image";
  inputPicture.type = "file";
  inputPicture.id = "filebtnpicture";
  inputPicture.hidden = true;
  buttonAddPicture.id = "addPicture";
  buttonAddPicture.textContent = "+ Ajouter photo";
  spanErrorPicture.id = "spanErrorPicture";
  spanErrorPicture.className = "spanError";
  spanErrorPicture.textContent = "Le contenu ne doit pas être vide";
  spanSize.id = "size";
  spanSize.textContent = "jpg, png : 4mo max";

  showOrNot(previewImageContent, false);

  inputPicture.addEventListener("change", function () {
    const file = inputPicture.files[0];
    const previewImage = document.createElement("img");
    checkForm();
    previewImage.src = window.URL.createObjectURL(file);
    previewImageContent.appendChild(previewImage);

    showOrNot(addPictureContent, false);
    showOrNot(previewImageContent, true);
  });

  buttonAddPicture.addEventListener("click", function () {
    inputPicture.click();
  });

  pictureBackground.appendChild(addPictureContent);
  pictureBackground.appendChild(previewImageContent);
  addPictureContent.appendChild(spanLogoPicture);
  spanLogoPicture.appendChild(iconPlus);
  addPictureContent.appendChild(inputPicture);
  addPictureContent.appendChild(buttonAddPicture);
  addPictureContent.appendChild(spanSize);
  form.appendChild(pictureBackground);
  form.appendChild(spanErrorPicture);
}

async function createFormCategory(form) {
  const selectCategory = document.createElement("select");
  const spanErrorCategory = document.createElement("span");
  const optionDefaultValue = document.createElement("option");
  const categories = await getCategories();

  selectCategory.name = "categorie";
  selectCategory.id = "choosecategory";
  optionDefaultValue.value = "";
  optionDefaultValue.textContent = "";
  optionDefaultValue.selected = true;
  spanErrorCategory.id = "spanErrorCategory";
  spanErrorCategory.className = "spanError";
  spanErrorCategory.textContent = "La catégorie ne doit pas être vide";

  categories.forEach((item) => {
    const id = item["id"];
    const name = item["name"];
    const optionCategorie = document.createElement("option");
    optionCategorie.value = id;
    optionCategorie.textContent = name;
    selectCategory.appendChild(optionCategorie);
  });

  selectCategory.addEventListener("change", function () {
    checkForm();
  });

  selectCategory.appendChild(optionDefaultValue);
  form.appendChild(selectCategory);
  form.appendChild(spanErrorCategory);
}
