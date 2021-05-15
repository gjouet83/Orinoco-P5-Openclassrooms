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

// création du formulaire de commande

const createFormOrder = () => {
    let form = document.getElementById("form");
    let newForm = document.createElement("form");
    let newFirstNameLabel = document.createElement("label");
    let firstNameLabel = document.createTextNode("Prénom");
    let firstName = document.createElement("input");
    let lastName = document.createElement("input");
    let newLastNameLabel = document.createElement("label");
    let lastNameLabel = document.createTextNode("Nom");
    let email = document.createElement("input");
    let newEmailLabel = document.createElement("label");
    let emailLabel = document.createTextNode("E-mail");
    let adress = document.createElement("input");
    let newAdressLabel = document.createElement("label");
    let adressLabel = document.createTextNode("Adresse");
    let city = document.createElement("input");
    let newCityLabel = document.createElement("label");
    let cityLabel = document.createTextNode("Ville");
    form.appendChild(newForm);
    newForm.appendChild(newFirstNameLabel);
    newFirstNameLabel.appendChild(firstNameLabel);
    newForm.appendChild(firstName);
    newForm.appendChild(newLastNameLabel);
    newLastNameLabel.appendChild(lastNameLabel);
    newForm.appendChild(lastName);
    newForm.appendChild(newEmailLabel);
    newEmailLabel.appendChild(emailLabel);
    newForm.appendChild(email);
    newForm.appendChild(newAdressLabel);
    newAdressLabel.appendChild(adressLabel);
    newForm.appendChild(adress);
    newForm.appendChild(newCityLabel);
    newCityLabel.appendChild(cityLabel);
    newForm.appendChild(city);
    
}

//création de la vignette avec tous le éléments
//createArea => dom.js
const createThumbnails = () => {
	for (object of basket) {
		createDiv("basket", "basket__element"); // => helpers dom.js
		createArea ("label", "Qté", "basket__element__quantityLabel"); // titre pour la quantité d'apn
        createArea ("span",object.quantity,"basket__element__quantity"); // quantité d'un meme produit avec la meme option
		createArea ("span","Prix","basket__element__priceLabel"); // titre pour le prix de l'apn
		createArea ("span","Optique","basket__element__lensLabel"); // titre pour l'optique
		createArea ("button","Supprimer","basket__element__productDelete"); //product delete non cree // boutton de suppression du produit version desktop
		createDeleteIcon(object);
		createName(object);
		createArea ("span",formatPrice.format(object.price / 100),"basket__element__productPrice"); // prix de l'apn
		createArea ("span",object.option,"basket__element__productLens"); // optique choisie
		deleteProduct();
	}
};

document.getElementById("validateBasket").addEventListener("click",() => {
    createFormOrder();
})

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
