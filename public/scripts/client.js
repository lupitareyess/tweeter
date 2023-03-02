/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

const createTweetElement = (tweet) => {
  const tweetUser = tweetData.user;

  const $tweet = `
  <header>
          <div>
            <img
              src=${tweetUser.avatars}
              alt="logo"
              width="50"
              height="50"
            />
            <h3>${tweetUser.name}</h3>
          </div>
          <h3>${tweetUser.handle}</h3>
        </header>
        <article>${tweetData.content.text}</article>
        <footer>
          <p>${tweetData.created_at}</p>
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
  `
  return $tweet;
}


$(document).ready(function() {
  const $tweet = createTweetElement(tweetData);
  console.log($tweet)
  $(".tweet").append($tweet);

});