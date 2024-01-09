<?php
    include 'DbConnect.php';
    
    $idpedido = $_POST["idpedido"];

    $objDb = new DbConnect;
    $cn = $objDb->connect();
    
    $sql = "SELECT pedidos.*, CONCAT(empleados.nombres, ' ', empleados.apellidos) as empleado,
            empresasenvios.nombre as courier, empresasenvios.telefono as telefonocourier,
            clientes.nombres, SUM(pedidosdetalles.precio * pedidosdetalles.cantidad) as total
            FROM pedidos
            INNER JOIN empleados ON pedidos.idempleado = empleados.idempleado 
            INNER JOIN empresasenvios ON pedidos.idempresaenvio = empresasenvios.idempresaenvio
            INNER JOIN clientes ON pedidos.idcliente = clientes.idcliente 
            INNER JOIN pedidosdetalles ON pedidos.idpedido = pedidosdetalles.idpedido
            WHERE pedidos.idpedido = $idpedido";
    $rs = $cn->prepare($sql);
    $rs->execute();

    $rows = $rs->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rows);
?>