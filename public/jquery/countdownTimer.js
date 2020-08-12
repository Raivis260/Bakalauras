var deadline = new Date("2020-10-20 8:59:30").getTime();

var x = setInterval(function() {

  var now = new Date().getTime();
  var t = deadline - now;

  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((t % (1000 * 60)) / 1000);

  document.getElementById("day").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  if (t < 1 ) {
    clearInterval(x);
    document.getElementById("message").innerHTML = "Aukcionas uždarytas!!";
    document.getElementById("day").innerHTML = '0';
    document.getElementById("hours").innerHTML = '0';
    document.getElementById("minutes").innerHTML = '0';
    document.getElementById("seconds").innerHTML = '0';
  }
  if (t < 1000 && t > 0) {
     window.location.reload();
   }
}, 1000);
