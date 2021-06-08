// déclarations des variables
let basket = JSON.parse(localStorage.getItem("basket"));
let totalPrice = 0;

// boutton de suppression du produit
const createDeleteIcon = () => {
	let newProductDelete = document.createElement("button");
	let deleteIcon = document.createElement("i");
	newProductDelete.appendChild(deleteIcon);
	newDiv.appendChild(newProductDelete);
	newProductDelete.classList.add("basket__element__productDelete");
	deleteIcon.classList.add("fas");
	deleteIcon.classList.add("fa-trash-alt");
    newProductDelete.setAttribute("aria-label", "bouton supprimer article")
};

//fonction creation de la liste des boutton supprimer
const btnDeleteList = () => {
	let deleteBtn = document.querySelectorAll(
		".basket__element__productDelete"
	);
    deleteBtn.forEach(function(item, index){
        deleteProduct(item, index); // on récupère chaque item et son index de la liste et on les passent a la fonction deleteProduct
    });
};

// fonction  suppression d'élements
const deleteProduct = (item, index) => {
    item.addEventListener("click", () => {
        basket.splice(index, 1);
        localStorage.setItem("basket", JSON.stringify(basket));
        if (basket.length === 0) {
            localStorage.clear();
        }
        location.reload();
    })
};


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
};

// fonction principale d'affiche
const displayObject = () => {
	if (basket) {
        // suppression du background panier vide
		let vanishEmptyBasket = document.querySelector(".emptyBasket");
		vanishEmptyBasket.parentNode.removeChild(vanishEmptyBasket);
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
        emptyBasket();
        // listing des boutons delete qui appel ensuite la fonction delete
        btnDeleteList(); 
        // ecoute du boutton valider pour affichage du formulaire  
        document.getElementById("validateBasket").addEventListener("click",() => {
            createFormOrder();
        });     
	}
};

// fonction vider le panier
const emptyBasket = () => {
    document.getElementById("emptyBasket").addEventListener("click",() => {
        localStorage.clear(); // on vide le localstorage
        location.reload(); // rafraichir la page pour enlever les elements
    });
};

// création du formulaire de commande
const createFormOrder = () => {
    if (!document.querySelector(".form__order")) { // on empèche la creation d'un deuxieme formulaire lors d'un second click
        // createTitle ("type","id pour getElement", "class a ajouter" et id, "titre")
        createTitle ("h2","form","form__title","Formulaire de commande");
        // notice du formulaire champs obligatoires
        createDiv ("strong","form","form__requiredField");
        document.querySelector(".form__requiredField").textContent = "Tous les champs sont OBLIGATOIRES";
        createNewForm();  // helper dom.js
        // createInputForm ("type","nom du label","type", "id de l'input et for pour label")
        createInputForm ("label","Nom","input","lastName","text","Nom"); // helper dom.js
        createInputForm ("label","Prénom","input","firstName","text","Prénom"); // helper dom.js
        createInputForm ("label","Adresse","input","address","text","5 rue Victor Hugo"); // helper dom.js
        createInputForm ("label","Ville","input","city","text","Paris"); // helper dom.js
        createInputForm ("label","E-mail","input","email","email","example@provider.com"); // helper dom.js
        // createValidateButton ("class pour getElement","class a ajouter a l'input", "texte", "nom")
        createButton(".form__order","form__order__validate","Commander","validateForm"); // helper dom.js
        window.location.href = "#form";
    }
    validateContact();
};

// fonction validation des données saisie
const validateContact = () => {
    document.getElementById("validateForm").addEventListener("click", (event) => {
        // reset de l'affichage de l'erreur
        document.getElementById("firstName").classList.remove("invalid");
        document.getElementById("lastName").classList.remove("invalid");
        document.getElementById("address").classList.remove("invalid");
        document.getElementById("city").classList.remove("invalid");
        document.getElementById("email").classList.remove("invalid");
        // on recupère les données saisies
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let address = document.getElementById("address").value;
        let city = document.getElementById("city").value;
        let email = document.getElementById("email").value;
        // on test si la saisie correspond au regex
        if (!validateFirstName(firstName)) {
            isInvalid("firstName", event); // helpers dom.js
        } 
        if (!validateLastName(lastName)) {
            isInvalid("lastName", event); // helpers dom.js
        }  
        if (!validateAddress(address)) {
            isInvalid("address", event); // helpers dom.js
        }  
        if (!validateCity(city)) {
            isInvalid("city", event); // helpers dom.js
        }  
        if (!validateEmail(email)) {
            isInvalid("email", event); // helpers dom.js    
        }
        if (validateFirstName(firstName) && validateLastName(lastName) && validateAddress(address) && validateCity(city) && validateEmail(email)) {
            createContact(firstName, lastName, address, city, email);
        }
    });
};

// regex
const validateFirstName = (firstName) => {
    console.log(firstName);
    return /^[A-Za-zéèàçà'-\s]{3,15}$/.test(firstName); 
};

const validateLastName = (lastName) => {
    return /^[A-Za-zéèçà'-\s]{3,15}$/.test(lastName);
};

const validateAddress = (address) => {
    return /^[0-9]{0,6}[A-Za-zéèçà'-\s]{3,40}$/.test(address);
};

const validateCity = (city) => {
    return /^[A-Za-z'-\s]{3,15}$/.test(city);
};

const validateEmail = (email) => {
    return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(email);
};

// fonction création de l'objet contact
const createContact = (firstName, lastName, address, city, email) => {
    let contact = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email,
    }
    localStorage.setItem("contact", JSON.stringify(contact));
};

// appel des fonctions principales
updateBasketChip(); // mise a jour de la pastille quantité du panier => basketChip.js
displayObject(); // affichage des vignettes 
