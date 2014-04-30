<?php
header('Access-Control-Allow-Origin: *');

$con = mysql_connect("fdb7.biz.nf", "1616563_tap", "tapmobile7")
or die("Could not connect: " . mysql_error());

mysql_select_db("1616563_tap", $con)
or die("Could not find database: " . mysql_error());

$userName=trim($_POST["user_name"]);
$ticketName = trim($_POST["ticketName"]);

mysql_query("UPDATE ticket_wallet SET pass_active=1 WHERE user_name='$userName' AND pass_description=$ticketName");
mysql_query("UPDATE ticket_wallet SET pass_active=0 WHERE user_name='$userName' AND pass_description!=$ticketName");
