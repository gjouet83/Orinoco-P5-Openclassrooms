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
	createObject(datas);
};

// on crée un objet contenant les valeurs indispensables au panier dont l'optique précédemment sélectionnée
const createObject = (datas) => {
    let object  = {
		objectName: datas.name,
		objectPrice: datas.price / 100,
        objectId: datas._id, 
		objectQuantity: 1,
        totalPrice: datas.price / 100,
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
                localStorage.setItem("quantity" + object.objectId, object.objectQuantity);//on stocke la quantité
                localStorage.setItem("price" + object.objectId, object.objectPrice);//on stocke le prix
				console.log(basket);
			} else {
                let testQuantity = localStorage.getItem("quantity" + object.objectId);
                if (testQuantity) {// on check si une quantité est déjà présente
                    let updateQuantity = localStorage.getItem("quantity" + object.objectId);
                    updateQuantity++;//on ajoute un à la quantité
                    let updatePrice = localStorage.getItem("price" + object.objectId);
                    updatePrice = updateQuantity * object.objectPrice;
                    localStorage.setItem("price" + object.objectId, updatePrice);// on mets a jour la prix
                    localStorage.setItem("quantity" + object.objectId, updateQuantity);// on mets a jour la quantité
                }else {
                    basket.push(object); // on lui ajoute l'objet
                    localStorage.setItem("basket", JSON.stringify(basket)); //on le stocke
                    localStorage.setItem("quantity" + object.objectId, object.objectQuantity);// on mets a jour la prix
                    localStorage.setItem("price" + object.objectId, object.objectPrice);// on mets a jour la quantité
                }
			}
		});
};

//Fonction Principales
getproductId();
