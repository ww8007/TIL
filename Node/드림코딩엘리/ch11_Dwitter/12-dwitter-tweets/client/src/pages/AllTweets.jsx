import React from 'react';
import Tweets from '../components/Tweets';

const AllTweets = ({ tweetService }) => (
  <Tweets tweetService={tweetService} addable={true} />
);

export default AllTweets;
