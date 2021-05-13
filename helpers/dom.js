

// Création des div pour insertion des éléments
const createDiv = (append, classlist) => {
	newDiv = document.createElement("div");
	document.getElementById(append).appendChild(newDiv);
	newDiv.classList.add(classlist);
};

const updateBasketChip = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
	console.log(basket);
    if (!basket){
		document.querySelector(".header__nav__basket__chip").remove();
		return;
    }else {
        let totalQuantity = 0;
        for (i=0; i<basket.length; i++) {
            totalQuantity += basket[i].quantity; 
        }
		document.querySelector(".header__nav__basket__chip span").textContent = totalQuantity;
		return totalQuantity;
    }
	
}