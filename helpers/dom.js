

// Création des div pour insertion des éléments
const createDiv = (append, classlist) => {
	newDiv = document.createElement("div");
	document.getElementById(append).appendChild(newDiv);
	newDiv.classList.add(classlist);
};

const updateBasketChip = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket){
		let vanish = document.querySelector(".header__nav__basket__chip");
		vanish.style.display = "none";
		return;
    }else {
		let appear = document.querySelector(".header__nav__basket__chip");
		appear.style.display = "block";
        let totalQuantity = 0;
        for (i=0; i<basket.length; i++) {
            totalQuantity += basket[i].quantity; 
        }
		console.log(totalQuantity);
		document.querySelector(".header__nav__basket__chip span").textContent = totalQuantity;
		return totalQuantity;
    }
	
}