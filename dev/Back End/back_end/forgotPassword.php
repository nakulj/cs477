<?php

header('Access-Control-Allow-Origin: *');
$con = mysql_connect("fdb7.biz.nf", "1616563_tap", "tapmobile7")
	       or die("Could not connect: " . mysql_error()); 

	    mysql_select_db("1616563_tap", $con)
	       or die("Could not find database: " . mysql_error());
               
#get email from log-in form
$email = trim($_POST["email"]);

#compare against emails in db to find user

#send email with password to user

#return message that was a success
$text="success";
return $text;
               
?>