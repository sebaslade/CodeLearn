<?php
    include 'DbConnect.php';
    
    $idcategoria = $_GET["idcategoria"];

    $objDb = new DbConnect;
    $cn = $objDb->connect();
    
    $sql = "SELECT idproducto, nombre, precio, preciorebajado, imagenchica 
            FROM productos 
            WHERE idcategoria = $idcategoria
            ORDER BY nombre";
    $rs = $cn->prepare($sql);
    $rs->execute();

    $rows = $rs->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rows);
?>