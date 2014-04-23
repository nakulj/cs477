<?php

header('Access-Control-Allow-Origin: *');

$con = mysql_connect("fdb7.biz.nf", "1616563_tap", "tapmobile7")
or die("Could not connect: " . mysql_error());

mysql_select_db("1616563_tap", $con)
or die("Could not find database: " . mysql_error());

$newBalance = trim($_POST["newBalance"]);
echo $newBalance;
$userSession=trim($_POST["userSession"]);
$query=mysql_query("UPDATE Users SET tap_balance='$newBalance' WHERE email='$userSession'  ");
echo $query;
