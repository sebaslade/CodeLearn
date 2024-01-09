<?php
    $cn = new mysqli("localhost", "root", "", "empresaisil");
    /* Esta es la cadena de conexión: Servidor de base datos.
    usuario de la base de datos, contraseña, base de datos */
    $rs = $cn -> query("SELECT * FROM empresasenvios");
    
    while($row = $rs -> fetch_assoc()){
        /*
        echo "<h2>".$row["nombre"]."</h2>";
        echo "<p>".$row["telefono"]."</p>";
        */
        $res[] = $row;
    }
    echo json_encode($res);
?>