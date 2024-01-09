<?php
    include 'DbConnect.php';

    $usuario = $_POST["usuario"];
    $clave = $_POST["clave"];

    $objDb = new DbConnect;
    $cn = $objDb->connect();
    
    $sql = "SELECT * FROM clientes WHERE usuario = '$usuario'";

    $rs = $cn->query($sql);
    $rs->execute();
    
    

    $rows = $rs->fetchAll(PDO::FETCH_ASSOC);
    //if($rows){
    //$rs->rowCount() devuelve la cantidad de filas que devuelve la consultas    
    if($rs->rowCount() == 1){
        if($rows[0]["clave"] == $clave){
            unset($rows[0]["clave"]);
            unset($rows[0]["usuario"]);
            //unset elimina una columna del elemento del arreglo
            echo json_encode($rows);
        }
        else{
            echo -1;
        }
    } else{
        echo -2;
    }
?>