<?php

header('Access-Control-Allow-Origin: *');
$con = mysql_connect("fdb7.biz.nf", "1616563_tap", "tapmobile7")
	       or die("Could not connect: " . mysql_error()); 

	    mysql_select_db("1616563_tap", $con)
	       or die("Could not find database: " . mysql_error());
        
#get data from form
$user = trim($_POST["user"]);


//check if anything exists in ticket wallet
$result = mysql_query("SELECT * FROM  `ticketWallet` WHERE  `ticketWallet_id` =  '$user'");
$num_rows = mysql_num_rows($result);
if ($num_rows > 0){
  $fare = -1;
  $index = -1;
  $i = 0;
  
  while($row=mysql_fetch_array($result)) {
       $return[] = $row;
       
          //TO DO: I NEED THE CODES FOR FARE TYPES TO BE ABLE TO COMPLETE THIS SECTION
          if ($return["fare_type"] == 3){
                  $fare = 3;
                  $index = $i;
          }
          else if ($return["fare_type"] == 1 && $fare < 1){
                  $fare = 1;
                  $index = $i;
          }
     
     i = i + 1;
   } 
}
else{
        //user does not have any available fares
}


               
?>