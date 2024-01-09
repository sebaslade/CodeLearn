<?php 
    header("Access-Control-Allow-Origin: *");

    class DbConnect{
        public function connect(){
            $conn = new PDO('mysql:host=localhost;dbname=id20808767_laosdelgado29',
                            'id20808767_laosdelgado29','Laosdelgado292005-');
            $conn->query("SET CHARACTER SET utf8");
            return $conn;
        }
    }
?>