// déclarations des variables
let basket = JSON.parse(localStorage.getItem("basket"));
let totalPrice = 0;
let deleteId = 0;

// boutton de suppression du produit
const createDeleteIcon = () => {
	let newProductDelete = document.createElement("button");
	let deleteIcon = document.createElement("i");
	newProductDelete.appendChild(deleteIcon);
	newDiv.appendChild(newProductDelete);
	newProductDelete.classList.add("basket__element__productDelete--icon");
	deleteIcon.classList.add("fas");
	deleteIcon.classList.add("fa-trash-alt");
    newProductDelete.setAttribute("id", deleteId);
    deleteId++;
};

//fonction creation de la liste des boutton supprimer
const btnDeleteList = () => {
	let deleteBtn = document.querySelectorAll(
		".basket__element__productDelete--icon"
	);
    deleteBtn.forEach(function(item){
        deleteProduct(item); // on récupère chaque item de la liste et on les passent a la fonction deleteProduct
    })
};

// fonction  suppression d'élements
const deleteProduct = (item) => {
    item.addEventListener("click", () => {
        basket.splice(item.id, 1);
        localStorage.setItem("basket", JSON.stringify(basket));
        if (basket.length === 0) {
            localStorage.clear();
        }
        location.reload();
    })
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
		createArea ("span","Prix Total","basket__element__priceLabel"); // titre pour le prix total de l'apn
		createArea ("span","Prix Unitaire","basket__element__priceUnitLabel"); // titre prix unitaire
        createArea ("span","Optique","basket__element__lensLabel"); // titre pour l'optique
		createDeleteIcon(object);
		createName(object, "basket__element__productName");
		createArea ("span",formatPrice.format(object.price / 100),"basket__element__productUnitPrice");
        createArea ("span",formatPrice.format((object.price / 100) * object.quantity),"basket__element__productPrice"); // prix de l'apn
		createArea ("span",object.option,"basket__element__productLens"); // optique choisie;
	}
};

// fonction calcul prix total 
const calculateTotalPrice = (basket) => {
    for (object of basket) {
        console.log(basket);
        totalPrice += (object.price * object.quantity);
    }
}

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
    createArea ("span",formatPrice.format(totalPrice / 100),"recap__element__totalPrice")
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
        createButton(".recap","basket__validate","Valider mon panier","validateBasket"); // helper dom.js
        // création du boutton vider du panier
        createButton(".recap","basket__empty","VIDER mon panier","emptyBasket"); // helper dom.js
        // ecoute du boutton vider le panier 
        document.getElementById("emptyBasket").addEventListener("click",() => {
            localStorage.clear(); // on vide le localstorage
            location.reload(); // rafraichir la page pour enlever les elements
        });
        // ecoute du boutton valider pour affichage du formulaire
        document.getElementById("validateBasket").addEventListener("click",() => {
            createFormOrder();
        });        
	}
};

// création du formulaire de commande
const createFormOrder = () => {
    createNewForm();  // helper dom.js
    // createInputForm ("type","nom du label","type", "id de l'input et for pour label")
    createInputForm ("label","Nom","input","lastName","text"); // helper dom.js
    createInputForm ("label","Prénom","input","firstName","text"); // helper dom.js
    createInputForm ("label","Adresse","input","adress","text"); // helper dom.js
    createInputForm ("label","Ville","input","city","text"); // helper dom.js
    createInputForm ("label","E-mail","input","email","email"); // helper dom.js
    // createValidateButton ("class pour getElement","class a ajouter a l'input", "texte", "nom")
    createButton(".form__order","form__order__validate","Commander","validateForm"); // helper dom.js
    createContact();
}

// fonction création de l'objet contact
const createContact = () => {
    document.getElementById("validateForm").addEventListener("click", () => {
        let firstName = document.getElementById("firstName");
        let lastName = document.getElementById("lastName");
        let address = document.getElementById("adress");
        let city = document.getElementById("city");
        let email = document.getElementById("email");
        let contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
        }
        console.log(firstName);
        validate(contact);
    });
}


const validate = (contact) => {
    console.log(contact.firstName);

    localStorage.setItem("contact", JSON.stringify(contact));
   
}
// appel des fonctions principales
updateBasketChip(); // mise a jour de la pastille quantité du panier => basketChip.js
displayObject(); // affichage des vignettes 
btnDeleteList(); // listing des boutons delete qui appel ensuite la fonction delete
