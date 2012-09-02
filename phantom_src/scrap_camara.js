var page = require('webpage').create(), deputados;

page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.open(encodeURI("http://www2.camara.gov.br/deputados/pesquisa"), function (status) {
    if (status !== "success") {
        console.log("Unable to access network");
    } else {
        deputados = page.evaluate(function(){
	    var list = document.querySelectorAll('select#deputado option');
	    var dep = new Array(list.length);
	    for(var i=0; i<list.length; i++){
		dep[i] = list[i].value;
	    }
	    return dep;
	});
	for(var i = 0; i < deputados.length; ++i) {
	    console.log(deputados[i]);
	}
    }
    phantom.exit();
});

