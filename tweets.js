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

function process(tweet) {
  counter += 1;

  return {
    source: tweet,
    handle: tweet.user.screen_name,
    message: tweet.text,
    keywords: utils.getTweetKeywords(tweet.text, Object.keys(keywords)),
    count: counter
  };
}

function onTweet(tweet) {
  tweet = process(tweet);
  if (!muted) {
    console.log(utils.stringifyTweet(tweet, keywords));
    muted = setTimeout(() => {
      muted = null;
    }, 1000);
  }
}

track(Object.keys(keywords).join(','), onTweet, (error) => console.error(error));
