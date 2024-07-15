let loginform = document.querySelector("#loginform");
loginform.addEventListener("submit", (e) => {
    e.preventDefault();
    let usuario = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    let data = {
        username: usuario,
        password: password
    };

    fetch("/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Usuario y/o contraseña incorrectos');
        }
    })
    .then(data => {
        alert("Bienvenido");
        window.location.href = "/especialidades";
    })
    .catch(error => {
        alert(error.message);
    });
});
