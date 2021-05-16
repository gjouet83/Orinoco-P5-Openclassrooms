const updateBasketChip = () => {
	let basket = JSON.parse(localStorage.getItem("basket"));
	if (!basket) {
		let vanish = document.querySelector(".header__nav__basket--chip");
		vanish.style.display = "none";
	} else {
		let appear = document.querySelector(".header__nav__basket--chip");
		appear.style.display = "block";
		let totalQuantity = 0;
		for (i = 0; i < basket.length; i++) {
			totalQuantity += basket[i].quantity;
		}
		document.querySelector(".header__nav__basket--chip span").textContent = totalQuantity;
		return totalQuantity;
	}
};
