function directores() {
    const vformInsert = document.getElementById("formInsert");
    const vformUpdate = document.getElementById("formUpdate");
    const vformDelete = document.getElementById("formDelete");

    const leerServicio = async() =>{
        const response = await fetch(ApiWebURL + "directores.php");
        const data = await response.json();
        llenarTabla(data);
        /*
            .then((response) => response.json())
            .then((data) => {
                //console.log(data);
                llenarTabla(data);
            });
        */
    }
    leerServicio();

    const llenarTabla = (data) => {
        let contenidoTabla = "";
        data.map((item) => {
            //console.log(item.nombre);
            let fila = "<tr>";
            fila += "<td>" + item.iddirector + "</td>";
            fila += "<td>" + item.nombres + "</td>";
            fila += "<td>" + item.peliculas + "</td>";
            fila += "<td><i class='bi bi-pencil btnUpdate' data-bs-toggle='modal' data-bs-target='#updateModal'></i></td>";
            fila += "<td><i class='bi bi-x-circle btnDelete' data-bs-toggle='modal' data-bs-target='#deleteModal'></i></td>";
            fila += "</tr>";
            contenidoTabla += fila;
        });
        document.getElementById("tbody-directores").innerHTML = contenidoTabla;

        const buttonsUpdate = document.querySelectorAll("#tbody-directores .btnUpdate");
        for(let i=0 ; i<buttonsUpdate.length ; i++){
            buttonsUpdate[i].addEventListener("click", () => {
                //console.log(data[i]);
                vformUpdate.elements["iddirector"].value = data[i].iddirector;
                vformUpdate.elements["nombres"].value = data[i].nombres;
                vformUpdate.elements["peliculas"].value = data[i].peliculas;
            })
        }

        const buttonsDelete = document.querySelectorAll("#tbody-directores .btnDelete");
        for(let i=0 ; i<buttonsDelete.length ; i++){
            buttonsDelete[i].addEventListener("click", () => {
                //console.log(data[i]);
                vformDelete.elements["iddirector"].value = data[i].iddirector;
                document.getElementById("nombreDirectorEliminar").innerText = data[i].nombres;
            })
        }
    };
    
    const insertRow = async (event) =>{
        event.preventDefault();
        const dataForm = new FormData(event.currentTarget);
        //console.log(dataForm.get("nombres"));

        let formData = new FormData();
        formData.append("nombres",dataForm.get("nombres"));
        formData.append("peliculas",dataForm.get("peliculas"));

        event.target.reset();

        const response = await fetch(ApiWebURL + "directoresinsert.php",{
            method: "POST",
            body: formData
        })

        const data = await response.text();
        console.log(data);
        leerServicio();
        document.querySelector("#insertModal .btn-close").click();
        /*
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                leerServicio();
                document.querySelector("#insertModal .btn-close").click();
            });
        */
    }

    const updateRow = async (event) =>{
        event.preventDefault();
        const dataForm = new FormData(event.currentTarget);

        let formData = new FormData();
        formData.append("iddirector",dataForm.get("iddirector"));
        formData.append("nombres",dataForm.get("nombres"));
        formData.append("peliculas",dataForm.get("peliculas"));

        event.target.reset();

        const response = await fetch(ApiWebURL + "directoresupdate.php",{
            method: "POST",
            body: formData
        })

        leerServicio();
        document.querySelector("#updateModal .btn-close").click();
    }

    const deleteRow = async (event) =>{
        event.preventDefault();
        const dataForm = new FormData(event.currentTarget);

        let formData = new FormData();
        formData.append("iddirector",dataForm.get("iddirector"));

        const response = await fetch(ApiWebURL + "directoresdelete.php",{
            method: "POST",
            body: formData
        })

        leerServicio();
    }
    
    vformInsert.addEventListener("submit", (event) => insertRow(event));
    vformUpdate.addEventListener("submit", (event) => updateRow(event));
    vformDelete.addEventListener("submit", (event) => deleteRow(event));
}
directores();
  