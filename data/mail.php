<?php
$toemail = 'brettgrisinger@gmail.com';

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

if(mail($toemail, 'Voyage Website Request from: '.$name, $message, 'From: ' . $email)) {
	echo 'Your email was sent successfully.';
} else {
	echo 'There was a problem sending your email.';
}
?>