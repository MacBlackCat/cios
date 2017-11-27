function fireLogin() {
    // FirebaseUI config.
    var uiConfig = {
        callbacks: {
            signInSucces: function (currentUser, credential, redirectUrl) {
                $("#firebaseui-auth-container").hide();
                $("#dataDiv").show();
                return true;
            }
        },
        signInSuccessUrl: loadPage("Home"), //Rewrite to load when succes, not when object is made
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ]
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    //var ele = document.getElementById("firebaseui-auth-container");
    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", uiConfig);
}

function logoutFB() {
    firebase.auth().signOut();
    $("#firebaseui-auth-container").show();
    $("#dataDiv").hide();
}