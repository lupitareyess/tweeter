
const tweetLength = () => {
  $('#tweet-text').on('input', function() {
    const numOfCharacters = $(this).val().length;
    const remainingCharacters = 140 - numOfCharacters;
    const counter = $(this).parent().find('.counter');
    counter.text(remainingCharacters);

    if (remainingCharacters < 0) {
      (counter).css('color', 'red');
    }
    else {
      (counter).css('color', '');
    }
  });
};

$(document).ready(function() {
  tweetLength()

});
