/**
 * Created by elenastaylor on 5/5/17.
 */

// LOAD DATA
// ===============================================================================
var friends = require("../data/friends");

// Function to find the smallest element in an array
Array.prototype.minArray = function() {
    return Math.min.apply(Math, this);
};

// ROUTING
// ===============================================================================
module.exports = function(app) {
    // API GET Requests
    // Below code handles the data for the friends.js page.
    // ===============================================================================
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // the JSON is pushed to the appropriate Javascript array
    // Then the server saves the data to the friendsArray array)
    // ===============================================================================
    app.post("/api/friends", function(req, res) {

        friends.push(req.body);
        var userChoicesArray = friends.slice(-1)[0].questions;
        console.log("Type UserChoiceArray:" + typeof userChoicesArray);
        console.log("UserChoices: " + userChoicesArray);
        var userScore = userChoicesArray.reduce(function(a, b) { return parseInt(a) + parseInt (b); }, 0);
        console.log("UserScore: " + userScore);
        var friendFoundArray = [];

        var lowestScoreFound = 1000000000;
        var lowestScoreFriendIndex = -1;

        for (var i =0; i < friends.length - 1; i++) {
            //Stores questions array in new variable for each friend;
            var matchChoicesArray = [];
            matchChoicesArray.push(friends[i].questions);
            //Store the names in a name array
            var nameArray = friends[i].name;
            console.log("MatchChoiceArray: " + matchChoicesArray);
            //Loop through the matches questions array
            for (var j =0; j < matchChoicesArray.length; j++){
                //Adds the array together to get the friends score
                var matchScore = matchChoicesArray[j].reduce(function(a, b) { return parseInt(a) + parseInt(b); }, 0);
                console.log("MatchScore: " + matchScore);
                // var newScore = Math.abs(matchScore - userScore);
            }
            // Get the absolute value of the the user's score and each match
            var totalScore = Math.abs(matchScore - userScore);

            if(totalScore < lowestScoreFound) {
                lowestScoreFound = totalScore;
                lowestScoreFriendIndex = i;
            }

            console.log("TotalScore: "+totalScore);
            friendFoundArray.push({index: i, score: totalScore});
            //console.log("Friends scores: " + friendFoundArray);
        }

        var storeScores = friendFoundArray.map(function(data){
            return data.score;
        });
        console.log(storeScores);

        console.log("low score: " + lowestScoreFound + " for friend at: " + lowestScoreFriendIndex)
        var getMatchData = friends[lowestScoreFriendIndex];
        console.log(JSON.stringify(getMatchData));



        res.json(getMatchData);

    });

};




