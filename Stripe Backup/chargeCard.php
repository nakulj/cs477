<?php

header('Access-Control-Allow-Origin: *');

//get stripeToken from Database
//require_once("/srv/disk2/1616563/www/tapmobile.co.nf/back_end/stripeapi/lib/Stripe.php");
require_once("/srv/disk2/1616563/www/tapmobile.co.nf/back_end/stripe-php-1.13.0/lib/Stripe.php");


//keys here https://manage.stripe.com/account
Stripe::setApiKey("sk_live_dfqOIc2ZtwVAjreZdLg0XqmE");

$con = mysql_connect("fdb7.biz.nf", "1616563_tap", "tapmobile7")
or die("Could not connect: " . mysql_error());

mysql_select_db("1616563_tap", $con)
or die("Could not find database: " . mysql_error());

$email = trim($_POST["email"]);

$result = mysql_query("SELECT * FROM Users WHERE email = '$email' ");
$row = mysql_fetch_assoc($result);
$token = $row['stripeToken'];
$customerId = $row['stripeCustomerID'];

//Stripe Charge


// Create the charge on Stripe's servers - this will charge the user's card

//Single Charge
/*
try {
$charge = Stripe_Charge::create(array(
  "amount" => 5, // amount in cents, again
  "currency" => "usd",
  "card" => $token,
  "description" => "sample charge")
);
} catch(Stripe_CardError $e) {
  // The card has been declined
}
*/

//Charge based on customer ID
Stripe_Charge::create(array(
  "amount"   => 5,
  "currency" => "usd",
  "customer" => $customerId)
  );

?>