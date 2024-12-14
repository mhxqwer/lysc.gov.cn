/*$('body').append('<div class="szr_shouqibtnbox" ><div><div class="status"><img class="imgsta imgsta1" src="/10462/xhtml/images/ztzl/allztimg/szr_playing.png" alt=""><img class="imgsta imgsta2" src="/10462/xhtml/images/ztzl/allztimg/szr_stopplay.png" alt=""></div><span title="点击展开">×</span><img class="shouqibtn shouqibtn1" src="/10462/xhtml/images/ztzl/allztimg/shouqibtn2.png" alt=""><img class="shouqibtn2 shouqibtn" src="/10462/xhtml/images/ztzl/allztimg/shouqibtn.gif" alt=""></div></div>')*/

$(function(){
    if($('.szr_shouqibtnbox').length == 0){
        $('body').append('<div class="szr_shouqibtnbox" ><div><div class="closeBtn">x</div><span title="点击展开">×</span><img class="shouqibtn shouqibtn1" src="/10462/xhtml/images/ztzl/allztimg/shouqibtn2.png" alt=""><img class="shouqibtn2 shouqibtn" src="/10462/xhtml/images/ztzl/allztimg/shouqibtn.gif" alt=""></div></div>')
    }
})
// $('body').append('<div class="szr_shouqibtnbox" ><div><div class="closeBtn">x</div><span title="点击展开">×</span><img class="shouqibtn shouqibtn1" src="/10462/xhtml/images/ztzl/allztimg/shouqibtn2.png" alt=""><img class="shouqibtn2 shouqibtn" src="/10462/xhtml/images/ztzl/allztimg/shouqibtn.gif" alt=""></div></div>')

let str = document.getElementById('cmsArticleContent').innerHTML;
str = str.replace(/<[^>]+>/g, "");

let container = document.querySelector('.human');
var modelApiTokenstr=''
$.ajax({
    type: 'get',
    async:false,
    url: "/digital-person/token/obtainToken",
    success: function (response) {
        modelApiTokenstr=response.split('"token":"')[1].split('"},"timestamp"')[0];
    }
});
// this.loading(false);

let human = new Metahuman({
    container: container,
    modelApiBaseUrl: 'https://metaqa.ucap.com.cn/api/qa/',
    modelUrl: 'https://www.sc.gov.cn/10462/xhtml/models/gltf/xiao_chuan/character.gltf',
    modelMode: 'whole',
    modelApiToken:modelApiTokenstr

});
// human.ready(function () {
//        this.speak(str);
// })
// $(document).ready(function () {
//     $(".szrbtn").click(function (e) {
//         console.log(1);
//         human.speak(str);

//     });
// });
/*human.onReady = function() {  
    $('.szrcontainer').append("<div class='szrbtn'></div>");
    $(".szrbtn").click(function (e) {
        human.speak(str);

    });

}*/

var speakflag=1;
human.onReady = function() {  
    // var szrbtnhtml='<div class="szrbtn"><img src="/10462/xhtml/images/ztzl/allztimg/szrtsbg.png" alt="" class="szrtsbg">'+
    // '<img src="/10462/xhtml/images/ztzl/allztimg/szrtsbg2.png" alt="" class="szrtsbg">' +
    // '<div class="btn1"></div></div>';
        var szrbtnhtml='<div class="szrsqbtn" >×</div><div class="szrbtn"><img src="/10462/xhtml/images/ztzl/allztimg/szrplaydh.gif" alt="" class="szrtsbg">'+
    '<img src="/10462/xhtml/images/ztzl/allztimg/szrclosedh.gif" alt="" class="szrtsbg">' +
    '</div><div class="btn1"></div>';
    $('.szrcontainer').append(szrbtnhtml);
    // 点击数字人播放或者停止
    $(".szrcontainer .btn1").click(function (e) {
        
        speakflag+=1;
        if(speakflag%2==0){//偶数播放
            $(".szrbtn").addClass("on");//气泡显示为点击我关闭播放
            human.speak(str);//开始播放
            $(".szr_shouqibtnbox").addClass("on");//浮窗转圈圈
        }else{
            $(".szrbtn").removeClass("on");
            human.stop();
            $(".szr_shouqibtnbox").removeClass("on");
        }
    });
    // 点击数字人底部按钮 收起数字人
    $(".szrsqbtn").click(function (e) { 
        // $(".szrbtn").removeClass("on");
        // human.stop();
        // speakflag=1;
        $(".szr_shouqibtnbox").css({"right":"0px"});
        // var rightwid='-'+$(".szrcontainer ").width()+'px';
        // $(".szrcontainer ").css({"right":rightwid})
        $(".szrcontainer").css({"visibility":"hidden"});
        $(".szrcontainer").css({"opacity":"0"});
        e.preventDefault();
    });
    // 点击飘窗按钮  展开数字人
    $(".szr_shouqibtnbox>div span").click(function (e) { 
        $(".szr_shouqibtnbox").css({"right":"-400px"});
        $(".szrcontainer ").css({"visibility":"visible"});
        $(".szrcontainer").css({"opacity":"1"});
        
    });
    $(".szr_shouqibtnbox .status").click(function (e) { 
        e.preventDefault();
        speakflag+=1;
        if(speakflag%2==0){//偶数播放
            $(".szrbtn").addClass("on");//气泡显示为点击我关闭播放
            human.speak(str);//开始播放
            $(".szr_shouqibtnbox").addClass("on");//浮窗转圈圈
        }else{//奇数停止
            $(".szrbtn").removeClass("on");//气泡显示为点击我进行播放
            human.stop();//停止播放
            $(".szr_shouqibtnbox").removeClass("on");//浮窗停止圈圈
        }
        
    });

     // 增加关闭按钮
    $('.closeBtn').click(function(){
        $('.szr_shouqibtnbox').hide('')
    })

}

human.onModelApiTokenExpired =function(data){
    $.ajax({
        type: 'get',
        url: "/digital-person/token/obtainToken",
        success: function (response) {
            human.modelApiToken=response.split('refresh_token":"')[1].split('","token"')[0];
        }
    });
} 


// $('.szr_shouqibtnbox').hide()