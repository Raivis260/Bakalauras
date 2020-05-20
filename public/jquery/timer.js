$("#getting-started")
  .countdown("2020/05/22", function(event) {
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
