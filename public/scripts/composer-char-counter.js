$(() => {
  $('#tweet-text').on('input', tweetLength);
});

const tweetLength = function() {
  const numOfCharacters = $(this).val().length;
  const remainingCharacters = 140 - numOfCharacters;
  const counter = $(this).closest('form').find('.counter');
  counter.text(remainingCharacters);

  if (remainingCharacters < 0) {
    (counter).addClass('red');
  }
  else {
    (counter).removeClass('red');
  }
}