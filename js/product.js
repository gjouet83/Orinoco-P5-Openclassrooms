//récupération de l'id du produit sélectionné
const getproductId = () => {
	let readId = window.location.search;
	const id = readId.replace("?", "");
	// récupération des données corespondant a l'id récupéré
	fetch("http://localhost:3000/api/cameras/" + id)
	.then((response) => {
		if (response.ok) {
			return response.json();
		}
	})
	.then((datas) => {
		insertElements(datas);
	})
	.catch((error) => { 
		alert("Erreur : " + error);
	});
};

//fonctions insertion des composants de la page produit
// nom de l'apn
const insertName = (datas) => {
	document.getElementById("name").textContent = datas.name;
};

// photo du produit
const insertPicture = (datas) => {
	let picture = document.getElementById("picture");
	let newImg = document.createElement("img");
	newImg.src = datas.imageUrl;
	newImg.width = 203;
	newImg.height = 135;
	newImg.alt = "appareil photo" + datas.name;
	picture.appendChild(newImg);
};

// description du produit
const insertDescription = (datas) => {
	document.getElementById("description").textContent = datas.description;
};

// prix du produit
const insertPrice = (datas) => {
	document.getElementById("value").textContent = formatPrice.format(
		datas.price / 100
	);
};

// optiques
const insertOption = (datas) => {
	let lenses = datas.lenses; //on recupère le tableau des optiques
	// boucle qui parcours le tableau des optiques
	for (lens of lenses) {
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
	addToBasket(datas);
};

// on retourne l'optique sélectionnée
const getLens = () => {
	let selectedElement = document.getElementById("lensSelect");
	let selectedLens = selectedElement.options[selectedElement.selectedIndex].value;
	return selectedLens;
};

// on crée un objet contenant les valeurs indispensables au panier dont l'optique précédemment sélectionnée
const createObject = (datas) => {
	let selectedLens = getLens();
	let object = {
		id: datas._id,
		name: datas.name,
		quantity: 1,
		option: selectedLens,
		price: datas.price,
	};
	return object; 
};

// Ajout au panier
const addToBasket = (datas) => {
	updateBasketChip(); // mise a jour de la pastille quantité du panier => basketChip.js
	document
		.getElementById("addToBasket")
		.addEventListener("click", () => {
			 let object = createObject(datas);
			if (object.option === "") {  // on verifie qu'une optique a bien été sélectionnée
				document.querySelector(".lensAlert").classList.replace("lensAlert","popupAppear"); // on choisi la div choice
				document.querySelector(".lensAlert__validate").addEventListener("click", () => {
					location.reload();
				});
				return;
			}
			if (!JSON.parse(localStorage.getItem("basket"))) {  	//on verifie qu'il n'existe pas de panier
				let basket = [];
				localStorage.setItem("basket", JSON.stringify(basket));
			}
			basket = JSON.parse(localStorage.getItem("basket"));
			basket.push(object);
			localStorage.setItem("basket", JSON.stringify(basket));
			find(basket); // on passe le panier a la fonction de recherche des produits en double
			updateBasketChip(); // mise a jour de la pastille quantité du panier => basketChip.js
			document.querySelector(".choice").classList.replace("choice","popupAppear"); // on choisi la div choice
		});
};

// fonction de recherche et élimination des doublons. On augmente le produit restant de 1 quantité
const find = (basket) => {
	for (i = 0; i < basket.length - 1; i++) {
		/* on compare le dernier produit avec l'avant dernier ainsi que l'optique
		pour ne pas additionner des produit avec des optiques différentes */
		if (
			basket[basket.length - 1].id === basket[i].id &&
			basket[basket.length - 1].option ===basket[i].option 
		) {
			 // on calcul le nouveau prix
			basket[i].quantity++; // on incrémente la quantité du produit trouvé de 1
			basket.pop(); // on supprime le dernier produit
			localStorage.setItem("basket", JSON.stringify(basket)); // on stocke le tableau
		}
	}
};

//Fonctions Principales
getproductId();
