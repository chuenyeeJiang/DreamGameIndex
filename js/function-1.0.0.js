

const log = new logStart(logStart.logType.DEBUG);
log.formatLocaltime();


// function cycle() {
//     $(function () {
//         // 初始化轮播
//         $("#div_log2Back").carousel('cycle');
//     });
// }
//
// function resize() {
//     // 初始化轮播
//     if (window.innerHeight > 800) {
//         // 800+window.innerHeight/800
//         $("#div_log2Back img").css('width', 1920 * window.innerHeight / 800);
//         $("#div_log2Back img").css('margin-top', -100 * window.innerHeight / 800);
//     }
//     /* $("#carousel-inner img").css('hight','130%'); */
// };

function readUsername() {
    // 初始化用户名
    $.ajax({
        url: "readUsername.do",
        success: function (result) {
            if (result != null && result != "" && result != "null") {
                $(".input-remenberUsername").val(result);
                $(".checkbox-remenberUsername").attr("checked", true);
                // 自动登陆
                /*      $.ajax({
                            url : "readPassword.do",
                            success : function(result) {
                                $(".input-autoLogin").val(result);
                                if (result != null && result != "") {
                                    $(".checkbox-autoLog").attr("checked", true);
                                    if ("${noLog}" != 1) {
                                        $(".form-login").submit();
                                    }
                                }
                            }
                        });*/
            }
        }
    });
    // 已登陆
    //  $.ajax({
    //      url : "hasLogin.do",
    //      success : function(result) {
    //          if (result != 1) {
    //              alert("账号已经成功登录!");
    //              document.write(result);
    //          }
    //      }
    //  });
}

// 复选框处理（自动登陆等于拥有记住用户名功能 ）
/*function checkbox_checked(){
$(document).ready(
        function() {
            $(".checkbox-remenberUsername").click(function() {
                if (!$(this).is(":checked") && $("#autoLog").is(":checked")) {
                    $(".checkbox-autoLog").removeProp("checked");
                } else if ($(".checkbox-autoLog").is(":checked")) {
                    $(".checkbox-autoLog").removeProp("checked");
                    $(this).removeProp("checked")
                }
            });

            $(".checkbox-autoLog").click(
                    function() {
                        if ($(this).is(":checked")
                                && !$(".checkbox-remenberUsername").is(
                                        ":checked")) {
                            $(".checkbox-remenberUsername").prop("checked",
                                    true);
                        }
                    });
        });
}*/

// 登陆聚焦
function autoFocus(ClassName) {
    log.info("====开启登录聚焦====");
    var focusIndex = null;
    $(document).ready(function () {
        var autoComonent = $("."+ClassName);

        /*
         * $(autoComonent).each(function(index){ alert($(this).attr("name")); });
         */
        function PointerHeaderAddressByOneListener() {
            document.addEventListener("keyup", firstFocus, true);
        }

        PointerHeaderAddressByOneListener();
        autoComonent.blur(function () {
            PointerHeaderAddressByOneListener();
        });

        function firstFocus(event) {
            if (event.which == 13) {
                $(autoComonent)[0].focus();
                document.removeEventListener("keyup", firstFocus, true);
            }
        }

        $(autoComonent).bind("keyup",function (event) {
            var key = event.which;
            if (key == 13) {
                focusIndex = $(event.currentTarget).attr("focus-index");
                if (focusIndex == null) {
                    return;
                }
                if ($(event.currentTarget).hasClass("input-submit")) {
                    $(event.currentTarget).click();
                }
                if(focusIndex < $(autoComonent).length) {
                    // 下一位置
                    log.debug("当前聚焦位置:" + focusIndex);
                    focusIndex = eval(focusIndex) + 1;
                    log.debug("聚集跳转后的位置:" + focusIndex);
                    $(autoComonent)[focusIndex].focus();
                }
            }
        });
    });
}

//  提交
function submitformautoFocus() {
    $(".form-autoFocus").submit();
}

function ChangeValidatecode() {
    var image = new Image();
    image.src = "aJax_validatecode.do?date=" + new Date();
    image.className = "img-validatecode";
    $(".img-validatecode").replaceWith(image);
}

/*// 数目增减
function numIncreaseOrReduce(){
var NumBtnId = null;
var NumId = null;
$(document).ready(function() {
    $(".btn-numReduce").click(function() {
        // 获取组件标志
        if ($(this).attr("id") == null)
            NumBtnId = "btn-num";

        NumId = "#" + NumBtnId.substr(4, NumBtnId.length);

        if (eval($(NumId).text()) > 1)
            $(NumId).text(eval($(NumId).text()) - 1);
    });
});

$(document).ready(function() {

    $(".btn-numIncrease").click(function() {
        // 获取组件标志
        NumBtnId = $(this).attr("id");
        if (NumBtnId == null)
            NumBtnId = "btn-num";

        NumId = "#" + NumBtnId.substr(4, NumBtnId.length);
        $(NumId).text(eval($(NumId).text()) + 1);
    });
});
}*/

/*
  数目增减
 */
function numIncreaseOrReduce(Input_num, initNum) {
    $(Input_num).val(initNum);
    $(Input_num).readOnly;
    this.increment = 1;
    this.decrement = 1;
    this.lowerLimit = 0;
    this.upperLimit = 1000;
    this.numChangeRun = function () {

    };
    this.numReduce = function () {
        $(Input_num).val(parseInt($(Input_num).val() - eval(this.decrement)));
    };
    this.numIncrease = function () {
        $(Input_num).val(parseInt(eval($(Input_num).val()) + eval(this.increment)));
    };

    this.Button_numChange = function (fun) {
        if (parseInt($(Input_num).val()) > this.lowerLimit && parseInt($(Input_num).val()) < this.upperLimit) this.numChangeRun()
    }

    this.numChange = function (fun) {
        this.numChangeRun = fun;
        numIncreaseOrReduce.numChangeRun = fun;
        $(document).ready(function () {
            $(Input_num).keyup(function () {
                if (parseInt($(Input_num).val()) > this.lowerLimit && parseInt($(Input_num).val()) < this.upperLimit) numIncreaseOrReduce.numChangeRun()
            });
        });

    };
    /*$(Input_num).change(function () {
        alert(1)
    });*/
}

