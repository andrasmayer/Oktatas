<?php
include("../db/db.php");

$sql = "select userName from users where loginName = ? and passWord = ?";
$sth = $con->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$sth->execute([ md5($_POST["loginName"]), md5($_POST["passWord"]) ]);
$result = $sth->fetch(\PDO::FETCH_COLUMN,0);

if($result != false){
    $jwt = md5($_POST["loginName"]) . time();
    $sql = "update users set jwt = ?  where loginName = ? and passWord = ?";
    $sth = $con->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sth->execute([ $jwt,md5($_POST["loginName"]), md5($_POST["passWord"]) ]);
    $result = ["userName"=>$result,"jwt"=>$jwt];
}

echo json_encode($result);
