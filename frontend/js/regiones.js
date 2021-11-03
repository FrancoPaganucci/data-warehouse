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
async function crearBloqueRegion(data) {
    for (i = 0; i < data.length; i++) {
        const bloque_region = document.createElement('ul');
        bloque_region.className = "bloque-region";
        const this_region = document.createElement('li');
        this_region.className = "region";
        this_region.id = `region-id-${data[i].id}`
        this_region.innerHTML = data[i].nombre;
        bloque_region.appendChild(this_region);
        ctn_regiones.appendChild(bloque_region);


        let resultadoPaises = traerPaisesPorRegion(data[i].id);
        resultadoPaises.then(response => {
            // cada vuelta de la response te da los países que pertenecen a la región que está iterando, entonces acá tenés que appendear 1 bloque de paises como un <ul> en la <li> que pertenece a dicha región -- usar region-id-${region-id}
            console.log(response);
            const bloque_pais = document.createElement('ul');
            bloque_pais.className = "bloque-pais";
            this_region.appendChild(bloque_pais);
            for (i = 0; i < response.length; i++) {
                //y acá appendear cada país como <li> a ese <ul> bloque de países
                const this_pais = document.createElement('li');
                this_pais.className = "pais";
                this_pais.id = `pais-id-${response[i].id}`;
                this_pais.innerHTML = response[i].nombre;
                bloque_pais.appendChild(this_pais);
                const bloque_ciudad = document.createElement('ul');
                bloque_ciudad.className = "bloque-ciudad";
                this_pais.appendChild(bloque_ciudad);
                bloque_ciudad.innerHTML = "BLOQUE CIUDAD";

                // ISSUE DE PROMESAS - Si corro esta función, el bloque de ciudad nunca se appendea, y el lugar de cada país es ocupado por la última ciudad de la response. Por consola, todos los fetch funcionan y la info es traída correctamente...

                /*// usar el id de este país para traer sus ciudades
                let resultadoCiudades = traerCiudadesPorPais(response[i].id);
                resultadoCiudades.then(ciudad_resp => {
                    console.log(ciudad_resp)                 
                    
                    for (j = 0; j < ciudad_resp.length; j++) {
                        //y acá appendear cada ciudad como <li> a ese <ul> bloque de ciudades
                        const this_ciudad = document.createElement('li');
                        this_ciudad.className = "ciudad";
                        this_ciudad.id = `ciudad-id-${ciudad_resp[j].id}`;
                        this_pais.innerHTML = ciudad_resp[j].nombre;
                        bloque_ciudad.appendChild(this_ciudad);
                    }
                }).catch(error => {
                    alert(error);
                })*/
            }
            //traerCiudadesPorPais(response)
        }).catch(error => {
            alert(error);
        })
    }
}

// PAISES
// traer países con fetch, appendearlas al bloque de region que le corresponda
async function traerPaisesPorRegion(region_id) {
    try {
        const resp = await fetch(`http://localhost:3000/paises/porRegion/${region_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenJson.token}`
            },
        });
        const info = await resp.json();
        console.log(`ÉXITO: traer paises por region fetch`);
        return info;
    } catch (error) {
        console.log(error);
    }
}

// CIUDADES
// traer ciudades con fetch, appendearlas al bloque de país que le corresponda
async function traerCiudadesPorPais(pais_id) {
    try {
        const resp = await fetch(`http://localhost:3000/ciudades/porPais/${pais_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenJson.token}`
            },
        });
        const info = await resp.json();
        console.log(`ÉXITO: traer ciudades por pais fetch`);
        return info;
    } catch (error) {
        console.log(error);
    }
}