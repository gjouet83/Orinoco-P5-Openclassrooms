// Création de l'objet pour le formatage du prix
let formatPrice = new Intl.NumberFormat("fr-FR", {
	style: "currency",
	currency: "EUR",
	currencyDisplay: "symbol",
});

// récupération des objets du tableau dans le localstorage
const getObject = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
        console.log("vide");
    }else {
        for (object of basket) {
            createThumbnails(object);
        }
    }
}

// création des éléments de la vignette
const createQuantityLabel = (object) => {
    let newQuantityLabel = document.createElement("label");
    let quantityLabel = document.createTextNode("Quantité");
    newQuantityLabel.appendChild(quantityLabel);
    newDiv.appendChild(newQuantityLabel);
    newQuantityLabel.classList.add("basket__element__quantityLabel");
    newQuantityLabel.setAttribute("for", "quantity" + (object.id))
}

const creatQuantityInput = (object) => {
    let newQuantityInput = document.createElement("input");
    newDiv.appendChild(newQuantityInput);
    newQuantityInput.setAttribute("type", "number");
    newQuantityInput.setAttribute("name", "quantity"); 
    newQuantityInput.setAttribute("id", "quantity" + (object.id));
    newQuantityInput.setAttribute("value", (localStorage.getItem("quantity" + object.id))); 
    newQuantityInput.setAttribute( "min", "1");
    newQuantityInput.setAttribute("requierd", "true");
    newQuantityInput.classList.add("basket__element__quantityInput");
}

const createName = (object) => {
	let newName = document.createElement("h2");
    let linkToReturn = document.createElement("a");
	let name = document.createTextNode(object.name);
    linkToReturn.setAttribute("href", "./product.html?"+(object.id));
    newDiv.appendChild(newName);
    newName.appendChild(linkToReturn);
    linkToReturn.appendChild(name);
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
    newDiv.appendChild(newPrice);
    newPrice.setAttribute("id", "price" + object.id)
    newPrice.classList.add("basket__element__productPrice"); 
    document.getElementById("price" + object.id).textContent = formatPrice.format(localStorage.getItem("price" + object.id)); 
};

const createProductDelete = () => {
    let newProductDelete = document.createElement("a");
    let productDelete = document.createTextNode("Supprimer");
    newProductDelete.appendChild(productDelete);
    newDiv.appendChild(newProductDelete);
    newProductDelete.classList.add("basket__element__productDelete");
    newProductDelete.setAttribute("href" , "#");
    newProductDelete.setAttribute("id", "basketDelete");
}

//création de la vignette avec tous le éléments
const createThumbnails = (object) => {
    createDiv("basket","basket__element");
    createName(object);
    createQuantityLabel(object);
    creatQuantityInput(object);
    createPriceLabel();
    createPrice(object);
    createProductDelete();
    majPrice(object);
};

// augmentation du prix en fonction de la quantité
const majPrice = (object) => {
    document.getElementById("quantity" + (object.id)).addEventListener("change", function(){
        object.quantity = this.value;
        localStorage.setItem("quantity" + object.id, object.quantity);
        let majQuantity = localStorage.getItem("quantity" + object.id);
        let majPrice = localStorage.getItem("price" + object.id);
        majPrice = majQuantity * object.price;
        localStorage.setItem("price" + object.id, majPrice);
        createPrice(object);
    })
}

//fonction delete 

// fonction principale
getObject();
