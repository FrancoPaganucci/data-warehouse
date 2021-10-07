const token = sessionStorage.getItem("token");
tokenJson = JSON.parse(token);
console.log(tokenJson);

const traerContactos = async () => {
    try {
        const resp = await fetch('http://localhost:3000/contactos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenJson.token}`
            },
        });

        const info = await resp.json();
        return info;
    } catch (error) {
        console.log(error);
    }
};
console.log(traerContactos());

let resultado = traerContactos();
resultado.then(response => {
    console.log(response);
});