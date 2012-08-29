var page = require('webpage').create();

page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.open(encodeURI("http://www2.camara.gov.br/deputados/pesquisa"), function (status) {
    if (status !== "success") {
        console.log("Unable to access network");
    } else {
        page.evaluate(function() {
            var list = document.querySelectorAll('select#deputado option');
            for (var i = 0; i < list.length; ++i) {
                console.log(list[i].value + ": " + list[i].innerHTML.replace(/<.*?>/g, ''));
            }
        });
    }
    phantom.exit();
});