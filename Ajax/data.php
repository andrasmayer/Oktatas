<?php
$dsn = 'mysql:dbname=training;host=127.0.0.1';
$user = 'root';
$password = '';

try {
    $con = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
$con->exec("set names utf8");






$sql = "select count(*) from mngmv where username like ?";
$sth = $con->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$sth->execute([ "%$_GET[username]%" ]);
$total = $sth->fetch(\PDO::FETCH_COLUMN,0);



$sql = "select * from mngmv where username like ? limit 3";
$sth = $con->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$sth->execute([ "%$_GET[username]%" ]);
$result = $sth->fetchAll(\PDO::FETCH_ASSOC);

echo json_encode(["total"=>$total,"remaining"=>$total-count($result),"data"=>$result]);