//外部验证
function loginCl() {
    var usernameCl = /^[\u4E00-\u9FA5a-zA-Z]*$/;
    //用户名不合法
    if (!usernameCl.test($("#username").val())) {
        $("#log_font_msg").text("用户名不合法,只支持由中文或字母组成!");
        return false;
    }
    var passwordCl = /^[a-zA-Z0-9\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*||||\-|\_|\+|\=|\||\\||\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]{6,14}$/;
    if (!passwordCl.test($("#password").val())) {
        $("#log_font_msg").text("密码不合法!");
        return false;
    }
}

function regisCl() {
    var usernameCl = /^[\u4E00-\u9FA5a-zA-Z]*$/;
    //用户名不合法
    if (!usernameCl.test($("#regisUsername").val())) {
        $("#regis_font_msg").text("用户名不合法,只支持由中文或字母组成!");
        return false;
    }
    var passwordCl = /^[a-zA-Z0-9\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*||||\-|\_|\+|\=|\||\\||\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]{6,14}$/;
    if (!passwordCl.test($("#regisPassword").val())) {
        $("#regis_font_msg").text("密码不合法!");
        return false;
    }
    if ($("#regisPassword").val() != $("#confirmPassword").val()) {
        $("#regis_font_msg").text("密码不一致!");
        return false;
    }
}

/*
    控件拖拽
    ****问题1:div黏鼠问题,暂用input;
 */
