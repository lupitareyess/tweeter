/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


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
          <p>${created_at}</p>
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
  const str = $('form').serialize();
  $('form').submit(function(event) {
    event.preventDefault();
    $.post('/tweets', str);
  });
};


$(document).ready(function() {
  renderTweets(data);
  submitForm()
});