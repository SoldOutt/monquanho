function CWinPanel(szDivContainer){
    
    var _szDivContainer;
    
    this.init = function(szDivContainer){
        _szDivContainer =szDivContainer;
        
        var szBuffer = "";
        
        szBuffer += "<div id='win_title' class='text_class'></div> ";
        szBuffer += "<div id='win_final_score' class='text_class'></div> ";
        szBuffer += "<div id='win_but_exit' class='button_class panel_button'>"+TEXT_EXIT+"</div> ";
        szBuffer += "<div id='win_but_shuffle' class='button_class panel_button'>"+TEXT_SHUFFLE+"</div> ";
		
        $("#"+szDivContainer).html(szBuffer);
        
        if(s_bMobile === false){
            $("#win_but_shuffle").on('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#win_but_shuffle").on('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
            $("#win_but_exit").on('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#win_but_exit").on('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
        }
         
        $("#win_but_shuffle").on('mouseup', this, function(e) {e.data._onShuffle()});
        $("#win_but_exit").on('mouseup', this, function(e) {e.data._onExit()});
    };
    
    this.unload = function(){
        $("#win_but_shuffle").off('mouseup', this, function(e) {e.data._onShuffle()});
        $("#win_but_exit").off('mouseup', this, function(e) {e.data._onExit()});
        
        if(s_bMobile === false){
            $("#win_but_shuffle").off('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#win_but_shuffle").off('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
            $("#win_but_exit").off('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#win_but_exit").off('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
        }
    };
    
    this.show = function(iScore){
        $("#win_title").text(TEXT_CONGRATULATIONS);
	$("#win_final_score").text(TEXT_FINAL_SCORE+"\n"+iScore);
        
        $("#"+_szDivContainer).css("display","block");
        
        $("#"+_szDivContainer).animate({top: "+=400px"}, 500,"easein");
    };
    
    this.refreshLanguage = function(){
        $("#win_but_exit").text(TEXT_EXIT);
        $("#win_but_shuffle").text(TEXT_SHUFFLE);
    };
    
    this._onShuffle = function(){
        $("#"+_szDivContainer).css("display","none");
        $("#"+_szDivContainer).css("top","-=400");
        
        s_oGame.onShuffleBoard();
    };

    this._onExit = function(){
        $("#"+_szDivContainer).css("display","none");
        $("#"+_szDivContainer).css("top","-=400");

        s_oApp.gotoMenu();
    };

    this.init(szDivContainer);
    
    return this;
    
}