<?php
include("../db/pdo_connect.php");



if( isset($_POST["userName"])  && isset($_POST["passWord"])  ){

    $sql = "select * from users where userName = ? and passWord = ?";
    $sth = $con->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sth->execute([ $_POST["userName"], md5( $_POST["passWord"] )]);
    $result = $sth->fetch(\PDO::FETCH_ASSOC);
    echo json_encode( $result);


/*
    $sql = "select count(*) from users where email = ?";
    $sth = $con->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sth->execute([ $_POST["userName"], $_POST["passWord"]]);
    $exists = $sth->fetch(\PDO::FETCH_COLUMN,0);
    if($exists > 0){
        echo "Ez az email cím már foglalt";
    }
    else{
        //adat beszúrása
    }

*/

}
