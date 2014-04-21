   cordova.plugins.barcodeScanner.scan(
      function (result) {
          process(result.text)
      }, 
      function (error) {
          alert("Scanning failed");
      }
   );

process(str) {
  words= str.split(" ");
  uid= words[0];
  nguests= words[1];
  time= words[2]
  hmac= words[3]

  if(!validateTime(time))
    fail();
  if(!validateHMAC(uid,nguests,time,hash))
    fail();

  confirmTAP(uid);
}

validateTime(time) {
  var cutoff= 5*60*1000;
  now= new Date().getTime();
  diff= now-time;
  return(diff>cutoff);
}

validateHash(uid,nguests,time,hash) {
  toHash= uid+nguests+time;
  var passphrase= "1337password";
  return(hash == CryptoJS.HmacSHA1(toHash, passphrase));
}

fail() {
  alert("Invalid QR.");
}

confirmTAP(uid) {
  
}
