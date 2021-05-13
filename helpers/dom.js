// Création des div pour insertion des éléments
const createDiv = (append, classlist) => {
	newDiv = document.createElement("div");
	document.getElementById(append).appendChild(newDiv);
	newDiv.classList.add(classlist);
};
