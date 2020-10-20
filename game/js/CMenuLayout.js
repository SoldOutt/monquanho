function CMenuLayout(){
    var _iFirstLayoutIndex;
    var _aLayoutButtons = new Array();
    var _aLayoutInfo = new Array();
    
    this.initMenuLayout = function(){
         var szBuffer = "";
         
          szBuffer+="<div id='text_choose_layout' class='game_text text_class' style=\"position:absolute;top:300px;text-align:center;width:800px;font-size:50px\">"+TEXT_CHOOSE_LAYOUT+"</div>";
          
          szBuffer+="<div id='mahjong_layout_0' class='mahjong_layout' style=\"background-image:url("+s_oSpriteLibrary.getSpritePath('layout_bg')+")\"></div>";
          szBuffer+="<div id='mahjong_layout_1' class='mahjong_layout' style=\"background-image:url("+s_oSpriteLibrary.getSpritePath('layout_bg')+")\"></div>";
          szBuffer+="<div id='mahjong_layout_2' class='mahjong_layout' style=\"background-image:url("+s_oSpriteLibrary.getSpritePath('layout_bg')+")\"></div>";
          
          szBuffer+="<div id='arrow_button_left' class='arrow_button' style=\"background-image:url("+s_oSpriteLibrary.getSpritePath('arrow_left')+")\"></div>";
          szBuffer+="<div id='arrow_button_right' class='arrow_button' style=\"background-image:url("+s_oSpriteLibrary.getSpritePath('arrow_right')+")\"></div>";
          
          $("#menu_layout").html(szBuffer);

          _iFirstLayoutIndex = 0;
          
          this.showLayout();
          
          $("#arrow_button_left").on('mouseup', this, function(e) {e.data._onArrowLeft()});
          $("#arrow_button_right").on('mouseup', this, function(e) {e.data._onArrowRight()});
          
          $("#menu_layout").css("background-image", "url("+s_oSpriteLibrary.getSpritePath('menu_bg')+")");
          $("#menu_layout").css("display","block");
    };
    
    this.unload = function(){
        $("#arrow_button_left").off('mouseup', this, function(e) {e.data._onArrowLeft()});
        $("#arrow_button_right").off('mouseup', this, function(e) {e.data._onArrowRight()});
    };
    
    this.showLayout = function(){
        var iCont = 0;
        for(var i=_iFirstLayoutIndex;i<_iFirstLayoutIndex+3;i++){
            $("#mahjong_layout_"+iCont).off('mouseup');
            
            _aLayoutButtons.push(new CLayoutButton("mahjong_layout_"+iCont,_aLayoutInfo[i].name,
                                    window["TEXT_LAYOUT_"+_aLayoutInfo[i].name.toUpperCase()],window["TEXT_DIFF_"+_aLayoutInfo[i].diff],
                                    _aLayoutInfo[i].locked));
            
            
            $("#mahjong_layout_"+iCont).on('mouseup',{parent:this,layout:_aLayoutInfo[i].name},
                                                                    function(e){ 
        e.data.parent._onLayoutSelected(e.data.layout); });
            
            iCont++;                                    
        }
    };
    
    this.refreshLanguage = function(){
        var iCont = 0;
        for(var i=_iFirstLayoutIndex;i<_iFirstLayoutIndex+3;i++){
            var szName   = _aLayoutInfo[i].name;
            var szDiff   = "" +_aLayoutInfo[i].diff;


            _aLayoutButtons[iCont].refreshLanguage(window["TEXT_LAYOUT_"+szName.toUpperCase()],window["TEXT_DIFF_"+szDiff.toUpperCase()]);

            iCont++;
        }

        $("#text_choose_layout").text(TEXT_CHOOSE_LAYOUT);
    };
    
    this._onArrowLeft = function(){
        _iFirstLayoutIndex -= 3;
			
        if(_iFirstLayoutIndex < 0){
                _iFirstLayoutIndex = 0;
        }

        this.showLayout();
    };
    
    this._onArrowRight = function(){
        _iFirstLayoutIndex += 3;
			
        if( (_iFirstLayoutIndex+3) >= _aLayoutInfo.length){
                _iFirstLayoutIndex = _aLayoutInfo.length-3;
        }

        this.showLayout();
    };
    
    this._onLayoutSelected = function(szLayout){
        s_szLayoutSelected=szLayout;
        
        this.unload();
        s_oApp.gotoGame();
    };
    
    _aLayoutInfo.push({name:"classic",diff:1,locked:false});
    _aLayoutInfo.push({name:"monument",diff:0,locked:false});
    _aLayoutInfo.push({name:"pyramids",diff:2,locked:false});
    _aLayoutInfo.push({name:"arena",diff:0,locked:false});
    _aLayoutInfo.push({name:"four",diff:1,locked:false});
    _aLayoutInfo.push({name:"the_wall",diff:1,locked:false});
    
    this.initMenuLayout();

}

var s_szLayoutSelected;

