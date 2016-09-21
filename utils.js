const _ = require('lodash');
const colors = require('colors');

function getTweetKeywords(tweet, keywords) {
  return keywords.filter(keyword => _.includes(tweet.message.toLowerCase(), keyword));
}

function stringifyTweet(tweet, keywords) {
  let coloredKeywords = tweet.keywords.map(keyword => {
    return keyword[keywords[keyword]];
  }).join(' ');

  return [
    tweet.count.toString().black.bgWhite,
    coloredKeywords,
    ('@' + tweet.handle).underline,
    tweet.message,
  ].join(' ');
}

module.exports = {
  stringifyTweet: stringifyTweet,
  getTweetKeywords: getTweetKeywords
};
