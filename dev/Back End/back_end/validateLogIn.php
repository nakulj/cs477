<?php

header('Access-Control-Allow-Origin: *');

$con = mysql_connect("fdb7.biz.nf", "1616563_tap", "tapmobile7")
	       or die("Could not connect: " . mysql_error());

            mysql_select_db("1616563_tap", $con)
	       or die("Could not find database: " . mysql_error());


$email = trim($_POST["email"]);
$password = trim($_POST["password"]);

#Validate user exists
  // $result = mysql_query("SELECT email FROM User_Table WHERE email='$email' ");

   //$num_rows = mysql_num_rows($result);
   $loginresult=FALSE;

#validate password is correct
   $result = mysql_query("SELECT * FROM Users WHERE email = '$email' AND password='$password' ");

    $num_rows = mysql_num_rows($result);

    if($num_rows ==1){
        $row = mysql_fetch_assoc($result);
        $username = $row['email'];
        $loginresult=$username;


    }

    echo json_encode($loginresult);



?>