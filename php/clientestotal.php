<?php
    include 'DbConnect.php';
    
    $objDb = new DbConnect;
    $cn = $objDb->connect();
    
    $sql = "SELECT count(idcliente) AS total
            FROM clientes";
    $rs = $cn->prepare($sql);
    $rs->execute();

    $rows = $rs->fetch(PDO::FETCH_ASSOC);//Lee una fila
    echo $rows["total"];//Lee el valor de la columna total de la fila actual
?>