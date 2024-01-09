<?php
    include 'DbConnect.php';
    
    $idproducto = $_GET["idproducto"];

    $objDb = new DbConnect;
    $cn = $objDb->connect();
    
    $sql = "SELECT idproducto, productos.nombre, precio, preciorebajado, productos.descripcion, imagengrande, 
	        detalle, unidadesenexistencia, categorias.nombre as categoria,
            proveedores.nombreempresa as proveedor, proveedores.nombrecontacto as contacto,
            proveedores.telefono, proveedores.pais
            FROM productos
            INNER JOIN categorias ON productos.idcategoria = categorias.idcategoria
            INNER JOIN proveedores ON productos.idproveedor = proveedores.idproveedor
            WHERE idproducto = $idproducto";
    $rs = $cn->prepare($sql);
    $rs->execute();

    $rows = $rs->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($rows);
?>