const nombre_input = document.getElementById('nombre-input');
const apellido_input = document.getElementById('apellido-input');
const email_input = document.getElementById('email-input');
const perfil_input = document.getElementById('perfil-input');
const password_input = document.getElementById('password-input');

const create_user_btn = document.getElementById('crear-usuario-btn');


// función que chequea que pass y repeat pass sean iguales


// función que crea el body post
create_user_btn.addEventListener('click', () => {
    console.log("entra al submit")
    const bodyPost = {
        nombre: nombre_input.value,
        apellido: apellido_input.value,
        email: email_input.value,
        perfil: perfil_input.value,
        password: password_input.value
    };
    console.log(bodyPost);
})