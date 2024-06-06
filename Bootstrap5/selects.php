<?php


$selectList = [
    "s1"=>[
        "0"=>"Kérlek válassz",
        "1"=>"Nem tudom",
        "2"=>"Mégis tudom"
    ],
    "s2"=>[
        "0"=>"Kérlek válassz",
        "1"=>"András",
        "2"=>"Béla"
    ],
    "s3"=>[
        "0"=>"Kérlek válassz",
        "1"=>"Szeret",
        "2"=>"Nem szeret"
    ]



];

echo json_encode($selectList);
