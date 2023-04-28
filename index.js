function fetchAndUpdateTweets() {
  fetch("http://50.21.190.71/get_tweets")
    .then((response) => response.json())
    .then((data) => {
      // Sort the tweets by chronological order
      data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

      const tweetsContainer = document.getElementById("tweets-container");
      tweetsContainer.innerHTML = ""; // clear existing tweets
      data.forEach((tweet) => {
        const tweetHTML = `
			<div class="posts">
			  <img class="slogopic" src="${tweet.avatar}" alt="./images/ratatouille" />
			  <div class="words">
				<p>
				  <span class="name">${tweet.user_name}</span>
				  <span class="dates">${tweet.user_created}</span>
				</p>
				<p>${tweet.text}</p>
			  </div>
			</div>
		  `;
        tweetsContainer.innerHTML += tweetHTML;
      });
    })
    .catch((error) => {
      console.error("Error fetching tweets:", error);
    });
}

// Call the function once to initially display tweets
fetchAndUpdateTweets();

// Call the function every 10 seconds to update tweets
setInterval(fetchAndUpdateTweets, 10000);
