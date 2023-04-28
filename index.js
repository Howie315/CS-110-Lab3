// const tweetsList = document.getElementById("posts");
// const searchInput = document.getElementById("search-Input");
// // function to fetch tweets from the server
// async function getTweets() {
//   try {
//     const response = await fetch("http://50.21.190.71/get_tweets");
//     const data = await response.json();
//     return data.statuses;
//   } catch (error) {
//     console.log(error);
//   }
// }
// select the element where the tweets will be displayed
function fetchAndUpdateTweets() {
  fetch("http://50.21.190.71/get_tweets")
    .then((response) => response.json())
    .then((data) => {
      const tweetsContainer = document.getElementById("tweets-container");
      tweetsContainer.innerHTML = ""; // clear existing tweets
      data.forEach((tweet) => {
        const tweetHTML = `
	<div class="posts">
	  <img class="slogopic" src="${tweet.avatar}" alt ="./images/linguini.png" />
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




