/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const createTweetElement = (data) => {
  const { user, content, created_at } = data;

  let $tweet = `
  <section class="tweet">
  <header>
          <div>
            <img
              src=${user.avatars}
              alt="logo"
              width="50"
              height="50"
            />
            <h3>${user.name}</h3>
          </div>
          <h3>${user.handle}</h3>
        </header>
        <article>${escapeText(content.text)}</article>
        <footer>
          <p>${timeago.format(created_at)}</p>
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
        </section>
  `
  return $tweet;
}

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    const newTweet = createTweetElement(tweet);
    $("#tweet-container").prepend(newTweet);
  }
}

const submitForm = () => {
  $('#submit-form').submit(function(event) {
    event.preventDefault();

    const textAreaLength = $("#tweet-text").val().length;
    if (textAreaLength === 0) {
      return $("#tweet-error").text("⚠️ Oops! Empty tweets are not valid. Please try again.").slideDown()
    }
    if (textAreaLength > 140) {
      return $("#tweet-error").text("⚠️ Tweet is too long. Lets stick to 140 characters!").slideDown();
    }

    $.post('/tweets', $('#submit-form').serialize()).then(() => {
      $('#tweet-error').text('').hide();
      $("#tweet-text").val('');
      $(".counter").val('140');
      loadTweets();
    })
  })
};




const loadTweets = () => {
  $.get('/tweets', (data) => {
    renderTweets(data);
  });
};

const escapeText = (str) => {
  const article = document.createElement("article");
  article.appendChild(document.createTextNode(str));
  return article.innerHTML;
}

$(document).ready(function() {
  submitForm()
  loadTweets();
});