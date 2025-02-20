<?php

$myVar = 1;
$myVar2 = "Egy";
$myVar3 = true;

echo "<div>$myVar</div>";

echo "<div>$myVar $myVar2 $myVar3</div>";


//echo minta("Ez egy üzenet");

echo "<div>$myVar2 " . minta('Ez egy üzenet') . "</div>";
echo "<div>" . ( 1+123) . "</div>";
echo "<div>" . 1 . 123 ."</div>";


function minta($input){
    return $input;
}


for($i=0;$i<10;$i++){
    echo $i;
}

$ertek = 0;

while($ertek<10){
    echo "$ertek<br>";
    $ertek++;
}


