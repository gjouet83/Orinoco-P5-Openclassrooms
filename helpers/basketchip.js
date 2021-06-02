const updateBasketChip = () => {
	let basket = JSON.parse(localStorage.getItem("basket"));
	if (!basket) {
		document
			.querySelector(".header__nav__basket--chip")
			.classList.replace(
				"header__nav__basket--chip",
				"header__nav__basket--chipDisappear"
			);
	} else {
		if (document.querySelector(".header__nav__basket--chipDisappear")) {
			document
			.querySelector(".header__nav__basket--chipDisappear")
			.classList.replace(
				"header__nav__basket--chipDisappear",
				"header__nav__basket--chip"
			);
		}
		let totalQuantity = 0;
		for (i = 0; i < basket.length; i++) {
			totalQuantity += basket[i].quantity;
		}
		document.querySelector(".header__nav__basket--chip span").textContent =
			totalQuantity;
		return totalQuantity;
	}
};
