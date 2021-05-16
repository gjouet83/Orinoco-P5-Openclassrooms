// déclarations des variables
let basket = JSON.parse(localStorage.getItem("basket"));
let totalPrice = 0;

// nom de l'apn
const createName = (object) => {
	let newName = document.createElement("h3");
	let linkToReturn = document.createElement("a");
	let name = document.createTextNode(object.name);
	linkToReturn.setAttribute("href", "./product.html?" + object.id);
	newDiv.appendChild(newName);
	newName.appendChild(linkToReturn);
	linkToReturn.appendChild(name);
	newName.classList.add("basket__element__productName");
};

// boutton de suppression du produit version mobile
const createDeleteIcon = () => {
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
    createNewForm();  // helper dom.js
    // createInputForm ("type","nom du label","type", "id de l'input et for pour label")
    createInputForm ("label","Nom","input","lastName"); // helper dom.js
    createInputForm ("label","Prénom","input","firstName"); // helper dom.js
    createInputForm ("label","Adresse","input","adress"); // helper dom.js
    createInputForm ("label","Ville","input","city"); // helper dom.js
    createInputForm ("label","E-mail","input","email"); // helper dom.js
    // createValidateButton ("class pour getElement","class a ajouter a l'input", "texte", "nom")
    createValidateButton(".form__order","form__order__validate","Commander","validateForm"); // helper dom.js
}

//création de la vignette avec tous le éléments
//createArea =>  helper dom.js
const createThumbnails = () => {
	for (object of basket) {
        // creatDiv ("type","id pour getElement", "class a ajouter")
		createDiv("div","basket", "basket__element"); // => helpers dom.js
        // createArea ("type","texte a ajoute","class")ajoute a la div nouvellement créer
		createArea ("label", "Qté", "basket__element__quantityLabel"); // titre pour la quantité d'apn
        createArea ("span",object.quantity,"basket__element__quantity"); // quantité d'un meme produit avec la meme option
		createArea ("span","Prix","basket__element__priceLabel"); // titre pour le prix de l'apn
		createArea ("span","Optique","basket__element__lensLabel"); // titre pour l'optique
		createArea ("button","Supprimer","basket__element__productDelete"); //product delete non cree // boutton de suppression du produit version desktop
		createDeleteIcon(object);
		createName(object);
		createArea ("span",formatPrice.format(object.price / 100),"basket__element__productPrice"); // prix de l'apn
		createArea ("span",object.option,"basket__element__productLens"); // optique choisie;
        deleteProduct();
	}
};

// création du récap du panier
const createRecap = (basket) => {
    // creatDiv ("type","id pour getElement", "class a ajouter" et id, "titre")
    createTitle ("h2","recap","recap__title","Récapitulatif de votre panier");
    // creatDiv ("type","id pour getElement", "class a ajouter")
    createDiv("div","recap","recap__element");
    // createArea ("type","texte a ajoute","class") ajoute a la div nouvellement créer
    createArea ("span","Nombre d'article(s)","recap__element__basketLabel")
    createArea ("span","PRIX TOTAL","recap__element__totalLabel")
    createArea ("span",updateBasketChip(),"recap__element__basketQuantity")
    calculateTotalPrice(basket);
    createArea ("span",(formatPrice.format(totalPrice / 100)),"recap__element__totalPrice")
}

//fonction delete
const deleteProduct = () => {
	let deleteItem = document.querySelectorAll(
		".basket__element__productDelete--icon"
	);
	console.log(deleteItem.length);
	for (i = 0; i < deleteItem.lenght; i++) {
		console.log(i);
		console.log(document
			.querySelectorAll(".basket__element__productDelete--icon")
			.addEventListener("click", function () {
            }));
	}
};

// fonction calcul prix total 
const calculateTotalPrice = (basket) => {
    for (object of basket) {
        console.log(basket);
        totalPrice += (object.price * object.quantity);
    }
}

// fonction principale d'affiche
const displayObject = () => {
	if (basket) {
        // suppression du background panier vide
		let vanishEmptyBasket = document.querySelector(".emptyBasket");
		vanishEmptyBasket.style.display = "none";
        // création du titre de la section basket
        // createTitle ("type","id pour getElement", "class a ajouter" et id, "titre")
        createTitle ("h2","basket","basket__title","--Orinoco-- Votre Panier ");
        // création des vignettes
        createThumbnails();
        //création du recap du panier
        createRecap(basket) // helpers dom.js
        // création du boutton de validation du panier
        createValidateButton(".recap","basket__validate","Valider mon panier","validateBasket"); // helper dom.js
         // ecoute du boutton valider pour affichage du formulaire
        document.getElementById("validateBasket").addEventListener("click",() => {
        createFormOrder();
        })
	}
};

// appel des fonctions principales
updateBasketChip(); // mise a jour de la pastille quantité du panier => basketChip.js
displayObject();
