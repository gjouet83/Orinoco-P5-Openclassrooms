// Création de l'objet pour le formatage du prix
let formatPrice = new Intl.NumberFormat("fr-FR", {
	style: "currency",
	currency: "EUR",
	currencyDisplay: "symbol",
});

// récupération des objets du tableau dans le localstorage
const getObject = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    for (object of basket) {
        createThumbnails(object);
    }
}

// création des éléments de la vignette
const createDiv = () => {
	newDiv = document.createElement("div");
	document.getElementById("basket").appendChild(newDiv);
	newDiv.classList.add("basket__element");
};

const createQuantityLabel = (object) => {
    let newQuantityLabel = document.createElement("label");
    let quantityLabel = document.createTextNode("Quantité");
    newQuantityLabel.appendChild(quantityLabel);
    newDiv.appendChild(newQuantityLabel);
    newQuantityLabel.classList.add("basket__element__quantityLabel");
    newQuantityLabel.setAttribute("for", "quantity" + (object.objectId))
}

const createName = (object) => {
	let newName = document.createElement("h2");
	let name = document.createTextNode(object.objectName);
	newName.appendChild(name);
    newDiv.appendChild(newName);
    newName.classList.add("basket__element__productName");
};

const createPriceLabel = () => {
    let newPriceLabel = document.createElement("span");
    let priceLabel = document.createTextNode("Prix");
    newPriceLabel.appendChild(priceLabel);
    newDiv.appendChild(newPriceLabel);
    newPriceLabel.classList.add("basket__element__priceLabel"); 
}

const createPrice = (object) => {
	let newPrice = document.createElement("span");
	let price = document.createTextNode(formatPrice.format(object.objectPrice));
    newPrice.appendChild(price);
    newDiv.appendChild(newPrice);
    newPrice.classList.add("basket__element__productPrice");   
};

const creatProductDelete = () => {
    let newProductDelete = document.createElement("a");
    let productDelete = document.createTextNode("Supprimer");
    newProductDelete.appendChild(productDelete);
    newDiv.appendChild(newProductDelete);
    newProductDelete.classList.add("basket__element__productDelete");
}

//création de la vignette avec tous le éléments
const createThumbnails = (object) => {
    createDiv();
    createQuantityLabel(object);
    createPriceLabel();
    creatProductDelete();
    createName(object);
    createPrice(object);
};

// fonction principale
getObject();
