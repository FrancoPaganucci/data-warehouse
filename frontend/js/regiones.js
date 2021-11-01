const token = sessionStorage.getItem("token");
const tokenJson = JSON.parse(token);
console.log(tokenJson);
ctn_regiones = document.getElementById("ctn-regiones");

// REGIONES
const traerRegiones = async () => {
    try {
        const resp = await fetch('http://localhost:3000/regiones', {
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
console.log(traerRegiones());

// Con respuesta, crear arbol de región
let resultadoRegiones = traerRegiones();
resultadoRegiones.then(response => {
    console.log(response);
    crearBloqueRegion(response)
}).catch(error => {
    alert(error);
})
function crearBloqueRegion(data) {
    for (i = 0; i < data.length; i++) {
        const bloque_region = document.createElement('ul');
        bloque_region.className = "bloque-region";
        const this_region = document.createElement('li');
        this_region.className = "region";
        this_region.innerHTML = data[i].nombre;
        bloque_region.appendChild(this_region);
        ctn_regiones.appendChild(bloque_region);
    }
}

// PAISES
// traer países con fetch, appendearlas al bloque de region que le corresponda

// CIUDADES
// traer ciudades con fetch, appendearlas al bloque de país que le corresponda