<?php

header('Access-Control-Allow-Origin: *');
require_once("/srv/disk2/1616563/www/tapmobile.co.nf/back_end/stripeapi/lib/Stripe.php");
$con = mysql_connect("fdb7.biz.nf", "1616563_tap", "tapmobile7")
	       or die("Could not connect: " . mysql_error());

	    mysql_select_db("1616563_tap", $con)
	       or die("Could not find database: " . mysql_error());

Stripe::setApiKey("sk_live_dfqOIc2ZtwVAjreZdLg0XqmE");

$first_name = trim($_POST["fname"]);
$last_name = trim($_POST["lname"]);
$email = trim($_POST["email"]);
$password = trim($_POST["password"]);
$cc_name = trim($_POST["cardholder_name"]);
$bStreet = trim($_POST["street"]);
$bCity = trim($_POST["city"]);
$bState = trim($_POST["state"]);
$bZip = trim($_POST["zip"]);
$stripeToken = $_POST["stripeToken"];
$error = false;
$errormessage = 0;



<<<<<<< HEAD
//save customer on stripe account for easier charges later
$token = $_POST["stripeToken"];
=======
save customer on stripe account for easier charges later
$token = $_POST['stripeToken'];
>>>>>>> 7ef9fb73935bc3136964160d766449a8f0adb3b4

 Create a Customer
$customer = Stripe_Customer::create(array(
  "card" => $token,
  "description" => "payinguser@example.com")
);


Charge the Customer instead of the card
Stripe_Charge::create(array(
  "amount" => 5, # amount in cents, again
  "currency" => "usd",
  "customer" => $customer->id)
);


// Save the customer ID in your database so you can use it later
saveStripeCustomerId($user, $customer->id);

// Later...
$customerId = getStripeCustomerId($user);

/*
Stripe_Charge::create(array(
  "amount"   => 5,
  "currency" => "usd",
  "customer" => $customerId)
);
*/
//end Stripe

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
   $query = mysql_query("INSERT INTO Users (user_id,first_name, last_name, email, password,tap_balance, cardholder_name, billing_street, billing_city, billing_state, billing_zip, stripeToken, stripeCustomerID)
   	VALUES ('NULL','$first_name', '$last_name', '$email', '$password','0', '$cc_name', '$bStreet', '$bCity', '$bState', '$bZip', '$stripeToken', '$customerId')");

	//echo '<script type="text/javascript">alert("user is created"); </script>';

	//echo "Welcome $first_name!";
}
else{
	//echo '<script type="text/javascript">alert("error creating user"); </script>';

}

?>