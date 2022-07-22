const btnLogin = document.getElementById('btnLogin');
const user = document.getElementById('rutUsuario');
const pwd = document.getElementById('pwd');

const info = document.getElementById('info');

//imprimir datos ingresados en formulario por consola 
btnLogin.addEventListener('click', () => {
    interceptor(user.value, pwd.value);
});


const consumirLogin = async (user, pwd) => {
    try {
        //obtener los datos de la cabecera de la api consulta
        const response = await fetch('https://nodeproyectoveterinaria.herokuapp.com/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rutUsuario: user,
                password: pwd
            })
        });
        const data = response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const interceptor = async (user,pwd) => {
    try {
        let respuesta = await consumirLogin(user, pwd);
        console.log(respuesta);
        let estado = respuesta.estado;
        console.log(estado);
        let message = respuesta.message;
        if (estado === 200) {
            info.innerHTML = `<h5 class="text-success">${message}</h5>`;
        } else if (estado === 401) {
            info.innerHTML = `<h5 class="text-warning">${message}</h5>`;
        } else {
            info.innerHTML = `<h5 class="text-danger">${message}</h5>`;
        }
    }
    catch (error) {
        console.log(error);
    }

}



