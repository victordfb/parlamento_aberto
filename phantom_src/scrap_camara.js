function processPage(url, scraper, callback) {
    var page = require('webpage').create(), deputados;
    page.onConsoleMessage = function(msg) {
	console.log(msg);
    };
    page.open(encodeURI(url), function (status) {
	if (status !== "success") {
            console.log("Unable to access network");
	} else {
	    callback(page.evaluate(scraper));
	}
    });
}

processPage("http://www2.camara.gov.br/deputados/pesquisa",
	    function(){
		var list = document.querySelectorAll('select#deputado option');
		var dep = new Array(list.length);
		for(var i=0; i<list.length; i++){
		    dep[i] = list[i].value;
		}
		return dep;
	    },
	    function(deputados){
		for(var i = 0; i < deputados.length; ++i) {
		    var dep_id = deputados[i].split("?")[1]
		    if(dep_id === undefined)
			continue;
		    console.log(">>> "+dep_id);
		    processPage("http://www.camara.gov.br/internet/Deputado/dep_Detalhe.asp?id=" + dep_id,
				function(){
				    var itens = document.querySelectorAll("#content>div>div>ul>li");
				    for(var i=0; i<itens.length; i++) {
					console.log(itens[i].innerHTML);
				    }
				    return itens;
				},
				function(deputado){
				});
		    if(i > 2)
			break;
		}
	    });