<?php
header('Access-Control-Allow-Origin: *');

$con = mysql_connect("fdb7.biz.nf", "1616563_tap", "tapmobile7")
or die("Could not connect: " . mysql_error());

mysql_select_db("1616563_tap", $con)
or die("Could not find database: " . mysql_error());

$userName=trim($_POST["user_name"]);
$ticketPrice = trim($_POST["ticketPrice"]);
$TransactionType=1;
$balance_history_date=trim($_POST["date"]);
$balance_history_time=trim($_POST["time"]);
$ticketDescription=trim($_POST["ticketDescription"]);


