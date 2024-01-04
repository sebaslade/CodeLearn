function tienda() {
    let productosCategoria = [];
    let productoVistaRapida; 
    fetch(ApiWebURL + "categorias.php")
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            llenarLista(data)
        })

    const llenarLista = (data) => {
        let contenidoLista = "";
        data.map(item => {
            let itemLista = "<li class='list-group-item' title='" 
                + item.descripcion + "' data-id='" + item.idcategoria + "'><span>";
            itemLista += item.nombre + "</span><span class='badge rounded-pill text-bg-dark'>" + item.total + "</span></li>";
            contenidoLista += itemLista;
        });
        document.getElementById("contenedorLista").innerHTML = contenidoLista;
        let itemsCategoria = document.querySelectorAll("#contenedorLista li");
        itemsCategoria.forEach(itemLista => {
            itemLista.addEventListener("click", (event) => seleccionarCategoria(event));
        })
    }

    const seleccionarCategoria = (event) => {
        let idcategoria = event.currentTarget.getAttribute("data-id");
        let nombre = event.currentTarget.querySelector("span").innerText;
        //console.log(nombre);
        let descripcion = event.currentTarget.getAttribute("title");
        document.getElementById("categoria-nombre").innerText = nombre;
        document.getElementById("categoria-descripcion").innerText = descripcion;

        let itemsCategoria = document.querySelectorAll("#contenedorLista li");
        itemsCategoria.forEach(itemLista => {
            itemLista.classList.remove("active");
        })
        event.currentTarget.classList.add("active");
        leerProductos(idcategoria);
    }

    const leerProductos = (idcategoria) => {
        fetch(ApiWebURL + "productos.php?idcategoria=" + idcategoria)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            productosCategoria = data;
            llenarCuadricula(data)
        })
    }
    // != !== >= <= => ->

    const llenarCuadricula = (data) => {
        let contenidoCuadricula = "";
        
        data.map((item, index) => {
            let imagenProducto = "";
            if(item.imagenchica !== null){
                imagenProducto = ApiWebURL + item.imagenchica 
            }
            else{
                imagenProducto = "images/nofoto.png";
            }    

            let card = "<div class='col'>";
            card += "<div class='card h-100'>";
            card += '<figure>';        
            card += '<img src="' + imagenProducto + '" idproducto="' + item.idproducto 
                + '" class="card-img-top imagen-producto" alt="...">';
            card += '<i class="bi bi-eye vista-rapida" idproducto="' + item.idproducto 
                + '" data-bs-toggle="modal" data-bs-target="#modal-vista-rapida"></i>';
            card += '</figure>';
            card += (item.preciorebajado === "0" 
            ? ""
            : '<div class="etiqueta-oferta">' + (((Number(item.precio) - (item.preciorebajado))*100)/item.precio).toFixed(0) + "%</div>");
            card += '<div class="card-body">';
            card += '<h5 class="card-title">' + item.nombre + '</h5>';
            card += '<p class="card-text">S/. ' 
                    + (item.preciorebajado === "0" 
                        ? Number(item.precio).toFixed(2)
                        : Number(item.preciorebajado).toFixed(2) + " ")
                    + "<span class='precio-tachado'>" + (item.preciorebajado === "0"
                        ? ""
                        : "S/. " + Number(item.precio).toFixed(2))
                    + '</span><i class="bi bi-basket btnCarrito" posicion=' + index + ' title="Agregar al Carrito"></i></p>';
            card += '</div></div></div>';
            contenidoCuadricula += card;
        });
        document.getElementById("contenedorCards").innerHTML = contenidoCuadricula;

        let iconosVistaRapida = document.querySelectorAll("#contenedorCards .vista-rapida");
        iconosVistaRapida.forEach(itemVistaRapida => {
            itemVistaRapida.addEventListener("click", (event) => llenarDatosVistaRapida(event))
        });

        let imagenProductos = document.querySelectorAll("#contenedorCards .imagen-producto");
        imagenProductos.forEach(itemImagenProducto => {
            itemImagenProducto.addEventListener("click", (event) => leerProductoDetalle(event));
        })

        let botonesCarrito = document.querySelectorAll("#contenedorCards .btnCarrito");
        botonesCarrito.forEach(itembtnCarrito => {
            itembtnCarrito.addEventListener("click", (event) => agregarItemCarrito(event));
        })
    }

    const agregarAlCarrito = (itemCarrito) => {
        itemCarrito.cantidad = 1;
        itemCarrito.precio = itemCarrito.preciorebajado === "0"? Number(itemCarrito.precio) : Number(itemCarrito.preciorebajado);
        let carrito = [];

        if(sessionStorage.getItem("carritocompras")){
            carrito = JSON.parse(sessionStorage.getItem("carritocompras"));
            let index = -1;
            for(let i=0; i<carrito.length; i++){
                if(itemCarrito.idproducto === carrito[i].idproducto){
                    index = i;
                    break;
                }
            }
            if(index === -1){
                carrito.push(itemCarrito);
                sessionStorage.setItem("carritocompras", JSON.stringify(carrito));
            }
            else{
                let nCarrito = carrito[index];
                nCarrito.cantidad++
                carrito[index] = nCarrito;
                sessionStorage.setItem("carritocompras", JSON.stringify(carrito));
            }
        }
        else{
            carrito.push(itemCarrito);
            sessionStorage.setItem("carritocompras", JSON.stringify(carrito));
        }
    } 

    const agregarItemCarrito = (event) => {
        let posicion = event.target.getAttribute("posicion");
        let itemCarrito = productosCategoria[posicion];
        agregarAlCarrito(itemCarrito);
    }

    const leerProductoDetalle = (event) => {
        let idproducto = event.target.getAttribute("idproducto");
        fetch("pages/productodetalles.html")
            .then(response => response.text())
            .then(data => {
                mainContent.innerHTML = data;
                let script = document.createElement("script");
                script.setAttribute("idproducto", idproducto);
                script.src = "pages/productodetalles.js";
                mainContent.appendChild(script);
            })
    }

    const llenarDatosVistaRapida = (event) => {
        let idproducto = event.target.getAttribute("idproducto");
        fetch(ApiWebURL + "productodetalle.php?idproducto=" + idproducto)
        .then(response => response.json())
        .then(data => {
            productoVistaRapida = data[0];
            document.getElementById("titulo-vista-previa").innerText = data[0].nombre;
            let imagenProducto = "";
            if(data[0].imagengrande !== null){
                imagenProducto = ApiWebURL + data[0].imagengrande; 
            }
            else{
                imagenProducto = "images/nofoto.png";
            }  
            document.getElementById("imagen-vista-previa").setAttribute("src",imagenProducto);

            let precioVistaPrevia = (data[0].preciorebajado == 0 
                ? "S/. " + Number(data[0].precio).toFixed(2)
                : "S/. " + Number(data[0].preciorebajado).toFixed(2)) 
            + "<span class='precio-tachado'>" + (data[0].preciorebajado == 0 
                ? ""
                : "S/. " + Number(data[0].precio).toFixed(2)) 
            + "</span>"        
            document.getElementById("precio-vista-previa").innerHTML = precioVistaPrevia;
            document.getElementById("detalle-vista-previa").innerText = data[0].detalle;
            
        })
    }

    let vbtnVistaRapidaAgregarCarrito = document.getElementById("btnVistaRapidaAgregarCarrito");
    vbtnVistaRapidaAgregarCarrito.addEventListener("click", () => {
        agregarAlCarrito(productoVistaRapida);
    })
}
tienda();  