function draggable(className, edgeProcessing, stopPropagation) {
    log.info("==拖动控件启动==");
    log.debug("拖动对象类名:" + className);
    /*
       变量
     */
    //获取所有拖拽控件的点击状态
    var clickValue = [];
    log.debug("获取所有拖拽控件的点击状态:");
    $("." + className).each(function (index, item) {
        clickValue[index] = $(item).attr("onclick");
    });
    for (var i = 0; i < clickValue.length; i++) {
        log.debug(clickValue[i]);
    }

    //获取所有拖拽控件的超链接状态
    log.debug("获取所有拖拽控件的超链接状态:");
    var hrefValue = [];
    $("." + className).each(function (index, item) {
        hrefValue[index] = $(item).attr("href");
    });

    for (var i = 0; i < clickValue.length; i++) {
        log.debug(hrefValue[i]);
    }

    //初始化所有拖拽控件的拖动状态
    log.debug("初始化所有拖拽控件的拖动状态:");
    var isMove = [];
    for (var i = 0; i < isMove.length; i++) {
        isMove.push(false);
    }


    var left0 = [], top0 = [];
    var x = [], y = [];
    var reg = new RegExp("px", "g");
    var theWidthValue = [], theHeightValue = [];
    var leftLimit = 0;
    var topLimit = 0;
    var bottomLimit = parseInt(window.innerHeight);
    var rightLimit = parseInt(document.body.clientWidth);
    var elementWithinOffsetX = [];
    var elementWithinOffsetY = [];
    /*
     初始化
    */
    this.init = function () {

        //取消图片原有拖拽
        if ($("." + className).prop("tagName") === "IMG") {
            $("." + className).attr("ondragstart", "return false");
            $("." + className).attr("onselect", "return false");
        }
        $("." + className).css("position", "fixed");
        if ($("." + className).prop("tagName") === "input") {
            $("." + className).css("border", "none");
        }
        var children = $("." + className).find("IMG");
        children.attr("ondragstart", "return false");
        children.attr("onselect", "return false");
        //修复黏鼠问题
        $("input").on("click",
            function (ev) {
                for (var i = 0; i < isMove.length; i++) {
                    isMove[i] = false;
                }
            });
        $("." + className).on("click",
            function (e) {
                for (var i = 0; i < isMove.length; i++) {
                    isMove[i] = false;
                }
            });


    };
    this.init();

    /*
    方法
     */
    this.setContainer = function (id) {

        leftLimit = $("#" + id).css("margin-left");
        rightLimit = $("#" + id).css("margin-left") + $("#" + id).css("width");
        topLimit = $("#" + id).css("margin-top");
        bottomLimit = $("#" + id).css("margin-top") + $("#" + id).css("height");
        return this;
    };

    /*
       拖拽监听
     */
    $("." + className).on('mousedown',
        function (e) {
            log.debug($(e.currentTarget).html() + "拖动控件点击");
            var index = $(e.currentTarget).index("." + className);
            left0[index] = e.pageX;
            top0[index] = e.pageY;
            log.debug("获取第" + index + "个控件[初始位置:(" + left0[index] + "," + top0[index] + ")]");
            isMove[index] = true;
            log.debug("设置" + index + "个控件可移动:" + isMove[index]);
            elementWithinOffsetX[index] = parseInt(left0[index]) - parseInt($(this).css("margin-left"));
            elementWithinOffsetY[index] = parseInt(top0[index]) - parseInt($(this).css("margin-top"));
            mousemove(e.currentTarget);
            mouseup(e.currentTarget);
        });

    /*
      是否冒泡事件
     */
    if (stopPropagation == true) {
        $("." + className + " *").on('mousedown',
            function (e) {
                e.stopPropagation();
            });
        $("." + className + " *").on('touchstart',
            function (e) {
                e.stopPropagation();
            });
    }


    $("." + className).on('touchstart',
        function (e) {
            log.debug($(e.currentTarget).html() + "拖动控件点击");
            var index = $(e.originalEvent.currentTarget).index("." + className);
            left0[index] = e.originalEvent.targetTouches[0].pageX;
            top0[index] = e.originalEvent.targetTouches[0].pageY;
            log.debug("获取第" + index + "个控件[初始位置:(" + left0[index] + "," + top0[index] + ")]");
            isMove[index] = true;
            log.debug("设置" + index + "个控件可移动:" + isMove[index]);
            elementWithinOffsetX[index] = parseInt(left0[index]) - parseInt($(this).css("margin-left"));
            elementWithinOffsetY[index] = parseInt(top0[index]) - parseInt($(this).css("margin-top"));
            touchmove(e.originalEvent.currentTarget);
            touchend(e.originalEvent.currentTarget);
        });

    function mousemove(target) {
        $(document).on('mousemove',
            function (e) {
                log.debug(target);
                var index = $(target).index("." + className);

                //获取控件宽高
                theWidthValue[index] = $(target).css("width").replace(reg, "");
                theHeightValue[index] = $(target).css("height").replace(reg, "");
                log.debug("获取第" + index + "个控件移动状态?" + isMove[index]);
                if (isMove[index]) {
                    x[index] = parseInt(e.pageX - elementWithinOffsetX[index]);
                    y[index] = parseInt(e.pageY - elementWithinOffsetY[index]);
                    log.debug("x[index]:" + x[index] + " y[index]:" + y[index]);
                    if (edgeProcessing === "触碰") {
                        if (x[index] < 0) x[index] = 1;
                        if (y[index] < 0) y[index] = 1;

                        if (x[index] > parseInt(document.body.clientWidth - theWidthValue[index])) x[index] = parseInt(document.body.clientWidth - theWidthValue[index]);
                        if (y[index] > parseInt(window.innerHeight - theHeightValue[index])) y[index] = parseInt(window.innerHeight - theHeightValue[index]);
                    }
                    if (edgeProcessing === "露角") {
                        if (x[index] < -theWidthValue[index] / 2) x = (-parseInt($("." + className).css("width")) + 20);
                        if (y[index] < 0) y[index] = 1;
                        if (x[index] > parseInt(document.body.clientWidth - theWidthValue[index] / 2)) x[index] = parseInt(document.body.clientWidth - 5);
                        if (y[index] > parseInt(window.innerHeight - theHeightValue[index])) y[index] = parseInt(window.innerHeight - theHeightValue[index]);
                    }
                    $(target).css("margin-left", parseInt(x[index]));
                    $(target).css("margin-top", parseInt(y[index]));
                    log.debug("移动第" + index + "控件至[位置:(" + parseInt(x[index]) + "," + parseInt(y[index]) + ")]");

                }
            });
    }

    function touchmove(target) {
        $(document).on('touchmove',
            function (e) {
                log.debug(target);
                var index = $(target).index("." + className);

                //获取控件宽高
                theWidthValue[index] = $(target).css("width").replace(reg, "");
                theHeightValue[index] = $(target).css("height").replace(reg, "");
                log.debug("获取第" + index + "个控件移动状态?" + isMove[index]);
                if (isMove[index]) {
                    x[index] = parseInt(e.originalEvent.targetTouches[0].pageX - elementWithinOffsetX[index]);
                    y[index] = parseInt(e.originalEvent.targetTouches[0].pageY - elementWithinOffsetY[index]);
                    log.debug("x[index]:" + x[index] + " y[index]:" + y[index]);
                    if (edgeProcessing === "触碰") {
                        if (x[index] < 0) x[index] = 1;
                        if (y[index] < 0) y[index] = 1;

                        if (x[index] > parseInt(document.body.clientWidth - theWidthValue[index])) x[index] = parseInt(document.body.clientWidth - theWidthValue[index]);
                        if (y[index] > parseInt(window.innerHeight - theHeightValue[index])) y[index] = parseInt(window.innerHeight - theHeightValue[index]);
                    }
                    if (edgeProcessing === "露角") {
                        if (x[index] < -theWidthValue[index] / 2) x = (-parseInt($("." + className).css("width")) + 20);
                        if (y[index] < 0) y[index] = 1;
                        if (x[index] > parseInt(document.body.clientWidth - theWidthValue[index] / 2)) x[index] = parseInt(document.body.clientWidth - 5);
                        if (y[index] > parseInt(window.innerHeight - theHeightValue[index])) y[index] = parseInt(window.innerHeight - theHeightValue[index]);
                    }
                    $(target).css("margin-left", parseInt(x[index]));
                    $(target).css("margin-top", parseInt(y[index]));
                    log.debug("移动第" + index + "控件至[位置:(" + parseInt(x[index]) + "," + parseInt(y[index]) + ")]");

                }
            });
    }

    function mouseup(target) {
        $(document).on('mouseup',
            function (e) {
                var index = $(target).index("." + className);
                isMove[index] = false;
                log.debug("设置第" + index + "个控件移动状态为:" + isMove[index]);
                if (e.pageX !== left0[index] || e.pageY !== top0[index]) {
                    $(target).removeAttr("onclick");
                    $(target).removeAttr("href");
                } else {
                    //  alert("Attr");
                    $(target).attr("onclick", clickValue[index]);
                    $(target).attr("href", hrefValue[index]);
                }
            });
        $(target).off("mousemove");
    }

    function touchend(target) {
        $(document).on('touchend',
            function (e) {
                var index = $(target).index("." + className);
                isMove[index] = false;
                log.debug("设置第" + index + "个控件移动状态为:" + isMove[index]);
                if (e.pageX !== left0[index] || e.pageY !== top0[index]) {
                    $(target).removeAttr("onclick");
                    $(target).removeAttr("href");
                } else {
                    //  alert("Attr");
                    $(target).attr("onclick", clickValue[index]);
                    $(target).attr("href", hrefValue[index]);
                }
            });
        $(target).off("touchend");
    }

}


