<?php
//include("../db/db.php");
include(__DIR__ . "/../db/db.php");

$curTime = date("Y-m-d H:i");
$curTime = str_replace(" ", "T", $curTime);
//$curTime = "2025-06-03T13:05";
//echo $curTime."<br><br><br>";

$_POST["procedure"] = "listOngoingNotifications";
$sql = "CALL $_POST[procedure]('$curTime')";
$sth = $con->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$sth->execute([ ]);
$tasks = $sth->fetchAll(\PDO::FETCH_ASSOC);




foreach($tasks as $task){
    $email = $task["email"];
    $user = $task["targetUseName"];
    $date = new DateTime($task["scheduleNext"]);
    $date= $date->format('Y-m-d H:i');
    $tmpRuntime = explode(":",$date);
    $runtime = "$tmpRuntime[0]:$tmpRuntime[1]";

    $curRunNth = $task["counter"]+1;


    query(["procedureName"=>"notificationLog", "paramenters"=> "'$task[creator]','$task[id]','$task[category]','$curRunNth'"]);

    if($task["scheduleInterval"] != 0){   //Ha ismétlődik, állítsa át a következő futás idejét
        $datetime = new DateTime( $runtime );
        
        if($task["scheduleInterval"] != ""){//Ha van ismétlés
            $datetime->modify("+$task[scheduleInterval]");
            $nextRun = $datetime->format('Y-m-d H:i');
        


            $nextRunTMP = str_replace(" ", "T", $nextRun);
            query(["procedureName"=>"notificationExpand", "paramenters"=>"'$task[id]','$nextRunTMP','$curRunNth'"]);
        }

        if($email != ""){
            $message = "
                <div style='font-size:20px;margin-bottom:20px;'>Kedves <b>$task[username]</b></div>
                <div style='margin-bottom:20px;'>
                    <b>$user</b> felhasználóhoz a következő értesítést állítottad be:
                </div>
                <div>
                    <i>$task[content]</i>
                </div>
            ";
            if($nextRun != ""){
                $message .= "<div style='margin-top:20px;'>Következő értesítés ideje: <b>$nextRun</b></div>
                <div><i>Elküldve: <b>$curRunNth</b> alkalommal</i></div>";
            }




           // include("../vendor/phpmailer/sendNotification.php");
            require_once __DIR__ . "/../vendor/phpmailer/sendNotification.php";
            echo $message ."<br><br>";

        }


    }


}



function query($dataSet){
    //include("../db/db.php");
    include(__DIR__ . "/../db/db.php");
  //  var_dump($dataSet);

    $sql = "CALL $dataSet[procedureName]($dataSet[paramenters])";
    //echo $sql;

    $sth = $con->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sth->execute([ ]);
    $result = $sth->fetch(\PDO::FETCH_ASSOC);

}