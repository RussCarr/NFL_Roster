function PlayerController() {
    var loading = false; //Start the spinner
    var playerService = new PlayersService(ready);



    function ready() {
        loading = true; //stop the spinner

    }

    this.search = function search(event) {

        event.preventDefault();
        var team = event.target.team.value.toUpperCase();
        var player = event.target.player.value;
        var position = event.target.position.value.toUpperCase();


        var results = playerService.getPlayersBySearch(team, player, position)
        playerService.getPlayersBySearch(team, player, position)

        draw(results)

    }

    this.addPlayersToTeam = function addPlayersToTeam( team, player, position, photo) {

        playerService.addPlayersToTeam(team, player, position, photo)

        document.getElementById("newMemberAdded").innerHTML = `Player added to your team.`
        drawMyTeam(playerService.getMyTeam())

    }

    this.removePlayerFromTeam = function removePlayerFromTeam( team, player, position, photo) {

        playerService.removePlayerFromTeam(team, player, position, photo)

        document.getElementById("newMemberAdded").innerHTML = `Player removed from your team.`
        drawMyTeam(playerService.getMyTeam())

    }
    // this.drawTeamDropDown = function drawTeamDropDown(results) {
    //      console.log("1")
    //      var results = playerService.getPlayersByTeam()
    //       playerService.getPlayersByTeam()
    //      console.log(results,"2")

    //       var template = ''
    //      var myTeamElem = document.getElementById("select-team")
    //      console.log("4")
    //      for (var i = 0; i < results.length; i++) {
    //         var result = results[i]
    //         template += `
    //     
    //        <option value="${result.pro_team}"><span id="teams">${result.pro_team}</span></option>
    //     `
    //     }
    //     myTeamElem.innerHTML = template
    //     document.getElementById('select-team').value
    // }



    function draw(results) {
        var template = ''
        var myTeamElem = document.getElementById("Players")
        
        for (var i = 0; i < results.length; i++) {
            var result = results[i]
                        template += `
        
            <div class="col-3 section">

        <img src="${result.photo}" alt="fooball image">
        <p>Name: '${result.fullname}'</p>
        <p>Position: '${result.position}'</p>
        <p>Team: '${result.pro_team}'</p>
        <div class="form-box"></div>
        <hr>
        
        <button onclick="app.controllers.playerCtrl.addPlayersToTeam('${result.pro_team}','${result.fullname}','${result.position}','${result.photo}')">add player</button>
        </div>
     `
        }
        myTeamElem.innerHTML = template


    }


    function drawMyTeam(results) {
        var template = ''
        var myTeamElem = document.getElementById("my-team")

        for (var i = 0; i < results.length; i++) {
            var result = results[i]
            template += `
        
            <div class="col-3">

        <img src="${result.playerPhoto}" alt="fooball image">
        <p>Name: '${result.playerName}'</p>
        <p>Position: '${result.playerPosition}'</p>
        <p>Team: '${result.teamName}'</p>
        <div class="form-box"></div>
        <hr>
        <button onclick="app.controllers.playerCtrl.removePlayerFromTeam('${result.pro_team}','${result.fullname}','${result.position}','${result.photo}')">remove player</button>
        </div>
     `
        }
        myTeamElem.innerHTML = template


    }



}