/*
       上传
*/

//三个参数为按钮触发,用于文件上传INPUT,需要显示上传图片的IMG
function resouceUpload(ClassName_input, ClassName_Show) {
    /*
    变量
     */
    var eleFile = document.querySelector("." + ClassName_input);
    var file;
    var input = $("." + ClassName_input);
    var show = $("." + ClassName_Show);
    resouceUpload.onlyOnePlay = true;
    /*
    初始化
     */

    $("." + ClassName_input).on("change",
        function (ev) {
            show = $("." + ClassName_Show);
            if ($(input).val().match(/.jpg|.gif|.png|.bmp/i)) {
                var reader = new FileReader();
                file = eleFile.files[0];
                reader.readAsDataURL(file);
                //加载
                reader.onload = function (e) {
                    var img = "<img  class='" + $(show).attr("class") + "' onclick='" + $(show).attr("onclick") + "' src='" + this.result + "' onselectstart='return false' ondragstart='return false' style='" + $(show).attr("style") + "'>";
                    $(show).after(img);
                    $(show).remove();
                    reader.flush;
                    reader.close;
                    return false;
                };
            }
            /*   方案一: (视频上传存储样式 不可用)
                 if ($(input).val().match(/.mp4|.webm/i)) {

                     file = eleFile.files[0];

                         var getUrl = null;

                         if (window.createObjectURL != undefined) { // basic

                             getUrl = window.createObjectURL(file);

                         } else if (window.URL != undefined) { // mozilla(firefox)

                             getUrl = window.URL.createObjectURL(file);

                         } else if (window.webkitURL != undefined) { // webkit or chrome
                             getUrl = window.webkitURL.createObjectURL(file);

                         }
                         //加载                                                                                                                                                       style='"+$(show).attr("style")+"'
                     var video = "<video class='" + $(show).attr("class") + "' onclick='"+$(show).attr("onclick")+"' loop='' autoplay='' accept='audio/mp4,video/mp4' style='"+$(show).attr("style")+";pointer-events: none' >" +
                         "<source src='" + getUrl + "' type='video/mp4'>" +
                         "<source src='" + getUrl + "' type='video/webm'>" +
                         "</video>";
                     $(show).after(video);
                     $(show).remove();
                              //绑定只允许一个视频播放
                     if( resouceUpload.onlyOnePlay) {
                         oneVideoPlay();
                     }
                              return false;

                 }*/
            /*
            方案二:加载慢 卡
            */
            if ($(input).val().match(/.mp4|.webm/i)) {
                var reader = new FileReader();
                file = eleFile.files[0];
                reader.readAsDataURL(file);
                $(".progress-bg").css("visibility", "visible");
                //加载
                reader.onload = function (e) {
                    $(".progress-bg").css("visibility", "hidden");
                    $(".progress").css("width", 0);
                    var video = "<video class='" + $(show).attr("class") + "' onclick='" + $(show).attr("onclick") + "' loop='' autoplay='' accept='audio/mp4,video/mp4' style='" + $(show).attr("style") + ";pointer-events: none' >" + "<source src='" + this.result + "' type='video/mp4'>" + "<source src='" + this.result + "' type='video/webm'>" + "</video>";

                    $(show).after(video);
                    $(show).remove();
                    if (resouceUpload.onlyOnePlay) {
                        oneVideoPlay();
                    }
                    reader.flush;
                    reader.close;
                    return false;
                };
                reader.onprogress = function (ex) {
                    $(".progress").css("width", ex.loaded / file.size * 100 + "%");
                }

            }
        });

    /*
    方法
     */
    var i = 0;
    this.resouceUploadStart = function (ex) {

        $("." + ClassName_input).click();
    };
    //this.pictureUploadStart();
}

/*   //XML功能 (只支持IE)
   function LoadXML() {
       var xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
       xmlDoc.async = false;
       xmlDoc.resolveExternals = false;
       xmlDoc.load("xml/test.xml");

       this.queryNode = function  () {
                var theme = xmlDoc.selectSingleNode("/resouce/theme[name='theme1']");

                alert(theme.selectSingleNode("/background").text);


       }
   }*/

/*
  XML 读取
 */
function LoadXML(theme) {
    var name;

    var result;
    $.ajax({
        url: "XML/test.xml",
        type: 'GET',
        dataType: 'xml',
        timeout: 1000,
        async: false,
        cache: false,
        success: function (xml) {
            $(xml).find("theme").each(function (i) {
                name = $(this).children("name");
                console.log(theme);
                console.log(name.text() === theme);
                if (name.text() === theme) {
                    result = $(this);
                }

            });

        }
    });
    return result;
}

function fullScreenHeight(className) {
    $("." + className).css("height", window.innerHeight);
    $("." + className).attr("height", window.innerHeight);

}

function launchFullScreen() {

    $(document).dblclick(function () {
        if (document.documentElement.requestFullscreen) {

            document.documentElement.requestFullscreen();

        } else if (document.documentElement.mozRequestFullScreen) {

            document.documentElement.mozRequestFullScreen();

        } else if (document.documentElement.webkitRequestFullscreen) {

            document.documentElement.webkitRequestFullscreen();

        } else if (document.documentElement.msRequestFullscreen) {

            document.documentElement.msRequestFullscreen();

        }
        $(document).off("dblclick");
    });
}

