<?php
$OS = PHP_OS;
$ip = null;
$runByDocker = file_exists('/.dockerenv');


if($OS == "Linux"){
    if($runByDocker == true){
        $ip = gethostbyname('host.docker.internal');
    }
    else{
        $output = shell_exec('ip a');
        if ($output !== null && !empty($output)) {
            if (preg_match('/inet (\d+\.\d+\.\d+\.\d+)/', $output, $matches)) {
                $ip = $matches[1];
            }
        }
    }
}
else if($OS == "WINNT"){
    $output = shell_exec('ipconfig');
    if ($output !== null && !empty($output)) {
        if (preg_match('/IPv4 Address[^\d]*(\d+\.\d+\.\d+\.\d+)/', $output, $matches)) {
            $ip = $matches[1];
        }
    } 
}

echo json_encode(["ipv4"=>$ip, "OS"=>$OS,"runByDocker"=>$runByDocker]);