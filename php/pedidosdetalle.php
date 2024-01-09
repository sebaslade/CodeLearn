<?php
    include 'DbConnect.php';
    
    $idpedido = $_POST["idpedido"];

    $objDb = new DbConnect;
    $cn = $objDb->connect();
    
    $sql = "SELECT pedidosdetalles.idproducto, productos.nombre as descripcion, 
            pedidosdetalles.precio, cantidad, 
            pedidosdetalles.precio * cantidad as subtotal 
            FROM pedidosdetalles 
            INNER JOIN productos 
            ON pedidosdetalles.idproducto = productos.idproducto 
            WHERE idpedido = $idpedido";
    $rs = $cn->prepare($sql);
    $rs->execute();

    $rows = $rs->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rows);
?>