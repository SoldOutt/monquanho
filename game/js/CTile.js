function CTile(iIndex,pPos,szLabel,aLeftBlocks,aRightBlocks,aUpBlocks,aBlockingList,iHeight){
    var _bActive;
    var _bFree;
    var _bSelected;
    var _bHint;
    var _iIndex;
    var _pPos;
    var _szLabel;
    var _szValue;
    var _iBoardHeight;
    var _aLeftBlocks;
    var _aRightBlocks;
    var _aUpBlocks;
    var _aBlockingList;
    
    this.setInfo = function(iIndex,pPos,szLabel,aLeftBlocks,aRightBlocks,aUpBlocks,aBlockingList,iHeight){
        _iIndex = iIndex;
        _pPos = pPos;
        _szLabel = szLabel;
        _iBoardHeight = iHeight;
        this._initBlocksArray(aLeftBlocks,aRightBlocks,aUpBlocks,aBlockingList);
        
        this.assignLabel();
        this._checkIfTileIsFree();
    };
    
    this._initBlocksArray = function(aLeftBlocks,aRightBlocks,aUpBlocks,aBlockingList){
        _aLeftBlocks = new Array();
        _aRightBlocks = new Array();
        _aUpBlocks = new Array();
        _aBlockingList = new Array();

        var i;
        for(i=0;i<aLeftBlocks.length;i++){
            _aLeftBlocks.push(aLeftBlocks[i]);
        }

        for(i=0;i<aRightBlocks.length;i++){
            _aRightBlocks.push(aRightBlocks[i]);
        }

        for(i=0;i<aUpBlocks.length;i++){
            _aUpBlocks.push(aUpBlocks[i]);
        }

        for(i=0;i<aBlockingList.length;i++){
            _aBlockingList.push(aBlockingList[i]);
        }

    };
    
    this.init = function(pBoardPos){
	var oSprite = s_oSpriteLibrary.getSpritePath(_szLabel);
        $('<img/>').attr('src', oSprite).load(function() {
            $(this).remove(); 
            $("#tile_"+_iIndex).css('background-image', 'url('+oSprite+')');
         });
        
        $("#tile_"+_iIndex).css("top",pBoardPos.y + (_pPos.y*1.5));
        $("#tile_"+_iIndex).css("left",pBoardPos.x + (_pPos.x*1.5));
        
        if(s_bMobile === false){
            $("#tile_"+iIndex).on('mouseenter', this,function(e) {e.data._onTileOver()});
            $("#tile_"+iIndex).on('mouseleave', this,function(e) {e.data._onTileOut()});
        }
        
        $("#tile_"+iIndex).on('mouseup', this,function(e) {e.data._onTileSelected()});

        _bSelected = false;
        _bActive = true;
        _bHint = false;

    };
    
    this.unload = function(){
        if(s_bMobile === false){
            $("#tile_"+iIndex).off('mouseenter', this,function(e) {e.data._onTileOver()});
            $("#tile_"+iIndex).off('mouseleave', this,function(e) {e.data._onTileOut()});
        }
        
        $("#tile_"+iIndex).off('mouseup', this,function(e) {e.data._onTileSelected()});
    };
    
    this.assignLabel = function(){
        if(_szLabel.indexOf("season") !== -1){
            _szValue = "season";
        }else if(_szLabel.indexOf("flower") !== -1){
            _szValue = "flower";
        }else{
            _szValue=_szLabel;
        }
    };
    
    this.deselect = function(){
        $("#selection_"+_iIndex).css("display","none");
        _bSelected = false;
        _bHint = false;
        
        $("#tile_"+_iIndex ).stop();
        $("#tile_"+_iIndex ).css("opacity","1");
    };

    this.activate = function(aBlockingList,aLeftBlocks,aRightBlocks,aUpBlocks,szNewValue){
        $("#selection_"+_iIndex).css("display","none");
        _bSelected = false;
        _bActive = true;
        
        this._initBlocksArray(aLeftBlocks,aRightBlocks,aUpBlocks,aBlockingList);
        this._checkIfTileIsFree();

        if(szNewValue !== ""){
            _szLabel = szNewValue;
            this.assignLabel();
            
            var oSprite = s_oSpriteLibrary.getSpritePath(_szLabel);
            $('<img/>').attr('src', oSprite).load(function() {
                $(this).remove(); 
                $("#tile_"+_iIndex).css('background-image', 'url('+oSprite+')');
             });
        }

        $("#tile_"+_iIndex).css("transform","scale(1,1)");
        $("#tile_"+_iIndex).css("-ms-transform","scale(1,1)");
        $("#tile_"+_iIndex).css("-webkit-transform","scale(1,1)");
        
        $("#tile_"+_iIndex).css("display","block");
    };

    this.disable = function(){
		if(_bHint){
            _bHint = false;
            $("#tile_"+_iIndex ).stop(true,true).fadeIn( 1,function(){});
        }
		
        $("#selection_"+_iIndex).css("display","none");
        _bSelected = false;
        $("#tile_"+_iIndex).css("display","none");
        
        _bActive=false;

        if(s_oGame === null){
            s_oHelp.onTileRemoved(_aBlockingList);
        }else{
            s_oGame.onTileRemoved(_aBlockingList);
        }
            

    };

    this.remove = function(){
        var oParent = this;

        if(_bHint){
            _bHint = false;
            $("#tile_"+_iIndex ).stop(true,true).fadeIn( 1,function(){});
        }
		
	$( "#tile_"+_iIndex ).transition({scale: 0.1,duration:300},function(){oParent.disable()});
        
    };
    

    this.showHint = function(){
        var oParent = this;

        $("#tile_"+_iIndex ).fadeOut(500, function () {
            $("#tile_"+_iIndex ).fadeIn(500, function () {
                 oParent.showHint();
            });
        });
         _bHint = true;
    };

    this.decreaseBlockCounter = function(iDecreaseAmount){

    };
    
    this._checkIfTileIsFree = function(){
        _bFree = false;
        if( (_aLeftBlocks.length === 0) && (_aUpBlocks.length === 0)){
            _bFree = true;
        }else if( (_aRightBlocks.length === 0) && (_aUpBlocks.length === 0)){
            _bFree = true;
        }
    };
    
    this.removeBlock = function(iIndexToRemove){
        var i;
        for(i=0;i<_aRightBlocks.length;i++){
            if(_aRightBlocks[i] === iIndexToRemove){
                //remove this tile from blocks
                _aRightBlocks.splice(i,1);
                this._checkIfTileIsFree();
                return;
            }
        }

        for(i=0;i<_aLeftBlocks.length;i++){
            if(_aLeftBlocks[i] === iIndexToRemove){
                //remove this tile from blocks
                _aLeftBlocks.splice(i,1);
                this._checkIfTileIsFree();
                return;
            }
        }

        for(i=0;i<_aUpBlocks.length;i++){
            if(_aUpBlocks[i] === iIndexToRemove){
                //remove this tile from blocks
                _aUpBlocks.splice(i,1);
                this._checkIfTileIsFree();
                return;
            }
        }
    };
    
    this._onTileSelected = function(){
        if(_bHint){
            if(s_oGame === null){
                s_oHelp.removeHint();
            }else{
                s_oGame.removeHint();
            }
            
        }else if(this.isSelectable()){
            if(_bSelected){
                this.deselect();
                if(s_oGame === null){
                    s_oHelp.onTileDeselected();
                }else{
                    s_oGame.onTileDeselected();
                }
                
            }else{
                _bSelected = true;
                $("#selection_"+_iIndex).css("display","block");
                if(s_oGame === null){
                    s_oHelp.onTileSelected(_iIndex);
                }else{
                    s_oGame.onTileSelected(_iIndex);
                }              
            }
        }
    };
    
    this._onTileOver = function(){ 
        if(this.isSelectable()){
            //alert("show: "+_iIndex);
            $("#selection_"+_iIndex).css("display","block");
        }
    };

    this._onTileOut = function(){
        if(_bSelected === false){
            $("#selection_"+_iIndex).css("display","none");
        }
    };
    
    this.getValue = function(){
        return _szValue;
    };
    
    this.getIndex = function(){
        return _iIndex;
    };
    
    this.getPos = function(){
        return _pPos;
    };
    
    this.isSelectable = function(){
        if (_bFree && _bActive){
            return true;
        }else{
            return false;
        }
    };
    
    this.getBlockList = function(){
        return _aBlockingList;
    };
    
    this.getHeight = function(){
        return _iBoardHeight;
    };
    
    this.setInfo(iIndex,pPos,szLabel,aLeftBlocks,aRightBlocks,aUpBlocks,aBlockingList,iHeight);
    
    return this;
}