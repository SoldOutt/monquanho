function CLayoutButton( szDivContainer,szLayoutPreview,szName,szDiff,bLocked ){
    
    var _bLocked = false;
    
    this.init = function(szDivContainer,szLayoutPreview,szName,szDiff,bLocked){

        var szBuffer = "";
        
        
        szBuffer += "<div class='layout_preview'><img src='assets/"+szLayoutPreview+".png' /></div>";
        szBuffer += "<h2>"+szName+"</h2>";
        
        // foreground
        szBuffer += "<h3>"+szDiff+"</h3>";
        
        $("#"+szDivContainer).html(szBuffer);
        
        if(s_bMobile === false){
            $("#"+szDivContainer).on('mouseover',this, function(e) {  e.data._onLayoutOver(); });
            $("#"+szDivContainer).on('mouseout', this,function(e) {  e.data._onLayoutOut()});
        }
        if(bLocked === true){
            this.lock();
        }else{
            this.unlock();
        }
    };
    
    this.unload = function(){
        if(s_bMobile === false){
            $("#"+szDivContainer).off('mouseover',this, function(e) {  e.data._onLayoutOver(); });
            $("#"+szDivContainer).off('mouseout', this,function(e) {  e.data._onLayoutOut()});
        }
    };
    
    this.lock = function(){
        _bLocked =true;
        
        $("#"+szDivContainer).css("filter","saturate(10%)");
        $("#"+szDivContainer).css("-webkit-filter","saturate(10%)");
        $("#"+szDivContainer).css("-moz-filter","saturate(10%)");
        $("#"+szDivContainer).css("-o-filter","saturate(10%)");
        $("#"+szDivContainer).css("-ms-filter","saturate(10%)");
    };
    
    this.unlock = function(){
        _bLocked =false;
        
        $("#"+szDivContainer).css("filter","saturate(100%)");
        $("#"+szDivContainer).css("-webkit-filter","saturate(100%)");
        $("#"+szDivContainer).css("-moz-filter","saturate(100%)");
        $("#"+szDivContainer).css("-o-filter","saturate(100%)");
        $("#"+szDivContainer).css("-ms-filter","saturate(100%)");
    };
    
    this.refreshLanguage = function(szName,szDiff){
        $("#"+szDivContainer+" h2").text(szName);
        $("#"+szDivContainer+" h3").text(szDiff);
    };
    
    this._onLayoutOver = function(){
        if(_bLocked === false){
            
            $("#"+szDivContainer+ " h2").css("color","#FFCC00");
        }
    };
    
    this._onLayoutOut = function(){
         if(_bLocked === false){
             $("#"+szDivContainer+ " h2").css("color","#b7e0e5"); 
         }
    };
    
    this.init(szDivContainer,szLayoutPreview,szName,szDiff,bLocked);
}
