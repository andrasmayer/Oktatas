<link href="../../../vendor/bootstrap-5.0.2-dist/css/bootstrap.min.css" rel="stylesheet">
<script src="../../../vendor/bootstrap-5.0.2-dist/js/bootstrap.bundle.min.js"></script>

<style>
.cellSize-1{
    min-height:45px;
    min-width:45px;
}
.cellSize-2{
    min-height:75px;
    min-width:75px;
}
.cellSize-3{
    min-width:140px;
    min-height:140px;
}




.btn-holiday{
    background-color:#4fcfd1;
}
.btn-mandatoryLeave{
    background-color:#58ed7d;
}
.btn-availableLastYearHolyDays{
    background-color:#e3cf3b;
  
}
</style>


<?php
include("./holydayRules.php");
include("../../db/db.php");












class Calendar{
    public function __construct() {
        global $_GET;
        global $con;
        $this->con = $con;
        $this->colors = ["bg-light","bg-success","bg-primary","bg-danger","bg-warning","btn-holiday","btn-mandatoryLeave","bg-restDay"];
        $this->month = isset($_GET["m"]) ? $_GET["m"] : date("m");
        $this->year = isset($_GET["y"]) ? $_GET["y"] : date("Y");
                $this->createCalendar();        //$this->yearCalendar
        echo "<h1>" . ($this->year). "  ". ($this->month) .  "</h1>";

    }
    public function  empList(){
        $sql = "CALL list_users(1)";
        $sth = $this->con->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $sth->execute([ ]);
        $this->emps = $sth->fetchAll(\PDO::FETCH_ASSOC);
        $sth->closeCursor();
        foreach($this->emps as $index=>$emp){
            $this->empData($index);
            $this->getYearData($index);

            $this->emps[$index]["holydayTotal"] = getHolyDays($emp["birthYear"], $emp["childCount"], $emp["hireDate"]);




            if( $emp["prevHolydays"] > 0){
                $sql = "CALL getHolydaysBeforeJan8(1)";
                $sth = $this->con->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                $sth->execute([ ]);
                $holydaysTillJan8 = $sth->fetch(\PDO::FETCH_COLUMN);
                $sth->closeCursor();
                //$this->emps[$index]["holydayTotal"] += $holydaysTillJan8;
            }
        }
        echo $this->toTable($this->month);


    }
    public function empData($index){
        $uid = $this->emps[$index]["id"];
       
        $sql = "CALL empCore('$uid','$this->year')";
        $sth = $this->con->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $sth->execute([ ]);
        $data =  $sth->fetch(\PDO::FETCH_ASSOC);
        $sth->closeCursor();

        foreach($data as $key=>$value){
            $this->emps[$index][$key] = $value;

        }

        $sql = "CALL getSickDaysThisYear('$uid')";
        $sth = $this->con->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $sth->execute([ ]);
        $this->emps[$index]["sickThisYear"] =  $sth->fetch(\PDO::FETCH_COLUMN,0);
        $sth->closeCursor();

    }


    public function createCalendar(){
        $weekdayMap = [
            'Monday'    => ['short' => 'Hét',  'long' => 'Hétfő'],
            'Tuesday'   => ['short' => 'Kedd', 'long' => 'Kedd'],
            'Wednesday' => ['short' => 'Sze',  'long' => 'Szerda'],
            'Thursday'  => ['short' => 'Csü',  'long' => 'Csütörtök'],
            'Friday'    => ['short' => 'Pén',  'long' => 'Péntek'],
            'Saturday'  => ['short' => 'Szo',  'long' => 'Szombat'],
            'Sunday'    => ['short' => 'Vas',  'long' => 'Vasárnap'],
        ];

        $start = new DateTime("$this->year-01-01");
        $end = new DateTime("$this->year-12-31");
        $interval = new DateInterval('P1D'); // napi léptetés
        $period = new DatePeriod($start, $interval, $end->modify('+1 day'));

        $days = [];

        foreach ($period as $date) {
            $key = $date->format('Y-m-d');
            $month = $date->format('m');
            $day = $date->format('d');
            $dayNo = $date->format('w');
            
            $timestamp = $date->getTimestamp();
            $dayShort = $weekdayMap[strftime('%A', $timestamp)]["short"];
            $dayLong = $weekdayMap[strftime('%A', $timestamp)]["long"];


            $days[$key] = [
                'year' => (int)$date->format('Y'),
                'month' => $month,
                'day' => $day,
                'short'=> $dayShort,
                'long'=> $dayLong,
                'isWeekEnd'=> in_array($dayNo, [0,6])
            ];
        }       
        $this->yearCalendar = $days;
    }



