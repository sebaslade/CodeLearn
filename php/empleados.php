<?php
    include 'DbConnect.php';
    
    $objDb = new DbConnect;
    $cn = $objDb->connect();
    
    $sql = "SELECT apellidos, nombres, cargo, foto 
            FROM empleados
            ORDER BY apellidos, nombres";
    $rs = $cn->prepare($sql);
    $rs->execute();

    $rows = $rs->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rows);
?>