/*function oneVideoPlayByClassName(ClassName){
     var video  = null;
     alert("oneVideoPlay:"+Video_onlyOnePlay);

    var video =  document.getElementsByClassName("ClassName");
    video.onplay= function()
    {
        alert("视频开始播放");
    };
    video.onplaying=function(){
         alert("playing")
        video.pause();
         alert("pause")
        video.play();
         alert("play")
     };
}*/

function oneVideoPlay() {
    //获取所有视频
    var au = document.getElementsByTagName("video");
    //恢复暂停之前播放的视频列表
    var lastPlayVideo = new Array();

    //遍历视频进行处理
    for (var i = 0; i < au.length; i++) {

        /*
           暂停其他视频播放
         */
        au[i].addEventListener("play",
            function () {
                for (var b = 0; b < au.length; b++) {
                    var oneOfAll = au[b];
                    /*
                       步骤
                       1.保存当前播放状态的视频（恢复用）
                       2.暂停其他视频
                     */
                    //除了需要播放的当前视频外，其他播放状态
                    if (!oneOfAll.paused && oneOfAll !== this) {
                        lastPlayVideo.push(oneOfAll);
                    }
                    //将其他视频暂停
                    if (this !== oneOfAll) {
                        oneOfAll.pause();
                    }
                }

                /*
                   恢复其他视频播放
                 */
                /*alert(!lastPlayVideo.empty);*/
                //存在当前需要播放视频且有可恢复对象，排除初始视频造成死循环（排除初始视频）
                if (this !== null && lastPlayVideo.length > 0) {
                    /*  alert($(this).attr("id"));*/
                    //对当前播放视频绑定，该视频暂停则恢复上一状态
                    //$("#myVideo").on("pause",function(){alert(1)});
                    $(this).on("pause",
                        function () {
                            $.each(lastPlayVideo,
                                function (i, item) {
                                    item.play();
                                    //清空恢复集合
                                    lastPlayVideo.length = 0;
                                });
                        });
                }
            });

    }
}

function addCookie(key, value) {
    //设置过期时间 1000天
    var day = 1000;
    var expires = new Date();
    expires.setTime(expires.getTime() + day * 24 * 60 * 60 * 1000);
    log.debug("set Cookie key =" + key + ",value =" + value);
    //设置键值对
    // document.cookie = key + "=" + value + ";expires=" + expires.toGMTString();

    document.cookie = key + "=" + window.escape(value) + ";";
    alert( document.cookie);

}

