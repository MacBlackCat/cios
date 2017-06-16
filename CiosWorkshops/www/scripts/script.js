var provider = new firebase.auth.GoogleAuthProvider();

function glo() {
    firebase.auth().signInWithRedirect(provider).then(function () {
        firebase.auth().getRedirectResult().then(function (result) {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            $('#test').text(user);
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            $('#test').text(errorCode + "/n" + errorMessage);
        });
    });
}

function resultG() {
    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    });
}