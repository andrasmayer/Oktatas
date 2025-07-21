<?php
include("../db/db.php");

$_POST["parameters"] = str_replace("Ł", "&", $_POST["parameters"]);

if( isset($_POST["parameters"]) && $_POST["parameters"] != "" ){    $sql = "CALL $_POST[procedure]($_POST[parameters])"; }
else{ $sql = "CALL $_POST[procedure]()"; }






$sth = $con->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$sth->execute([ ]);
if( $_POST["mode"] == "fetchAll"){    $result = $sth->fetchAll(\PDO::FETCH_ASSOC);}
else if( $_POST["mode"] == "fetch"){    $result = $sth->fetch(\PDO::FETCH_ASSOC);}
else if( $_POST["mode"] == "fetchColumn"){    $result = $sth->fetch(\PDO::FETCH_COLUMN,0);}
else if( $_POST["mode"] == "fetchColumnAll"){    $result = $sth->fetchAll(\PDO::FETCH_COLUMN,0);}
else if( $_POST["mode"] == "fetch_unique"){    $result = $sth->fetchAll(\PDO::FETCH_UNIQUE|PDO::FETCH_ASSOC);}
if( isset($result) ){    echo json_encode($result);}
