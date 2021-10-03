// borrar el jwt del local storage cuando se abre login.html
/*if (localStorage.getItem('token').length !== null) {
    localStorage.removeItem('token');
} */
const logged = false;

document.querySelector("#login").addEventListener('click', async function(ev) {

    const emailInputValue = document.querySelector("#emailInput").value;
    const passwrodInputValue = document.querySelector("#passwordInput").value;
    const bodyPost = {
        email: emailInputValue,
        password: passwrodInputValue
    };
    console.log(`BODY POST: ${JSON.stringify(bodyPost)}`);
    try {
        const responseObject = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyPost)
        });
        const responseJson = await responseObject.json();

        // hacer algo con la respuesta
        //console.log(responseJson);
        // si el login es exitoso, redireccionar a contactos, si no mostrar error.
        if (responseJson) {
            window.location.href = "contactos.html";
        }
    } catch (error) {
        alert('error de autenticación.... revise su username o password');
    };

});

