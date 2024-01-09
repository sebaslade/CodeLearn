<?php
    include 'DbConnect.php';
    
    $nombres = $_POST["nombres"];
    $peliculas = $_POST["peliculas"];

    $objDb = new DbConnect;
    $cn = $objDb->connect();
    
    $sql = "INSERT INTO directores
            (nombres, peliculas) 
            VALUES('$nombres','$peliculas')";
            
    $rs = $cn->prepare($sql);
    $rs->execute();

    echo $cn->lastInsertId();
    //lastInsertId() devuelve el valor del autonumérico generado
?>