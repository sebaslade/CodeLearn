function marca(){
    fetch(ApiWebURL + "proveedores.php") 
    //etch("http://localhost/servicioisil/proveedores.php")                   000webhost: https://laosdelgado.000webhostapp.com/servicioisil/proveedores.php
        .then(response => response.json())
        .then(data => {
            console.log(data);
            llenarLista(data);
        })  
    
    const llenarLista = (data) => {
        let contenidoLista = "";
        data.map(item => {
            let itemLista = '<li class="list-group-item" title="' + item.nombreempresa + '" data-id="' + item.idproveedor + '"><span>'
                    itemLista += item.nombrecontacto + " " + '</span></li>'
                    contenidoLista += itemLista;
        });
        document.getElementById("contenedorLista").innerHTML = contenidoLista;
            let itemsProveedor = document.querySelectorAll("#contenedorLista li");
                itemsProveedor.forEach(itemLista=>{
                itemLista.addEventListener("click", (event) => seleccionarProveedor(event));
        })
    }

    const seleccionarProveedor = (event) => {
        let idproveedor = event.currentTarget.getAttribute("data-id");
        let itemsProveedor = document.querySelectorAll("#contenedorLista li");
            itemsProveedor.forEach(itemLista=>{
            itemLista.classList.remove("active");
        })
        event.currentTarget.classList.add("active");
        leerProveedor(idproveedor);
    }

    const leerProveedor = (idproveedor) => {
        fetch(ApiWebURL + "productosdelproveedor.php?idproveedor=" + idproveedor) 
        //fetch("http://localhost/servicioisil/productosdelproveedor.php?idproveedor="     000webhost:https://laosdelgado.000webhostapp.com/servicioisil/productosdelproveedor.php?idproveedor=
            .then(response => response.json())
            .then(data => {
                console.log(data);
                llenarTablaMarcas(data)
        })
    }

    const llenarTablaMarcas = (data) => {
        let contenidoTabla = "";
        data.map((item) => {
            let fila = "<tr>";
            fila += "<td>" + item.idproducto + "</td>";
            fila += "<td>" + item.nombre + "</td>";
            fila += "<td>" + item.detalle + "</td>";
            fila += "<td>" + "S/ " + Number(item.precio).toFixed(2) + "</td>";
            fila += "</tr>";
            contenidoTabla += fila;
        });
        document.getElementById("tbody-marcas").innerHTML = contenidoTabla;
    }
}
marca();