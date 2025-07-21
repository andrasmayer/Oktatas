<?php
function getHolyDays($birth, $chilren, $hireDate){
    $age = date("Y") - $birth;

    $holyDays = 20;
    if($age < 18){          $holyDays += 5; }
    else if($age < 25){     $holyDays += 0; }
    else if($age < 28){     $holyDays += 1; }
    else if($age < 31){     $holyDays += 2; }
    else if($age < 32){     $holyDays += 3; }
    else if($age < 35){     $holyDays += 4; }
    else if($age < 37){     $holyDays += 5; }
    else if($age < 39){     $holyDays += 6; }
    else if($age < 41){     $holyDays += 7; }
    else if($age < 43){     $holyDays += 8; }
    else if($age < 45){     $holyDays += 9; }
    else{                   $holyDays += 10; }

    if($chilren == 1){      $holyDays += 2; }
    if($chilren == 2){      $holyDays += 4; }
    if($chilren >= 3){      $holyDays += 7; }

    $curYear = date("Y");
    $hireYear = explode("-",$hireDate)[0];
    if($hireYear == $curYear){
    $date = new DateTime($hireDate);
    $yearStart = new DateTime($date->format('Y') . '-01-01');
    $yearEnd = new DateTime($date->format('Y') . '-12-31');

    $dayOfYearZeroBased = (int)$date->format('z');
    $daysInYear = (int)$yearEnd->format('z') + 1;
    $percentage = 100 - round( ($dayOfYearZeroBased / ($daysInYear - 1)) * 100);
    }
    else{
        $percentage = 100;
    }
    return round($holyDays/100 * $percentage);
}