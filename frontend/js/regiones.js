const token = sessionStorage.getItem("token");
const tokenJson = JSON.parse(token);
console.log(tokenJson);
const ctn_regiones = document.getElementById("ctn-regiones");
const btn_add_region = document.getElementById("btn-agregar-region");
btn_add_region.addEventListener('click', crearRegion);

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
    for (let i = 0; i < values[0].length; i++) {
        const bloque_region = document.createElement('ul');
        bloque_region.className = "bloque-region";
        const this_region = document.createElement('li');
        this_region.className = "region";
        this_region.id = `region-id-${values[0][i].id}`;
        this_region.innerHTML = values[0][i].nombre;
        bloque_region.appendChild(this_region);
        ctn_regiones.appendChild(bloque_region);
        const this_region_id = values[0][i].id;
        crearBotonesRegion(this_region, this_region_id);

        // paises
        for (let i = 0; i < values[1].length; i++) {
            if (this_region_id == values[1][i].region_id) {
                const bloque_pais = document.createElement('ul');
                bloque_pais.className = "bloque-pais";
                const this_pais = document.createElement('li');
                this_pais.className = "pais nested";
                this_pais.id = `pais-id-${values[1][i].id}`;
                this_pais.innerHTML = values[1][i].nombre;
                const this_pais_id = values[1][i].id;
                // btns
                crearBotonesPais(this_pais, this_pais_id);
                bloque_pais.appendChild(this_pais);
                this_region.appendChild(bloque_pais);

                // ciudades
                for (let i = 0; i < values[2].length; i++) {
                    if (this_pais_id == values[2][i].pais_id) {
                        const bloque_ciudad = document.createElement('ul');
                        bloque_ciudad.className = "bloque-ciudad";
                        const this_ciudad = document.createElement('li');
                        this_ciudad.className = "ciudad";
                        this_ciudad.id = `ciudad-id-${values[2][i].id}`;
                        this_ciudad.innerHTML = values[2][i].nombre;
                        const this_ciudad_id = values[2][i].id;
                        crearBotonesCiudad(this_ciudad, this_ciudad_id);
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

// crear botones
function crearBotonesRegion(this_region, this_region_id) {
    const btn_edit = document.createElement('button');
    const btn_delete = document.createElement('button');
    const btn_add_country = document.createElement('button');
    btn_edit.classList = "btn-edit";
    btn_delete.classList = "btn-delete";
    btn_delete.id = this_region_id;
    btn_add_country.classList = "btn-add";
    btn_edit.innerHTML = "Editar";
    btn_delete.innerHTML = "Borrar";
    btn_add_country.innerHTML = "Agregar País";
    btn_edit.style.padding = "5px 20px";
    btn_edit.style.fontSize = "16px";
    btn_edit.style.marginLeft = "60px";
    btn_edit.style.cursor = "pointer";
    btn_delete.style.padding = "5px 20px";
    btn_delete.style.fontSize = "16px";
    btn_delete.style.marginLeft = "20px";
    btn_delete.style.cursor = "pointer";
    btn_add_country.style.padding = "5px 20px";
    btn_add_country.style.fontSize = "16px";
    btn_add_country.style.marginLeft = "180px";
    btn_add_country.style.cursor = "pointer";
    btn_edit.addEventListener('click', editarRegion);
    btn_delete.addEventListener('click', function() {
        borrarRegion(this_region_id);
    });
    btn_add_country.addEventListener('click', () => {
        crearPais(this_region_id)
    })
    this_region.appendChild(btn_edit);
    this_region.appendChild(btn_delete);
    this_region.appendChild(btn_add_country);
    // falta agregar eventos para borrar y editar
}
function crearBotonesPais(this_pais, this_pais_id) {
    const btn_edit = document.createElement('button');
    const btn_delete = document.createElement('button');
    const btn_add_city = document.createElement('button');
    btn_edit.classList = "btn-edit";
    btn_delete.classList = "btn-delete";
    btn_add_city.classList = "btn-add";
    btn_edit.innerHTML = "Editar";
    btn_delete.innerHTML = "Borrar";
    btn_add_city.innerHTML = "Agregar Ciudad";
    btn_edit.style.padding = "5px 20px";
    btn_edit.style.fontSize = "16px";
    btn_edit.style.marginLeft = "60px";
    btn_edit.style.cursor = "pointer";
    btn_delete.style.padding = "5px 20px";
    btn_delete.style.fontSize = "16px";
    btn_delete.style.marginLeft = "20px";
    btn_delete.style.cursor = "pointer";
    btn_add_city.style.padding = "5px 20px";
    btn_add_city.style.fontSize = "16px";
    btn_add_city.style.marginLeft = "250px";
    btn_add_city.style.cursor = "pointer";
    btn_delete.addEventListener('click', () => {
        borrarPais(this_pais_id);
    })
    btn_add_city.addEventListener('click', () => {
        crearCiudad(this_pais_id);
    })
    this_pais.appendChild(btn_edit);
    this_pais.appendChild(btn_delete);
    this_pais.appendChild(btn_add_city);
    // falta agregar eventos para borrar y editar
}
function crearBotonesCiudad(this_ciudad, this_ciudad_id) {
    const btn_edit = document.createElement('button');
    const btn_delete = document.createElement('button');
    btn_edit.classList = "btn-edit";
    btn_delete.classList = "btn-delete";
    btn_edit.innerHTML = "Editar";
    btn_delete.innerHTML = "Borrar";
    btn_edit.style.padding = "5px 20px";
    btn_edit.style.fontSize = "16px";
    btn_edit.style.marginLeft = "50px";
    btn_edit.style.cursor = "pointer";
    btn_delete.style.padding = "5px 20px";
    btn_delete.style.fontSize = "16px";
    btn_delete.style.marginLeft = "20px";
    btn_delete.style.cursor = "pointer";
    btn_delete.addEventListener('click', () => {
        borrarCiudad(this_ciudad_id);
    })
    this_ciudad.appendChild(btn_edit);
    this_ciudad.appendChild(btn_delete);
                // falta agregar eventos para borrar y editar
}
//eventos botones
// region
function borrarRegion(this_region_id) {
    const confirmed = confirm("¿Está seguro que desea eliminar esta región? Si lo hace borrará todos los países y ciudades asignadas a la misma.");
    if (confirmed == true) {
        // 2 acciones: borrar del front y borrar de la db
        const region_id = this_region_id;
        const deleteRegion = async () => {
            try {
                const resp = await fetch(`http://localhost:3000/regiones/borrar/${region_id}`, {
                    method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenJson.token}`
                }
                });
            const info = await resp.json();
            return info
            } catch (error) {
                console.log('Error al realizar la solicitud DELETE al servidor: ' + `${ error.message }`);
            } 
        };
        const resultado = deleteRegion();
        resultado.then(response => {
            window.location.href = "regionCiudad.html";
        });
    }
}
function editarRegion() {

}
function crearRegion() {
    const nombre_region = prompt("Ingresar nueva región:", "");
    if (nombre_region == null || nombre_region == "") {
        alert("Error: Debe ingresar una región válida");
    }
    const bodyPost = {
        nombre: nombre_region
    };
    const postNuevaRegion = async () => {
        try {
            const resp = await fetch('http://localhost:3000/regiones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenJson.token}`
                },
                body: JSON.stringify(bodyPost)
            })

            const info = await resp.json();
            return info
        } catch (error) {
            console.log('Error al realizar la solicitud POST al servidor: ' + `${ error.message }`);
        }
    };
    let resultado = postNuevaRegion();
    resultado.then(response => {
        window.location.href = "regionCiudad.html";
    })
}
// pais
function borrarPais(this_pais_id) {
    const confirmed = confirm("¿Está seguro que desea eliminar este país? Si lo hace, borrará todas las ciudades asignadas al mismo.");
    if (confirmed == true) {
        // 2 acciones: borrar del front y borrar de la db
        const pais_id = this_pais_id;
        const deletePais = async () => {
            try {
                const resp = await fetch(`http://localhost:3000/paises/borrar/${pais_id}`, {
                    method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenJson.token}`
                }
                });
            const info = await resp.json();
            return info
            } catch (error) {
                console.log('Error al realizar la solicitud DELETE al servidor: ' + `${ error.message }`);
            } 
        };
        const resultado = deletePais();
        resultado.then(response => {
            alert(`El país ha sido borrado exitosamente.`)
            window.location.href = "regionCiudad.html";
        });
    }
}
function editarPais() {

}
function crearPais(region_id) {
    const nombre_pais = prompt("Ingresar un nuevo país:", "");
    if (nombre_pais == "") {
        alert("Error: Debe ingresar un país válido");
    } else if (nombre_pais == null) {
        alert("Operación cancelada")
    } else {
        const bodyPost = {
            nombre: nombre_pais,
            region_id: region_id
        };
        const postNuevoPais = async () => {
            try {
                const resp = await fetch('http://localhost:3000/paises', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokenJson.token}`
                    },
                    body: JSON.stringify(bodyPost)
                })
    
                const info = await resp.json();
                return info
            } catch (error) {
                console.log('Error al realizar la solicitud POST al servidor: ' + `${ error.message }`);
            }
        };
        let resultado = postNuevoPais();
        resultado.then(response => {
            alert(`El país ${nombre_pais} se ha agregado correctamente! :)`);
            window.location.href = "regionCiudad.html";
        })
    }
}
// ciudad
function borrarCiudad(this_ciudad_id) {
    const confirmed = confirm("¿Está seguro que desea eliminar esta ciudad?");
    if (confirmed == true) {
        // 2 acciones: borrar del front y borrar de la db
        const ciudad_id = this_ciudad_id;
        const deleteCiudad = async () => {
            try {
                const resp = await fetch(`http://localhost:3000/ciudades/borrar/${ciudad_id}`, {
                    method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenJson.token}`
                }
                });
            const info = await resp.json();
            return info
            } catch (error) {
                console.log('Error al realizar la solicitud DELETE al servidor: ' + `${ error.message }`);
            } 
        };
        const resultado = deleteCiudad();
        resultado.then(response => {
            alert(`La ciudad ha sido borrada exitosamente.`)
            window.location.href = "regionCiudad.html";
        });
    }
}
function editarCiudad() {

}
function crearCiudad(pais_id) {
    const nombre_ciudad = prompt("Ingresar una nueva ciudad:", "");
    if (nombre_ciudad == "") {
        alert("Error: Debe ingresar una ciudad válida");
    } else if (nombre_ciudad == null) {
        alert("Operación cancelada")
    } else {
        const bodyPost = {
            nombre: nombre_ciudad,
            pais_id: pais_id
        };
        const postNuevoPais = async () => {
            try {
                const resp = await fetch('http://localhost:3000/ciudades', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokenJson.token}`
                    },
                    body: JSON.stringify(bodyPost)
                })
    
                const info = await resp.json();
                return info
            } catch (error) {
                console.log('Error al realizar la solicitud POST al servidor: ' + `${ error.message }`);
            }
        };
        let resultado = postNuevoPais();
        resultado.then(response => {
            alert(`La ciudad "${nombre_ciudad}" se ha agregado correctamente! :)`);
            window.location.href = "regionCiudad.html";
        })
    }
}

// caret tree
var toggler = document.getElementsByClassName("caret");
for (let i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    alert("entra");
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
}