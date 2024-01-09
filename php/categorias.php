<?php
    include 'DbConnect.php';

    $objDb = new DbConnect;
    $cn = $objDb->connect();
    
    $sql = "SELECT categorias.idcategoria, categorias.nombre, categorias.descripcion, COUNT(idproducto) AS total
            FROM productos 
            INNER JOIN categorias ON productos.idcategoria = categorias.idcategoria
            GROUP BY categorias.idcategoria
            ORDER BY categorias.nombre";
    $rs = $cn->prepare($sql);
    $rs->execute();

    $rows = $rs->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rows);
?>