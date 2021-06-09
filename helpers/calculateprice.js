// fonction calcul prix total
const calculateTotalPrice = (array) => {
	for (object of array) {
		if (!object.quantity) {
			object.quantity = 1;
		}
		totalPrice += object.price * object.quantity;
	}
};
