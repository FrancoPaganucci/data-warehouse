// LOGIN CHECK
const token = sessionStorage.getItem("token");
const root = document.getElementById('usuariosRoot');
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
        alert("Debe estar logueado como administrador para poder cargar nuevos usuarios al sitema.");
        window.location.href = "login.html";
    }, 100);
    
    
    
}
const tokenJson = JSON.parse(token);
console.log(tokenJson);

const nombre_input = document.getElementById('nombre-input');
const apellido_input = document.getElementById('apellido-input');
const email_input = document.getElementById('email-input');
const perfil_input = document.getElementById('perfil-input');
const password_input = document.getElementById('password-input');
const password_repeat_input = document.getElementById('password-repeat-input');

const create_user_btn = document.getElementById('crear-usuario-btn');


// función que chequea que pass y repeat pass sean iguales
function checkDoublePassword(pass1,pass2) {
    if (pass1 !== pass2) {
        alert("Debe ingresar la misma contraseña dos veces.");
    }
};

// función que crea el body post
create_user_btn.addEventListener('click', () => {
    console.log("entra al submit");
    // validar campos existentes
    validarCamposCrearUsuario();
    const bodyPost = {
        nombre: nombre_input.value,
        apellido: apellido_input.value,
        email: email_input.value,
        perfil: perfil_input.value,
        password: password_input.value,
        passwordRepeat: password_repeat_input.value
    };
    //checkDoublePassword(password_input.value, password_repeat_input.value);
    console.log(bodyPost);

    // POST USUARIO
    const postNuevoUsuario = async () => {
        try {
            const resp = await fetch('http://localhost:3000/usuarios/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenJson.token}`
                },
                body:JSON.stringify(bodyPost)
            })

            const info = await resp.json();
            return info;
        } catch (error) {
            console.log('Error al realizar la solicitud POST al servidor: ' + `${ error.message }`);
            console.log(error);
        }
    };

    let resultado = postNuevoUsuario();
    resultado.then(response => {
        console.log(response);
        window.location.href = "usuarios.html";
    })
    
});


function validarCamposCrearUsuario() {
    if (
        !nombre_input.value ||
        !apellido_input.value ||
        !email_input.value ||
        !perfil_input.value ||
        !password_input.value ||
        !password_repeat_input.value
    ) {
        alert("Debe completar todos los campos del formulario para crear un nuevo usuario exitosamente");
    } else {
        return
    }
}


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
});