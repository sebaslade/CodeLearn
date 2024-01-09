<?php
    include 'DbConnect.php';
    
    $objDb = new DbConnect;
    $cn = $objDb->connect();
    
    $sql = "SELECT count(idproveedor) AS total
            FROM proveedores";
    $rs = $cn->prepare($sql);
    $rs->execute();

    $rows = $rs->fetch(PDO::FETCH_ASSOC); //Lee una fila
    echo $rows["total"]; //Lee el valor de la columna total de la fila actual
?>