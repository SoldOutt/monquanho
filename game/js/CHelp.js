function CHelp(){
    
    var _aTiles;
    var _oFirstTileSelected = null;
    var _oSecondTileSelected = null;
    
    this._init = function(){
        var szBuffer = "";

        szBuffer+="<div id='help_text1' class='text_class' >"+TEXT_HELP_1+"</div>";
        szBuffer+="<div id='help_text2' class='text_class' >"+TEXT_HELP_2+"</div>";
        szBuffer+="<div id='help_button_exit' class='button_class' >"+TEXT_EXIT+"</div>";
        
        $("#help_container").html(szBuffer);
        
        this._initHelpExample1();
        
        $("#help_container").css("background-image","url("+s_oSpriteLibrary.getSpritePath('help_bg')+")");
        $("#help_container").css("display","block");
        
         if(s_bMobile === false){
            $("#help_button_exit").on('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#help_button_exit").on('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
         }
        $("#help_button_exit").on('mouseup', this, function(e) {e.data._onExit()});
    };
    
    this.unload = function(){
         $("#help_button_exit").off('mouseup', this, function(e) {e.data._onExit()});
         
         if(s_bMobile === false){
            $("#help_button_exit").off('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#help_button_exit").off('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
         }
    };
    
    this.refreshLanguage = function(){
        $("#help_button_exit").text(TEXT_EXIT);
        $("#help_text1").text(TEXT_HELP_1);
        $("#help_text2").text(TEXT_HELP_2);
    };
    
    this._initHelpExample1 = function(){

        var aTileValues = new Array( "circle1", "circle1","season3", "characters4",
                                     "circle8", "bamboo4","characters1","circle1",
                                     "characters5",  "wind1", "wind3", "dragon1" );


        var aBlockingList = new Array( [{index:1,decrease:1}],
                                        [{index:2,decrease:1}],
                                        [{index:1,decrease:1},{index:3,decrease:1}],
                                        [{index:2,decrease:1}],
                                        [{index:5,decrease:1}],
                                        [{index:6,decrease:1}],
                                        [{index:5,decrease:1},{index:7,decrease:1}],
                                        [{index:6,decrease:1}],
                                        [{index:9,decrease:1}],
                                        [{index:10,decrease:1}],
                                        [{index:9,decrease:1},{index:11,decrease:1}],
                                        [{index:10,decrease:1}]);

        var aLeftBlocks  = new Array([],[0],[1],[],[],[4],[5],[],[],[8],[9],[]);
        var aRightBlocks = new Array([],[2],[3],[],[],[6],[7],[],[],[10],[11],[]);
        var aUpBlocks    = new Array([],[],[],[],[],[],[],[],[],[],[],[]);
                        
        var iXPos = 0;
        var iYPos = 0;

        _aTiles = new Array();
        var szBuffer ="";
        szBuffer += "<div id='help_tile_container'>";
        
        for(var i=0;i<12;i++){
            szBuffer += "<div id='tile_"+i+"' class='mahjong_tile'>";
            szBuffer += "<div id='selection_"+i+"' class='selection_tile' style=\"background-image:url("+s_oSpriteLibrary.getSpritePath('selection')+")\"></div></div>";

            var pPos = {x:iXPos,y:iYPos};

           _aTiles.push(new CTile(i,pPos,aTileValues[i],aLeftBlocks[i],aRightBlocks[i],aUpBlocks[i],aBlockingList[i],1));

           if(i%4 === 3){
                iXPos = 0;
                iYPos += 41;
           }else{
                iXPos += 30;
           }
        }
        szBuffer+="</div>";
        
        $("#help_container").append(szBuffer);
        
        for(var k=0;k<_aTiles.length;k++){
            _aTiles[k].init({x:0,y:0});
        }
    };
    
    this.onTileSelected = function(iIndex){
        if(_oFirstTileSelected === null){
            _oFirstTileSelected = _aTiles[iIndex];
        }else {
            _oSecondTileSelected = _aTiles[iIndex];
            this._checkTileMatching();	
        }
    };

    this.onTileDeselected = function(){
        _oFirstTileSelected = null;
    };

    this.onTileRemoved = function(aUnlockList){
        if(aUnlockList){
            for(var i=0;i<aUnlockList.length;i++){
                var oInfo = aUnlockList[i];

                _aTiles[oInfo.index].decreaseBlockCounter(oInfo.decrease);
            }
        }
    };

    this._checkTileMatching = function(){
        if(_oFirstTileSelected.getValue() === _oSecondTileSelected.getValue()){
            //MATCHING FOUND!!
            _oFirstTileSelected.remove();
            _oSecondTileSelected.remove();
        }else{
            _oFirstTileSelected.deselect();
            _oSecondTileSelected.deselect();
        }

        _oFirstTileSelected = null;
        _oSecondTileSelected = null;
    };
    
    this._onExit = function(){
        this.unload();
        
        s_oApp.gotoMenu();
    };
    
    this._init();
    
    s_oHelp = this;
}

var s_oHelp = null;