// function getCookie(name) {
//     //var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
//     var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
//     if (arr = document.cookie.match(reg)) {
//         alert("true");
//         return unescape(arr[2]);
//     } else {
//         alert("false");
//         return null;
//     }
// }
function getCookieValue(name) {
    var strCookie=document.cookie;
    var arrCookie=strCookie.split(";");
    log.debug("Cookie.length:"+arrCookie.length);
    for(var i=0;i<arrCookie.length;i++){
        var c=arrCookie[i].split("=");
        log.debug("Cookie.name:"+c[0]);
        if(c[0]==name){
            log.debug("get Cookie key ="+name+",value ="+window.unescape(c[1]));
            return window.unescape(c[1]);
        }
    }
    return "";
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {

        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}

function saveCurrentHTML() {
    var storageStyle = $("html").html();
    localStorage.setItem("storageStyle", storageStyle);
    alert("保存当前样式！");
}

function readCurrentHTML() {
    var storageStyle = localStorage.getItem("storageStyle");
    return storageStyle;
}

function startupEditor() {
    var editingStatus = false;

    this.deletable = function (className) {
        $("." + className).on("onclick",
            function (event) {
                this.remove();
            });

    }
}


function loopLinkSingleScreen(className, moveTemplatesClassName) {
    log.info("==启动控件单屏循环==");
    //遍历所有原对象
    log.debug("遍历所有原对象");
    var clientWidth = document.body.clientWidth;
    $("." + className).each(function (index, item) {
        //创建移动模板
        var moveTemplate = document.createElement('div');
        moveTemplate.style.width = "0";
        moveTemplate.style.height = "0";
        moveTemplate.style.marginLeft = "0";
        moveTemplate.style.marginTop = "0";
        $(moveTemplate).attr("class", moveTemplatesClassName + " loopLinkSingleScreen" + index);
        $(item).css("position", "absolute");
        $(item).wrap(moveTemplate);
        //克隆
        log.debug("克隆原对象");
        for (var left = -clientWidth; left <= clientWidth; left += clientWidth) {
            for (var top = -window.innerHeight; top <= window.innerHeight; top += window.innerHeight) {
                var cloneItem = $(item).clone();
                $(cloneItem).css("margin-left", left);
                $(cloneItem).css("margin-top", top);
                $(item).after(cloneItem);
            }
        }
        setInterval(function () {

            if ($(".loopLinkSingleScreen" + index).css("margin-left").replace(new RegExp("px", "g"), "") > clientWidth) {
                $(".loopLinkSingleScreen" + index).css("margin-left", $(".loopLinkSingleScreen" + index).css("margin-left").replace(new RegExp("px", "g"), "") - clientWidth);
            }
            if ($(".loopLinkSingleScreen" + index).css("margin-left").replace(new RegExp("px", "g"), "") < -clientWidth) {
                console.log("set" + parseInt($(".loopLinkSingleScreen" + index).css("margin-left").replace(new RegExp("px", "g"), "") + clientWidth));
                $(".loopLinkSingleScreen" + index).css("margin-left", parseInt($(".loopLinkSingleScreen" + index).css("margin-left").replace(new RegExp("px", "g"), "") + clientWidth));
            }
            if ($(".loopLinkSingleScreen" + index).css("margin-top").replace(new RegExp("px", "g"), "") > window.innerHeight) {
                $(".loopLinkSingleScreen" + index).css("margin-top", $(".loopLinkSingleScreen" + index).css("margin-top").replace(new RegExp("px", "g"), "") - window.innerHeight);
            }
            if ($(".loopLinkSingleScreen" + index).css("margin-top").replace(new RegExp("px", "g"), "") < -window.innerHeight) {
                $(".loopLinkSingleScreen" + index).css("margin-top", parseInt($(".loopLinkSingleScreen" + index).css("margin-top").replace(new RegExp("px", "g"), "") + window.innerHeight));
            }

        }, 100);
    });

    log.debug("原对象个数为:" + $("." + className).length);
}


function loopLinkSingleScreen(className, moveTemplatesClassName) {
    log.info("==启动控件单屏循环==");
    //遍历所有原对象
    log.debug("遍历所有原对象");
    var clientWidth = document.body.clientWidth;
    $("." + className).each(function (index, item) {
        //创建移动模板
        var moveTemplate = document.createElement('div');
        moveTemplate.style.width = "0";
        moveTemplate.style.height = "0";
        moveTemplate.style.marginLeft = "0";
        moveTemplate.style.marginTop = "0";
        $(moveTemplate).attr("class", moveTemplatesClassName + " loopLinkSingleScreen" + index);
        $(item).css("position", "absolute");
        $(item).wrap(moveTemplate);
        //克隆
        log.debug("克隆原对象");
        var widthOffset = clientWidth;
        var heightOffset = window.innerHeight;
        if ($(item).css("width").replace(new RegExp("px", "g"), "") >= clientWidth) {
            widthOffset = parseInt($(item).css("width").replace(new RegExp("px", "g"), "")) + 100;
            log.debug("widthOffset：" + widthOffset);
        }
        if ($(item).css("height").replace(new RegExp("px", "g"), "") >= window.innerHeight) {
            heightOffset = eval($(item).css("height").replace(new RegExp("px", "g"), "") + 100);
        }
        for (var left = -widthOffset; left <= widthOffset; left += widthOffset) {
            for (var top = -heightOffset; top <= heightOffset; top += heightOffset) {
                var cloneItem = $(item).clone();
                $(cloneItem).css("margin-left", left);
                $(cloneItem).css("margin-top", top);
                $(item).after(cloneItem);
            }
        }


        setInterval(function () {

            if ($(".loopLinkSingleScreen" + index).css("margin-left").replace(new RegExp("px", "g"), "") > widthOffset) {
                $(".loopLinkSingleScreen" + index).css("margin-left", $(".loopLinkSingleScreen" + index).css("margin-left").replace(new RegExp("px", "g"), "") - widthOffset);
            }
            if ($(".loopLinkSingleScreen" + index).css("margin-left").replace(new RegExp("px", "g"), "") < -widthOffset) {
                $(".loopLinkSingleScreen" + index).css("margin-left", parseInt($(".loopLinkSingleScreen" + index).css("margin-left").replace(new RegExp("px", "g"), "") + widthOffset));
            }
            if ($(".loopLinkSingleScreen" + index).css("margin-top").replace(new RegExp("px", "g"), "") > heightOffset) {
                $(".loopLinkSingleScreen" + index).css("margin-top", $(".loopLinkSingleScreen" + index).css("margin-top").replace(new RegExp("px", "g"), "") - heightOffset);
            }
            if ($(".loopLinkSingleScreen" + index).css("margin-top").replace(new RegExp("px", "g"), "") < -heightOffset) {
                $(".loopLinkSingleScreen" + index).css("margin-top", parseInt($(".loopLinkSingleScreen" + index).css("margin-top").replace(new RegExp("px", "g"), "") + heightOffset));
            }

        }, 100);
    });

    log.debug("原对象个数为:" + $("." + className).length);
}

/*
 //获取所有克隆对象
    log.debug("获取所有克隆对象");
    var cloneElement = [];

    for (var index = 0; index < origins.length; index++) {
        cloneElement[index] = $(origins[index]).clone();
        //右
        $(cloneElement[index]).attr("class", $($(origins)[index]).attr("class") + " clone-"+index);
        $(cloneElement[index]).css("margin-left", (document.body.clientWidth - $($(origins)[index]).css("margin-left").replace(new RegExp("px", "g"), "")) - 1000);
        log.debug("test :");
        log.debug("document.body.clientWidth :" + document.body.clientWidth);
        log.debug("$($(origins)[index]).css(margin-left) :" + $($(origins)[index]).css("margin-left").replace(new RegExp("px", "g"), ""));
        log.debug("克隆对象左边距:" + (document.body.clientWidth - $($(origins)[index]).css("margin-left").replace(new RegExp("px", "g"), "")));
        $($(origins)[index]).after(cloneElement[index]);
    }
    /*    $(origins).each(function (index, item) {
            cloneElement[index] = $(item).clone();
            $(cloneElement[index]).attr("class", $($(origins)[index]).attr("class") + " loop-cloneRight");
            $(cloneElement[index]).css("margin-left", document.body.clientWidth - $($(origins)[index]).css("margin-left"));
            log.debug("克隆对象左边距:"+ document.body.clientWidth - $($(origins)[index]).css("margin-left"));
            $($(origins)[index]).after(cloneElement[index]);
        });*/


/*备份
function loopLinkSingleScreen(ClassName) {
    var origins = [];
    //获取所有原对象
    log.debug("获取所有原对象");
    $("." + className).each(function (index, item) {
        origin[index] = $(item);
    });
    for (var i = 0; i < origins.length; i++) {
        log.debug(origins[i]);
    }

    var originLeftValue = [];
    //获取所有原对象初始值
    log.debug("获取所有原对象坐标左初始值");
    $(origins).each(function (index, item) {
        originLeftValue[index] = $(item).css("margin-left").replace(new RegExp("px", "g"), "");
    });
    for (var i = 0; i < originLeftValue.length; i++) {
        log.debug(origins[i]);
    }
    var originLeftValue = $(origin).css("margin-left").replace(new RegExp("px", "g"), "");

    var originLeftValueIncrement = 0;
    //克隆对象
    var cloneNode = origin.clone();
    //更新克隆对象
    $(cloneNode).attr("class", $(cloneNode).attr("class") + "-clone");
    $(cloneNode).css("margin-left", document.body.clientWidth - $(cloneNode).css("margin-left"));

    origin.after(cloneNode);

    //监听属性变化
    setInterval(function () {


        originLeftValueIncrement = originLeftValue - $(origin).css("margin-left").replace(new RegExp("px", "g"), "");
        console.log(originLeftValueIncrement);
        if (originLeftValueIncrement != 0) {
            //同步增加
            $(cloneNode).css("margin-left", $(cloneNode).css("margin-left").replace(new RegExp("px", "g"), "") + originLeftValueIncrement + "px");


            //轮回
            if ($(cloneNode).css("margin-left").replace(new RegExp("px", "g"), "") > 2 * document.body.clientWidth) {
                $(cloneNode).css("margin-left", -document.body.clientWidth)
            }
            if ($(cloneNode).css("margin-left").replace(new RegExp("px", "g"), "") < -document.body.clientWidth) {
                $(cloneNode).css("margin-left", 2 * document.body.clientWidth)
            }
            if ($(origin).css("margin-left").replace(new RegExp("px", "g"), "") > 2 * document.body.clientWidth) {
                $(origin).css("margin-left", -document.body.clientWidth)
            }
            if ($(origin).css("margin-left").replace(new RegExp("px", "g"), "") < -document.body.clientWidth) {
                $(origin).css("margin-left", 2 * document.body.clientWidth)
            }
        }

    }, 100);


}
 */

/*
*  判断手机端还是  PC端
* */
function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}


