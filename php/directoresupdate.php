<?php
    include 'DbConnect.php';
    
    $iddirector = $_POST["iddirector"];
    $nombres = $_POST["nombres"];
    $peliculas = $_POST["peliculas"];

    $objDb = new DbConnect;
    $cn = $objDb->connect();
    
    $sql = "UPDATE directores 
            SET nombres='$nombres', 
            peliculas='$peliculas' 
            WHERE iddirector = $iddirector";

    $rs = $cn->prepare($sql);
    $rs->execute();
?>