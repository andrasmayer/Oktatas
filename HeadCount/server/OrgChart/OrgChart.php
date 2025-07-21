<?php
include("../../server/db/db.php");




function getJuniors($supervisorId){
    global $con;

    $sql = "select users.id,users.id,supervisorId,userName,locationName from users 
    left join locations on locations.id = users.location
    
    where supervisorId = ? and active = 1";

    $sth = $con->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sth->execute([$supervisorId]);
    //$result = $sth->fetchAll(\PDO::FETCH_ASSOC);
    $result = $sth->fetchAll(\PDO::FETCH_UNIQUE|PDO::FETCH_ASSOC);
    return $result;

}





$result = getJuniors(30);

//echo "<b>". $result[30]["userName"] ."</b><br><br>";



$data = [
    "name"=>$result[30]["userName"],
    "title"=>"CEO",
    'children'=> [    ]
];






//$level = 0;
foreach($result as $key=>$res){
    if( $key != 30){
        $data["children"][] = [    
                                "id"=>$key,
                                'className'=> 'middle-level',
                                "name"=>$res["userName"],
                                "title"=>$res["locationName"],
                                'children'=> [    ]
        ];
    }
}


$level = 0;
$level_0 = 0;
foreach($data["children"] as $level2){
    $lvl2 = getJuniors($level2["id"]);
    foreach($lvl2 as $key=>$res){

        $data["children"][$level_0]["children"][] = [ 
              
                                "id"=>$key,
                                'className'=> 'pipeline1',
                                "name"=>$res["userName"],
                                "title"=>$res["locationName"],
                                'children'=> [    ]
        ];
    
    }
    $level_0++;

}





echo json_encode($data);