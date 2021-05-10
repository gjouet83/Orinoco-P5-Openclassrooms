// Déclaration des variables
let newDiv = 0;

// Création de l'objet pour le formatage du prix
let formatPrice = new Intl.NumberFormat("fr-FR", {
	style: "currency",
	currency: "EUR",
	currencyDisplay: "symbol",
});

//Récupération des données 
const getDatas = () => {
	fetch("http://localhost:3000/api/cameras")
		.then(response => {
			if (response.ok) {
				return response.json();
			}
		})
		.then(datas => {
			createThumbnails(datas);
            console.log(datas);
		});
};

// Fonctions créations des composants de la vignette 
const createDiv = () => {
	newDiv = document.createElement("div");
	document.getElementById("productList").appendChild(newDiv);
	newDiv.classList.add("productList__element");
};

const createName = (data) => {
	let newName = document.createElement("h3");
	let name = document.createTextNode(data.name);
	newName.appendChild(name);
    newDiv.appendChild(newName);
    newName.classList.add("productList__element__name");
};

const createPicture = (data) => {
	let newPicture = document.createElement("div");
	let newFigure = document.createElement("figure");
	let newImg = document.createElement("img");
	newImg.src = data.imageUrl;
    newImg.width = 203;
    newImg.height = 135;
	newImg.alt = "appareil photo" + (data.name);
    newPicture.appendChild(newFigure);
    newDiv.appendChild(newPicture);
	newFigure.appendChild(newImg);
    newPicture.classList.add("productList__element__picture");
};

const createPrice = (data) => {
	let newPrice = document.createElement("div");
	let newValue = document.createElement("span");
	let value = document.createTextNode(formatPrice.format(data.price /100));
    newDiv.appendChild(newPrice);
    newPrice.appendChild(newValue);
	newValue.appendChild(value);
    newPrice.classList.add("productList__element__price");
    newValue.classList.add("productList__element__price__value");    
};

const createBtn = (data) => {
	let newButton = document.createElement("a");
	let viewProduct = document.createTextNode("Voir le produit");
    newButton.setAttribute("href", "./product.html?"+(data._id));
    newDiv.appendChild(newButton);
	newButton.appendChild(viewProduct);
    newButton.classList.add("productList__element__viewProduct");
	newButton.classList.add("btn");
};

// Fonction création de la vignette
const createThumbnails = (datas) => {
    for (let data of datas) {
        createDiv();
        createName(data);
        createPicture(data);
        createPrice(data);
        createBtn(data);
    }
};

//Fonction Principales 
getDatas();