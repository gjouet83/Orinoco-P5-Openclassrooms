const getDatas = () => {
	return fetch("http://localhost:3000/api/cameras").then((response) => {
		if (response.ok) {
			return response.json();
		}
	});
};

const getDataById = (id) => {
	return fetch("http://localhost:3000/api/cameras/" + id).then((response) => {
		if (response.ok) {
			return response.json();
		}
	});
};
