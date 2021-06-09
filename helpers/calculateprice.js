// fonction calcul prix total
const calculateTotalPrice = (basket) => {
	for (object of basket) {
		totalPrice += object.price * object.quantity;
	}
};
