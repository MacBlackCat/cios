// Loads requested page into the content Div in index page. 
function loadPage(page) {
    /** TODO
    *   - Change 'beheer' pages titles, now it uses the "page" var as title.
    *   - Add blockade to ensure only admin ranked users can access 'beheer' pages.
    */
    $("#dataDiv").load("html/" + page + "page.html");
    if (page.includes("/beheer")) { //Check if page is from admin menu
        $("#top-title").text(page);
    } else {
        $("#top-title").text(page);
    }
    $(document).foundation();
}

// TODO: Write function, create workshops
/*function writeA(data) {
    var database = firebase.database();
    var inhoud = $('#' + data).html();

    database.ref('evenementen/iInspire').update({
        info: inhoud
    })
}*/

// Loads every event in database in the admin event menu, plus update function to activate/de-activate event active status
function readEvents() {
    var eventsMade = [];
    var eventsState = [];
    firebase.database().ref('/evenementen/').on('value').then(function (snapshot) {
        var contentTable = "<table><tbody>"; //Start of table string
        var eventObj = snapshot.val();

        for (var eventsName in eventObj) { //Adds each event to table string
            contentTable += "<tr><td><h3>" + eventsName + "</h3></td><td id='" + eventsName + "Id'></td ></tr > "; //Table code
            eventsMade.push(eventsName); //To keep track of how many events + their names
            
            if (eventObj[eventsName].active == true) { //Check if event is active or not, pushes value into array for later use
                eventsState.push(true);
            } else if (eventObj[eventsName].active == false) {
                eventsState.push(false);
            } else {
                console.log("Cant find active!");
            }
        }
        $('#eventsDiv').append(contentTable + "</tbody></table>"); //Writes the table into the page

        eventsMade.forEach(function (item, index) { //For each event in the array, adding function based on their active status (the eventsState array)
            var eventsName = item;

            if (eventsState[index] == true) { // Adds a switch to selected event, with correct Active status
                $("#" + eventsName + "Id").html("<div class='switch small'><input class='switch-input' id='" + eventsName + "Switch' checked type='checkbox'><label class='switch-paddle' for='" + eventsName + "Switch'></div>");
            } else if (eventsState[index] == false) {
                $("#" + eventsName + "Id").html("<div class='switch small'><input class='switch-input' id='" + eventsName + "Switch' type='checkbox'><label class='switch-paddle' for='" + eventsName + "Switch'></div>");
            } else {
                console.log("Couldnt give checkmark");
            }

            $("#" + eventsName + "Switch").on("click", function (e) { //Adds click function on the switch element, in order to update active status in database
                if ($("#" + eventsName + "Switch").prop("checked")) { //Check if switch element has the 'checked' property
                    firebase.database().ref('/evenementen/' + eventsName).update({ active: true });
                } else {
                    firebase.database().ref('/evenementen/' + eventsName).update({ active: false });
                }
            });
        });
    });
      
}

function writeNewEvent(eveAme) {
    var name = $("#" + eveAme).val();
    if (typeof name == "string") {
        firebase.database().ref('/evenementen/' + name).set({
            event: name,
            active: false //Update to make it variable *TODO*
        });
    } else {
        console.log("No string present \n" + name);
    }
}

function onloadPage() {

}