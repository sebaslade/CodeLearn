<?php

class DbConnect
{
	private $server = 'localhost';
	private $dbname = 'empresaisil';
	private $user = 'root';
	private $pass = '';

	public function connect()
	{
		try {
			$conn = new PDO('mysql:host=' . $this->server . ';dbname=' . $this->dbname, $this->user, $this->pass);
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$conn->query("SET CHARACTER SET utf8");
			return $conn;
		} catch (\Exception $e) {
			echo "Database Error: " . $e->getMessage();
		}
	}
}

$objDb = new DbConnect;
$conn = $objDb->connect();

$sql = "SELECT * FROM categorias";
$stmt = $conn->prepare($sql);
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
$response = json_encode($rows, JSON_UNESCAPED_UNICODE);
echo $response;
$cn = null;
?>