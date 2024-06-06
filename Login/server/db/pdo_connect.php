<?php
$dsn = 'mysql:dbname=minta;host=127.0.0.1';
$user = 'root';
$password = '';

try {
    $con = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
$con->exec("set names utf8");


/*
//Insert with prepare
$sql = "INSERT INTO fqa_error(empNo,created,sn,creator,relevant) VALUES (?,?,?,?,?)";
$stmt= $con->prepare($sql);
$stmt->execute([$_POST['empNo'],date("Y-m-d H:i:s"),"$_POST[SN]",$_SESSION["dolszam"],$_POST["relevant"]]);
	

//Update with prepare	
$sql = "UPDATE users SET name=?, surname=?, sex=? WHERE id=?";
$stmt= $con->prepare($sql);
$stmt->execute([$name, $surname, $sex, $id]);
	
	

//Fetch modes simplified
$sql = "show tables";
$result = $con->query($sql)->fetchALL(\PDO::FETCH_OBJ);
$result = $con->query($sql)->fetchALL(\PDO::FETCH_ASSOC);
$result = $con->query($sql)->fetchALL(\PDO::FETCH_COLUMN,0);
	
	
//Select with prepare	
$sql = "select max(id) from projectManagement_projects where creator=?";
$sth = $con->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$sth->execute([$_SESSION["dolszam"]]);
$result = $sth->fetchAll(\PDO::FETCH_COLUMN,0);
	
*/