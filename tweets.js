const track = require('./twitter-stream');
const utils = require('./utils');

const keywords = {
  'javascript': 'cyan',
  'boobs': 'yellow',
  'clinton': 'blue',
  'trump': 'red',
};

let counter = 0;
let muted = null;

function process(sourceTweet) {
  let tweet = {
    source: sourceTweet,
    handle: sourceTweet.user.screen_name,
    message: sourceTweet.text
  };

  counter += 1;

  tweet.count = counter;
  tweet.keywords = utils.getTweetKeywords(tweet, Object.keys(keywords));

  return tweet;
}

function onTweet(tweet) {
  if (!muted) {
    tweet = process(tweet);
    console.log(utils.stringifyTweet(tweet, keywords));
    muted = setTimeout(() => {
      muted = null;
    }, 1000);
  }
}

track(Object.keys(keywords).join(','), onTweet, (error) => console.error(error));
