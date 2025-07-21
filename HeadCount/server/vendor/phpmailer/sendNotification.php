<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
//require_once "vendor/autoload.php"; //PHPMailer Object 
require_once __DIR__ . "/vendor/autoload.php";


$mail = new PHPMailer();
$mail->CharSet = 'UTF-8';
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';  // Your SMTP server
$mail->SMTPAuth = true;             // Enable SMTP authentication
$mail->Username = 'jelenlet.salisbury@gmail.com'; // SMTP username
$mail->Password = 'wisj vytp sifn cmkh';    // SMTP password
$mail->SMTPSecure = 'tls';          // Enable TLS encryption
$mail->Port = 587;                  // TCP port to connect to
$mail->SetFrom('andras.mayer@salisburykft.hu', 'Emlékeztető');
$mail->Subject = 'Munkaidő nyilvántartó emlékeztető'; 
$mail->addAddress($email);//Forrás oldalon deklarált
$mail->IsHTML(true);
$mail->Body = $message;//Forrás oldalon deklarált


//$mail->SMTPDebug = 2;  // Enable verbose debug output


if (!$mail->send()) {
    echo "serverError";
} else {
    echo 'mailSent';
}