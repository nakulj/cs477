<?php

header('Access-Control-Allow-Origin: *');

$con = mysql_connect("fdb7.biz.nf", "1616563_tap", "tapmobile7")
or die("Could not connect: " . mysql_error());

mysql_select_db("1616563_tap", $con)
or die("Could not find database: " . mysql_error());

$query1 = mysql_query("SELECT ticket_description FROM Ticket WHERE ticket_id=0 ");
$row = mysql_fetch_assoc($query1);
$tapbalance = $row['tap_balance'];

echo json_encode($tapbalance);

