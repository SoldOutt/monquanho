function CGameOverPanel(szDivContainer){
    
    var _szDivContainer;
    
    this.init = function(szDivContainer){
        _szDivContainer = szDivContainer;
        
        var szBuffer = "";
         
        szBuffer += "<div id='game_over_title' class='text_class'></div> ";
        szBuffer += "<div id='game_over_final_score' class='text_class'></div> ";
        szBuffer += "<div id='game_over_but_exit' class='button_class panel_button'>"+TEXT_EXIT+"</div> ";
        szBuffer += "<div id='game_over_but_restart' class='button_class panel_button'>"+TEXT_RESTART+"</div> ";
        szBuffer += "<div id='game_over_but_shuffle' class='button_class panel_button'>"+TEXT_SHUFFLE+"</div> ";
		
        $("#"+szDivContainer).html(szBuffer);
        
        if(s_bMobile === false){
            $("#game_over_but_shuffle").on('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#game_over_but_shuffle").on('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
            $("#game_over_but_exit").on('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#game_over_but_exit").on('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
            $("#game_over_but_restart").on('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#game_over_but_restart").on('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
        }
        $("#game_over_but_shuffle").on('mouseup', this, function(e) {e.data._onShuffle()});
        
        
        $("#game_over_but_exit").on('mouseup', this, function(e) {e.data._onExit()});
        
        
        $("#game_over_but_restart").on('mouseup', this, function(e) {e.data._onRestart()});
    };
    
    this.unload = function(){
        $("#game_over_but_shuffle").off('mouseup', this, function(e) {e.data._onShuffle()});
        $("#game_over_but_exit").off('mouseup', this, function(e) {e.data._onExit()});
        $("#game_over_but_restart").off('mouseup', this, function(e) {e.data._onRestart()});
        
        if(s_bMobile === false){
            $("#game_over_but_shuffle").off('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#game_over_but_shuffle").off('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
            $("#game_over_but_exit").off('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#game_over_but_exit").off('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
            $("#game_over_but_restart").off('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#game_over_but_restart").off('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
        }
    };
    
    this.show = function(iScore){
        $("#game_over_title").text(TEXT_NO_MORE_TILES);
	$("#game_over_final_score").text(TEXT_FINAL_SCORE+"\n"+iScore);
        
        $("#"+_szDivContainer).css("display","block");
        
        $("#"+_szDivContainer).animate({top: "+=400px"}, 500,"easein");
    };
    
    this.refreshLanguage = function(){
        $("#game_over_but_exit").text(TEXT_EXIT);
        $("#game_over_but_shuffle").text(TEXT_SHUFFLE);
        $("#game_over_but_restart").text(TEXT_RESTART);
    };
    
    this._onShuffle = function(){
        $("#"+_szDivContainer).css("display","none");
        $("#"+_szDivContainer).css("top","-=400");
        
        s_oGame.onShuffleBoard();
    };
    
    this._onRestart = function(){
        $("#"+_szDivContainer).css("display","none");
        $("#"+_szDivContainer).css("top","-=400");
        
        s_oGame.onRestartBoard();
    };

    this._onExit = function(){
        $("#"+_szDivContainer).css("display","none");
        $("#"+_szDivContainer).css("top","-=400");
        
        s_oApp.gotoMenu();
    };
    
    this.init(szDivContainer);
    
    return this;
}