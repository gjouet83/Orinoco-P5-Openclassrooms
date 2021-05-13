// Création de l'objet pour le formatage du prix
let formatPrice = new Intl.NumberFormat("fr-FR", {
	style: "currency",
	currency: "EUR",
	currencyDisplay: "symbol",
});

/* suppression du boutton de validation quand le panier et vide,
suppression du background panier vide,
récupération des objets du tableau contenant les ids, quantité et choix de l'optique dans le localstorage*/
const getObject = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
        document.getElementById("validateBasket").remove();
    }else {
        let vanishEmptyBasket = document.querySelector(".basket__empty");
        vanishEmptyBasket.style.display = "none";
    }
    for (object of basket) {
        searchCamera(object.id, object.quantity, object.option);
    }
}

// recupération des infos des apn sur le backend
const searchCamera = (id, quantity, option) => {
	fetch("http://localhost:3000/api/cameras/" + id)
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
		})
		.then((datas) => {
			createThumbnails(datas, quantity, option); // on passe les info a la fonction qui appelle les fonctions de création de vignettes
		});
};

/* ---------création des éléments de la vignette---------- */
const createQuantityLabel = () => {  // titre pour la quantité d'apn
    let newQuantityLabel = document.createElement("label");
    let quantityLabel = document.createTextNode("Qté");
    newQuantityLabel.appendChild(quantityLabel);
    newDiv.appendChild(newQuantityLabel);
    newQuantityLabel.classList.add("basket__element__quantityLabel");
}

const createQuantityInput = (object, quantity) => { // champ de saisie de la quantité d'apn
    let newQuantityInput = document.createElement("input");
    newDiv.appendChild(newQuantityInput);
    newQuantityInput.setAttribute("type", "number");
    newQuantityInput.setAttribute("name", "quantity"); 
    newQuantityInput.setAttribute("id", "quantity" + (object._id));
    newQuantityInput.setAttribute("value", (quantity)); 
    newQuantityInput.setAttribute( "min", "1");
    newQuantityInput.setAttribute("requierd", "true");
    newQuantityInput.classList.add("basket__element__quantityInput");
}

const createLensLabel = () => {  // titre pour l'optique
    let newLensLabel = document.createElement("span");
    let lensLabel = document.createTextNode("Optique");
    newLensLabel.appendChild(lensLabel);
    newDiv.appendChild(newLensLabel);
    newLensLabel.classList.add("basket__element__lensLabel"); 
}

const createLens = (option) => {  // optique choisie
    let newLens = document.createElement("span");
    let lens = document.createTextNode(option);
    newLens.appendChild(lens);
    newDiv.appendChild(newLens);
    newLens.classList.add("basket__element__productLens");
}

const createName = (object) => {  // nom de l'apn
	let newName = document.createElement("h2");
    let linkToReturn = document.createElement("a");
	let name = document.createTextNode(object.name);
    linkToReturn.setAttribute("href", "./product.html?"+(object._id));
    newDiv.appendChild(newName);
    newName.appendChild(linkToReturn);
    linkToReturn.appendChild(name);
    newName.classList.add("basket__element__productName");
};

const createPriceLabel = () => { // titre pour le prix de l'apn
    let newPriceLabel = document.createElement("span");
    let priceLabel = document.createTextNode("Prix");
    newPriceLabel.appendChild(priceLabel);
    newDiv.appendChild(newPriceLabel);
    newPriceLabel.classList.add("basket__element__priceLabel"); 
}

const createPrice = (object, quantity) => { // prix de l'apn
	let newPrice = document.createElement("span");
    object.price *= quantity;
	let price = document.createTextNode(formatPrice.format(object.price / 100));
    console.log(quantity);
    newPrice.appendChild(price);
    newDiv.appendChild(newPrice);
    newPrice.classList.add("basket__element__productPrice");   
};

const createProductDelete = (object) => { // boutton de suppression du produit version desktop
    let newProductDelete = document.createElement("button");
    let productDelete = document.createTextNode("Supprimer");
    newProductDelete.appendChild(productDelete);
    newDiv.appendChild(newProductDelete);
    newProductDelete.classList.add("basket__element__productDelete"); 
    newProductDelete.setAttribute("id", "productDelete" + object._id); 
}

const createDeleteIcon = (object) => {  // boutton de suppression du produit version mobile
    let newProductDelete = document.createElement("button");
    let deleteIcon = document.createElement("i");
    newProductDelete.appendChild(deleteIcon);
    newDiv.appendChild(newProductDelete);
    newProductDelete.classList.add("basket__element__productDelete--icon");
    deleteIcon.classList.add("fas");
    deleteIcon.classList.add("fa-trash-alt"); 
    newProductDelete.setAttribute("id", "deleteIcon" + object._id);
}

//création de la vignette avec tous le éléments
const createThumbnails = (object , quantity, option) => {
    createDiv("basket", "basket__element"); // => helpers dom.js
    createQuantityLabel();
    createQuantityInput(object, quantity);
    createPriceLabel();
    createLensLabel();
    createProductDelete(object);
    createDeleteIcon(object);
    createName(object);
    createPrice(object, quantity);
    createLens(option);
    deleteItem(object, option);
};

// augmentation du prix en fonction de la quantité
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
}

//fonction delete 
const deleteItem = (object, option) => {
    document.getElementById("productDelete" + object._id).addEventListener("click", function(){

    })
}

// fonctions principales
updateBasketChip(); // mise a jour de la pastille quantité du panier => basketChip.js
getObject();