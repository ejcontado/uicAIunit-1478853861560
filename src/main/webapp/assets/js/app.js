function analyze(tickerSymbol){
	var tickerSymbol = $("#tickerSymbol").val();
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	
	if(tickerSymbol==""){
		return;
	}
	
	var data = {
			type : "symbol", 
			symbol : tickerSymbol,
			start_date : startDate,
			end_date : endDate
	};
	ajaxRequest(data, "StockInsightServlet", false, ajaxSuccess)
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