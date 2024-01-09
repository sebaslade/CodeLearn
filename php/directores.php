<?php
    include 'DbConnect.php';
    
    $objDb = new DbConnect;
    $cn = $objDb->connect();
    
    $sql = "SELECT * 
            FROM directores
            ORDER BY iddirector";
    $rs = $cn->prepare($sql);
    $rs->execute();

    $rows = $rs->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rows);
?>