    public function getYearData($index){
        $uid = $this->emps[$index]["id"];
        for($i=1; $i<=12; $i++){
            $month = 1;
            $sql = "CALL getRegisterByUser('$uid','$this->year','$i')";
            $sth = $this->con->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            $sth->execute([ ]);
            $data =  $sth->fetchAll(\PDO::FETCH_ASSOC);
            
            foreach($data as $day){
                $data_refactored[$day["date"]] = [ "type"=>$day["type"] ];
            }

            $this->emps[$index]["calendar"] = [];
            foreach($this->yearCalendar as $day=>$props){
                $this->emps[$index]["calendar"][$day] =  isset($data_refactored[$day]) ? $data_refactored[$day] : [ "type"=>0 ];
            }
        }
            $sth->closeCursor();

    }

    public function getCalendar(){
        foreach($this->emps as $emp){
            var_dump($emp);
            echo "<br><br>";
        }
    }
    public function toTable($month){
        if($month < 10 && $month[0] != 0){ $month = "0$month"; }
        $month .= "-";
        $thead = "<th class='cellSize-3'>Név</th><th class='cellSize-3'>Felettes</th>" ;       
        foreach($this->yearCalendar as $day=>$row){
            if (str_contains($day, $month)) {

                

                $color = $row["day"] % 2 == 0 ? "bg-secondary text-light" : "bg-light text-dark";
                $thead .= "<th class='cellSize-1 h6 text-center $color'>
                            <div>$row[short]</div>
                            <div>$row[month]/$row[day]</div>
                        </th>";
            }
        }
        
        $thead .= " <th class='cellSize-2 bg-light'>Keret</th>
                    <th class='bg-light'>M</th>
                    <th class='bg-light'>FSZ</th>
                    <th class='bg-light'>BSZ</th>
                    <th class='bg-light'>TP</th>
                    <th class='bg-light'>FNSZ</th>
        ";

        
        $tbody = "";
        foreach($this->emps as $emp){
            $work = 0;
            $holyDay = 0;
            $sick = 0;
          
            $notPaid = 0;

            $tbody .=   "<tr class='userRow' user='$emp[id]'>
                            <td>$emp[userName]</td>
                            <td>$emp[supervisorName]</td>";
            $calendar = $emp["calendar"];

            foreach($calendar as $day=>$cal){
                if (str_contains($day, "-$month")) {
                    
                    if($cal["type"] == 1){ $work++; }
                    else if(in_array($cal["type"], [2,6])){ $holyDay++; }
                    else if($cal["type"] == 3){ $sick++; }



                    $color = $this->colors[$cal["type"]];
                    if($cal["type"] == 0){
                        $color =  $this->yearCalendar[$day]["isWeekEnd"] == true ? "bg-dark" : "";
                    }

                    $tbody .=   "<td>
                                    <button data-id='$emp[id]' data-date='$day' data-state='$cal[type]' class='w-100 controller $color  dayTrigger' style='min-height:45px;'>
                                    &nbsp;</button>
                                </td>";
                }
            }
 
            /*
            $tappenz = 0;
            if($emp["sickThisYear"] > 15 && $sick > 0){
                if($emp["sickThisYear"] - 15 - $sick >0){
                    $tappenz = $sick;
                }
                //$tappenz = $emp["sickThisYear"] - 15;

            }
*/

            $tappenz    =   $emp["sickThisYear"];
            $tbody .= "
                <td>" . ($emp["holydayTotal"] - $emp["usedHolyDay"]) ."/<b>$emp[holydayTotal]</b></td>
                <td>$work</td>
                <td>$holyDay</td>
                <td>$sick</td>
                <td><b>$tappenz</b></td>
                <td>$notPaid</td>
            </tr>";
        }


        return "<table class='text-center'>
                    <thead class='sticky-top' style='top:50px;z-index:1000;'>
                        <tr>$thead</tr>
                    </thead>
                    <tbody>$tbody</tbody>
                </table>";
                
    }


}



$cal = new Calendar();

//var_dump($cal->yearCalendar);


$cal->empList();

foreach($cal->emps[0] as $key=>$value){
    if($key != "calendar"){
        echo "$key : $value<br>";
    }
}