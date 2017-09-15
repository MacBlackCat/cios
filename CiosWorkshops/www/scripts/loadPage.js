// Loads requested page into the content Div in index page. 
function loadPage(page, eKey) {
    /** TODO
    *   - Add blockade to ensure only admin ranked users can access 'beheer' pages.
    */
    $("#dataDiv").load("html/" + page + "page.html", function () {
        //Check if page is from admin menu
        if (page.includes("beheer/")) { 
            pageB = page.replace("beheer/", "")
            $("#top-title").text(pageB);

            if (page.includes("Evenementen")) {
                readEvents("beheer");
            }
        }

        //If page is a requested event
        else if (page == "Evenement") {
            var eventsRef = firebase.database().ref('/evenementen/' + eKey);
            var eventName;
            eventsRef.on('value', function (snapshot) {
                eventName = snapshot.val();
                console.log(eventName)
                $("#top-title").text(eventName.event);
            });
        }

        //If page is the homepage aka displaying all active events
        else if (page == "Home") {
            $("#top-title").text(page);
            readEvents("home");
        } else {
            $("#top-title").text(page);
        }
    });
    
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
function readEvents(adminVal) {
    var eventsRef = firebase.database().ref('/evenementen/');
    
    //Children functions
    // On Added
    eventsRef.on('child_added', function (snapshot) {
        var eventChild = snapshot.val(); //database data

        if (adminVal == "beheer" || eventChild.active == true) {
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            var hh = document.createElement("h4");

            hh.textContent = eventChild.event;
            td1.id = eventChild.key + "tdhh";
            td2.id = eventChild.key + "td";
            tr.id = eventChild.key + "tr";

            document.getElementById("eventsTable").appendChild(tr);
            document.getElementById(eventChild.key + "tr").appendChild(td1);
            document.getElementById(eventChild.key + "tdhh").appendChild(hh);
            document.getElementById(eventChild.key + "tr").appendChild(td2);

            // If the requested events are meant for Adminpage or not
            if (adminVal == "beheer") {
                var div = document.createElement("div");
                var input = document.createElement("input");
                var label = document.createElement("label");

                div.setAttribute("class", "switch small");
                div.setAttribute("id", eventChild.key + "div");
                input.setAttribute("class", "switch-input");
                input.setAttribute("id", eventChild.key + "Switch");
                input.setAttribute("type", "checkbox");
                label.setAttribute("class", "switch-paddle");
                label.setAttribute("for", eventChild.key + "Switch");

                if (eventChild.active == true) {
                    input.setAttribute("checked", "");
                }

                document.getElementById(eventChild.key + "td").appendChild(div);
                document.getElementById(eventChild.key + "div").appendChild(input);
                document.getElementById(eventChild.key + "div").appendChild(label);

                //Adding Click eventListener to switches
                var inputId = document.getElementById(eventChild.key + "Switch");
                inputId.addEventListener("click", function () {
                    if (!inputId.hasAttribute("checked")) {
                        firebase.database().ref('/evenementen/' + eventChild.key).update({ active: true });
                        inputId.setAttribute("checked", "");
                    } else {
                        firebase.database().ref('/evenementen/' + eventChild.key).update({ active: false });
                        inputId.removeAttribute("checked", "");
                    }
                });
            }
            // If the requested events are meant for the home page
            else if (adminVal == "home") {
                var selectEv = document.getElementById(eventChild.key + "tr");
                var eventKey = eventChild.key;
                selectEv.addEventListener("click", function () {
                    loadPage("Evenement", eventKey);
                });
            }
        }
    });
    // On Changed
    eventsRef.on('child_changed', function (snapshot) {
        console.log("Child Changed:" + snapshot.val());
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
        var pushy = firebase.database().ref('/evenementen/').push();        
        var newPushy = {
            event: name,
            active: false, //Update to make it variable *TODO*
            key: pushy.key
        };
        pushy.set(newPushy);
    } else {
        console.log("No string present \n" + name);
    }
}

function onloadPage() {
    
}