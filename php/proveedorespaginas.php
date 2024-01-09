<?php
    include 'DbConnect.php';

    $textoBuscar = "";
    if(isset($_GET["textoBuscar"])){
        $textoBuscar = $_GET["textoBuscar"];
    }

    $columna = "nombreempresa";
    if(isset($_GET["columna"])){
        $columna = $_GET["columna"];
    }

    $orden = "ASC";
    if(isset($_GET["orden"])){
        $orden = $_GET["orden"];
    }

    $numpagina = 1;
    if(isset($_GET["numpagina"])){
        $numpagina = $_GET["numpagina"];
    }

    $filaspagina = 6;
    if(isset($_GET["filaspagina"])){
        $filaspagina = $_GET["filaspagina"];
    }

    $filainicialpagina = ($numpagina - 1) * $filaspagina;

    $objDb = new DbConnect;
    $cn = $objDb->connect();
    
    $sql = "SELECT idproveedor, nombreempresa, nombrecontacto, cargocontacto,
            direccion, ciudad, pais 
            FROM proveedores
            WHERE $columna LIKE '%$textoBuscar%'
            ORDER BY $columna $orden
            LIMIT $filainicialpagina, $filaspagina";
    $rs = $cn->prepare($sql);
    $rs->execute();

    $rows = $rs->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rows);
?>