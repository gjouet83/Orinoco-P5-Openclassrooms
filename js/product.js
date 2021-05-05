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
const displayProduct = (cameras) => {
    let getDiv = document.getElementById("productSheet");
	let newName = document.createElement("h3");
	    getDiv.appendChild(newName);
	    newName.classList.add("productSheet__name");
	let name = document.createTextNode(`${cameras[1].name}`);
	    newName.appendChild(name);
};

const getCameras = async () => {
	const cameras = await getPromise();

    displayProduct(cameras);
};

getCameras();
