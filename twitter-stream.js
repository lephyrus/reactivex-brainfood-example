const _ = require('lodash');
const client = require('./twitter-client');

const isTweet = _.conforms({
  user: _.isObject,
  id_str: _.isString,
  text: _.isString
});

const track = (keyword, onTweet, onError) => {
  client.stream('statuses/filter', { track: keyword },  (stream) => {
    stream.on('data', (tweet) => {
      if (isTweet(tweet)) {
        onTweet(tweet);
      }
    });

    stream.on('error', (error) => {
      onError(error);
    });
  });
};

module.exports = track;
