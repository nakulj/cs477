<?php

$con = mysql_connect("localhost", "root", "root") 
	       or die("Could not connect: " . mysql_error()); 

	    mysql_select_db("CS477_RiderDB", $con) 
	       or die("Could not find database: " . mysql_error());


$first_name = trim($_POST["fname"]);
$last_name = trim($_POST["lname"]);
$email = trim($_POST["email"]);
$ccNumber = trim($_POST["ccNumber"]);
$ccCSV = trim($_POST["ccCSV"]);
$ccDate = trim($_POST["ccDate"]);
$password = trim($_POST["password"]);
$password_2 = trim($_POST["password2"]);

$error = false;
$errormessage = 0;

#CHECK TO SEE IF FIRST NAME CONTAINS AT LEAST 1 CHAR

if(!isset($first_name) || strlen($first_name) < 1){
    $errormessage += 2;
    $error = true;
    echo '<script type="text/javascript">alert("first name invalid"); </script>';
}
else{
	$regName = '/^[a-z ,.\'-]{1,50}$/i';

    $resName = preg_match($regName, $first_name);

    if (!$resName){
    	$errormessage += 2 ;
    	$error = true;
    	echo '<script type="text/javascript">alert("first name invalid"); </script>';
    }
}

#CHECK TO SEE IF LAST NAME CONTAINS AT LEAST 1 CHAR

if(!isset($last_name) || strlen($last_name) < 1){
    $errormessage += 2;
    $error = true;
    echo '<script type="text/javascript">alert("last name invalid"); </script>';
}
else{
	$regName = '/^[a-z ,.\'-]{1,50}$/i';

    $resName = preg_match($regName, $last_name);

    if (!$resName){
    	$errormessage += 2 ;
    	$error = true;
    	echo '<script type="text/javascript">alert("last name invalid"); </script>';
    }
}

#CHECK TO SEE IF EMAIL IS IN EXPECTED FORMAT

$regEmail = '/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i';
$resEmail = preg_match($regEmail, $email);

if (!$resEmail){
	$errormessage += 3;
	$error = true;
	echo '<script type="text/javascript">alert("email invalid"); </script>';
}

#CHECK TO SEE IF EMAIL ALREADY EXISTS IN DB

$result = mysql_query("SELECT * FROM User_Table WHERE email='$email' ");

   $num_rows = mysql_num_rows($result);

    if($num_rows > 0){
		#user already exists
		$error = true;
		echo '<script type="text/javascript">alert("email already exists); </script>';
    }


#CHECK TO SEE IF PASSWORD CONTAINS AT LEAST 5 CHAR

if(!isset($password) || strlen($password) < 1){
    $errormessage += 2;
    $error = true;
    echo '<script type="text/javascript">alert("password invalid"); </script>';
}
else{
	$regName = '/^[a-z ,.\'-]{5,50}$/i';

    $resName = preg_match($regName, $password);

    if (!$resName){
    	$errormessage += 2 ;
    	$error = true;
    	echo '<script type="text/javascript">alert("password is invalid"); </script>';
    }
}

#CHECK TO SEE IF PASSWORD IS CONFIRMED

if ($password != $password_2){
	$error = true;
	echo '<script type="text/javascript">alert("passwords do not match"); </script>';
}

#CHECK TO SEE IF CREDIT CARD IS VALID
$ccTYPE = 0;

$regVisa = '/^4[0-9]{12}(?:[0-9]{3})?$/';
$regMastercard = '/^5[1-5][0-9]{14}$/';
$regAmericanExpress = '/^3[47][0-9]{13}$/';
$regDiscover = '/^6(?:011|5[0-9]{2})[0-9]{12}$/';
$regDiners = '/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/';
$regJCB = '/^(?:2131|1800|35\d{3})\d{11}$/';

$resCC = preg_match($regVisa, $ccNumber);

if (!$resCC){
	$resCC = preg_match($regMastercard, $ccNumber);

	if (!$resCC){
		$resCC = preg_match($regAmericanExpress, $ccNumber);

		if (!$resCC){
			$resCC = preg_match($regDiscover, $ccNumber);

			if (!$resCC){
				$resCC = preg_match($regDiners, $ccNumber);

				if (!$resCC){
					$resCC = preg_match($regJCB, $ccNumber);

					if (!$resCC){
						$error = true;
						echo '<script type="text/javascript">alert("credit card number is invalid"); </script>';
					}
					else{
						$ccTYPE = "jcb";
					}
				}
				else{
					$ccTYPE = "diners";
				}
			}
			else{
				$ccTYPE = "discover";
			}
		}
		else{
			$ccTYPE = "american_express";
		}
	}
	else{
		$ccTYPE = "mastercard";
	}
}
else{
	$ccTYPE = "visa";
}

echo "You use $ccTYPE. ";

#CHECK CVV

$regCVV = '/^[0-9]{3,4}$/';
$resCVV = preg_match($regCVV, $ccCSV);

if (!$resCVV){
	$errormessage += 3;
	$error = true;
	echo '<script type="text/javascript">alert("credit card CVV invalid"); </script>';
} 

#ADD USER TO DB IF NO ERRORS DETECTED
if (!$error){
   $query = mysql_query("INSERT INTO USER_TABLE (first_name, last_name, password, email, cc_number, cc_csv, cc_exp) 
   	VALUES ('$first_name', '$last_name', '$password', '$email', '$ccNumber', '$ccCSV', '$ccDate')");

	echo '<script type="text/javascript">alert("user is created"); </script>';

	echo "Welcome $first_name!";
}
else{
	echo '<script type="text/javascript">alert("error creating user"); </script>';

}

?>