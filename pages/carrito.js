function carrito() {
    let carrito = [];
    let vbtnVaciarCarrito = document.getElementById("btnVaciarCarrito");

    const llenarCarrito = () => {
        carrito = JSON.parse(sessionStorage.getItem("carritocompras"));
        let contenidoTabla = "";
        carrito.map((item, index) => {
            //console.log(item.nombre);
            let fila = "<tr>";
            fila += "<td>" + item.idproducto + "</td>";
            fila += "<td>" + item.nombre + "</td>";
            fila += "<td class='text-end'>" + "S/. " + Number(item.precio).toFixed(2) + "</td>";
            fila += "<td class='text-end'><input type='number' class='form-control text-end caja-cantidad'" + "  min='1' posicion='" + index +"'  value='" + item.cantidad + "'></td>";
            fila += "<td class='text-end'>" + "S/. " + Number(item.precio * item.cantidad).toFixed(2) + "</td>";
            fila += "<td class='text-center'><i class='bi bi-x-lg btnEliminar' idproducto=" + item.idproducto + " title='Eliminar'></i></td>";
            fila += "</tr>";
            contenidoTabla += fila
        });
        document.getElementById("tbody-carrito").innerHTML = contenidoTabla;

        let botonesEliminar = document.querySelectorAll("#tbody-carrito .btnEliminar");
        botonesEliminar.forEach(itembtnEliminar => {
            itembtnEliminar.addEventListener("click", (event) => EliminarItemCarrito(event))
        });

        let cajasCantidad = document.querySelectorAll("#tbody-carrito .caja-cantidad")
        cajasCantidad.forEach(itemCajaCantidad => {
            itemCajaCantidad.addEventListener("change",(event) => actualizarCantidad(event))
        })
    }

    const actualizarCantidad = (event) => {
        console.log(event.target.getAttribute("posicion") + " ---- " + event.target.value);
        let posicion = event.target.getAttribute("posicion");
        let cantidad = event.target.value
        carrito[posicion].cantidad = cantidad;
        sessionStorage.setItem("carritocompras",JSON.stringify(carrito));
        llenarCarrito();
        calcularTotal();
    }

    const EliminarItemCarrito = (event) => {
        let idproducto = event.target.getAttribute("idproducto");
        let carritoMenos = carrito.filter(item => item.idproducto != Number(idproducto));
        sessionStorage.setItem("carritocompras",JSON.stringify(carritoMenos));
        llenarCarrito();
        calcularTotal();
    }

    const calcularTotal = () => { 
        let suma = 0;
        /*  
        for (let i = 0; i < carrito.length; i++) {
            suma += carrito[i].precio * carrito[i].cantidad;
        }
        */
        suma = carrito.reduce((total, fila) => total + fila["precio"]*fila["cantidad"], 0);
        document.getElementById("total-carrito").innerHTML = "S/ " + Number(suma).toFixed(2);
    }

    vbtnVaciarCarrito.addEventListener("click", () => {
        sessionStorage.removeItem("carritocompras");
        document.getElementById("tbody-carrito").innerHTML = "";
        document.getElementById("total-carrito").innerHTML = "";
    })

    llenarCarrito();
    calcularTotal();
}
carrito();