
/* récupération de l'id du produit sélectionné*/
const getproductId = () => {
    let readId = window.location.search;
    const id = readId.replace("?", "");
    searchCamera (id);
}

/* récupération des données corespondant a l'id récupéré */
const searchCamera = (id) => {
    fetch("http://localhost:3000/api/cameras/" + id)
    .then (response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then (datas => {
        insertElements(datas);
    })   
}

/* fonctions insertion des composants de la page produit */

const insertName = (datas) => {
    document.getElementById("name").textContent = (datas.name);
} 

const insertPicture = (datas) => {
    let picture = document.getElementById("picture")
    let newImg = document.createElement("img");
	newImg.src = datas.imageUrl;
    newImg.width = 203;
    newImg.height = 135;
	newImg.alt = "appareil photo" + (datas.name);
    picture.appendChild(newImg);
}

const insertDescription = (datas) => {
    document.getElementById("description").textContent = (datas.description);
}

const insertPrice = (datas) => {
    document.getElementById("value").textContent = (datas.price) + "€";
}

const insertOption = (datas) => {
    let lenses = datas.lenses;  //on recupère le tableau des lentilles
    for (lens of lenses) {      // boucle qui parcours le tableau des lentilles
        let lensSelect = document.getElementById("lensSelect");  
        let newLens = document.createElement("option");
        newLens.value = lens;
        let option = document.createTextNode(lens);
        newLens.appendChild(option);
        lensSelect.appendChild(newLens);
    }
}

/* insertion des différents éléments */

const insertElements = (datas) => {
    insertName(datas);
    insertPicture(datas);
    insertDescription(datas);
    insertPrice(datas);
    insertOption(datas);
}

/* Fonction Principales */

getproductId();