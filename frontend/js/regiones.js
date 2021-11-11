const token = sessionStorage.getItem("token");
const tokenJson = JSON.parse(token);
console.log(tokenJson);
const ctn_regiones = document.getElementById("ctn-regiones");

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
const traerCiudades = async () => {
    try {
        const resp = await fetch('http://localhost:3000/ciudades', {
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
const traerpaises = async () => {
    try {
        const resp = await fetch('http://localhost:3000/paises', {
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
// prueba promise all
const regiones = traerRegiones();
const paises = traerpaises()
const ciudades = traerCiudades();
Promise.all([regiones, paises, ciudades]).then(values => {
    console.log(values);
    for (let i = 0; i < values.length; i++) {
        const bloque_region = document.createElement('ul');
        bloque_region.className = "bloque-region";
        const this_region = document.createElement('li');
        this_region.className = "region";
        this_region.id = `region-id-${values[0][i].id}`
        this_region.innerHTML = values[0][i].nombre;
        bloque_region.appendChild(this_region);
        ctn_regiones.appendChild(bloque_region);
        const this_region_id = values[0][i].id;

        // paises
        for (let i = 0; i < values[1].length; i++) {
            if (this_region_id == values[1][i].region_id) {
                const bloque_pais = document.createElement('ul');
                bloque_pais.className = "bloque-pais";
                const this_pais = document.createElement('li');
                this_pais.className = "pais";
                this_pais.id = `pais-id-${values[1][i].id}`;
                this_pais.innerHTML = values[1][i].nombre;
                bloque_pais.appendChild(this_pais);
                this_region.appendChild(bloque_pais);
                const this_pais_id = values[1][i].id;

                // ciudades
                for (let i = 0; i < values[2].length; i++) {
                    if (this_pais_id == values[2][i].pais_id) {
                        const bloque_ciudad = document.createElement('ul');
                        bloque_ciudad.className = "bloque-ciudad";
                        const this_ciudad = document.createElement('li');
                        this_ciudad.className = "ciudad";
                        this_ciudad.id = `ciudad-id-${values[2][i].id}`;
                        this_ciudad.innerHTML = values[2][i].nombre;
                        bloque_ciudad.appendChild(this_ciudad);
                        this_pais.appendChild(bloque_ciudad);
                    }
                }
            }
        }
    }

}).catch(err => {
    console.log(err);
})
