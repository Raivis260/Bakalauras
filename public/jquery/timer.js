var d = new Date();
var n = d.getDay();

var dk = new Date();

if(n==1) {
  dk.setDate(dk.getDate() +7);
}
if(n==2) {
  dk.setDate(dk.getDate() +6);
}
if(n==3) {
  dk.setDate(dk.getDate() +5);
}
if(n==4) {
  dk.setDate(dk.getDate() +4);
}
if(n==5) {
  dk.setDate(dk.getDate() +3);
}
if(n==6) {
  dk.setDate(dk.getDate() +2);
}
if(n==0) {
  dk.setDate(dk.getDate() +1);
}


$("#getting-started")
  .countdown(dk, function(event) {
    $('#day').text(
      event.strftime('%D')
    );
    $('#hours').text(
      event.strftime('%H')
    );
    $('#minutes').text(
      event.strftime('%M')
    );
    $('#seconds').text(
      event.strftime('%S')
    );
  });
