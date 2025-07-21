<?php


$dsn = 'mysql:dbname=application;host=127.0.0.1';
$user = 'db_user';
$password = '1Btm2';

//$password = '6pnpd7pghz8mpznp';

try {
    $con = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}


$con->exec("set names utf8");
