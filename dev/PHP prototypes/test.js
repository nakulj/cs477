function testAndDeduct() {
    var uid= 9;
    var nguests=3;
    var cost= 1.5*(nguests+1);
    $.ajax({
        type:'POST',
        url:'http://tapmobile.co.nf/back_end/validateDeductBalance.php',
        data: {
            userid: uid,
            cost: cost
        },
        success: function(data) {
            var validateTAP=$.parseJSON(data);
            alert('No worries, mate');
            alert(validateTAP);
        },
        error: function(data, textStatus) {
            alert("EPIC FAIL");
        }
    });
}