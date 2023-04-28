
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
       const tweets = data;
       //Filter out the duplicated elements
       const tweetsWithoutDuplicates = tweets.filter((user_name, index, self) => {
        return self.indexOf(user_name) === index;
        
      });
      console.log(tweetsWithoutDuplicates);
      //Output the first 5 elements in the array only
      for(var i = 0; i < tweetsWithoutDuplicates.length; i++){
        const tweetHTML = `
			<div class="posts">
      <img class="slogopic" src="${tweetsWithoutDuplicates[i].avatar}" onerror="this.onerror=null; this.src='./images/ratatouille';" alt="Profile picture for user ${tweets[i].user_name}" />
			  <div class="words">
				<p>
				  <span class="name">${tweetsWithoutDuplicates[i].user_name}</span>
				  <span class="dates">${tweetsWithoutDuplicates[i].user_created}</span>
				</p>
				<p>${tweets[i].text}</p>
			  </div>
			</div>
		  `;
        tweetsContainer.innerHTML += tweetHTML;
      }

      })
      .catch((error) => {
        console.error("Error fetching tweets:", error);
      });
  }
}


// Call the function once to initially display tweets
fetchAndUpdateTweets();

// Call the function every 10 seconds to update tweets
setInterval(fetchAndUpdateTweets, 10000);





  