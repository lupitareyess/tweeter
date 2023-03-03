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
        <article>${content.text}</article>
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
    $("#tweet-container").append(newTweet);
  }
}

const submitForm = () => {
  $('#submit-form').submit(function(event) {
    event.preventDefault();
    const textAreaLength = $("#tweet-text").val().length;
    if (textAreaLength === 0) {
      return alert('Tweet is too short')
    }
    if (textAreaLength > 140) {
      console.log(textAreaLength)
      return alert('Tweet is too long!')
    }
    $.post('/tweets', $('#submit-form').serialize()).then(() => {
      loadTweets();
    })
  })
};

const loadTweets = () => {
  $.get('/tweets', (data) => {
    renderTweets(data);
  });
};


$(document).ready(function() {
  submitForm()
  loadTweets();
});