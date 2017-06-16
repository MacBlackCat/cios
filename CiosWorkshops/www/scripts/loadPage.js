function loadPage(page) {
    $("#dataDiv").load("html/" + page + "page.html");
    if (page.includes("/beheer")) {



        $("#top-title").text(page);
    } else {
        $("#top-title").text(page);
    }
    $(document).foundation();
}

function adminWS() {

}

/*function writeA(data) {
    var database = firebase.database();
    var inhoud = $('#' + data).html();

    database.ref('evenementen/iInspire').update({
        info: inhoud
    })
}*/


function readEvents() {
    var eventsMade = [];
    var eventsState = [];
    firebase.database().ref('/evenementen/').once('value').then(function (snapshot) {
        var contentTable = "<table><tbody>"; //Start of table
        var eventObj = snapshot.val();
        console.log(eventObj);
        for (var eventsName in eventObj) { //Adds each event to table string
            contentTable += "<tr><td><h3>" + eventsName + "</h3></td><td id='" + eventsName + "Id'></td ></tr > ";
            eventsMade.push(eventsName);
            
            if (eventObj[eventsName].active == true) {
                eventsState.push(true);
            } else if (eventObj[eventsName].active == false) {
                eventsState.push(false);
            } else {
                console.log("Cant find active!");
            }
        }
        $('#eventsDiv').append(contentTable + "</tbody></table>");
        console.log(eventsState);

        eventsMade.forEach(function (item, index) {
            var eventsName = item;

            if (eventsState[index] == true) {
                $("#" + eventsName + "Id").html("<div class='switch small'><input class='switch-input' id='" + eventsName + "Switch' checked type='checkbox'><label class='switch-paddle' for='" + eventsName + "Switch'></div>");
            } else if (eventsState[index] == false) {
                $("#" + eventsName + "Id").html("<div class='switch small'><input class='switch-input' id='" + eventsName + "Switch' type='checkbox'><label class='switch-paddle' for='" + eventsName + "Switch'></div>");
            } else {
                console.log("Couldnt give checkmark");
            }

            $("#" + eventsName + "Switch").on("click", function (e) {
                if ($("#" + eventsName + "Switch").prop("checked")) {
                    firebase.database().ref('/evenementen/' + eventsName).update({ active: true });
                } else {
                    firebase.database().ref('/evenementen/' + eventsName).update({ active: false });
                }
            });
        });
    });
      
}


//<div class='switch small'><input class='switch-input' id='" + eventsName + "Switch' type='checkbox'><label class='switch-paddle' for='" + eventsName + "Switch'></div>


function writeNewEvent(eveAme) {
    var name = $("#" + eveAme).val();
    if (typeof name == "string") {
        firebase.database().ref('/evenementen/' + name).set({
            event: name,
            active: false
        });
    } else {
        console.log("No string present \n" + name);
    }
}