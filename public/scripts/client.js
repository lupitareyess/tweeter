/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(() => {
  submitForm();
  loadTweets();
  scrollBackUp();
  toggleForm();
});

/**
 * Function that takes in tweet object and returns a tweet <article> element that contains the HTML structure of the tweet
 * 
 * @param {obj} data 
 * @returns new tweet element
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

/**
 * Function that takes in an array of tweet objects and prepends them to the area where tweets are displayed
 * 
 * @param {array} tweets 
 */
const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    const newTweet = createTweetElement(tweet);
    $("#tweet-container").prepend(newTweet);
  }
};

/**
 * Function that submits tweet data and calls loadTweets to load new tweet to page if proper conditions are met. Else, error handling is implemented
 * 
 */
const submitForm = () => {
  $('#submit-form').on('submit', function(event) {
    event.preventDefault();

    const textAreaLength = $("#tweet-text").val().length;
    if (textAreaLength === 0) {
      return $("#tweet-error").text("⚠️ Oops! Empty tweets are not valid. Please try again.").slideDown();
    }
    if (textAreaLength > 140) {
      return $("#tweet-error").text("⚠️ Tweet is too long. Lets stick to 140 characters!").slideDown();
    }

    $.post('/tweets', $(this).serialize()).then(() => {
      $('#tweet-error').text('').hide();
      $("#tweet-text").val('');
      $(".counter").html('140');
      $('#tweet-container').empty();
      loadTweets();
    });
  });
};

/**
 * Function that fetches data from server and calls renderTweets to prepend them to the area where tweets are displayed
 */
const loadTweets = () => {
  $.get('/tweets', (data) => {
    renderTweets(data);
  });
};

/**
 * Function that prevents against XSS attacks by re-encoding text so that unsafe characters are converted into a safe encoded representation
 * 
 * @param {str} 
 * @returns 
 */
const escapeText = (str) => {
  const article = document.createElement("article");
  article.appendChild(document.createTextNode(str));
  return article.innerHTML;
}

/**
 * Function that makes bottom button appear on scroll and scrolls back up to text area when button is clicked
 */
const scrollBackUp = () => {
  $(window).on('scroll', function() {
    const $button = '.bottom-button';
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.querySelector($button).classList.add('show');
    } else {
      document.querySelector($button).classList.remove('show');
    }
    document.querySelector($button).addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
};

/**
 * Function that toggles tweet form when button is clicked
 */
const toggleForm = () => {
  $('.button-to-tweet').on('click', function() {
    const form = $('#submit-form');
    const composeHeader = $('.submit-tweet h2')
    if (form.is(":hidden")) {
      composeHeader.slideDown("slow")
      form.slideDown("slow").next();

    } else {
      form.slideUp("slow");
      composeHeader.slideUp("slow");
    }
  });
};


