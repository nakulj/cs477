<?php

header('Access-Control-Allow-Origin: *');

require_once("/srv/disk2/1616563/www/tapmobile.co.nf/back_end/braintree/lib/Braintree.php");

Braintree_Configuration::environment('sandbox');
Braintree_Configuration::merchantId('zdvryh5rg8rmssbs');
Braintree_Configuration::publicKey('rgbtnp6knxnyq48b');
Braintree_Configuration::privateKey('6e5797c00f980a850d99964113e1bce5');

$con = mysql_connect("fdb7.biz.nf", "1616563_tap", "tapmobile7")
or die("Could not connect: " . mysql_error());

mysql_select_db("1616563_tap", $con)
or die("Could not find database: " . mysql_error());

$email = trim($_POST["email"]);

$Qresult = mysql_query("SELECT * FROM Users WHERE email = '$email' ");
$row = mysql_fetch_assoc($Qresult);

$amount = 0.2;
$creditCard = $row["cardNumber"];
$expMonth = $row ["expMonth"];
$expYear = $row["expYear"];

echo $creditCard + " " + expMonth + " ";

/*
$result = Braintree_Transaction::sale(array(
    'amount' => $amount,
    'creditCard' => array(
        'number' => $creditCard,
        'expirationMonth' => $expMonth,
        'expirationYear' => $expYear
    )
));

if ($result->success) {
    print_r("success!: " . $result->transaction->id);
} else if ($result->transaction) {
    print_r("Error processing transaction:");
    print_r("\n  message: " . $result->message);
    print_r("\n  code: " . $result->transaction->processorResponseCode);
    print_r("\n  text: " . $result->transaction->processorResponseText);
} else {
    print_r("Message: " . $result->message);
    print_r("\nValidation errors: \n");
    print_r($result->errors->deepAll());
}
*/
?>