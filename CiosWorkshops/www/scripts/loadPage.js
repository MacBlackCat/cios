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
    
    firebase.database().ref('/evenementen/').once('value').then(function (snapshot) {
        var contentTable = "<table><tbody>"; //Start of table
        for (var eventsName in snapshot.val()) { //Adds each event to table string
            contentTable += "<tr><td><h3>" + eventsName + "</h3></td><td><div class='switch small'><input class='switch-input' id='" + eventsName + "Switch' type='checkbox'><label class='switch-paddle' for='" + eventsName+"Switch'></div ></td ></tr > ";
        }

        $('#eventsDiv').append(contentTable + "</tbody></table>");
    });
    
}

function writeNewEvent(name) {
    firebase.database().ref('/evenementen/' + name).set({
        event: name
    });
}