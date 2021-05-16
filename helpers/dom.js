// Déclaration des variables
let newDiv = 0;
let newForm = 0;

// Création des div pour insertion des éléments
const createDiv = (type, append, classlist) => {
	newDiv = document.createElement(type);
	document.getElementById(append).appendChild(newDiv);
	newDiv.classList.add(classlist);
};

// Création de titre
const createTitle = (type, append, classlist, titre) => {
	newDiv = document.createElement(type);
	document.getElementById(append).appendChild(newDiv);
	newDiv.classList.add(classlist);
	let createTitle = document.createTextNode(titre);
	document.querySelector("." + classlist).appendChild(createTitle);
};

// création de button valider
const createValidateButton = (classToAppend, classToAdd, value, name) => {
	let divToAppend = document.querySelector(classToAppend)
	let validate = document.createElement("input");
	divToAppend.appendChild(validate);
	validate.classList.add(classToAdd);
	validate.classList.add("btn");
	validate.setAttribute("type", "submit"); 
	validate.setAttribute("value", value);
	validate.setAttribute("name", name);
	validate.setAttribute("id", name);
}

// création d'éléments dans basket.js
const createArea = (createElement, createTextNode, classList) => {
	let newElement = document.createElement(createElement);
	let element = document.createTextNode(createTextNode);
	newDiv.appendChild(newElement);
	newElement.appendChild(element);
	newElement.classList.add(classList);
}

// création d'input et label du formulaire
const createNewForm = () => {
    newForm = document.createElement("form");
    document.getElementById("form").appendChild(newForm);
	newForm.classList.add("form__order");
}

const createInputForm = (label, textnode, input, id) => {
	let newLabel = document.createElement(label);
    let textLabel = document.createTextNode(textnode);
    let inputLabel = document.createElement(input);
	newForm.appendChild(newLabel);
    newLabel.appendChild(textLabel);
    newForm.appendChild(inputLabel);
	newLabel.setAttribute("for", id);
	inputLabel.setAttribute("id", id);
	newLabel.classList.add("form__order__label");
	newLabel.classList.add(id);
	inputLabel.classList.add("form__order__input");
	inputLabel.classList.add(id);

}

