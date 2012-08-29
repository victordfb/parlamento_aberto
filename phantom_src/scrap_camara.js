var page = require('webpage').create();

page.onConsoleMessage = function(msg) {
    console.log(msg);
};

var nomes = {
    url: "http://www2.camara.gov.br/deputados/pesquisa",

    buscaNomesDeDeputados: function(){
	var list = document.querySelectorAll('select#deputado option');
	for (var i = 0; i < list.length; ++i) {
            console.log(list[i].value + ": " + list[i].innerHTML.replace(/<.*?>/g, ''));
	}
    }
}

page.open(encodeURI(nomes.url), function (status) {
    if (status !== "success") {
        console.log("Unable to access network");
    } else {
        page.evaluate(nomes.buscaNomesDeDeputados);
    }
    phantom.exit();
});