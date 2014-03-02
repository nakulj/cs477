var userid= "1234567890";
var timestamp;
var message;
var passphrase= "1337password";
var hash;
var qrcode = new QRCode(document.getElementById("qrcode"), {
	width : 100,
	height : 100,
	correctLevel: QRCode.CorrectLevel.L
});

function updateTimeQR() {
	qrcode.clear();
	timestamp= Date.now();
	message= userid+timestamp;
	hash= CryptoJS.HmacSHA1(message, passphrase);
	document.getElementById("time").innerHTML="Time: " + timestamp;
	document.getElementById("HMAC").innerHTML="HMAC: " + hash;
	qrcode.makeCode(message);
}
updateTimeQR();
setInterval("updateTimeQR()",5000);
