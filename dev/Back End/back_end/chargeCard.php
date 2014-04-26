<?php


//keys here https://manage.stripe.com/account
Stripe::setApiKey("sk_test_NDC9d8FxEtCPnpdR3FMHv0bP");

// Need to get Stripe token by selecting the right entry in user database
$token = $_POST['stripeToken']; //needs to pick from database

// Create the charge on Stripe's servers - this will charge the user's card
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

?>