function analyze(tickerSymbol){
		ajaxRequest({type : "symbol", symbol : tickerSymbol}, "StockInsightServlet", false, ajaxSuccess)
}

function ajaxRequest(data, url, cache, fxn) {
	$.ajax({
		url : url,
		data : data,
		cache: cache,
		success : fxn,
		error : ajaxError,
		dataType : "json",
		beforeSend: ajaxBeforeSend,
		complete: ajaxComplete
	});
}

function ajaxSuccess(){
	
}

function ajaxBeforeSend(jqXHR, settings){
	
}

function ajaxComplete(jqXHR, textStatus){

}

function ajaxError(jqXHR, textStatus, errorThrown) {
	
}