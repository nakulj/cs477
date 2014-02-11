<?php
 
$con = mysql_connect("localhost", "root", "root") 
	       or die("Could not connect: " . mysql_error()); 

	    mysql_select_db("CS477_RiderDB", $con) 
	       or die("Could not find database: " . mysql_error());


$email = trim($_POST["username"]);
$password = trim($_POST["password"]);

#Validate user exists
   $result = mysql_query("SELECT email FROM User_Table WHERE email='$email' ");

   $num_rows = mysql_num_rows($result);

    if($num_rows <= 0){
		echo '<script type="text/javascript">alert("user does not exist"); </script>';
		return false;
    }

#validate password is correct
   $result = mysql_query("SELECT * FROM User_Table WHERE email = '$email' AND password='$password' ");

    $num_rows = mysql_num_rows($result);

    if($num_rows <= 0){
		echo '<script type="text/javascript">alert("password is incorrect"); </script>';
		return false;
    }

    $row = mysql_fetch_assoc($result);
    $username = $row['first_name'];

    echo "Welcome $username!"

?>