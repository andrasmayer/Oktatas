<?php
include("../db/db.php");
$sql = "select id,jobCode from users where jwt = ?";
$sth = $con->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$sth->execute([ $_POST["jwt"] ]);
$result = $sth->fetch(\PDO::FETCH_ASSOC);

echo json_encode($result);