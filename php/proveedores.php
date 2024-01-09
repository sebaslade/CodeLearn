<?php
    include 'DbConnect.php';

    $idproducto = $_GET["idproducto"];

    $objDb = new DbConnect;
    $cn = $objDb->connect();
    
    $sql = "SELECT nombreempresa, nombrecontacto, cargocontacto,
            direccion, ciudad, pais 
            FROM proveedores
            WHERE idproducto = $idproducto
            ORDER BY nombreempresa";
    $rs = $cn->prepare($sql);
    $rs->execute();

    $rows = $rs->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rows);
?>