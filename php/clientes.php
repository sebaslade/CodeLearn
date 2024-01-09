<?php
    include 'DbConnect.php';

    $textoBuscar = "";
    if(isset($_GET["textoBuscar"])){
        $textoBuscar = $_GET["textoBuscar"];
    }

    $columna = "empresa";
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

    $filaspagina = 10;
    if(isset($_GET["filaspagina"])){
        $filaspagina = $_GET["filaspagina"];
    }

    $filainicialpagina = ($numpagina - 1) * $filaspagina;

    $objDb = new DbConnect;
    $cn = $objDb->connect();
    
    $sql = "SELECT idcliente, empresa, nombres, cargo, ciudad, pais 
            FROM clientes
            WHERE $columna LIKE '%$textoBuscar%'
            ORDER BY $columna $orden
            LIMIT $filainicialpagina, $filaspagina";
    $rs = $cn->prepare($sql);
    $rs->execute();


    $rows = $rs->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rows);
?>