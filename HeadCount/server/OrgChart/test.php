<?php
include("../../server/db/db.php");






$sql = "select users.id,users.userName,count(*) as total from users 
left join users juniors on juniors.supervisorId = users.id
where users.location = 3 ";
$sth = $con->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$sth->execute([]);
$ceo = $sth->fetch(\PDO::FETCH_UNIQUE|PDO::FETCH_ASSOC);


$tree = [
    "name"=>$ceo["userName"],
    "title"=>"CEO",
    'children'=> [    ],
    'className'=>'Ceo'
    
];



$sql = "select
    

users.id,
users.id,
users.userName as name,
users.supervisorId,
locations.locationName as title,
locations.locationName as className



from users 

left join locations on locations.id = users.location where  users.active = 1 and users.supervisorId != users.id";
$sth = $con->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$sth->execute([]);
$emps = $sth->fetchAll(\PDO::FETCH_UNIQUE|PDO::FETCH_ASSOC);





$level = 0;

$list = [];

foreach($emps as $e){
    $e["children"] = [];
    $list[$e["supervisorId"]][] = $e;
}


foreach($list[30] as $e){
    $tree["children"][]  = $e;
}

//  vump($tree["children"]);

foreach($tree["children"] as $key=>$emp){
    $tree["children"][$key]["children"] = $list[$emp["id"]];
    foreach($tree["children"][$key]["children"] as $key2 => $lvl2){
        



        if( isset($list[$lvl2["id"]]) ){
                //$tree["children"][$key]["children"][$key2]["children"] = $list[$lvl2["id"]];



                $tree["children"][$key]["children"][$key2]["children"] = $list[$lvl2["id"]];
        }
        foreach($tree["children"][$key]["children"][$key2]["children"] as $key3 => $lvl3){

            if( isset($list[$lvl3["id"]]) ){
                    //$tree["children"][$key]["children"][$key2]["children"] = $list[$lvl2["id"]];
                    $tree["children"][$key]["children"][$key2]["children"][$key3]["children"] = $list[$lvl3["id"]];
            }
        }

    }
}




echo json_encode($tree);