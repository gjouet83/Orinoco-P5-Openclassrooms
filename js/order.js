// declaration des variables
let basket = JSON.parse(localStorage.getItem("basket"));
let contact = JSON.parse(localStorage.getItem("contact"));
let products = [];
let totalPrice = 0;

// création du tableau avec les id des produits
const basketToSend = () => {
	for (object of basket) {
		for (i = 1; i <= object.quantity; i++) {
			products.push(object.id);
		}
	}
};

// envoie des infos contact et produits au serveur
const sendOrder = () => {
	basketToSend();
	fetch("http://localhost:3000/api/cameras/order", {
		method: "POST",
		body: JSON.stringify({ contact, products }),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
		})
		.then((order) => {
			displayOrder(order);
		});
};

// création du block pour l'affichage de la commande
const displayOrderId = (order) => {
	document.getElementById("displayOrderId").textContent =
		"Commande n°" + order.orderId;
};

// on ajoute le nom du client
const displayCustumerName = (order) => {
	document.querySelector(".displayOrder__name").textContent =
		"MERCI! " + order.contact.firstName;
};

//création de la vignette avec tous le éléments
//createArea =>  helper dom.js
const createThumbnails = () => {
	for (object of basket) {
		// creatDiv ("type","id pour getElement", "class a ajouter")
		createDiv("div", "displayOrder", "displayOrder__element"); // => helpers dom.js
		// createArea ("type","texte a ajoute","class")ajoute a la div nouvellement créer
		createArea("label", "Qté", "displayOrder__element__quantityLabel"); // titre pour la quantité d'apn
		createArea("span", object.quantity, "displayOrder__element__quantity"); // quantité d'un meme produit avec la meme option
		createArea("span", "Optique", "displayOrder__element__lensLabel"); // titre pour l'optique
		createName(object, "displayOrder__element__productName");
		createArea("span", object.option, "displayOrder__element__productLens"); // optique choisie;
	}
};

// création du récap du prix total de la commande
const createRecapOrder = (order) => {
	// creatDiv ("type","id pour getElement", "class a ajouter")
	createDiv("div", "displayOrder", "displayOrder__recap");
	createArea("span","MONTANT TOTAL DE LA COMMANDE","displayOrder__recap__label");
	calculateTotalPrice(order.products);
	createArea("span",formatPrice.format(totalPrice / 100),"displayOrder__recap__totalPrice");
};

// fonction principale
const displayOrder = (order) => {
	displayCustumerName(order); 
	displayOrderId(order);
	createRecapOrder(order);
	createThumbnails();
	createButton(".displayOrder", "displayOrder__btn","button","Terminer","Terminer");
	localStorage.clear();
	document
		.querySelector(".displayOrder__btn")
		.addEventListener("click", () => {
			document.location.href = "index.html";
		});
};

// appel de la fonction principale
sendOrder();
