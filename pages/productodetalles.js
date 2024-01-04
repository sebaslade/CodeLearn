function productodetalles() {
    let scriptElement = document.currentScript;
    let idproducto = scriptElement.getAttribute("idproducto");
    fetch(ApiWebURL + "productodetallecompleto.php?idproducto=" + idproducto)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById("nombre-producto-detalle").innerText = data[0].nombre;
            let imagenProducto = "";
            if(data[0].imagengrande !== null){
                imagenProducto = ApiWebURL + data[0].imagengrande; 
            }
            else{
                imagenProducto = "images/nofoto.png";
            }  
            document.getElementById("imagen-producto-detalle").setAttribute("src",imagenProducto);

            let precioVistaPrevia = (data[0].preciorebajado == 0 
                ? "S/. " + Number(data[0].precio).toFixed(2)
                : "S/. " + Number(data[0].preciorebajado).toFixed(2)) 
            + "<span class='precio-tachado'>" + (data[0].preciorebajado == 0 
                ? ""
                : "S/. " + Number(data[0].precio).toFixed(2)) 
            + "</span>"        
            document.getElementById("precio-producto-detalle").innerHTML = precioVistaPrevia;
            document.getElementById("stock-producto-detalle").innerText = data[0].unidadesenexistencia;
            document.getElementById("detalle-producto-detalle").innerText = data[0].detalle;
            document.getElementById("proveedor-producto-detalle").innerText = data[0].proveedor;
            document.getElementById("contacto-producto-detalle").innerText = data[0].contacto;
            document.getElementById("pais-producto-detalle").innerText = data[0].pais;
            document.getElementById("telefono-producto-detalle").innerText = data[0].telefono;
            document.getElementById("descripcion-producto-detalle").innerHTML = data[0].descripcion;
    })
}
productodetalles();