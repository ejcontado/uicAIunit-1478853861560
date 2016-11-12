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

function ajaxSuccess(data){
	if(data.code != 'ok'){
		alert("Analysis failed.\n\n"+data.message);
		return;
	}
	
	$("#analysisSpan").html(data.sentiment);
	
	var tweets = data.tweets;
	$("#tweetSize").html(tweets.length);
	
	for(var i=0;i<tweets.length;i++){
		$("#tweetPanelData").append('<div class="panel-section">'+tweets[i]+'</div>');
	}
	
	$("#tweetPanelData").removeAttr( 'style' );
	$("#tweetPanelData").removeAttr( 'class' );
	$("#tweetPanelData").nScrollbar();
	$("#tweetPanelData").addClass("panel-body panel-body-scroll");
	
	var tones = data.tones;
	for(var i=0;i<tones.length;i++){
		var tone = tones[i];
		$("#emotionsTbody").append('<tr><td>'+tone.name+'</td><td style="text-align:right">'+parseFloat(tone.score).toFixed(2)+'</td></tr>');
	}
	
	$("#emotionsTable").show();
	$("#tweetPanel").show();
	$("#analysisH2").show();
}

function ajaxBeforeSend(jqXHR, settings){
	clearAll()
	//add loading gif here
}

function clearAll(){
	$("#tweetSize").html("");
	$("#tweetPanelData").html("");
	$("#emotionsTbody").html("");
	$("#analysisSpan").html("");
	$("#emotionsTable").hide();
	$("#tweetPanel").hide();
	$("#analysisH2").hide();
}

function ajaxComplete(jqXHR, textStatus){
	//remove loading gif here
}

function ajaxError(jqXHR, textStatus, errorThrown) {
	//remove loading gif here
}
