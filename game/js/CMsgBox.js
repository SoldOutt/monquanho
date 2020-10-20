function CMsgBox(){
    var _szCodeButton1;
    var _szCodeButton2;
    var _szCodeButton3;
    
    this.init = function(){
        
        if(s_bMobile === false){
            $("#msg_box_button1").on('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#msg_box_button1").on('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
            $("#msg_box_button2").on('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#msg_box_button2").on('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
            $("#msg_box_button3").on('mouseover', function(e) {$(this).css("color", "#FFCC00");});
            $("#msg_box_button3").on('mouseout', function(e) {$(this).css("color", "#b7e0e5");});
        }
        
        $("#msg_box_button1").on('mouseup', this, function(e) {e.data._onReleaseBut1()});
        $("#msg_box_button2").on('mouseup', this, function(e) {e.data._onReleaseBut2()});
        $("#msg_box_button3").on('mouseup', this, function(e) {e.data._onReleaseBut3()});
    };
    
    this.setTextButton = function( iCodeButton, szText ){
        switch(iCodeButton){
            case 1:{
                $("#msg_box_button1").text(szText);
            }break;
            case 2:{
                $("#msg_box_button2").text(szText);
            }break;
            case 3:{
                $("#msg_box_button3").text(szText);
            }break;				
        }
    };

    this.showMessageBox = function( szTitle, szMsg, szMode,szCodeButton1,szCodeButton2, szCodeButton3 ){

        $("#msg_box_title").text(szTitle);
        $("#msg_box_text").text(szMsg);

        _szCodeButton1 = szCodeButton1;
        _szCodeButton2 = szCodeButton2;
        _szCodeButton3 = szCodeButton3;

        switch(szMode){
            case MSG_BOX_MODE_OK:{

                $("#msg_box_button1").css("display","none");
                $("#msg_box_button2").css("display","block");
                $("#msg_box_button3").css("display","none");

                $("#msg_box").css("display","block");
            }break;
            case MSG_BOX_MODE_YES_NO:{

                $("#msg_box_button1").css("display","block");
                $("#msg_box_button2").css("display","none");
                $("#msg_box_button3").css("display","block");

                $("#msg_box").css("display","block");
            }break;
            default:{
                    alert("CMessageBox: modalità settata no prevista #" + szMode );
            }		
        }
    };
    
    this.hide = function(){
        $("#msg_box").css("display","none");
    };
    
    this._onReleaseBut1 = function(){
        s_oApp.onClickMessageBox(_szCodeButton1);
    };
    
    this._onReleaseBut2 = function(){
        s_oApp.onClickMessageBox(_szCodeButton2);
    };
    
    this._onReleaseBut3 = function(){
        s_oApp.onClickMessageBox(_szCodeButton3);
    };
    
    this.init();
    
    return this;
}