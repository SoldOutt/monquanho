function CMenu(){
    
    this.initMenu = function(){
        var szBuffer = "";
        
        szBuffer+="<div id='button_menu_play' class='menu_button button_class' >"+TEXT_PLAY+"</div>";
        szBuffer+="<div id='button_menu_help' class='menu_button button_class' >"+TEXT_HELP+"</div>";
        
		
        $("#menu_container").html(szBuffer);
        
        if(s_bMobile === false){
            $("#button_menu_play").on('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#button_menu_play").on('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
            $("#button_menu_help").on('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#button_menu_help").on('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
        }
        
        $("#button_menu_play").on('mouseup', this, function(e) {e.data._onPlay()});
        $("#button_menu_help").on('mouseup', this, function(e) {e.data._onHelp()});
        $("#menu_container").css("background-image","url("+s_oSpriteLibrary.getSpritePath('menu_bg')+")");
        $("#menu_container").css("display","block");
    };
    
    this.unload = function(){
         $("#button_menu_play").off('mouseup', this, function(e) {e.data._onPlay()});
         $("#button_menu_help").off('mouseup', this, function(e) {e.data._onHelp()});
		
         if(s_bMobile === false){
            $("#button_menu_play").off('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#button_menu_play").off('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
            $("#button_menu_help").off('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#button_menu_help").off('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
        }
    };
    
    this.refreshLanguage = function(){
        $("#button_menu_play").text(TEXT_PLAY);
        $("#button_menu_help").text(TEXT_HELP);
    };
    
    this._onPlay = function(){
        this.unload();
        
        s_oApp.gotoMenuLayout();
    };
    
    this._onHelp = function(){
        this.unload();
        
        s_oApp.gotoHelp();
    };
    
    this.initMenu();
}