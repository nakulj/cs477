<?php

header('Access-Control-Allow-Origin: *');
$con = mysql_connect("fdb7.biz.nf", "1616563_tap", "tapmobile7")
	       or die("Could not connect: " . mysql_error()); 

	    mysql_select_db("1616563_tap", $con)
	       or die("Could not find database: " . mysql_error());

$userSession = trim($_POST["user"]);
$email_changed = trim($_POST["email_changed"]);
$pass_changed = trim($_POST["pass_changed"]);
$new_email = trim($_POST["email"]);
$new_pass = trim($_POST["pass"]);

echo $pass_changed;
echo $email_changed;


if($email_changed=='true' && $pass_changed=='false') {
    echo("only email changed");
    $query=mysql_query("UPDATE Users SET email='$new_email' WHERE email='$userSession'  ");
}

if($pass_changed=='true' && $email_changed=='false'){
    echo("Only pass changed");
    $query=mysql_query("UPDATE Users SET password='$new_pass' WHERE email='$userSession'  ");

}
if($pass_changed=='true' && $email_changed=='true') {
    echo("email and pass both changed");
    $query=mysql_query("UPDATE Users SET email='$new_email' WHERE email='$userSession'  ");
    $query=mysql_query("UPDATE Users SET password='$new_pass' WHERE email='$new_email'  ");

}


?>