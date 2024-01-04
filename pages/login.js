function login(){
    let vformLogin = document.getElementById("formLogin");
    let vchkMostrarClave = document.getElementById("chkMostrarClave");

    const iniciarSesion = async(event) => {
        event.preventDefault();
        const dataForm = new FormData(event.currentTarget);

        let formData = new FormData();
        formData.append("usuario",dataForm.get("usuario"));
        formData.append("clave",dataForm.get("clave"));

        const response = await fetch(ApiWebURL + "iniciarsesion.php",{
            method: "POST",
            body: formData
        })

        const data = await response.json();
        //console.log(data);

        switch(data){
            case -1:
                alert("La contraseña es incorrecta");break;
            case -2:
                alert("El usuario no está registrado");break;
            default:
                alert("Bienvenido");
                fetch("pages/nosotros.html")
                    .then(response => response.text())
                    .then(data => {
                        mainContent.innerHTML = data; 
                    })
                break;
        }
    }

    vformLogin.addEventListener("submit", (event) => iniciarSesion(event));
    vchkMostrarClave.addEventListener("click", (event) => {
        vformLogin.elements["clave"].setAttribute("type", event.target.checked ? "text" : "password")
    });
}
login();