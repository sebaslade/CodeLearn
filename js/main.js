const mainContent = document.getElementById("main-content");
const ApiWebURL = "https://laosdelgado.000webhostapp.com/servicioisil/";
$(function(){
    let fondoOscuro = true;
    $("#cambiarFondo").click(function(){
        //if(fondoOscuro)
        if(fondoOscuro === true){
            $("#nosotros").css("background-color","#FFFFFF")
                          .css("color","#333333");
            fondoOscuro = false;
        }
        else{
            $("#nosotros").css("background-color","#000000")
                          .css("color","#CCCCCC");
            fondoOscuro = true;
        }
    })

    $("#valores article").click(function(){
        console.log($(this).css("background-color"));
        if($(this).css("background-color") === "rgba(0, 0, 0, 0)"){
            $(this).css("background-color","rgba(0,0,0,0.1)");
        }
        else{
            $(this).css("background-color","rgba(0,0,0,0)");
        }
        //$(this) hace referencia al objeto que recibió el evento
    })

    $("#valores h2 span").click(function(){
        $("#valores article").css("background-color","rgba(0,0,0,0)");
    })

    $("section").each(function(){
        let titulo = $(this).find("h2").text();
        let identificador = $(this).attr("id"); 
        console.log(identificador);
        let itemMenu = "<li class='nav-item'>" +
            "<a class='nav-link' href='#" + identificador + "'>" + titulo + "</a>" +
            "</li>";
        $("#menu-main").append(itemMenu);
    })

    $("#galeria figure").append("<figcaption>");

    $("#galeria figure").mouseenter(function(){
        $(this).find("figcaption").stop().slideDown("slow");
        //slideDown show fadeIn
    })

    $("#galeria figure").mouseleave(function(){
        $(this).find("figcaption").stop().slideUp("slow");
        //slideUp hide fadeOut
    })

    $("#galeria figure").each(function(){
        let titulo = $(this).find("img").attr("title");
        let ruta = $(this).find("img").attr("src");
        //console.log(titulo);
        $(this).find("figcaption").html("<div><i class='bi bi-zoom-in'></i>" + titulo + "</div>");

        $(this).find("figcaption div i").click(function(){
            $("body").append("<div id='fondo-oscuro'></div>");
            $("#fondo-oscuro").append("<img src='" + ruta + "'>");
            $("#fondo-oscuro").append("<h3>" + titulo + "</h3>");
            $("#fondo-oscuro").click(function(){
                $(this).remove();
            })
        })
    })

    $("#oficinas-lista li").click(function(){
        let nombreArchivo = $(this).attr("archivo");
        //console.log(nombreArchivo);
        $("#oficinas-lista li").removeClass("active");
        $(this).addClass("active");
        fetch("oficinas/" + nombreArchivo)
            .then(response => response.text())
            .then(data => {
                console.log(data);
                $("#oficinas-contenido").html(data);
            })
    })

    const menusPagina = [
        ["menu-item-quienes","pages/nosotros.html"],
        ["menu-item-proveedores","pages/proveedores.html","pages/proveedores.js"],
        ["menu-item-empleados","pages/empleados.html","pages/empleados.js"],
        ["menu-item-tienda","pages/tienda.html","pages/tienda.js"],
        ["menu-item-carrito","pages/carrito.html","pages/carrito.js"],
        ["menu-item-marcas","pages/marcas.html","pages/marcas.js"],
        ["menu-item-clientes","pages/clientes.html","pages/clientes.js"],
        ["menu-item-directores","pages/directores.html","pages/directores.js"],
        ["menu-item-login","pages/login.html","pages/login.js"]
    ]

    menusPagina.map(item => {
        document.getElementById(item[0]).addEventListener("click", () => {
            fetch(item[1])
                .then(response => response.text())
                .then(data => {
                    //console.log(data);
                    mainContent.innerHTML = data; 
                    let script = document.createElement("script");
                    script.src = item[2];
                    mainContent.appendChild(script);
                })
        })
    })

    /*
        document.getElementById("menu-item-quienes").addEventListener("click", () => {
            fetch("pages/nosotros.html")
                .then(response => response.text())
                .then(data => {
                    //console.log(data);
                    mainContent.innerHTML = data; 
                })
        })
        
        document.getElementById("menu-item-proveedores").addEventListener("click", () => {
            fetch("pages/proveedores.html")
                .then(response => response.text())
                .then(data => {
                    //console.log(data);
                    mainContent.innerHTML = data; 
                    let script = document.createElement("script");
                    script.src = "pages/proveedores.js";
                    mainContent.appendChild(script);
                })
        })
    */

    // Leer nuestro servicio web: http://localhost/servicioisil/envios.php        000webhost:https://laosdelgado.000webhostapp.com/servicioisil/envios.php
    fetch(ApiWebURL + "envios.php")
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            llenarTablaEnvios(data)
        })

    //function llenarTablaEnvios(){}
    const llenarTablaEnvios = (data) =>{
        let contenidoTabla = "";
        data.map(item => {
            //console.log(item.nombre);
            let fila = "<tr>";
            fila +="<td>" + item.idempresaenvio + "</td>";
            fila +="<td>" + item.nombre + "</td>";
            fila +="<td>" + item.telefono + "</td>";
            fila +="</tr>";
            contenidoTabla += fila
        })
        document.getElementById("tbody-envios").innerHTML = contenidoTabla;
    }
})