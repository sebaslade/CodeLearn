<?php
    include 'DbConnect.php';

    $objDb = new DbConnect;
    $cn = $objDb->connect();
    
    $sql = "SELECT * FROM empresasenvios";
    $rs = $cn->prepare($sql);
    $rs->execute();

    $rows = $rs->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rows);
?>