//Global array variable to store json data in array form
var tweets;

function fetchAndUpdateTweets() {
  if (!document.querySelector("#pauseTweets").checked) {
    fetch("http://50.21.190.71/get_tweets")
      .then((response) => response.json())
      .then((data) => {
        // Sort the tweets by chronological order
        data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

        //Select the tweets container
        const tweetsContainer = document.getElementById("tweets-container");
        tweetsContainer.innerHTML = ""; // clear existing tweets

        //Convert json data to an array
        tweets = data;
        //Filter out the duplicated elements
        const tweetsWithoutDuplicates = tweets.filter(
          (value, index, self) =>
            self.findIndex((v) => v.user_name === value.user_name) === index
        );

        //console.log(tweetsWithoutDuplicates);

        //Output the first 10 elements in the array only
        for (var i = 0; i < tweetsWithoutDuplicates.length; i++) {
          const tweetHTML = `
			<div class="posts">
      <img class="slogopic" src="${tweetsWithoutDuplicates[i]?.avatar}" onerror="this.onerror=null; this.src='./images/ratatouille.jpg';" alt="Profile picture for user ${tweetsWithoutDuplicates[i]?.user_name}" />
			  <div class="words">
				<p>
				  <span class="name">${tweetsWithoutDuplicates[i].user_name}</span>
				  <span class="dates">${tweetsWithoutDuplicates[i].user_created}</span>
				</p>
				<p>${tweetsWithoutDuplicates[i].text}</p>
			  </div>
			</div>
		  `;
          tweetsContainer.innerHTML += tweetHTML;
        }
        // Update the height of the middle container based on the height of the posts
        const middleContainer = document.querySelector(".middle");
        middleContainer.style.height = `${tweetsContainer.offsetHeight}px`;
      })
      .catch((error) => {
        console.error("Error fetching tweets:", error);
      });
  }
}
//updateMiddleContainerHeight();
let searchWords = "";
const myForm = document.getElementById("search-input");
document.getElementById("search-input").addEventListener("input", function (e) {
  let searchWords = e.target.value; // this will log the current value of the input field whenever it changes
  let filtered = tweets.filter(
    (tweet) =>
      tweet.text.includes(searchWords) ||
      tweet.date === searchWords ||
      tweet.user_name.includes(searchWords)
  );

  const tweetsContainer = document.getElementById("tweets-container");
  tweetsContainer.innerHTML = ""; // clear existing tweets
  for (var i = 0; i < filtered.length; i++) {
    const tweetHTML = `
<div class="posts">
<img class="slogopic" src="${filtered[i]?.avatar}" onerror="this.onerror=null; this.src='./images/ratatouille.jpg';" alt="Profile picture for user ${filtered[i][i]?.user_name}" />
  <div class="words">
  <p>
    <span class="name">${filtered[i].user_name}</span>
    <span class="dates">${filtered[i].user_created}</span>
  </p>
  <p>${filtered[i].text}</p>
  </div>
</div>
`;
    tweetsContainer.innerHTML += tweetHTML;
  }
});

// Call the function once to initially display tweets
fetchAndUpdateTweets();

// Call the function every 10 seconds to update tweets
setInterval(fetchAndUpdateTweets, 5000);
