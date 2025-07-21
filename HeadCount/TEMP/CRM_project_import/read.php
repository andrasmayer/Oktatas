<?php
include("../../server/db/db.php");

$pid =  39;
$handle = fopen("data.txt", "r");
if ($handle) {
    while (($line = fgets($handle)) !== false) {

        echo "$line<br>";

$sql = "INSERT INTO `crm_projects_subprojects`(
    `pid`, `subProjectName`,`creator`, `details`)
VALUES (?,?,?,?)";
//$sth = $con->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
//$sth->execute([$pid, $line, 1, '{"tasks":[],"status":{}}']);


    }

    fclose($handle);
}


/*
    Múzeumok:
Damjanich   //Kész
Déri        
Rippl       //Kész
Jósa        //Kész
SZIKM       //Kész

*/