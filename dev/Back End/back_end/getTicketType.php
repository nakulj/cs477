<?php

header('Access-Control-Allow-Origin: *');

$con = mysql_connect("fdb7.biz.nf", "1616563_tap", "tapmobile7")
or die("Could not connect: " . mysql_error());

mysql_select_db("1616563_tap", $con)
or die("Could not find database: " . mysql_error());

$result = mysql_query("SELECT * FROM Ticket  ");
$data=array();
while($row = mysql_fetch_array($result)) {
    $data[]=$row;

}
echo json_encode($data);






