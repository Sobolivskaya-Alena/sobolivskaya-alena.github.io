<?php
use PHPMailer\PHPMailer\PHPMailer; 
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php'; 
require 'phpmailer/src/PHPMailer.php';
$mail = new PHPMailer (true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);
//От кого письмо
$mail->setFrom('sobolivsckaya.alena@gmail.com', 'Проверка');
// Кому отправить
$mail->addAddress('sobolivsckaya.alena@yandex.ru');
// Тема письма
$mail->Subject = 'Привет! Это "Проверка"';

// Тело письма
$body = '<h1>Проверка отпраки формы!</h1>';
if(trim(!empty($_POST['name']))){
    $body.= '<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))){
    $body .= '<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
}
if(trim(!empty($_POST['message']))){
    $body .= '<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
}
if (!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены!';
}

$response = ['message' => $message];

header ('Content-type: aplication/json');
echo json_encode($response);
?>