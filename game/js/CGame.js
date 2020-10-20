function CGame(){
    var _bUpdate = false;
    var _iCurHintIndex;
    var _iContTileDisappearing;
    var _iScore;
    var _iBonusTimeElaps;
    var _iTilesOnBoard;
    var _iIntervalID;
    var _aHintCouples = new Array();
    var _aTilesMc = new Array();
    var _aSelectableTiles;
    
    var _oFirstTileSelected;
    var _oSecondTileSelected;
    var _oFirstHintShowing;
    var _oSecondHintShowing;
    
    var _oInterface;
    var _oLayoutSettings = new CLayoutSettings();

    
    this.init = function(){
        
        this._setLayout();
        do{
            this._initTilesOnBoard();
            this._reset();
        }while (_aHintCouples.length === 0);

        _oInterface = new CInterface();
        _oInterface.setScore(_iScore);
        _oInterface.setHintNum(_aHintCouples.length);

        _iIntervalID = setInterval( this._update, FPS_TIME );
        
        $("#match_game_container").css("display","block");
    };
    
    this.unload = function(){
      _oInterface.unload();
      clearInterval(_iIntervalID);
      
      for(var i=0;i<_aTilesMc.length;i++){
          _aTilesMc[i].unload();
      }
    };
    
    this._setLayout = function(){
        switch(s_szLayoutSelected){
            case "classic":{
                    _oLayoutSettings.initLayoutClassic();
                    break;
            }
            case "monument":{
                    _oLayoutSettings.initLayoutMonument();
                    break;
            }
            case "pyramids":{
                    _oLayoutSettings.initLayoutPyramids();
                    break;
            }
            case "arena":{
                    _oLayoutSettings.initLayoutArena();
                    break;
            }
            case "four":{
                    _oLayoutSettings.initLayoutFour();
                    break;
            }
            case "the_wall":{
                    _oLayoutSettings.initLayoutTheWall();
                    break;
            }  
        }
    };
    
    this._initTilesOnBoard = function(){
        var aTileValues = new Array("circle1", "circle1", "circle1", "circle1",
                                    "circle2", "circle2", "circle2", "circle2",
                                    "circle3", "circle3", "circle3", "circle3",
                                    "circle4", "circle4", "circle4", "circle4",
                                    "circle5", "circle5", "circle5", "circle5",
                                    "circle6", "circle6", "circle6", "circle6",
                                    "circle7", "circle7", "circle7", "circle7",
                                    "circle8", "circle8", "circle8", "circle8",
                                    "circle9", "circle9", "circle9", "circle9",
                                    "bamboo1", "bamboo1", "bamboo1", "bamboo1",
                                    "bamboo2", "bamboo2", "bamboo2", "bamboo2",
                                    "bamboo3", "bamboo3", "bamboo3", "bamboo3",
                                    "bamboo4", "bamboo4", "bamboo4", "bamboo4",
                                    "bamboo5", "bamboo5", "bamboo5", "bamboo5",
                                    "bamboo6", "bamboo6", "bamboo6", "bamboo6",
                                    "bamboo7", "bamboo7", "bamboo7", "bamboo7",
                                    "bamboo8", "bamboo8", "bamboo8", "bamboo8",
                                    "bamboo9", "bamboo9", "bamboo9", "bamboo9",
                                    "characters1", "characters1", "characters1", "characters1",
                                    "characters2", "characters2", "characters2", "characters2",
                                    "characters3", "characters3", "characters3", "characters3",
                                    "characters4", "characters4", "characters4", "characters4",
                                    "characters5", "characters5", "characters5", "characters5",
                                    "characters6", "characters6", "characters6", "characters6",
                                    "characters7", "characters7", "characters7", "characters7",
                                    "characters8", "characters8", "characters8", "characters8",
                                    "characters9", "characters9", "characters9", "characters9",
                                    "wind1", "wind1", "wind1", "wind1",
                                    "wind2", "wind2", "wind2", "wind2",
                                    "wind3", "wind3", "wind3", "wind3",
                                    "wind4", "wind4", "wind4", "wind4",
                                    "dragon1", "dragon1", "dragon1", "dragon1",
                                    "dragon2", "dragon2", "dragon2", "dragon2",
                                    "dragon3", "dragon3", "dragon3", "dragon3",
                                    "flower1", "flower2", "flower3", "flower4",
                                    "season1", "season2", "season3", "season4");
                                    
        aTileValues  = shuffle(aTileValues);                        
        var aPos = _oLayoutSettings.getTilePos();
        var aLeftBlocks = _oLayoutSettings.getLeftBlocks();
        var aRightBlocks = _oLayoutSettings.getRightBlocks();
        var aUpBlocks= _oLayoutSettings.getUpBlocks();
        var aBlockingList = _oLayoutSettings.getBlockList();
        var aTileHeight = _oLayoutSettings.getHeight();  
        var pPos = _oLayoutSettings.getPos();
        
        var szBuffer ="";
        szBuffer += "<div id='tile_container'>";
        for(var i=0;i<aPos.length;i++){
            //var iRand = Math.floor(Math.random() * aTileValues.length );
            //var szRandValue = aTileValues[iRand];
			var szRandValue = aTileValues[i];
            
            szBuffer += "<div id='tile_"+i+"' class='mahjong_tile'>";
            szBuffer += "<div id='selection_"+i+"' class='selection_tile' style=\"background-image:url("+s_oSpriteLibrary.getSpritePath('selection')+")\"></div></div>";

           _aTilesMc.push(new CTile(i,aPos[i],szRandValue,aLeftBlocks[i],aRightBlocks[i],aUpBlocks[i],aBlockingList[i],aTileHeight[i]));

            //aTileValues.splice(iRand, 1);  
        }
        szBuffer+="</div>";
        
        $("#match_game_container").html(szBuffer);
        
        for(var i=0;i<_aTilesMc.length;i++){
            _aTilesMc[i].init(pPos);
        }
        
    };
    
    this._reset = function(){
       _iScore =0;
       _iCurHintIndex = 0;
       _iContTileDisappearing = 2;
       _iBonusTimeElaps = BONUS_TIME; 
       _iTilesOnBoard = _aTilesMc.length;
       
       _oFirstTileSelected=null;
       _oSecondTileSelected=null;
       _oFirstHintShowing=null;
       _oSecondHintShowing=null;
        
       var iRandBG = Math.floor(Math.random() * 6 );
       //$("#match_game_container").css("background-image", "url(css/skins/"+s_szFolder+"/game_bg_"+ iRandBG+".jpg)");

       $("#match_game_container").css("background-image", "url("+s_oSpriteLibrary.getSpritePath('game_bg_'+iRandBG)+")");

       this._storeSelectableTiles();
        _bUpdate = true;
    };
    
    this.refreshLanguage = function(){
        _oInterface.refreshLanguage();
        _oInterface.setScore(_iScore);
        _oInterface.setHintNum(_aHintCouples.length);
    };
    
    this._calculateScore = function(){
        var iValue = _oLayoutSettings.getDifficulty(); 
        var iBonus = Math.floor(_iBonusTimeElaps/100);

        if(iBonus>0){
            _oInterface.showBonusScore(iBonus);
        }

        _iScore += (iValue * iBonus);
        _oInterface.setScore(_iScore);

        _iBonusTimeElaps = BONUS_TIME;
    };
    
    this._gameOver = function(){
        _oInterface.gameOver(_iScore);
    };

    this._win = function(){
        _oInterface.win(_iScore);
    };

    this._storeSelectableTiles = function(){
        _aSelectableTiles = new Array();
			
        for(var i=0;i<_aTilesMc.length;i++){
            if(_aTilesMc[i].isSelectable()){
                _aSelectableTiles.push(_aTilesMc[i]);
            }
        }
        
        _aHintCouples = new Array();
        var iCont = 0;
        while(iCont<_aSelectableTiles.length){
            var oCurTile = _aSelectableTiles[iCont];

            for(var k=iCont+1;k<_aSelectableTiles.length;k++){
                if(oCurTile.getValue() === _aSelectableTiles[k].getValue()){
                    _aHintCouples.push({first:oCurTile,second:_aSelectableTiles[k]});
                }
            }
            iCont++;
        }
        if(_oInterface){
            _oInterface.setHintNum(_aHintCouples.length);
        }
    };
    
    this.removeHint = function(){
        if(_oFirstHintShowing === null || _oSecondHintShowing === null){
                return;
        }

        _oInterface.showBlock();
        
        this._checkForSimilarBlock(_oFirstHintShowing);
        _oFirstHintShowing.disable();
        this._checkForSimilarBlock(_oSecondHintShowing);
        _oSecondHintShowing.disable();

        _oFirstHintShowing = null;
        _oSecondHintShowing = null;

        _iCurHintIndex = 0;
    };
    
    this._checkForSimilarBlock = function(oTileRemoved){
        var aBlockList = oTileRemoved.getBlockList();
        for(var i=0;i<aBlockList.length;i++){
            var oTileBlocked = _aTilesMc[aBlockList[i].index];
            oTileBlocked.removeBlock(oTileRemoved.getIndex());
        }
    };
    
    this._checkTileMatching = function(){
        if(_oFirstTileSelected.getValue() === _oSecondTileSelected.getValue()){
                //MATCHING FOUND!!
                _oInterface.showBlock();
                
                this._checkForSimilarBlock(_oFirstTileSelected);
                _oFirstTileSelected.remove();
                this._checkForSimilarBlock(_oSecondTileSelected);
                _oSecondTileSelected.remove();

                this._calculateScore();
        }else{
                _oFirstTileSelected.deselect();
                _oSecondTileSelected.deselect();
        }

        _oFirstTileSelected = null;
        _oSecondTileSelected = null;
    };
    
    this.onTileRemoved = function(aUnlockList){
        //CHECK IF TILE REMOVED BLOCKED OTHER TILES

        if(aUnlockList){
            for(var i=0;i<aUnlockList.length;i++){
                var oInfo = aUnlockList[i];
                _aTilesMc[oInfo.index].decreaseBlockCounter(oInfo.decrease);
            }
        }

        _iTilesOnBoard--;
        _iContTileDisappearing--;
        
        if(_iContTileDisappearing === 0){
            this._storeSelectableTiles();

            _oInterface.hideBlock();

            if(_iTilesOnBoard === 0){
                this._win();
            }else if(_aHintCouples.length === 0){
                this._gameOver();
            }

            _iContTileDisappearing = 2;
        }
    };
    
    this.onRestartBoard = function(){
        var aLeftBlocks = _oLayoutSettings.getLeftBlocks();
        var aRightBlocks = _oLayoutSettings.getRightBlocks();
        var aUpBlocks = _oLayoutSettings.getUpBlocks();
        var aBlockingList = _oLayoutSettings.getBlockList();
        
        for(var i=0;i<_aTilesMc.length;i++){
            _aTilesMc[i].activate(aBlockingList[i],aLeftBlocks[i],aRightBlocks[i],aUpBlocks[i],"");
        }

        this._reset();
        
        _oInterface.hideBlock();
    };
    
    this.onHintReleased = function(){
        if(_aHintCouples.length === 0){
                return;
        }
        if(_oFirstHintShowing){
                _oFirstHintShowing.deselect();
        }

        if(_oSecondHintShowing){
                _oSecondHintShowing.deselect();
        }

        _oFirstHintShowing = _aHintCouples[_iCurHintIndex].first;
        _oSecondHintShowing = _aHintCouples[_iCurHintIndex].second;

        _oFirstHintShowing.showHint();
        _oSecondHintShowing.showHint();

        _iCurHintIndex++;
        if(_iCurHintIndex === _aHintCouples.length){
            _iCurHintIndex = 0;
        }
        
		_iBonusTimeElaps = 0;
		//DECREASE SCORE FOR HINT PENALTY
        _iScore -= HINT_PENALTY;
        if(_iScore<0){
                _iScore=0;
        }
        _oInterface.setScore(_iScore);
    };
    
    this.onShuffleBoard = function(){
        $("#match_game_container").css("display","none");
        
        do{
            var aTileValues = new Array("circle1", "circle1", "circle1", "circle1",
                                        "circle2", "circle2", "circle2", "circle2",
                                        "circle3", "circle3", "circle3", "circle3",
                                        "circle4", "circle4", "circle4", "circle4",
                                        "circle5", "circle5", "circle5", "circle5",
                                        "circle6", "circle6", "circle6", "circle6",
                                        "circle7", "circle7", "circle7", "circle7",
                                        "circle8", "circle8", "circle8", "circle8",
                                        "circle9", "circle9", "circle9", "circle9",
                                        "bamboo1", "bamboo1", "bamboo1", "bamboo1",
                                        "bamboo2", "bamboo2", "bamboo2", "bamboo2",
                                        "bamboo3", "bamboo3", "bamboo3", "bamboo3",
                                        "bamboo4", "bamboo4", "bamboo4", "bamboo4",
                                        "bamboo5", "bamboo5", "bamboo5", "bamboo5",
                                        "bamboo6", "bamboo6", "bamboo6", "bamboo6",
                                        "bamboo7", "bamboo7", "bamboo7", "bamboo7",
                                        "bamboo8", "bamboo8", "bamboo8", "bamboo8",
                                        "bamboo9", "bamboo9", "bamboo9", "bamboo9",
                                        "characters1", "characters1", "characters1", "characters1",
                                        "characters2", "characters2", "characters2", "characters2",
                                        "characters3", "characters3", "characters3", "characters3",
                                        "characters4", "characters4", "characters4", "characters4",
                                        "characters5", "characters5", "characters5", "characters5",
                                        "characters6", "characters6", "characters6", "characters6",
                                        "characters7", "characters7", "characters7", "characters7",
                                        "characters8", "characters8", "characters8", "characters8",
                                        "characters9", "characters9", "characters9", "characters9",
                                        "wind1", "wind1", "wind1", "wind1",
                                        "wind2", "wind2", "wind2", "wind2",
                                        "wind3", "wind3", "wind3", "wind3",
                                        "wind4", "wind4", "wind4", "wind4",
                                        "dragon1", "dragon1", "dragon1", "dragon1",
                                        "dragon2", "dragon2", "dragon2", "dragon2",
                                        "dragon3", "dragon3", "dragon3", "dragon3",
                                        "flower1", "flower2", "flower3", "flower4",
                                        "season1", "season2", "season3", "season4");

            var aLeftBlocks= _oLayoutSettings.getLeftBlocks();
            var aRightBlocks= _oLayoutSettings.getRightBlocks();
            var aUpBlocks= _oLayoutSettings.getUpBlocks();
            var aBlockingList= _oLayoutSettings.getBlockList();

            for(var i=0;i<_aTilesMc.length;i++){
                var iRand = Math.floor(Math.random() * aTileValues.length );
                var szRandValue = aTileValues[iRand];

                _aTilesMc[i].activate(aBlockingList[i],aLeftBlocks[i],aRightBlocks[i],aUpBlocks[i],szRandValue);

                aTileValues.splice(iRand, 1);
            }

            this._reset();

        }while (_aHintCouples.length === 0);

        _oInterface.hideBlock();
        
        $("#match_game_container").css("display","block");
    };
    
    this.onTileSelected = function(iIndex){
        _oInterface.hideBlock();
        
        if(_oFirstHintShowing){
            _oFirstHintShowing.deselect();
            _oFirstHintShowing = null;
        }

        if(_oSecondHintShowing){
            _oSecondHintShowing.deselect();
            _oSecondHintShowing = null;
        }

        if(_oFirstTileSelected === null){
            _oFirstTileSelected = _aTilesMc[iIndex];
        }else {
            _oSecondTileSelected = _aTilesMc[iIndex];
            this._checkTileMatching();	
        }
    };
    
    this.onTileDeselected = function(){
        _oFirstTileSelected = null;
    };
    
    this._update = function(){
        if(_bUpdate === false){
                return;
        }

        _iBonusTimeElaps -= FPS_TIME;
        
        if(_iBonusTimeElaps<0){
            _iBonusTimeElaps=0;
        }

        _oInterface.refreshTime(_iBonusTimeElaps);
    };

    s_oGame = this;

    this.init();

}

var s_oGame = null;