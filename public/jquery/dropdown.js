

var selectedItem = sessionStorage.getItem("citySelect");
$('#citySelect').val(selectedItem);

$('#citySelect').change(function() {
    var dropVal = $(this).val();
    sessionStorage.setItem("citySelect", dropVal);
});
