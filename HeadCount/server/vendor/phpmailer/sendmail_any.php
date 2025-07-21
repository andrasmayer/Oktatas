<?php


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
require_once "vendor/autoload.php"; //PHPMailer Object 



$mail = new PHPMailer();
$mail->CharSet = 'UTF-8';
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';  // Your SMTP server
$mail->SMTPAuth = true;             // Enable SMTP authentication
//$mail->Username = 'mayerandras.weblap@gmail.com'; // SMTP username
$mail->Username = 'jelenlet.salisbury@gmail.com'; // SMTP username
//$mail->Password = 'yoae rsnk cste dlrd';    // SMTP password
$mail->Password = 'wisj vytp sifn cmkh';    // SMTP password
$mail->SMTPSecure = 'tls';          // Enable TLS encryption
$mail->Port = 587;                  // TCP port to connect to
//$mail->SetFrom('noreply.salisburykft.hu');



//$mail->setFrom('noreply.salisburykft.hu', 'noreply.salisburykft.hu');
$mail->SetFrom('andras.mayer@salisburykft.hu', 'Szabadság beállítás');
$mail->Subject = 'Szabadság beállítás';

//$mail->addAddress("andras.mayer@salisburykft.hu");//Recipient name is optional
$mail->addAddress($_POST["mail"]);//Recipient name is optional




$mail->IsHTML(true);
$mail->Body = $_POST["message"];

//$mail->SMTPDebug = 2;  // Enable verbose debug output


if (!$mail->send()) {
    echo "serverError";
} else {
    echo 'mailSent';
}


