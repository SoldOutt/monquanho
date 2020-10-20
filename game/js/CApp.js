function CApp(){
    var RESOURCE_TO_LOAD;
    
    var _iCurResource = 0;
    var szCurSection = "";
    var _oContainer;
    var _oLang;
	
    
    this.init = function(){
        s_bMobile = jQuery.browser.mobile;
            
        _oLang = new CLang(LANGUAGE);

        _oMsgBox = new CMsgBox();
        
        var szBuffer = "<div id='preloader_text'>0%</div>"
        $("#main_game_container").append(szBuffer);
        
        s_oSpriteLibrary  = new CSpriteLibrary();
        this._loadImages();
    };
	
	this._loadImages = function(){
            s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

            s_oSpriteLibrary.addSprite("arrow_left","./css/skins/"+s_szFolder+"/arrow_left.png");
            s_oSpriteLibrary.addSprite("arrow_right","./css/skins/"+s_szFolder+"/arrow_right.png");
            s_oSpriteLibrary.addSprite("bamboo1","./css/skins/"+s_szFolder+"/bamboo1.png");
            s_oSpriteLibrary.addSprite("bamboo2","./css/skins/"+s_szFolder+"/bamboo2.png");
            s_oSpriteLibrary.addSprite("bamboo3","./css/skins/"+s_szFolder+"/bamboo3.png");
            s_oSpriteLibrary.addSprite("bamboo4","./css/skins/"+s_szFolder+"/bamboo4.png");
            s_oSpriteLibrary.addSprite("bamboo5","./css/skins/"+s_szFolder+"/bamboo5.png");
            s_oSpriteLibrary.addSprite("bamboo6","./css/skins/"+s_szFolder+"/bamboo6.png");
            s_oSpriteLibrary.addSprite("bamboo7","./css/skins/"+s_szFolder+"/bamboo7.png");
            s_oSpriteLibrary.addSprite("bamboo8","./css/skins/"+s_szFolder+"/bamboo8.png");
            s_oSpriteLibrary.addSprite("bamboo9","./css/skins/"+s_szFolder+"/bamboo9.png");

            s_oSpriteLibrary.addSprite("characters1","./css/skins/"+s_szFolder+"/characters1.png");
            s_oSpriteLibrary.addSprite("characters2","./css/skins/"+s_szFolder+"/characters2.png");
            s_oSpriteLibrary.addSprite("characters3","./css/skins/"+s_szFolder+"/characters3.png");
            s_oSpriteLibrary.addSprite("characters4","./css/skins/"+s_szFolder+"/characters4.png");
            s_oSpriteLibrary.addSprite("characters5","./css/skins/"+s_szFolder+"/characters5.png");
            s_oSpriteLibrary.addSprite("characters6","./css/skins/"+s_szFolder+"/characters6.png");
            s_oSpriteLibrary.addSprite("characters7","./css/skins/"+s_szFolder+"/characters7.png");
            s_oSpriteLibrary.addSprite("characters8","./css/skins/"+s_szFolder+"/characters8.png");
            s_oSpriteLibrary.addSprite("characters9","./css/skins/"+s_szFolder+"/characters9.png");

            s_oSpriteLibrary.addSprite("circle1","./css/skins/"+s_szFolder+"/circle1.png");
            s_oSpriteLibrary.addSprite("circle2","./css/skins/"+s_szFolder+"/circle2.png");
            s_oSpriteLibrary.addSprite("circle3","./css/skins/"+s_szFolder+"/circle3.png");
            s_oSpriteLibrary.addSprite("circle4","./css/skins/"+s_szFolder+"/circle4.png");
            s_oSpriteLibrary.addSprite("circle5","./css/skins/"+s_szFolder+"/circle5.png");
            s_oSpriteLibrary.addSprite("circle6","./css/skins/"+s_szFolder+"/circle6.png");
            s_oSpriteLibrary.addSprite("circle7","./css/skins/"+s_szFolder+"/circle7.png");
            s_oSpriteLibrary.addSprite("circle8","./css/skins/"+s_szFolder+"/circle8.png");
            s_oSpriteLibrary.addSprite("circle9","./css/skins/"+s_szFolder+"/circle9.png");

            s_oSpriteLibrary.addSprite("dragon1","./css/skins/"+s_szFolder+"/dragon1.png");
            s_oSpriteLibrary.addSprite("dragon2","./css/skins/"+s_szFolder+"/dragon2.png");
            s_oSpriteLibrary.addSprite("dragon3","./css/skins/"+s_szFolder+"/dragon3.png");

            s_oSpriteLibrary.addSprite("flower1","./css/skins/"+s_szFolder+"/flower1.png");
            s_oSpriteLibrary.addSprite("flower2","./css/skins/"+s_szFolder+"/flower2.png");
            s_oSpriteLibrary.addSprite("flower3","./css/skins/"+s_szFolder+"/flower3.png");
            s_oSpriteLibrary.addSprite("flower4","./css/skins/"+s_szFolder+"/flower4.png");

            s_oSpriteLibrary.addSprite("season1","./css/skins/"+s_szFolder+"/season1.png");
            s_oSpriteLibrary.addSprite("season2","./css/skins/"+s_szFolder+"/season2.png");
            s_oSpriteLibrary.addSprite("season3","./css/skins/"+s_szFolder+"/season3.png");
            s_oSpriteLibrary.addSprite("season4","./css/skins/"+s_szFolder+"/season4.png");

            s_oSpriteLibrary.addSprite("wind1","./css/skins/"+s_szFolder+"/wind1.png");
            s_oSpriteLibrary.addSprite("wind2","./css/skins/"+s_szFolder+"/wind2.png");
            s_oSpriteLibrary.addSprite("wind3","./css/skins/"+s_szFolder+"/wind3.png");
            s_oSpriteLibrary.addSprite("wind4","./css/skins/"+s_szFolder+"/wind4.png");

            s_oSpriteLibrary.addSprite("selection","./css/skins/"+s_szFolder+"/selection.png");
            s_oSpriteLibrary.addSprite("credits_text","./css/skins/"+s_szFolder+"/credits_text.png");
            s_oSpriteLibrary.addSprite("exit_but","./css/skins/"+s_szFolder+"/exit_but.png");

            s_oSpriteLibrary.addSprite("game_bg_0","./css/skins/"+s_szFolder+"/game_bg_0.jpg");
            s_oSpriteLibrary.addSprite("game_bg_1","./css/skins/"+s_szFolder+"/game_bg_1.jpg");
            s_oSpriteLibrary.addSprite("game_bg_2","./css/skins/"+s_szFolder+"/game_bg_2.jpg");
            s_oSpriteLibrary.addSprite("game_bg_3","./css/skins/"+s_szFolder+"/game_bg_3.jpg");
            s_oSpriteLibrary.addSprite("game_bg_4","./css/skins/"+s_szFolder+"/game_bg_4.jpg");
            s_oSpriteLibrary.addSprite("game_bg_5","./css/skins/"+s_szFolder+"/game_bg_5.jpg");

            s_oSpriteLibrary.addSprite("help_bg","./css/skins/"+s_szFolder+"/help_bg.jpg");
            s_oSpriteLibrary.addSprite("layout_bg","./css/skins/"+s_szFolder+"/layout_bg.png");
            s_oSpriteLibrary.addSprite("locker","./css/skins/"+s_szFolder+"/locker.png");
            s_oSpriteLibrary.addSprite("menu_bg","./css/skins/"+s_szFolder+"/menu_bg.jpg");
            s_oSpriteLibrary.addSprite("msg_box_bg","./css/skins/"+s_szFolder+"/msg_box_bg.png");
            s_oSpriteLibrary.addSprite("panel_bg","./css/skins/"+s_szFolder+"/panel_bg.png");

            RESOURCE_TO_LOAD = s_oSpriteLibrary.getNumSprites();
            s_oSpriteLibrary.loadSprites();
	};
	
	this._onImagesLoaded = function(){
            _iCurResource++;
            var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

            $("#preloader_text").text(iPerc+"%");
            if(_iCurResource === RESOURCE_TO_LOAD){
                $("#preloader_text").remove();
                
                this.gotoMenu();
                
                $("#msg_box").css("background-image", "url("+s_oSpriteLibrary.getSpritePath('msg_box_bg')+")");
            }
	};
    
	this._onAllImagesLoaded = function(){
	
	};
	
    this.refreshLanguage = function(szLang){
        //REFRESH TEXT IN CURRENT SECTION
        switch(szLang){
            case "de_DE":{
                    _oLang.initLangDE();
                    break;
            }
            case "es_ES":
            case "es_LA":{
                    _oLang.initLangES();
                    break;
            }
            case "fr_CA":
            case "fr_FR":{
                    _oLang.initLangFR();
                    break;
            }
            case "it_IT":{
                    _oLang.initLangITA();
                    break;
            }
            case "nl_NL":{
                    _oLang.initLangNL();
                    break;
            }
            case "pt_BR":
            case "pt_PT":{
                    _oLang.initLangPOR();
                    break;
            }
            default:{
                    _oLang.initLangENG();
            }
        }
        
        _oContainer.refreshLanguage();
    };
    
    this.onClickMessageBox = function(szEvent){
        switch(szEvent){
            case ON_MSGBOX_EXIT_FROM_GAME: {
                _oMsgBox.hide();
                this.gotoMenu();
				$(s_oApp).trigger("restart");
                break;
            }

            case ON_MSGBOX_NOT_EXIT_FROM_GAME: {
                _oMsgBox.hide();
                break;
            }
        }

    };
    
    this.gotoMenu = function(){
        if(szCurSection !== ""){
            _oContainer.unload();
            $("#"+szCurSection).html("");
            $("#"+szCurSection).css("display","none");
        }
        _oContainer = new CMenu();
        
        szCurSection = "menu_container";
    };
    
    this.gotoMenuLayout = function(){
        if(szCurSection !== ""){
            $("#"+szCurSection).html("");
            $("#"+szCurSection).css("display","none");
        }
        _oContainer = new CMenuLayout();
        
        szCurSection = "menu_layout";
		$(s_oApp).trigger("game_start");
    };
    
    this.gotoHelp = function(){
        if(szCurSection !== ""){
            $("#"+szCurSection).html("");
            $("#"+szCurSection).css("display","none");
        }
        
        _oContainer = new CHelp();
            
        szCurSection = "help_container";
    };
    
    this.gotoCredits = function(){
        if(szCurSection !== ""){
            $("#"+szCurSection).html("");
            $("#"+szCurSection).css("display","none");
        }
        
        _oContainer = new CCredits();
            
        szCurSection = "credits_container";
    };
    
    this.gotoGame = function(){
        if(szCurSection !== ""){
            $("#"+szCurSection).html("");
            $("#"+szCurSection).css("display","none");
        }

        _oContainer = new CGame();
        
        szCurSection = "match_game_container";
    };

    
    this.init();
    
    s_oApp = this;
}

var s_bMobile;
var s_oApp;
var s_szFolder = "sweety";
var _oMsgBox;
var s_oSpriteLibrary;