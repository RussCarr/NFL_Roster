function PlayersService(callback) {
    var playersData = [];

    var myTeam = []


    this.getMyTeam = function () {
        results = myTeam

        return results
    }
    this.removePlayerFromTeam = function (team, player, position, photo) {

        for (var i = 0; i < myTeam.length; i++) {
            var myTeamPlayer = myTeam[i]

            var i = myTeam.indexOf(myTeamPlayer)

            myTeam.splice(i, 1)
           // console.log(myTeam)



        }
    }

    this.addPlayersToTeam = function (team, player, position, photo) {
        myTeam.push(
            {
                teamName: team,
                playerName: player,
                playerPosition: position,
                playerPhoto: photo,
            })
        //console.log(myTeam)
    }

    this.getPlayersBySearch = function (team, player, position) {
        //debugger
        if (position == "" && player == "") {
            filteredPlayers = playersData.filter(function (nflPlayer) {
                if (nflPlayer.pro_team == team) {
                    return true;
                }
            });

        } else if (team == "" && player == "") {
            filteredPlayers = playersData.filter(function (nflPlayer) {
                if (nflPlayer.position == position) {
                    return true;
                }
            });
        } else if (position == "" && team == "") {
            filteredPlayers = playersData.filter(function (nflPlayer) {
                if (nflPlayer.firstname == player || nflPlayer.lastname == player) {

                    return true;
                }
            });
            //} else filteredPlayers = playersData.filter(function (nflPlayer) {
            //    if (nflPlayer.firstname == player || nflPlayer.lastname == player && nflPlayer.pro_team == team) {


            //    } else if (nflPlayer.pro_team == team && nflPlayer.position) {
            //        return true;

            //    } else (nflPlayer.firstname == player || nflPlayer.lastname == player && nflPlayer.position == position); {
            //        return true;

            //    }

            //});
        }
        return filteredPlayers;
    }


    function loadPlayersData() {

        //Lets check the localstorage for the data before making the call.
        //Ideally if a user has already used your site 
        //we can cut down on the load time by saving and pulling from localstorage 

        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);
            console.log(playersData)
            return callback();
            //return will short-circuit the loadPlayersData function
            //this will prevent the code below from ever executing
        }

        var url = "https://bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);

        $.getJSON(apiUrl, function (data) {
            playersData = data.body.players;
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')
            callback()
        });
    }
    loadPlayersData(); //call the function above every time we create a new service
}

