<?php
    include 'DbConnect.php';
    
    $iddirector = $_POST["iddirector"];

    $objDb = new DbConnect;
    $cn = $objDb->connect();
    
    $sql = "DELETE FROM directores 
            WHERE iddirector = $iddirector";

    $rs = $cn->prepare($sql);
    $rs->execute();

?>