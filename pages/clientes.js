function clientes() {
    let numpagina = 1;
    let totalFilas = 0;
    let totalPaginas = 0;
    let filasPagina = 10;

    fetch(ApiWebURL + "clientestotal.php")
        .then(response => response.text())
        .then(data => {
            totalFilas = Number(data);
            totalPaginas = Math.ceil(totalFilas / filasPagina);
            console.log(totalFilas);
            dibujarBotonesPagina();
        })

    const dibujarBotonesPagina = () => {
        let botonesPaginacion = "<li class='page-item'><a class='page-link' href='#'>Anterior</a></li>"
        for (let i = 1; i <= 10; i++) {
            let fila = "<li class='page-item'><a class='page-link' href='#'>"
                + i + "</a></li>";
            botonesPaginacion += fila;
        }
        botonesPaginacion += "<li class='page-item'><a class='page-link' href='#'>Siguiente</a></li>"
        document.getElementById("paginacion").innerHTML = botonesPaginacion

        let botonesNavegacion = document.querySelectorAll("#paginacion li a")
        botonesNavegacion.forEach((botonNavegacion, index) => {
            botonNavegacion.addEventListener("click", () => {
                if (index === 0) {
                    retrocederPagina();
                }
                else if (index == botonesNavegacion.length - 1) {
                    avanzarPagina();
                } else {
                    console.log(index)
                }
            })
        })
    }

    const leerServicio = () => {
        fetch(ApiWebURL + "clientes.php?numpagina=" + numpagina)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                llenarTablaClientes(data)
            })
    }

    leerServicio();

    const llenarTablaClientes = (data) => {
        let contenidoTabla = "";
        data.map(item => {
            //console.log(item.nombre);
            let fila = "<tr>";
            fila += "<td>" + item.idcliente + "</td>";
            fila += "<td>" + item.empresa + "</td>";
            fila += "<td>" + item.nombres + "</td>";
            fila += "<td>" + item.cargo + "</td>";
            fila += "<td>" + item.ciudad + "</td>";
            fila += "<td>" + item.pais + "</td>";
            fila += "</tr>";
            contenidoTabla += fila
        });
        document.getElementById("tbody-clientes").innerHTML = contenidoTabla;
    }

    let vtxtTextoBuscar = document.getElementById("txtTextoBuscar");
    let vbtnBuscar = document.getElementById("btnBuscar");
    let columna = "empresa";
    let tipoOrden = "ASC";

    vbtnBuscar.innerText = "Buscar por " + columna;

    vbtnBuscar.addEventListener("click", () => {
        let textoBuscar = vtxtTextoBuscar.value;
        fetch(ApiWebURL + "clientes.php?textoBuscar=" + textoBuscar
            + "&columna=" + columna + "&orden=" + tipoOrden)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                llenarTablaClientes(data);
            })
    });

    const seleccionarColumna = (event) => {
        if (columna === event.target.getAttribute("columna")) {
            if (tipoOrden === "ASC") {
                tipoOrden = "DESC";
            }
            else {
                tipoOrden = "ASC";
            }
        }
        else {
            tipoOrden = "ASC";
        }
        columna = event.target.getAttribute("columna");
        let etiquetaColumna = event.target.innerText
        vbtnBuscar.innerText = "Buscar por " + etiquetaColumna;

        let encaberzadosColumna = document.querySelectorAll("#encabezado-tabla th");
        encaberzadosColumna.forEach(item => {
            item.style.backgroundColor = "transparent";
        });
        event.target.style.backgroundColor = "#EEEEEE";
        fetch(ApiWebURL + "clientes.php?columna=" + columna + "&orden=" + tipoOrden)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                llenarTablaClientes(data);
            })
    }

    const retrocederPagina = () => {
        if (numpagina > 1) {
            numpagina--;
            leerServicio();
        }
    }

    const avanzarPagina = () => {
        if (numpagina < totalPaginas) {
            numpagina++;
            leerServicio();
        }
    }

    let encabezadosColumna = document.querySelectorAll("#encabezado-tabla th");
    encabezadosColumna.forEach(item => {
        item.addEventListener("click", (event) => seleccionarColumna(event))
    });
}
clientes();