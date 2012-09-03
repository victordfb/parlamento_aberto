function processPage(url, scraper, callback) {
    var page = require('webpage').create();
    page.onConsoleMessage = function(msg) {
	console.log(msg);
    };
    page.open(encodeURI(url), function (status) {
	if (status !== "success") {
            console.log("Unable to access network");
	} else {
	    var result = page.evaluate(scraper);
	    page.release();
	    callback(result);
	}
    });
}

processPage("http://www2.camara.gov.br/deputados/pesquisa",
	    function(){
		var options = document.querySelectorAll('select#deputado option');
		var deputados = new Array(options.length);
		for(var i=0; i<options.length; i++){
		    deputados[i] = options[i].value;
		}
		return deputados;
	    },
	    function(deputados){
		for(var i = 0; i < deputados.length; ++i) {
		    var dep_id = deputados[i].split("?")[1];
		    if(dep_id === undefined)
			continue;
		    processPage("http://www.camara.gov.br/internet/Deputado/dep_Detalhe.asp?id=" + dep_id,
				function(){
				    var dados = document.querySelectorAll('#content>div>div>ul li');
				    //for(var i=0; i<dados.length; i++){
				    if(dados[0] !== undefined)
					return dados[0].innerHTML + " ";
				    else
					return "nothing";
				    //}
				},
				function(nome){
				    console.log(nome);
				});
		    if(i >5)
			break;
		}
	    });