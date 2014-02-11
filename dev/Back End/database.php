<?php

$con = mysql_connect("localhost", "root", "root") 
	       or die("Could not connect: " . mysql_error()); 

	    mysql_select_db("CS477_RiderDB", $con) 
	       or die("Could not find database: " . mysql_error());

?>