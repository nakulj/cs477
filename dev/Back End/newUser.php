<?php

header('Access-Control-Allow-Origin: *');
$con = mysql_connect("fdb7.biz.nf", "1616563_tap", "tapmobile7")
	       or die("Could not connect: " . mysql_error()); 

	    mysql_select_db("1616563_tap", $con)
	       or die("Could not find database: " . mysql_error());


$first_name = trim($_POST["fname"]);
$last_name = trim($_POST["lname"]);
$email = trim($_POST["email"]);
$password = trim($_POST["password"]);
$error = false;
$errormessage = 0;


#CHECK TO SEE IF FIRST NAME CONTAINS AT LEAST 1 CHAR

if(!isset($first_name) || strlen($first_name) < 1){
    $errormessage += 2;
    $error = true;
    //echo '<script type="text/javascript">alert("first name invalid"); </script>';
}
else{
	$regName = '/^[a-z ,.\'-]{1,50}$/i';

    $resName = preg_match($regName, $first_name);

    if (!$resName){
    	$errormessage += 2 ;
    	$error = true;
    	//echo '<script type="text/javascript">alert("first name invalid"); </script>';
    }
}

#CHECK TO SEE IF LAST NAME CONTAINS AT LEAST 1 CHAR

if(!isset($last_name) || strlen($last_name) < 1){
    $errormessage += 2;
    $error = true;
   // echo '<script type="text/javascript">alert("last name invalid"); </script>';
}
else{
	$regName = '/^[a-z ,.\'-]{1,50}$/i';

    $resName = preg_match($regName, $last_name);

    if (!$resName){
    	$errormessage += 2 ;
    	$error = true;
    	//echo '<script type="text/javascript">alert("last name invalid"); </script>';
    }
}

#CHECK TO SEE IF EMAIL IS IN EXPECTED FORMAT

$regEmail = '/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i';
$resEmail = preg_match($regEmail, $email);

if (!$resEmail){
	$errormessage += 3;
	$error = true;
	//echo '<script type="text/javascript">alert("email invalid"); </script>';
}

#CHECK TO SEE IF EMAIL ALREADY EXISTS IN DB

$emailexists=FALSE;
$emailstr = mysql_real_escape_string($email);

$result = mysql_query("SELECT * FROM Users WHERE email='$emailstr' ");

   $num_rows = mysql_num_rows($result);

    if($num_rows > 0){
		#user already exists
		$emailexists=TRUE;
        $error = true;
		//echo '<script type="text/javascript">alert("email already exists); </script>';
    }

    echo json_encode($emailexists);


#CHECK TO SEE IF PASSWORD CONTAINS AT LEAST 5 CHAR

if(!isset($password) || strlen($password) < 1){
    $errormessage += 2;
    $error = true;
  //  echo '<script type="text/javascript">alert("password invalid"); </script>';
}
/*else{
	$regName = '/^[a-z ,.\'-]{5,50}$/i';

    $resName = preg_match($regName, $password);

    if (!$resName){
    	$errormessage += 2 ;
    	$error = true;
    	echo '<script type="text/javascript">alert("password is invalid"); </script>';
    }
}
*/


#ADD USER TO DB IF NO ERRORS DETECTED
if (!$error){
   $query = mysql_query("INSERT INTO Users (user_id,first_name, last_name, email, password,tap_balance)
   	VALUES ('NULL','$first_name', '$last_name', '$email', '$password','0')");

	//echo '<script type="text/javascript">alert("user is created"); </script>';

	//echo "Welcome $first_name!";
}
else{
	//echo '<script type="text/javascript">alert("error creating user"); </script>';

}

?>