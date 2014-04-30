<?php

header('Access-Control-Allow-Origin: *');

$con = mysql_connect("fdb7.biz.nf", "1616563_tap", "tapmobile7")
or die("Could not connect: " . mysql_error());

mysql_select_db("1616563_tap", $con)
or die("Could not find database: " . mysql_error());

$userid = trim($_POST["userid"]);
$cost = trim($_POST["cost"]);
$validateTap;

$result = mysql_query("SELECT * FROM Users WHERE user_id = '$userid' ");
$row = mysql_fetch_assoc($result);
$tapbalance = $row['tap_balance'];

if($cost>$tapbalance) {
    $validateTap=False;
}

if($cost<$tapbalance) {
    $validateTap=True;
    $updatedBalance=$tapbalance-$cost;
    mysql_query("UPDATE Users SET tap_balance=$updatedBalance WHERE user_id='$userid' ");

}
echo json_encode($validateTap);