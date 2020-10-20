function CInterface(){
    var _bBonusTextAnimating = false;
    var _oWinPanel;
    var _oGameOverPanel;
    
    this.init = function(){
        var szBuffer = "";
        
        szBuffer+="<div id='hint_text'  class='text_class'></div>";
        szBuffer+="<div id='text_score' class='text_class'>"+TEXT_SCORE + ": 0000</div>";
        szBuffer+="<div id='bonus_time' class='text_class'></div>";
        szBuffer+="<div id='button_game_hint' class='game_button button_class'>"+TEXT_HINT+"</div>";
        szBuffer+="<div id='button_game_restart' class='game_button button_class'>"+TEXT_RESTART+"</div>";
        szBuffer+="<div id='button_game_shuffle' class='game_button button_class'>"+TEXT_SHUFFLE+"</div>";
        szBuffer+="<div id='button_exit' style=\"background-image:url("+s_oSpriteLibrary.getSpritePath('exit_but')+")\"></div>";
        szBuffer+="<div id='bonus_score' class='bonus_score_anim text_class'></div>";
        szBuffer+="<div id='block_panel'></div>" ;
        szBuffer+="<div id='win_panel' style=\"background-image:url("+s_oSpriteLibrary.getSpritePath('panel_bg')+")\"></div>";
        szBuffer+="<div id='game_over_panel' style=\"background-image:url("+s_oSpriteLibrary.getSpritePath('panel_bg')+")\"></div>";
         
        $("#match_game_container").append(szBuffer);
          
         if(s_bMobile === false){
            $("#button_game_hint").on('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#button_game_hint").on('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
            $("#button_game_restart").on('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#button_game_restart").on('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
            $("#button_game_shuffle").on('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#button_game_shuffle").on('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
            $("#button_exit").on('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#button_exit").on('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
        }
         
        $("#button_game_hint").on('mouseup', this, function(e) {e.data._onHint()});
        $("#button_game_restart").on('mouseup', this, function(e) {e.data._onRestart()});
        $("#button_game_shuffle").on('mouseup', this, function(e) {e.data._onShuffle()});
        $("#button_exit").on('mouseup', this, function(e) {e.data._onExit()});
        
        _oWinPanel = new CWinPanel('win_panel');
        _oGameOverPanel = new CGameOverPanel("game_over_panel");
    };
    
    this.unload = function(){
        $("#button_game_hint").off('mouseup', this, function(e) {e.data._onHint()});
        $("#button_game_restart").off('mouseup', this, function(e) {e.data._onRestart()});
        $("#button_game_shuffle").off('mouseup', this, function(e) {e.data._onShuffle()});
        $("#button_exit").off('mouseup', this, function(e) {e.data._onExit()});
        
        if(s_bMobile === false){
            $("#button_game_hint").off('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#button_game_hint").off('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
            $("#button_game_restart").off('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#button_game_restart").off('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
            $("#button_game_shuffle").off('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#button_game_shuffle").off('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
            $("#button_exit").off('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#button_exit").off('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
        }
        
        _oWinPanel.unload();
        _oGameOverPanel.unload();
    };
    
    this.refreshLanguage = function(){
        $("#button_game_hint").text(TEXT_HINT);
        $("#button_game_restart").text(TEXT_RESTART);
        $("#button_game_shuffle").text(TEXT_SHUFFLE);

        _oWinPanel.refreshLanguage();
        _oGameOverPanel.refreshLanguage();
        
    };
    
    this.setScore = function(iScore){
        $("#text_score").text(TEXT_SCORE+": "+iScore);
    };
    
    this.setHintNum = function(iNumHint){
        $("#hint_text").text(TEXT_AVAILABLE_COUPLES+": "+iNumHint);
    };
    
    this.showBonusScore = function(iBonus){
        if(_bBonusTextAnimating){
            return;
        }
        
        _bBonusTextAnimating = true;
        $("#bonus_score").text(TEXT_BONUS_SCORE + ": " + iBonus);

        var oText = $("#bonus_score");
        $("#bonus_score").animate({"top": "+=56px"}, 300,"easein" ,function(){setTimeout(function() {
                                                                                                  oText.animate({"top": "-=56px"}, 300,"easeout");
                                                                                                  _bBonusTextAnimating = false;
                                                                                            }, 1000);});
        
    };
    
    this.refreshTime = function(iBonusTime){		
        $("#bonus_time").text(TEXT_BONUS_TIME+": "+ this.formatTime(Math.floor(iBonusTime)) );
    };
    
    this.gameOver = function(iScore){
        this.showBlock();
        
        _oGameOverPanel.show(iScore);
		$(s_oApp).trigger("save_score",[iScore,false]);
    };
    
    this.win = function(iScore){
        this.showBlock();
        
        _oWinPanel.show(iScore);
		$(s_oApp).trigger("save_score",[iScore,true]);
    };
    
    this.showBlock = function(){
        $("#block_panel").css("display","block");
    };
    
    this.hideBlock = function(){
        $("#block_panel").css("display","none");
    };
    
    this._onRestart = function(){
        s_oGame.onRestartBoard();
    };
    
    this._onHint = function(){
        s_oGame.onHintReleased();
    };
    
    this._onShuffle = function(){
        s_oGame.onShuffleBoard();
    };
    
    this._onExit = function(){
        _oMsgBox.setTextButton(1,TEXT_NO);
        _oMsgBox.setTextButton(3,TEXT_YES);
        _oMsgBox.showMessageBox(TEXT_TITLE_EXIT_FROM_GAME, TEXT_MSG_EXIT_FROM_GAME, MSG_BOX_MODE_YES_NO, 
                                ON_MSGBOX_NOT_EXIT_FROM_GAME,null, ON_MSGBOX_EXIT_FROM_GAME);
    };
    
    this.formatTime = function(iTime){	

        iTime/=1000;
        var iMins = Math.floor(iTime/60);
        var iSecs = Math.floor(iTime-(iMins*60));

        var szRet = "";

        if ( iSecs < 10 ){
            szRet += "0" + iSecs;
        }else{
            szRet += iSecs;
        }	

        return szRet;
    };
    
    this.init();
}