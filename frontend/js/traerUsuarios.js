const usuarios_ctn = document.getElementById('info-usuarios');
const tabla_usuarios = document.getElementById('tabla-usuarios');
// FETCH USUARIOS
const traerUsuarios = async () => {
    try {
        const resp = await fetch('http://localhost:3000/usuarios', {
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
let resultado = traerUsuarios();
resultado.then(response => {
    console.log(response);
    crearListaUsuarios(response);
}).catch(error => {
    alert(error);
});

// Crear Lista de usuarios
function crearListaUsuarios(data) {
    
    for (i = 0; i < data.length; i++) {
        const table_row = document.createElement('tr');
        table_row.id = `table-row-${i}`;
        const objeto_indexado = data[i];
        //console.log(objeto_indexado);
        // table datas
        const data_nombre = document.createElement('td');
        const data_apellido = document.createElement('td');
        const data_email = document.createElement('td');
        const data_perfil = document.createElement('td');
        const data_password = document.createElement('td');
        data_nombre.innerHTML = objeto_indexado.nombre;
        table_row.appendChild(data_nombre);
        data_apellido.innerHTML = objeto_indexado.apellido;
        table_row.appendChild(data_apellido);
        data_email.innerHTML = objeto_indexado.email;
        table_row.appendChild(data_email);
        data_perfil.innerHTML = objeto_indexado.perfil;
        table_row.appendChild(data_perfil);
        data_password.innerHTML = objeto_indexado.password;
        table_row.appendChild(data_password);
        // appendear a la tabla
        usuarios_ctn.appendChild(table_row);
    };

}

