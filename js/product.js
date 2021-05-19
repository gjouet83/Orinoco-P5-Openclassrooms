

//récupération de l'id du produit sélectionné
const getproductId = () => {
	let readId = window.location.search;
	const id = readId.replace("?", "");
	// récupération des données corespondant a l'id récupéré  => helpers.js getDatas
	getDataById(id).then((datas) => {
		insertElements(datas);
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
	console.log(selectedLens);
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
	document
		.getElementById("addToBasket")
		.addEventListener("click", function () {
			 let object = createObject(datas);
			if (object.option === "NaO") {  // on verifie qu'une optique a bien été sélectionnée
				alert("Veuillez selectionner une optique");
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
			let appearChoice = document.querySelector(".choice"); // on choisi la div choice
			appearChoice.style.transform = "scale(1)"; // on la fait apparaitre avec u transistion
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
			basket[i].price = basket[i].price / basket[i].quantity + basket[i].price; // on calcul le nouveau prix
			basket[i].quantity++; // on incrémente la quantité du produit trouvé de 1
			basket.pop(); // on supprime le dernier produit
			localStorage.setItem("basket", JSON.stringify(basket)); // on stocke le tableau
		}
	}
};

//Fonctions Principales
updateBasketChip(); // mise a jour de la pastille quantité du panier => basketChip.js
getproductId();
