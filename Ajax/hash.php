<?php

$username = "Béluka";
$timeStamp = time();



$hashMethods = ["hash","md5","soap","egyéb"];
shuffle($hashMethods);

$hashed_username = md5($username);
$hashed_timeStamp = md5($timeStamp);
$finalHash = md5($hashed_username . $hashed_timeStamp);
echo "
$username $timeStamp <br>
$hashed_username$hashed_timeStamp <br>
$finalHash<br>
$hashMethods[0]
";