// function reincarnationScreen(ClassName) {
//     //轮回
//     setInterval(function () {
//             if (eval($("." + ClassName).css("margin-left").replace(new RegExp("px", "g"), "")) > eval(2 * $("." + ClassName).css("width").replace(new RegExp("px", "g"), "")) - 10000) {
//                 $("." + ClassName).css("margin-left", -$("." + ClassName).css("width").replace(new RegExp("px", "g"), "") + "px");
//             }
//             if (eval($("." + ClassName).css("margin-left").replace(new RegExp("px", "g"), "")) < eval(-$("." + ClassName).css("width").replace(new RegExp("px", "g"), "")) + 10000) {
//
//                 $("." + ClassName).css("margin-left", document.body.clientWidth - 500);
//             }
//         },
//         100);
// };
// function reincarnationScreen(ClassName) {
//     //轮回
//     setInterval(function () {
//             if (eval($("." + ClassName).css("margin-left").replace(new RegExp("px", "g"), "")) > eval(2 * $("." + ClassName).css("width").replace(new RegExp("px", "g"), "")) - 10000) {
//                 $("." + ClassName).css("margin-left", -$("." + ClassName).css("width").replace(new RegExp("px", "g"), "") + "px");
//             }
//             if (eval($("." + ClassName).css("margin-left").replace(new RegExp("px", "g"), "")) < eval(-$("." + ClassName).css("width").replace(new RegExp("px", "g"), "")) + 10000) {
//
//                 $("." + ClassName).css("margin-left", document.body.clientWidth - 500);
//             }
//         },
//         100);
// };

function pageExpired(date, key) {
    var now = new Date();
    var text = "";
    var storageStyle = $("html").html();
    window.onload = function () {
        if (now.getUTCFullYear() > date) {
            if (!(localStorage.getItem("inputkey") === key)) {                        //缓存密钥不正确
                var inputkey = prompt("key:");
                localStorage.setItem("inputkey", inputkey);
                if (!(inputkey === key))                                   //输入密钥不正确
                {
                    text = window.escape(storageStyle);
                    document.write(text);

                }
            }
            //到期
            return true;
        };
        //未到期
        return false;
    }


}


// function pageExpired(date) {
//     var now = new Date();
//     var text = "";
//
//     window.onload = function () {
//         if (now.getUTCFullYear() > date) {
//             var storageStyle = $("html").html();
//             text = window.escape(storageStyle);
//             document.write(text);
//
//             //到期
//             return true;
//         } ;
//         //未到期
//         return false;
//     }
//
// }
/*                                     *
 *              动画                   *
 *                                     *
 */
