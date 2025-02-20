<?php
$obj = [1,2,3,4];
$number_indexed_array = [
        ["name"=>"Béla","age"=>30],
        ["name"=>"Éva","age"=>30],
        ["name"=>"Iván","age"=>90],
    ];

$key_indexed_array = [
    "#user_1"=>["name"=>"Béla","age"=>30],
    "#user_2"=>["name"=>"Éva","age"=>30],
    "#user_3"=>["name"=>"Iván","age"=>90],
];


if( isset($_POST["key"]) ){
    $response = $key_indexed_array[$_POST["key"]];
}
else{
    $response = $key_indexed_array;
}
echo json_encode( $response );
