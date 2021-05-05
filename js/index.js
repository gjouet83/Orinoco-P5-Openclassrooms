const getPromise = () => {
	return fetch("http://localhost:3000/api/cameras")
		.then(res => {
			if (res.ok) {
				return res.json();
			}
		})
		.then(cameras => {
			return cameras;
		});
};

let newDiv = 0;
const createDiv = () => {
	newDiv = document.createElement("div");
	document.getElementById("productList").appendChild(newDiv);
	newDiv.classList.add("productList__element");
};
const createName = () => {
	let newName = document.createElement("h3");
	    newDiv.appendChild(newName);
	    newName.classList.add("productList__element__name");
	let name = document.createTextNode(`${camera.name}`);
	    newName.appendChild(name);
};
const createPicture = () => {
	let newPicture = document.createElement("div");
	    newDiv.appendChild(newPicture);
	    newPicture.classList.add("productList__element__picture");
	let newFigure = document.createElement("figure");
	    newPicture.appendChild(newFigure);
	let newImg = document.createElement("img");
	    newImg.src = `${camera.imageUrl}`;
        newImg.width = 203;
        newImg.height = 135;
	    newImg.alt = `appareil photo ${camera.name}`;
	    newFigure.appendChild(newImg);
};
const createPrice = () => {
	let newPrice = document.createElement("div");
	    newDiv.appendChild(newPrice);
	    newPrice.classList.add("productList__element__price");
	let newValue = document.createElement("span");
	    newPrice.appendChild(newValue);
	    newValue.classList.add("productList__element__price__value");
	let value = document.createTextNode(`${camera.price}€`);
	    newValue.appendChild(value);
};
const createBtn = () => {
	let newButton = document.createElement("a");
        newButton.setAttribute("href", "./product.html");
	    newDiv.appendChild(newButton);
	    newButton.classList.add("productList__element__viewProduct");
	    newButton.classList.add("btn");
	let viewProduct = document.createTextNode("Voir le produit");
	    newButton.appendChild(viewProduct);
};
const createThumbnail = () => {
	createDiv();
	createName();
	createPicture();
	createPrice();
	createBtn();
};
const getCameras = async () => {
	const cameras = await getPromise();
	for (camera of cameras) {
		createThumbnail();
	}
};

getCameras();
