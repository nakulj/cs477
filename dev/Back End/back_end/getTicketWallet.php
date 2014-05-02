<?php
header('Access-Control-Allow-Origin: *');

$con = mysql_connect("fdb7.biz.nf", "1616563_tap", "tapmobile7")
or die("Could not connect: " . mysql_error());

mysql_select_db("1616563_tap", $con)
or die("Could not find database: " . mysql_error());

$userName=trim($_POST["user_name"]);
$result=mysql_query("SELECT * FROM ticketWallet WHERE user_name='$userName' ");

$data=array();
while($row = mysql_fetch_array($result)) {
	$ticketWalletItem = array("ticketId" => $row["pass_id"], "ticketActivated" => $row["pass_active"], "ticketSelected" => $row["pass_selected"], "ticketText" => $row["pass_description"]);
	array_push($data, $ticketWalletItem);
}

echo json_encode($data);