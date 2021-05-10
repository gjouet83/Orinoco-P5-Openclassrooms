// Création de l'objet pour le formatage du prix
let formatPrice = new Intl.NumberFormat("fr-FR", {
	style: "currency",
	currency: "EUR",
	currencyDisplay: "symbol",
});

//récupération de l'id du produit sélectionné
const getproductId = () => {
	let readId = window.location.search;
	const id = readId.replace("?", "");
	searchCamera(id);
};

// récupération des données corespondant a l'id récupéré
const searchCamera = (id) => {
	fetch("http://localhost:3000/api/cameras/" + id)
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
		})
		.then((datas) => {
			insertElements(datas);
		});
};

//fonctions insertion des composants de la page produit
const insertName = (datas) => {
	document.getElementById("name").textContent = datas.name;
};

const insertPicture = (datas) => {
	let picture = document.getElementById("picture");
	let newImg = document.createElement("img");
	newImg.src = datas.imageUrl;
	newImg.width = 203;
	newImg.height = 135;
	newImg.alt = "appareil photo" + datas.name;
	picture.appendChild(newImg);
};

const insertDescription = (datas) => {
	document.getElementById("description").textContent = datas.description;
};

const insertPrice = (datas) => {
	document.getElementById("value").textContent = formatPrice.format(
		datas.price / 100
	);
};

const insertOption = (datas) => {
	let lenses = datas.lenses; //on recupère le tableau des lentilles
	for (lens of lenses) {// boucle qui parcours le tableau des lentilles
		let lensSelect = document.getElementById("lensSelect");
		let newLens = document.createElement("option");
		newLens.value = lens;
		let option = document.createTextNode(lens);
		newLens.appendChild(option);
		lensSelect.appendChild(newLens);
	}
};

//insertion des différents éléments
const insertElements = (datas) => {
	insertName(datas);
	insertPicture(datas);
	insertDescription(datas);
	insertPrice(datas);
	insertOption(datas);
	getLens(datas);
};

// on enregistre l'optique sélectionnée dans une variable
const getLens = (datas) => {
    document.getElementById("lensSelect").addEventListener("change", function() {
        let selectedLens = this.value;
        createObject(datas, selectedLens);
    });
};

// on crée un objet contenant les valeurs indispensables au panier dont l'optique précédemment sélectionnée
const createObject = (datas, selectedLens) => {
    let object  = {
		objectName: datas.name,
		objectPrice: datas.price / 100,
        objectOption: selectedLens,
		objectQuantity: 1,
	};
	addToBasket(object);
};

// Ajout au panier
const addToBasket = (object) => {
	let basket = JSON.parse(localStorage.getItem("basket"));
	document
		.getElementById("addToBasket")
		.addEventListener("click", function () {
			if (!basket) {//on verifie qu'il n'existe pas de panier
				let basket = []; // on crée un panier
				basket.push(object); // on lui ajoute l'objet
				localStorage.setItem("basket", JSON.stringify(basket)); //on le stocke
				console.log(basket);
			} else {
				basket.push(object);
                for (object of basket) {
                    if (object.objectName === object.objectName && object.objectOption === object.objectOption) {
                        console.log("test");
                    }
                }
				localStorage.setItem("basket", JSON.stringify(basket));
				console.log(basket);
			}
		});
};

//Fonction Principales
getproductId();
