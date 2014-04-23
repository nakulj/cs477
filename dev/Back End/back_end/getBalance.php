<?php

header('Access-Control-Allow-Origin: *');

$con = mysql_connect("fdb7.biz.nf", "1616563_tap", "tapmobile7")
or die("Could not connect: " . mysql_error());

mysql_select_db("1616563_tap", $con)
or die("Could not find database: " . mysql_error());

$email = trim($_POST["email"]);

$result = mysql_query("SELECT * FROM Users WHERE email = '$email' ");
$row = mysql_fetch_assoc($result);
$tapbalance = $row['tap_balance'];

echo json_encode($tapbalance);
