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
	ajaxRequest(data, "StockInsightServlet", false, ajaxSuccess);
	$("#loading").css("display", "block");
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
	$("#loading").css("display", "none");
	if(data.code != 'ok'){
		alert("Analysis failed.\n\n"+data.message);
		return;
	}
	
	$("#analysisSpan").html(data.sentiment);
	
	$("#tweetPanel").append('<div id="tweetPanelData" class="panel-body panel-body-scroll"></div>');
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
	clearForm();
	
	$("#analyzeButton").attr("disabled","disabled");
	$("#tickerSymbol").attr("disabled","disabled");
    $("#dropDownButton").attr("disabled","disabled");
    $("#startDate").attr("disabled","disabled");
    $("#endDate").attr("disabled","disabled");
}

function clearForm(){
	$("#tweetSize").html("");
	$("#tweetPanelData").remove("");
	$("#emotionsTbody").html("");
	$("#analysisSpan").html("");
	$("#emotionsTable").hide();
	$("#tweetPanel").hide();
	$("#analysisH2").hide();
}

function ajaxComplete(jqXHR, textStatus){
	disableForm();
}

function ajaxError(jqXHR, textStatus, errorThrown) {
	clearForm();
	enableForm();
}

function disableForm(){
	$("#tickerSymbol").removeAttr("disabled");
    $("#dropDownButton").removeAttr("disabled");
    $("#analyzeButton").removeAttr("disabled");
    $("#startDate").removeAttr("disabled");
	$("#endDate").removeAttr("disabled");
    
    $("#dropDownButton").removeClass("disabled");
}

function enableForm(){
	$("#startDate").removeAttr("disabled");
	$("#endDate").removeAttr("disabled");
	$("#tickerSymbol").removeAttr("disabled");
	$("#analyzeButton").removeAttr("disabled");
	
    $("#dropDownButton").removeAttr("disabled");
    $("#dropDownButton").removeClass("disabled");
}
