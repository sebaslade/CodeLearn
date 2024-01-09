<?php
    include 'DbConnect.php';
    
    $idproducto = $_GET["idproducto"];

    $objDb = new DbConnect;
    $cn = $objDb->connect();
    
    $sql = "SELECT idproducto, nombre, precio, preciorebajado, imagengrande, detalle 
            FROM productos 
            WHERE idproducto = $idproducto";
    $rs = $cn->prepare($sql);
    $rs->execute();

    $rows = $rs->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rows);
?>