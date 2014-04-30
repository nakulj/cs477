<?php
header('Access-Control-Allow-Origin: *');

$con = mysql_connect("fdb7.biz.nf", "1616563_tap", "tapmobile7")
or die("Could not connect: " . mysql_error());

mysql_select_db("1616563_tap", $con)
or die("Could not find database: " . mysql_error());

$userName=trim($_POST["user_name"]);
$ticketPrice = trim($_POST["ticketPrice"]);
$balance_history_date=trim($_POST["date"]);
$balance_history_time=trim($_POST["time"]);
$ticketDescription=trim($_POST["ticketDescription"]);


$query = mysql_query("INSERT INTO balance_history(primary_key,user_id, date, time, fare_amount,aux, type)
   	VALUES ('NULL','$userName', '$balance_history_date', '$balance_history_time', '$ticketPrice','$ticketDescription', '1')");
$query = mysql_query("INSERT INTO ticketWallet(pass_id,user_name, pass_description, pass_active, pass_selected,pass_expiration)
   	VALUES ('NULL','$userName', '$ticketDescription', '0', '1','NULL')");
