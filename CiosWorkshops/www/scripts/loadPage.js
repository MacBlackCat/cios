function loadPage(page) {
    $("#dataDiv").load("html/" + page + "page.html");
    $("#top-title").text(page);
    $(document).foundation();
}