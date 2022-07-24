export default class TweetService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getTweets(username) {
    let query = username ? `?username=${username}` : '';
    const response = await fetch(`${this.baseURL}/tweets${query}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }

  async postTweet(text) {
    const response = await fetch(`${this.baseURL}/tweets/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        username: 'ellie',
        name: 'Ellie',
      }),
    });
    const data = await response.json();
    if (response.status !== 201) {
      throw new Error(data.message);
    }
    console.log(data);
    return data;
  }

  async deleteTweet(tweetId) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status !== 204) {
      const data = await response.json();
      throw new Error(data.message);
    }
  }

  async updateTweet(tweetId, text) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }
}
