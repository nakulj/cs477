<?php
header('Access-Control-Allow-Origin: *');

$con = mysql_connect("fdb7.biz.nf", "1616563_tap", "tapmobile7")
or die("Could not connect: " . mysql_error());

mysql_select_db("1616563_tap", $con)
or die("Could not find database: " . mysql_error());

$userName=trim($_POST["user_name"]);
$query=mysql_query("SELECT * FROM ticketWallet WHERE user_name='$userName' ");
$row = mysql_fetch_assoc($query);
echo json_encode($row);

