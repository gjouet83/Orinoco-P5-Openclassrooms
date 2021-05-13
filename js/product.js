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
const insertName = (datas) => { // nom de l'apn
	document.getElementById("name").textContent = datas.name;
};

const insertPicture = (datas) => {  // photo du produit
	let picture = document.getElementById("picture");
	let newImg = document.createElement("img");
	newImg.src = datas.imageUrl;
	newImg.width = 203;
	newImg.height = 135;
	newImg.alt = "appareil photo" + datas.name;
	picture.appendChild(newImg);
};

const insertDescription = (datas) => { // description du produit
	document.getElementById("description").textContent = datas.description;
};

const insertPrice = (datas) => { // prix du produit
	document.getElementById("value").textContent = formatPrice.format(
		datas.price / 100
	);
};

const insertOption = (datas) => { // optiques
	let lenses = datas.lenses; //on recupère le tableau des optiques
	for (lens of lenses) {// boucle qui parcours le tableau des optiques
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
	document
		.getElementById("lensSelect")
		.addEventListener("change", function () {
			let selectedLens = this.value;
			createObject(datas, selectedLens);
		});
};

// on crée un objet contenant les valeurs indispensables au panier dont l'optique précédemment sélectionnée
const createObject = (datas, selectedLens) => {
	let object = {
		id: datas._id,
		quantity: 1,
		option: selectedLens,
	};
	addToBasket(object); // on passe l'objet a la fonction ajout au panier
};

// Ajout au panier
const addToBasket = (object) => {
	let basket = JSON.parse(localStorage.getItem("basket"));
	document
		.getElementById("addToBasket")
		.addEventListener("click", function () {
			if (!basket) {    //on verifie qu'il n'existe pas de panier
				let basket = []; // on crée un panier
				basket.push(object); // on lui ajoute l'objet
				localStorage.setItem("basket", JSON.stringify(basket)); //on le stocke
			} else {
				basket.push(object);
				localStorage.setItem("basket", JSON.stringify(basket));
				find(basket); // on passe le panier a la fonction de recherche des produits en double
			}
			updateBasketChip(); // mise a jour de la pastille quantité du panier => basketChip.js
		});
};

// fonction de recherche et élimination des doublons. On augmente le produit restant de 1 quantité 
const find = (basket) => {
	for (i = 0; i < basket.length - 1; i++) {
		if (
			basket[basket.length - 1].id === basket[i].id &&
			basket[basket.length - 1].option === basket[i].option /* on compare le dernier produit avec l'avant dernier ainsi que l'optique
																	 pour ne pas additionner des produit avec des optiques différentes */
		) {
			basket[i].quantity++; // on incrémente la quantité du produit trouvé de 1
			basket.pop(); // on supprime le dernier produit
			localStorage.setItem("basket", JSON.stringify(basket)); // on stocke le tableau
		}
	}
};

//Fonctions Principales
updateBasketChip(); // mise a jour de la pastille quantité du panier => basketChip.js
getproductId();
