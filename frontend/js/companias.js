// LOGIN CHECK
const token = sessionStorage.getItem("token");
const root = document.getElementById('companias_root');
if (!token) {
    // bloquear acceso a la página, no está logueado. O redirigir al login
    const black_overlay = document.createElement('div');
    black_overlay.style.height = "100vh";
    black_overlay.style.width = "100vw";
    black_overlay.style.position = "absolute";
    black_overlay.style.top = "0";
    black_overlay.style.backgroundColor = "#000000";
    black_overlay.style.opacity = "0.9";
    //black_overlay.style.position = "absolute";
    black_overlay.style.zIndex = "10000";
    root.appendChild(black_overlay);
    setTimeout(() => {
        alert("Debe estar logueado como administrador para poder editar compañías en el sitema.");
        window.location.href = "login.html";
    }, 100);
}
const tokenJson = JSON.parse(token);
const companias_ctn = document.getElementById('info-companias');
const tabla_companias = document.getElementById('tabla-companias');
const btn_agregar_compania = document.getElementById('agregar-compania');
btn_agregar_compania.addEventListener('click', () => {
    agregarCompania();
})
const nombre_input = document.getElementById('nombre-input');
const direccion_input = document.getElementById('direccion-input');
const email_input = document.getElementById('email-input');
const telefono_input = document.getElementById('telefono-input');
const ciudad_input = document.getElementById('ciudad-input');
// FETCH COMPANIAS
const traerCompanias = async () => {
    try {
        const resp = await fetch('http://localhost:3000/companias', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenJson.token}`
            }
        });
        const info = await resp.json();
        return info;
    } catch (error) {
        console.log(error);
    };
}
let resultado = traerCompanias();
    resultado.then(response => {
        console.log(response)
        crearListaCompanias(response);
    }).catch(error => {
        alert(error);
});
// crear lista de compañías
function crearListaCompanias(data) {
    for (i = 0; i < data.length; i++) {
        const table_row = document.createElement('tr');
        table_row.id = `table-row-${i}`;
        const objeto_indexado = data[i];
        // table datas
        const data_nombre = document.createElement('td');
        const data_pais = document.createElement('td');
        const data_direccion = document.createElement('td');
        const data_acciones = document.createElement('td');
        data_nombre.innerHTML = objeto_indexado.nombre;
        table_row.appendChild(data_nombre);
        // ciudad con ciudad_id
        const ciudad_id = objeto_indexado.ciudad_id;
        const ciudad_nombre = ciudadPorCiudadId(ciudad_id);
        ciudad_nombre.then(ciudad => {
            const pais = paisPosPaisId(ciudad.pais_id);
            pais.then(pais => {
                data_pais.innerHTML = pais.nombre;
            })
        }).catch(err => {
            console.log(err);
        })
        table_row.appendChild(data_pais);
        // pais con nombre de ciudad?
        data_direccion.innerHTML = objeto_indexado.direccion;
        table_row.appendChild(data_direccion);
        const btn_editar = document.createElement('button');
        btn_editar.innerHTML = "Editar";
        btn_editar.id = "btn-editar-compania";
        btn_editar.addEventListener('click', () => {
            editarCompania(objeto_indexado.id);
        })
        const btn_borrar = document.createElement('button');
        btn_borrar.innerHTML = "Borrar";
        btn_borrar.id = "btn-borrar-compania";
        btn_borrar.addEventListener('click', () => {
            borrarCompania(objeto_indexado.id);
        })
        data_acciones.appendChild(btn_borrar);
        data_acciones.appendChild(btn_editar);
        table_row.appendChild(data_acciones);
        // append a la table
        companias_ctn.appendChild(table_row);
    }
}
// traer objeto ciudad por ciudad_id
async function ciudadPorCiudadId(ciudad_id) {
    try {
        const resp = await fetch(`http://localhost:3000/ciudades/${ciudad_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenJson.token}`
            }
        });
        const info = await resp.json();
        return info;
    } catch (error) {
        console.log(error);
    };
}
// traer pais por pais_id
async function paisPosPaisId(pais_id) {
    try {
        const resp = await fetch(`http://localhost:3000/paises/${pais_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenJson.token}`
            }
        });
        const info = await resp.json();
        return info;
    } catch (error) {
        console.log(error);
    };
}
// eventos
// agregar
function agregarCompania() {
    mostrarCompaniaForm();
    const agregar_submit_btn = document.getElementById('agregar-comp-btn');
    agregar_submit_btn.addEventListener('click', () => {
        postNuevaCompania();
    })

}
function postNuevaCompania() {
    // validar campos crear usuario
    const bodyPost = {
        nombre: nombre_input.value,
        direccion: direccion_input.value,
        email: email_input.value,
        telefono: telefono_input.value,
        nombre_ciudad: ciudad_input.value
    };
    console.log(bodyPost)
    //POST COMP
    const postNuevaComp = async () => {
        try {
            const resp = await fetch('http://localhost:3000/companias', {
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
            console.log(error)
        }
    };
    let resultado = postNuevaComp();
    resultado.then(response => {
        console.log(response);
        window.location.href = "companias.html"
    })
};

// editar
function editarCompania(this_compania_id) {
    const compania_id = this_compania_id;
    const nombre_compania = prompt("Editar nombre de compañía:", "");
    if (nombre_compania == null || nombre_compania == "") {
        alert("Error: Debe ingresar una companía válida");
    }
    const bodyPost = {
        nombre: nombre_compania
    };
    const editCompania = async () => {
        try {
            const resp = await fetch(`http://localhost:3000/companias/${compania_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenJson.token}`
                },
                body: JSON.stringify(bodyPost)
            });
            const info = await resp.json();
            return info
        } catch (error) {
            console.log('Error al realizar la solicitud PUT al servidor: ' + `${error.message}`);
        }
    }
    const resultado = editCompania();
        resultado.then(response => {
            window.location.href = "companias.html";
        });
}
// borrar
function borrarCompania(this_compania_id) {
    const confirmed = confirm("¿Está seguro que desea eliminar esta compañía?");
    if (confirmed == true) {
        // 2 acciones: borrar del front y borrar de la db
        const compania_id = this_compania_id;
        console.log(compania_id + "!!!!!")
        const deleteCompania = async () => {
            try {
                const resp = await fetch(`http://localhost:3000/companias/borrar/${compania_id}`, {
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
        const resultado = deleteCompania();
        resultado.then(response => {
            //window.location.href = "companias.html";
        });
    }
}
// mostrar form para agregar compañía
const agregar_form = document.getElementById('agregar-form-comp');
function mostrarCompaniaForm() {
    agregar_form.style.visibility = "visible";
    agregar_form.style.zIndex = 1000;
};
const cerrar_form = document.getElementById('cancelar-comp-btn');
cerrar_form.addEventListener('click', () => {
    cerrarCompaniaForm();
})
function cerrarCompaniaForm() {
    agregar_form.style.visibility = "hidden";
    agregar_form.style.zIndex = -1000;
}