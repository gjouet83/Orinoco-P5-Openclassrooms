// déclarations des variables
let basket = JSON.parse(localStorage.getItem("basket"));

/* suppression du boutton de validation quand le panier et vide,
suppression du background panier vide,
récupération des objets du tableau contenant les ids, quantité et choix de l'optique dans le localstorage*/
const getObject = () => {
	if (!basket) {
		document.getElementById("validateBasket").remove();
		return;
	} else {
		let vanishEmptyBasket = document.querySelector(".basket__empty");
		vanishEmptyBasket.style.display = "none";
	}
	createThumbnails();
};

/* ---------création des éléments de la vignette---------- */
// titre pour la quantité d'apn
const createQuantityLabel = () => {
	let newQuantityLabel = document.createElement("label");
	let quantityLabel = document.createTextNode("Qté");
	newQuantityLabel.appendChild(quantityLabel);
	newDiv.appendChild(newQuantityLabel);
	newQuantityLabel.classList.add("basket__element__quantityLabel");
};

// quantité d'un meme produit avec la meme option
const createQuantity = (object) => {
	let newQuantity = document.createElement("span");
	let quantity = document.createTextNode(object.quantity);
	newQuantity.appendChild(quantity);
	newDiv.appendChild(newQuantity);
	newQuantity.classList.add("basket__element__quantity");
};

// titre pour l'optique
const createLensLabel = () => {
	let newLensLabel = document.createElement("span");
	let lensLabel = document.createTextNode("Optique");
	newLensLabel.appendChild(lensLabel);
	newDiv.appendChild(newLensLabel);
	newLensLabel.classList.add("basket__element__lensLabel");
};

// optique choisie
const createLens = (object) => {
	let newLens = document.createElement("span");
	let lens = document.createTextNode(object.option);
	newLens.appendChild(lens);
	newDiv.appendChild(newLens);
	newLens.classList.add("basket__element__productLens");
};

// nom de l'apn
const createName = (object) => {
	let newName = document.createElement("h2");
	let linkToReturn = document.createElement("a");
	let name = document.createTextNode(object.name);
	linkToReturn.setAttribute("href", "./product.html?" + object.id);
	newDiv.appendChild(newName);
	newName.appendChild(linkToReturn);
	linkToReturn.appendChild(name);
	newName.classList.add("basket__element__productName");
};

// titre pour le prix de l'apn
const createPriceLabel = () => {
	let newPriceLabel = document.createElement("span");
	let priceLabel = document.createTextNode("Prix");
	newPriceLabel.appendChild(priceLabel);
	newDiv.appendChild(newPriceLabel);
	newPriceLabel.classList.add("basket__element__priceLabel");
};

// prix de l'apn
const createPrice = (object) => {
	let newPrice = document.createElement("span");
	let price = document.createTextNode(formatPrice.format(object.price / 100));
	newPrice.appendChild(price);
	newDiv.appendChild(newPrice);
	newPrice.classList.add("basket__element__productPrice");
};

// boutton de suppression du produit version desktop
const createProductDelete = (object) => {
	let newProductDelete = document.createElement("button");
	let productDelete = document.createTextNode("Supprimer");
	newProductDelete.appendChild(productDelete);
	newDiv.appendChild(newProductDelete);
	newProductDelete.classList.add("basket__element__productDelete");
};

// boutton de suppression du produit version mobile
const createDeleteIcon = (object) => {
	let newProductDelete = document.createElement("button");
	let deleteIcon = document.createElement("i");
	newProductDelete.appendChild(deleteIcon);
	newDiv.appendChild(newProductDelete);
	newProductDelete.classList.add("basket__element__productDelete--icon");
	deleteIcon.classList.add("fas");
	deleteIcon.classList.add("fa-trash-alt");
};

//création de la vignette avec tous le éléments
const createThumbnails = () => {
	for (object of basket) {
		createDiv("basket", "basket__element"); // => helpers dom.js
		createQuantityLabel();
		createQuantity(object);
		createPriceLabel();
		createLensLabel();
		createProductDelete(object);
		createDeleteIcon(object);
		createName(object);
		createPrice(object);
		createLens(object);
		deleteProduct();
	}
};

/* augmentation du prix en fonction de la quantité
const majPrice = (object) => {
    document.getElementById("quantity" + (object.id)).addEventListener("change", function(){
        object.quantity = this.value;
        localStorage.getItem("basket");
        let majQuantity = localStorage.getItem("quantity" + object.id);
        let majPrice = localStorage.getItem("price" + object.id);
        majPrice = majQuantity * object.price;
        localStorage.setItem("price" + object.id, majPrice);
        createPrice(object);
    })
}*/

//fonction delete
const deleteProduct = () => {
	let deleteItem = document.querySelectorAll(
		".basket__element__productDelete--icon"
	);
	console.log(deleteItem.length);
	for (i = 0; i < deleteItem.lenght; i++) {
		console.log(i);
		document
			.querySelectorAll(".basket__element__productDelete--icon")
			.addEventListener("click", function () {});
	}
};

// fonctions principales
updateBasketChip(); // mise a jour de la pastille quantité du panier => basketChip.js
getObject();
