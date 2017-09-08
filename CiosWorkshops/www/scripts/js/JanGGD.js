function ggd() {
    var v2alues = document.getElementById("2numbers").value;
    var v1alues = document.getElementById("numbers").value;

    var answer = derp(v1alues, v2alues);
    console.log(answer);
    document.getElementById("jsOutput").innerHTML = answer;
}

var derp = function (a, b) {
    while (a != b) {
        if (a > b) {
            a %= a - b;
        } else {
            b %= b - a;
        }
    }
    return a;
}

$("#sumbit").on("click", function (e) {
    ggd();
});