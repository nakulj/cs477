var userid= "1234567890";
var timestamp;
var message;
var qrcode = new QRCode(document.getElementById("qr-code"), {
	width: $(window).width()/2,
	height: $(window).width()/2,
	correctLevel: QRCode.CorrectLevel.L
});

var refreshRate = 5000;

function updateTimeQR() {
	qrcode.clear();
	timestamp= Date.now();
	message= userid+timestamp;
	qrcode.makeCode(message);
}
updateTimeQR();
setInterval("updateTimeQR()", refreshRate);