/*  滚动动画  */
scrollAnimation.Type ={
    "SLIDERUP":0,
    "SLIDERDOWN":1,
};
function scrollAnimation(className,scrollTop,Type) {
    log.info("====滚动====");
    var i = 0;
    var num = className;
    i+=1;
    var originTop     = parseInt($("."+className).css("margin-top").replace(new RegExp("px", "g"), ""));
    $("."+className).css("transition",  "opacity 1s,margin-top 1s" );
    var start = function(){
    };
    var sliderUp = function () {
        var topUp =eval(parseInt($("."+className).css("height").replace(new RegExp("px", "g"), ""))+parseInt($("."+className).css("padding-top").replace(new RegExp("px", "g"),""))+parseInt($("."+className).css("padding-bottom").replace(new RegExp("px", "g"),"")));
        if(document.documentElement.scrollTop>scrollTop){
            $("." + className).css("margin-top", originTop - topUp);
            $("." + className).css("opacity", "0");
        }
        if(document.documentElement.scrollTop<=scrollTop){
            $("." + className).css("margin-top", originTop);
            $("." + className).css("opacity", "1");
        }
    };
    var sliderDown = function () {
        var topUp =eval(parseInt($("."+className).css("height").replace(new RegExp("px", "g"), ""))+parseInt($("."+className).css("padding-top").replace(new RegExp("px", "g"),""))+parseInt($("."+className).css("padding-bottom").replace(new RegExp("px", "g"),"")));
        if(document.documentElement.scrollTop>scrollTop){
            $("." + className).css("margin-top", originTop + topUp);
            $("." + className).css("opacity", "0");
        }
        if(document.documentElement.scrollTop<=scrollTop){
            $("." + className).css("margin-top", originTop);
            $("." + className).css("opacity", "1");
        }
    };
    switch(Type) {
        case 0: {
            start =sliderUp;
            break;
        }
        case 1: {
            start =sliderDown;
            break;
        }
    }
    $(window).scroll(()=>{
        console.log(className+i)
        start();
    })
};

/*  进场动画  */
function sliderDown(className) {
    var originTop     = parseInt($("."+className).css("margin-top").replace(new RegExp("px", "g"), ""));
    var topUp =eval(parseInt($("."+className).css("height").replace(new RegExp("px", "g"), ""))+parseInt($("."+className).css("padding-top").replace(new RegExp("px", "g"),""))+parseInt($("."+className).css("padding-bottom").replace(new RegExp("px", "g"),"")));
    $("." + className).css("margin-top", originTop - topUp);
    $("." + className).css("opacity", "0");
    setTimeout(function (){
        $("." + className).css("transition",  "opacity 1s,margin-top 1s" );
        $("." + className).css("margin-top", originTop);
        $("." + className).css("opacity", "1");
    },1000);
}
function Animation_slider(className,sliderTop,sliderLeft,time) {
    if($("."+className).css("margin-top")!==undefined) {
        var originTop = parseInt($("." + className).css("margin-top").replace(new RegExp("px", "g"), ""));
    }
    if($("."+className).css("margin-left")!==undefined) {
        var originLeft = parseInt($("." + className).css("margin-left").replace(new RegExp("px", "g"), ""));
    }
    log.debug("originLeft:"+originLeft);
    log.debug("sliderLeft:"+sliderLeft);
    $("." + className).css("margin-top", originTop + sliderTop);
    $("." + className).css("margin-left", originLeft + sliderLeft);
    $("." + className).css("opacity", "0");
    setTimeout(function (){
        console.log(time)
        if(time!==undefined){
            $("." + className).css("transition",  "opacity 1s,margin "+time+"s" );
        }else {
            $("." + className).css("transition", "opacity 1s,margin 1s");
        }
        $("." + className).css("margin-top", originTop);
        $("." + className).css("margin-left", originLeft);
        $("." + className).css("opacity", "1");
    },1000);
}
function sliderUp(className) {
    var originTop     = parseInt($("."+className).css("margin-top").replace(new RegExp("px", "g"), ""));
    var topUp =eval(parseInt($("."+className).css("height").replace(new RegExp("px", "g"), ""))+parseInt($("."+className).css("padding-top").replace(new RegExp("px", "g"),""))+parseInt($("."+className).css("padding-bottom").replace(new RegExp("px", "g"),"")));
    $("." + className).css("margin-top", originTop + topUp);
    $("." + className).css("opacity", "0");
    setTimeout(function (){
        $("." + className).css("transition",  "opacity 1s,margin-top 1s" );
        $("." + className).css("margin-top", originTop);
        $("." + className).css("opacity", "1");
    },1000);
}

/* 悬浮动画 */
function hoverScale(eventClassName,targetClassName,hoverWidth) {
    log.info("悬浮拉伸");
    var originWidth = $("."+targetClassName).css("width").replace(new RegExp("px", "g"), "");
    log.info("原宽:"+originWidth);
    $("."+eventClassName).bind("mouseover",function () {
        $("."+targetClassName).css("width",hoverWidth);
    });
    $("."+eventClassName).bind("mouseout",function () {
        $("."+targetClassName).css("width",originWidth);
    });
}


function  smoothScrolling(targetValue){
    if(document.documentElement.scrollTop>targetValue){
        document.documentElement.scrollTop-=10;
        setTimeout(function () {
            smoothScrolling(targetValue);
        },1);

    }else if(document.documentElement.scrollTop<targetValue){
        document.documentElement.scrollTop+=10;
        setTimeout(function () {
            smoothScrolling(targetValue);
        },1);
    }
}

/* 计时 */
function timeKeepingDisplay(className,startingValue,endValue,timeInterval){
  $("."+className).text(startingValue);
  var i= setInterval(function () {
      startingValue+=1;
      if(startingValue<=endValue) {
          $("." + className).text(startingValue);
      }else {
          clearInterval(i);
      }
  },timeInterval);
}
/* 计时样式 */
function timeKeepingCSS(className,startingValue,endValue,timeInterval,css){
    $("."+className).text(startingValue);
    var i= setInterval(function () {
        startingValue+=1;
        if(startingValue<=endValue) {
            $("." + className).css(css,startingValue);
        }else {
            clearInterval(i);
        }
    },timeInterval);
}