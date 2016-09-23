<?php
session_start();
header('Access-Control-Allow-Origin: http://localhost:8100');
header('Access-Control-Allow-Methods: POST, GET');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if(isset($_POST['id']) && !empty($_POST['id']))
{

	$id = htmlspecialchars($_POST['id']);
	$bd = new PDO('mysql:host=localhost;dbname=test;charset=utf8', 'root', '');
	$req = $bd->prepare('SELECT * FROM commerce WHERE id = ? LIMIT 10');
	$req->execute(array($id));
	$donnees = $req->fetchall(PDO::FETCH_OBJ);
	$data = json_encode($donnees);
	echo $data;

}

?>