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

// Loads every event in database in the admin event menu, plus control buttons
function readEvents() {
    var eventsRef = firebase.database().ref('/evenementen/');
    
    //Children functions
    // On Added
    eventsRef.on('child_added', function (snapshot) {
        var eventChild = snapshot.val(); //database data
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var hh = document.createElement("h4");

        hh.textContent = eventChild.event;
        td1.id = eventChild.event + "tdhh";
        td2.id = eventChild.event + "td";
        tr.id = eventChild.event + "tr";

        document.getElementById("eventsTable").appendChild(tr);
        document.getElementById(eventChild.event + "tr").appendChild(td1);
        document.getElementById(eventChild.event + "tdhh").appendChild(hh);
        document.getElementById(eventChild.event + "tr").appendChild(td2);

        var div = document.createElement("div");
        var input = document.createElement("input");
        var label = document.createElement("label");

        div.setAttribute("class", "switch small");
        div.setAttribute("id", eventChild.event + "div");
        input.setAttribute("class", "switch-input");
        input.setAttribute("id", eventChild.event + "Switch");
        input.setAttribute("type", "checkbox");
        label.setAttribute("class", "switch-paddle");
        label.setAttribute("for", eventChild.event + "Switch");

        if (eventChild.active == true) {
            input.setAttribute("checked", "");
        }

        document.getElementById(eventChild.event + "td").appendChild(div);
        document.getElementById(eventChild.event + "div").appendChild(input);
        document.getElementById(eventChild.event + "div").appendChild(label);

        //Adding Click eventListener to switches
        var inputId = document.getElementById(eventChild.event + "Switch");
        inputId.addEventListener("click", function () {
            if (!inputId.hasAttribute("checked")) {
                firebase.database().ref('/evenementen/' + eventChild.event).update({ active: true });
                inputId.setAttribute("checked", "");
            } else {
                firebase.database().ref('/evenementen/' + eventChild.event).update({ active: false });
                inputId.removeAttribute("checked", "");
            }
        });
    });
    // On Changed
    eventsRef.on('child_changed', function (snapshot) {
        console.log(snapshot.val());
    });
    // On Removed
    eventsRef.on('child_removed', function (childRemovedData) {
        var childData = childRemovedData.val();
        var removeRow = document.getElementById(childData.event + "tr");
        removeRow.parentNode.removeChild(removeRow);
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