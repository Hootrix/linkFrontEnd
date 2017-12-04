/*
 Debug 调试版

 http://tool.css-js.com/ JS美化后 JSPacker压缩
 */
var loca_dom = (window.location.href.indexOf('?') >= 0) ? window.location.href.split("?")[0] : window.location.href;//获取当前URl,若有?，则取?以前的字符
var dom = (loca_dom.substr(loca_dom.length - 1, 1) === '/') ? loca_dom : loca_dom + '/';//确保url以/结尾
var namedir = 'url';
function getNewLink() {

    //var isMobile = navigator.userAgent.match(/iPad|iPhone|Android|iPod/i) != null;
    var isMobile = Link.isMobile();

    var pan_url = document.getElementById("pan_url");
    var pan_urlValue = pan_url.value;
    var status = document.getElementById("status");
    var su = pan_urlValue.match(/\d{2,}/g) ? pan_urlValue.match(/\d{2,}/g) : [];
    var ytsu = Link.getChildReg(/.*player_(\d{2,})\.html$/, pan_urlValue);
    var miguid = Link.isUndefined(Link.getChildReg(/.*sid=(\w+)/, pan_urlValue)) ? Link.getChildReg(/.*[a-zA-Z]+\/(\d+)/, pan_urlValue) : Link.getChildReg(/.*sid=(\w+)/, pan_urlValue);
    var kg_hash_1 = Link.getChildReg(/(?!kugoo:\/\/\|Music\|)([a-zA-Z0-9]{32})\|\/?(?!\d+)/, pan_urlValue);
    var kg_hash = Link.isUndefined(Link.getChildReg(/.*\/([a-zA-Z0-9]+)\.swf$/, pan_urlValue)) ? Link.getChildReg(/.*kugou\.com.*hash=([a-zA-Z0-9]+).*$/, pan_urlValue) : Link.getChildReg(/.*\/([a-zA-Z0-9]+)\.swf$/, pan_urlValue);
    var xiasu = Link.isUndefined(Link.getChildReg(/.*song\/(\w+)(\?spm.*)?/, pan_urlValue)) ? Link.getChildReg(/.*\/id\/(\w+).*/, pan_urlValue) : Link.getChildReg(/.*song\/(\w+)(\?spm.*)?/, pan_urlValue);
    var xiasu = Link.isUndefined(xiasu) ? Link.getChildReg(/.*demo\/(\w+).*/, pan_urlValue) : xiasu;
    var onedriveID = Link.isUndefined(Link.parse_str(pan_urlValue)['id']) ? Link.parse_str(pan_urlValue)['resid'] : Link.parse_str(pan_urlValue)['id'];
    var onedriveExt = Link.isUndefined(Link.parse_str(pan_urlValue)['ithint']) ? '' : '.' + Link.parse_str(pan_urlValue)['ithint'].replace(/%2c/i, ',').split(',')[1];
    var onedriveID_ext = onedriveID + '?HHTjim.Com' + onedriveExt;
    var baiduYyr = Link.isUndefined(Link.parse_str(pan_urlValue)['play_song']) ? Link.parse_str(pan_urlValue)['goto'] : Link.parse_str(pan_urlValue)['play_song'].replace(/%2c/i, ',').split(',')[0];
    var baiduYyr = Link.isUndefined(baiduYyr) ? Link.parse_str(pan_urlValue)['buy'] : baiduYyr;
    var baiduYyr = Link.isUndefined(baiduYyr) ? su[0] : baiduYyr;
    var reg = /^.*(vsochina\.com)|(imusic\.cn)|(ximalaya\.com)|(qing\.wps\.cn)|(mp3\.sogou\.com)|(app-echo\.com)|(note\.youdao\.com)|(suning\.com)|(kanbox\.com)|(douban\.com)|((music|y)\.qq\.com)|(music\.haosou\.com)|(onedrive\.live\.com)|(kugoo:\/\/\|Music\|.*\|\d+\|\w+\|\/?)|(letv\.com)|(118100\.cn)|(music\.so\.com)|(10155\.com)|(migu\.cn)|(rayfile\.com)|(duomi\.com)|(dongting\.com)|(duole\.com)|(kugou\.com)|(dbank\.com)|(vmall\.com)|(yinyuetai\.com)|(baidu\.com)|(songtaste\.com)|(1ting\.com)|(weibo\.com)|(kuaipan\.cn)|(weiyun\.com)|(yunpan\.cn)|(kuwo\.cn)|(music\.sina\.com\.cn)|(music\.163\.com)|(xiami\.com).*$/;
    var nopost_reg = /^.*(y\.qq\.com\/portal\/song\/\w+)|(weibo.com\/p\/\d+)|(vsochina\.com)|(imusic\.cn)|(ximalaya\.com)|(qing\.wps\.cn)|(mp3\.sogou\.com)|(app-echo\.com)|(music\.douban\.com\/programme\/\d+\?sid=\d+)|(y\.qq\.com\/#type=song&mid=\w+|music\.qq\.com\/fcgi-bin\/fcg_yqq_song_detail_info\.fcg)|(music\.haosou\.com)|(music\.weibo\.com\/(snake|t)\/(i\/\d+\.html|(snk_song|boke_program)\.php\?(songid|pid)=\d+))|(y\.baidu\.com)|(onedrive\.live\.com)|(kugoo:\/\/\|Music\|.*\|\d+\|\w+\|\/?)|(118100\.cn)|(music\.so\.com)|(10155\.com)|(migu\.cn)|(duomi\.com)|(music\.baidu\.com)|(dongting\.com)|(duole\.com)|(kugou\.com)|(yinyuetai\.com)|(songtaste\.com)|(1ting\.com)|(kuwo\.cn)|(music\.sina\.com\.cn)|(music\.163\.com)|(xiami\.com\/song\/)|(i\.xiami\.com\/[a-zA-Z0-9_\-]+\/demo\/\d+).*$/;

    var zm = pan_urlValue.match(/\w+/g);
    var sumu = document.getElementsByName("url").length;
    //var clbutton = "    <input  type=\"button\" onclick=\"cl()\" class=\"btn btn-default btn-xs\" value=\"清空\" />";
    var clbutton = '&nbsp;&nbsp;<a onclick="cl()" class="btn  btn-default btn-xs" href="javascript:void(0)"> <i class="icon-repeat"></i> 清空</a>';
    if (!reg.test(pan_urlValue)) {
        alert("请输入链接地址");
        return false;
    }
    else {
        function no_post(key, dlink) {
            //不对关键字进行url编码
            if (pan_urlValue.indexOf(key) >= 0)//如有匹配成功
            {
                $(status).slideDown();
                $(status).css("padding-bottom", "10px");
                status.innerHTML = '<i class="icon-spinner icon-spin"></i>Loading...';
                $("#tijiao").addClass('disabled');
                var t = 1;
                var nowUrl = dlink;
                var sumu_t = sumu + t;
                var ShiTing = Link.getShiTing(sumu_t);
                $("<div class=\"input-group\"><input class=\"form-control\" id=\"co_" + sumu_t + "0\" name=\"url\" type=\"text\" value=\"" + nowUrl + "\" onmouseover=\"this.select()\" >" + ShiTing + "<span href=\"javascript:void(0)\"  name=\"anniu_sp\" class=\"input-group-addon\"><button name=\"anniu_no\">No." + sumu_t + "</button></span></div>").insertAfter("#status");//JQ方法
                status.innerHTML = "载入<span class=\"label label-success\">1</span>条链接。总数：<span class=\"label label-default\">" + (sumu + 1) + "</span>" + clbutton;
                $(status).css("padding-bottom", "2px");
                $("#tijiao").removeClass('disabled');
                $("button[name=anniu_no]:lt(" + t + ")").addClass("btn btn-success").parent(".input-group-addon").removeClass("input-group-addon").addClass("input-group-btn").on("hover", function () {
                    if (!$(this).data('init')) {//附加标记  避免重复加载zclipIS
                        // console.log('aaaaa');
                        $(this).data('init', true).zclipIS();
                    }
                });//.zclipIS()
                $("button[name=anniu_no]:gt(" + (t - 1) + ")").removeClass("btn btn-success").each(function () {
                    $(this).replaceWith('' + $(this).html() + '');
                });
                $("span[name=anniu_sp]:gt(" + (t - 1) + ")").removeClass("input-group-btn").addClass("input-group-addon");

            }
            return false;
        }

        if (nopost_reg.test(pan_urlValue)) {//判断是否有只需js处理的地址，否则post获取地址

            no_post('songtaste.com', dom + 'st/' + su[0] + '.mp3');
            no_post('xiami.com', dom + 'xiami/' + xiasu + '.mp3');
            no_post('1ting.com', dom + 'yt/' + zm[5] + '/' + ytsu + '.mp3');
            no_post('kuwo.cn', dom + 'kw/' + su[0] + '.mp3');
            no_post('music.sina.com.cn', dom + 'sina/' + su[0] + '.mp3');
            no_post('music.163.com/#/song?id', dom + '163/' + su[1] + '.mp3');
            no_post('music.163.com/#/m/song?id', dom + '163/' + su[1] + '.mp3');
            no_post('music.163.com/#/mv?id', dom + '163/' + su[1] + '.mp4');
            no_post('music.163.com/#/mv/?id', dom + '163/' + su[1] + '.mp4');
            no_post('yinyuetai.com', dom + 'yyt/' + su[0] + '.mp4');
            no_post('kugou.com', dom + 'kg/' + kg_hash + '.mp3');
            no_post('duole.com', dom + 'duole/' + su[0] + '.mp3');
            no_post('dongting.com', dom + 'tt/' + su[0] + '.mp3');
            if (pan_urlValue.indexOf('music.baidu.com/song/s/') >= 0) {
                no_post('music.baidu.com/song/s/', dom + 'baidu/' + Link.getChildReg(/.*song\/s\/(\w+).*/, pan_urlValue) + '.mp3');
            } else {
                no_post('music.baidu.com', dom + 'baidu/' + su[0] + '.mp3');
            }

            no_post('duomi.com', dom + 'duomi/' + su[0] + '.mp3');
            no_post('migu.cn', dom + 'migu/' + miguid + '.mp3');
            no_post('10155.com', dom + 'wo/' + su[1] + '.mp3');
            no_post('music.so.com', dom + '360music/' + su[0] + '.mp3');
            no_post('music.haosou.com', dom + '360music/' + su[0] + '.mp3');
            no_post('118100.cn', dom + 'aimusic/' + su[1] + '.mp3');
            no_post('imusic.cn', dom + 'aimusic/' + su[0] + '.mp3');
            no_post('kugoo://|Music|', dom + 'kg/' + kg_hash_1 + '.mp3');
            no_post('onedrive.live.com/', 'http://storage.live.com/items/' + onedriveID_ext);
            no_post('y.baidu.com', dom + 'baidu/yyr/' + baiduYyr + '.mp3');
            no_post('music.weibo.com/', dom + 'sina/' + su[0] + '.mp3');
            no_post('weibo.com/p/', dom + 'sina/' + su[1] + '.mp3');
            no_post('music.douban.com', dom + 'douban/' + Link.getChildReg(/.*music\.douban\.com\/programme\/\d+\?sid=(\d+).*/, pan_urlValue) + '.mp3');
            no_post('app-echo.com', dom + 'echo/' + su[0] + '.mp3');
            no_post('qing.wps.cn', dom + 'wps/' + Link.getChildReg(/.*preview\/#l\/(\w+).*/, pan_urlValue));
            var sougouArgs = Link.isUndefined(Url.get(pan_urlValue).song_id) ? Url.get(pan_urlValue).tid : Url.get(pan_urlValue).song_id;
            no_post('mp3.sogou.com', dom + 'sougou/' + sougouArgs + '.mp3');
            var ximalayaArgs = Link.isUndefined(Url.get(pan_urlValue).id) ? su[1] : Url.get(pan_urlValue).id;
            no_post('ximalaya.com', dom + 'ximalaya/' + ximalayaArgs + '.mp3');
            no_post('vsochina.com', dom + 'vsochina/' + Link.getChildReg(/.*s\/(\w+).*/, pan_urlValue));
            if (pan_urlValue.indexOf('fcg_yqq_song_detail_info.fcg?songmid=') >= 0) {
                no_post('?songmid=', dom + 'qq/' + Link.getChildReg(/.*songmid=(\w+).*/, pan_urlValue) + '.mp3');
            }
            else {
                no_post('y.qq.com/#type=song', dom + 'qq/' + Link.getChildReg(/.*#type=song&mid=(\w+).*/, pan_urlValue) + '.mp3');
            }
            no_post('y.qq.com/portal/song/', dom + 'qq/' + Link.getChildReg(/\/portal\/song\/([0-9a-zA-Z]+)/, pan_urlValue) + '.mp3');

            return false;//返回假，不进行post提交数据
        }
        else {
            //170104 启用JQajax
            var ajaxTimeout = $.ajax({
                url: namedir,
                timeout: 30000,
                data: {url: pan_urlValue, t: new Date().getTime()},
                dataType: "json",
                beforeSend: function (XMLHttpRequest) {
                    $("#tijiao").addClass('disabled');
                    $(status).slideDown();
                    $(status).css("padding-bottom", "10px");
                    status.innerHTML = '<i class="icon-spinner icon-spin"></i>Loading...';
                },
                success: function (result) {
                    if (result.code == 500) return this.error(result);
                    var t = 0;
                    for (var i in result.data) {
                        var nowUrl = dom.toString().replace(/(\/$)/g, "") + result.data[i].toString().replace(/"/g, '');//g:全局查找 且删除掉 否则显示异常
                        sumu++;
                        var ShiTing = Link.getShiTing(sumu);
                        $("<div class=\"input-group\"><input class=\"form-control\" id=\"co_" + sumu + "0\" name=\"url\" type=\"text\" value=\"" + nowUrl + "\" onmouseover=\"this.select()\" >" + ShiTing + "<span href=\"javascript:void(0)\"  name=\"anniu_sp\" class=\"input-group-addon\"><button name=\"anniu_no\">No." + sumu + "</button></span></div>").insertAfter("#status");//JQ方法
                        t++;
                    }

                    status.innerHTML = "载入<span class=\"label label-success\">" + t + "</span>条链接。总数：<span class=\"label label-default\">" + sumu + "</span>" + clbutton;
                    if (t == 0) {
                        alert('查询结果为空');
                    }
                    $(status).css("padding-bottom", "2px");
                    $("#tijiao").removeClass('disabled');
                    $("button[name=anniu_no]:lt(" + t + ")").addClass("btn btn-success").parent(".input-group-addon").removeClass("input-group-addon").addClass("input-group-btn").on("hover", function () {
                        if (!$(this).data('init')) {//附加标记  避免重复加载zclipIS
                            $(this).data('init', true).zclipIS();
                        }
                    });//选择前t个button元素，处理成绿色按钮。
                    $("button[name=anniu_no]:gt(" + (t - 1) + ")").removeClass("btn btn-success").each(function () {
                        $(this).replaceWith('' + $(this).html() + '');
                    });//选择前t个之后的button元素，删掉button元素，留着里面的文本内容
                    $("span[name=anniu_sp]:gt(" + (t - 1) + ")").removeClass("input-group-btn").addClass("input-group-addon");//进一步处理，还原为input-group-addon样式
                },
                error: function (result) {
                    var data = result.data;
                    if (typeof data == 'undefined') data = '请求失败';
                    alert(data);
                    window.location.reload();
                },
                complete: function (data, status) { //请求完成后最终执行参数
                    if (status == 'timeout') {//超时,status还有success,error等值的情况
                        ajaxTimeout.abort();
                        alert("请求超时");
                    }
                }
            });
        }
    }
}


document.onkeyup = function (e) {
    var theEvent = window.event || e;
    var code = theEvent.keyCode || theEvent.which;
    if (document.getElementById("pan_url").value.length > 0 && code == 13) {
        if ($("#tijiao").attr("class").indexOf("disabled") < 0) {
            $("#tijiao").click();
        }
    }
}
$(document).ready(function () {
    //$("#openlist").click(
    /*
     function(){
     if($('#listshow').css("display")=="none"){
     $('#listshow').slideDown();
     document.getElementById('openlist').innerHTML ="Less<<<";
     //return false;
     }else{
     document.getElementById('openlist').innerHTML ="More>>>";
     $('#listshow').slideUp(300);}
     }*/
    //)

    $("#openlist").toggle(
        function () {
            $('#listshow').slideDown();
            $('#openlist>i').removeClass("icon-chevron-down").addClass("icon-chevron-up");
            $('#openlist').parent().attr('title', '收!');
        },
        function () {
            $('#openlist>i').removeClass("icon-chevron-up").addClass("icon-chevron-down");
            $('#openlist').parent().attr('title', '展开');
            $('#listshow').slideUp(300);
        }
    )
    $(document).on("click", "#dizhi a", function () {  //$(document).on("click","div#dizhi a",function() 等同 $("div#dizhi a").live("click",function()
        var lu = $(this).text();//不用.html()，考虑到&符号会被转换
        document.getElementById("pan_url").value = lu;
    });
    if (Listen) {//如果打开试听功能
        $(document).on(//我日  这我都能搞定。15-1-17添加修改
            "focus", 'input[name="url"]', function () {
                if (Link.displayShiTing($(this).val())) {//20160418修改 添加动态判断input里面的url是否符合播放试听的要求
                    $(this).next().show();
                }
            }
        ).on(
            "blur", 'input[name="url"]', function () {
                $(this).next().hide(100);
            }
        );
    }

    pan_url.focus();
    Link.init();
});

/*
 150204完全解决ajax载入大量信息时导致浏览器崩溃的问题（由于zclip的flash加载过多导致）
 */
jQuery.fn.zclipIS = function () {//添加自定义jq函数zclipIS();CopyAction动作移到这里
    this.zclip(
        {
            path: "//pan.baidu.com/res/static/images/ZeroClipboard10.swf",
            copy: function () {
                return encodeURI($(this).prevAll('input').val());
            },
            afterCopy: function () {
                var No = $(this).text().replace('o', 'O');
                if ($(this).find('button').length == 0) {
                    mini_tip.show();
                    //$(this).css("color","#777").text("Copy completion");
                    var $this = $(this);
                    setTimeout(function () {
                        $this.css("color", "#777").text(No);
                    }, 200)
                }
                else {
                    mini_tip.show();
                    //$(this).children().text("Copy completion!");
                    var $this = $(this);
                    setTimeout(function () {
                        $this.children().text(No);
                    }, 200)
                }
            }
        }
    );
}

var mini_tip = {
    show: function () {
        var me = this;
        var $el = $('.full-tip-box');
        //  var $el = $(me);
        console.log($el);
        // me.$label.html(msg);
        //$el.addClass('full-tip-' + 'ok');
        //clearTimeout(timer);
        $el.removeClass('full-tip-ok full-tip-warn full-tip-err').addClass('full-tip-' + 'ok').css({
            top: '30px',
            display: 'block'
        }).animate({
            top: 0
        }, 0, 'linear');
        var delay = 0;
        //  var delay = second > 0 ? second : calc_delay(msg);
        timer = setTimeout(function () {
            timer = setTimeout(function () {
                me.hide();
            }, delay * 1000);
        }, 2000);

    },
    hide: function () {

        clearTimeout(timer);
        var me = this;
        var $el = $('.full-tip-box');
        //  var $el = $(me);
        if ($el) {
            $el.animate({
                top: '0px'
            }, 'normal', 'linear', function () {
                $el.hide().removeClass('full-tip-ok full-tip-warn full-tip-err');
            });
        }

    }
//	hide
}
var Url = {
    get: function ($url) {//比起Link.parse_str  要好点
        var args = {};
        var match = null;
        var search = $url;
        var reg = /(?:([^&?]+)=([^&]+))/g;
        while ((match = reg.exec(search)) !== null) {
            args[match[1]] = match[2];
        }
        return args;
    }
}
var Link = {
    isUndefined: function ($o) {
        return typeof($o) == "undefined" ? true : false;
    },

    parse_str: function (url) {//获取url Query String
        var url = (url.indexOf('?') >= 0) ? url.split("?")[1] : url;
        var s = url.split("&");
        var param2 = [];
        //var param2 = {};
        for (var i = 0; i < s.length; i++) {
            var d = s[i].split("=");
            param2[d[0]] = d[1];
            //   eval("param2."+d[0]+" = '"+d[1]+"';");
        }
        return param2;//返回数组
    },

    getChildReg: function (reg, con) {//获取第一个子匹配项
        var r = "";
        while (r = reg.exec(con)) {
            return r[1];
        }
        //不用while循环也行，只是不会输出其余的子匹配项，while循环可以遍历输出所有的子匹配项（未解决）
        /*
         if (reg.exec(con)) {
         document.write(RegExp.$1 + "<>")
         */
    },

    getExt: function (s)//获取文件后缀
    {
        var r, re;
        re = /\.?([^/.]+)$/i;
        if (re.test(s)) {
            r = s.match(re);
            return r[1] ? r[1].toLowerCase() : false;//toLowerCase() 转换为小写
        }
    },

    openWindow: function (url_, name, iWidth, iHeight)//试听音乐文件
    {
        //var url_; //转向网页的地址;
        var url = dom + 'static/swf/cmp/cmp.swf?api=cmp_loaded&src=' + encodeURIComponent(url_) + '&skin=skin.swf&auto_play=1&mixer_id=3&mixer_filter=1&mixer_displace=1&context_menu=0&play_mode=1&bgcolor=F5F5F5&mixer_color=457CE6&video_max=0';//sound_sample=1   不要随便加
        var name; //targe属性名称;
        var iWidth; //弹出窗口的宽度;
        var iHeight; //弹出窗口的高度;
        var iTop = (window.screen.availHeight - 600 - iHeight) / 2; //获得窗口的垂直位置;
        var iLeft = (window.screen.availWidth - 800 - iWidth) / 2; //获得窗口的水平位置;
        window.open(url, name, 'height=' + iHeight + ',,innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
    },

    isMobile: function () {//判断是否为移动设备  ipad为非移动设备  ctrl-u by:nowcoder.com
        //var e = navigator.userAgent || navigator.vendor || window.opera;
        //e = e.toLowerCase();
        var a = navigator.userAgent || navigator.vendor || window.opera,
            b = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
        return b
    },
    getShiTing: function (sumu_t) {
        return (Listen && !this.isMobile()) ? "<span title=\"测试外链播放\" style=\"overflow: hidden; display: none;\" id=\"ShiTing_" + sumu_t + "\" onclick=\"Link.openWindow($(this).prevAll('input').val(),'Music',960,300)\"  class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default\">试听</button></span>" : '<span></span>';//修改试听地址为动态的input内容
    },
    displayShiTing: function (url) {//根据url文件后缀  判断显示试听按钮
        var re = /(mp3|mp4|flv|wma|wmv|m4a|mov|rmvb|wmv|rm|mpg|avi|mpeg|mkv|webm|f4v|3gp|3g2|3gp2|3gpp|jpg|bmp|gif|jpeg|png|mp3|m4a|ogg|aac|wav|ape|flac|aifc|aif|aiff|mid|mod)$/;
        return re.test(this.getExt(url)) ? true : false;
    },

    init: function () {
        // this.isMobile = this.isMobile();
        // this.pan_url = document.getElementById("pan_url");
        // var pan_urlValue = pan_url.value;
        // var status = document.getElementById("status");
        // var su = pan_urlValue.match(/\d{2,}/g) ? pan_urlValue.match(/\d{2,}/g) : [];
        // var ytsu = Link.getChildReg(/.*player_(\d{2,})\.html$/, pan_urlValue);
        // var miguid = Link.isUndefined(Link.getChildReg(/.*sid=(\w+)/, pan_urlValue)) ? Link.getChildReg(/.*[a-zA-Z]+\/(\d+)/, pan_urlValue) : Link.getChildReg(/.*sid=(\w+)/, pan_urlValue);
        // var kg_hash_1 = Link.getChildReg(/(?!kugoo:\/\/\|Music\|)([a-zA-Z0-9]{32})\|\/?(?!\d+)/, pan_urlValue);
        // var kg_hash = Link.isUndefined(Link.getChildReg(/.*\/([a-zA-Z0-9]+)\.swf$/, pan_urlValue)) ? Link.getChildReg(/.*kugou\.com.*hash=([a-zA-Z0-9]+).*$/, pan_urlValue) : Link.getChildReg(/.*\/([a-zA-Z0-9]+)\.swf$/, pan_urlValue);
        // var xiasu = Link.isUndefined(Link.getChildReg(/.*song\/(\d+)(\?spm.*)?/, pan_urlValue)) ? Link.getChildReg(/.*\/id\/(\d+).*/, pan_urlValue) : Link.getChildReg(/.*song\/(\d+)(\?spm.*)?/, pan_urlValue);
        // var xiasu = Link.isUndefined(xiasu) ? Link.getChildReg(/.*demo\/(\d+).*/, pan_urlValue) : xiasu;
        // var onedriveID = Link.isUndefined(Link.parse_str(pan_urlValue)['id']) ? Link.parse_str(pan_urlValue)['resid'] : Link.parse_str(pan_urlValue)['id'];
        // var onedriveExt = Link.isUndefined(Link.parse_str(pan_urlValue)['ithint']) ? '' : '.' + Link.parse_str(pan_urlValue)['ithint'].replace(/%2c/i, ',').split(',')[1];
        // var onedriveID_ext = onedriveID + '?HHTjim.Com' + onedriveExt;
        // var baiduYyr = Link.isUndefined(Link.parse_str(pan_urlValue)['play_song']) ? Link.parse_str(pan_urlValue)['goto'] : Link.parse_str(pan_urlValue)['play_song'].replace(/%2c/i, ',').split(',')[0];
        // var baiduYyr = Link.isUndefined(baiduYyr) ? Link.parse_str(pan_urlValue)['buy'] : baiduYyr;
        // var baiduYyr = Link.isUndefined(baiduYyr) ? su[0] : baiduYyr;
        // var reg = /^.*(vsochina\.com)|(imusic\.cn)|(ximalaya\.com)|(qing\.wps\.cn)|(mp3\.sogou\.com)|(app-echo\.com)|(note\.youdao\.com)|(suning\.com)|(kanbox\.com)|(douban\.com)|((music|y)\.qq\.com)|(music\.haosou\.com)|(onedrive\.live\.com)|(kugoo:\/\/\|Music\|.*\|\d+\|\w+\|\/?)|(letv\.com)|(118100\.cn)|(music\.so\.com)|(10155\.com)|(migu\.cn)|(rayfile\.com)|(duomi\.com)|(dongting\.com)|(duole\.com)|(kugou\.com)|(dbank\.com)|(vmall\.com)|(yinyuetai\.com)|(baidu\.com)|(songtaste\.com)|(1ting\.com)|(weibo\.com)|(kuaipan\.cn)|(weiyun\.com)|(yunpan\.cn)|(kuwo\.cn)|(music\.sina\.com\.cn)|(music\.163\.com)|(xiami\.com).*$/;
        // var nopost_reg = /^.*(weibo.com\/p\/\d+)|(vsochina\.com)|(imusic\.cn)|(ximalaya\.com)|(qing\.wps\.cn)|(mp3\.sogou\.com)|(app-echo\.com)|(music\.douban\.com\/programme\/\d+\?sid=\d+)|(y\.qq\.com\/#type=song&mid=\w+|music\.qq\.com\/fcgi-bin\/fcg_yqq_song_detail_info\.fcg)|(music\.haosou\.com)|(music\.weibo\.com\/(snake|t)\/(i\/\d+\.html|(snk_song|boke_program)\.php\?(songid|pid)=\d+))|(y\.baidu\.com)|(onedrive\.live\.com)|(kugoo:\/\/\|Music\|.*\|\d+\|\w+\|\/?)|(118100\.cn)|(music\.so\.com)|(10155\.com)|(migu\.cn)|(duomi\.com)|(music\.baidu\.com)|(dongting\.com)|(duole\.com)|(kugou\.com)|(yinyuetai\.com)|(songtaste\.com)|(1ting\.com)|(kuwo\.cn)|(music\.sina\.com\.cn)|(music\.163\.com)|(xiami\.com\/song\/)|(i\.xiami\.com\/[a-zA-Z0-9_\-]+\/demo\/\d+).*$/;
        //
        // var zm = pan_urlValue.match(/\w+/g);
        // var sumu = document.getElementsByName("url").length;
        // //var clbutton = "    <input  type=\"button\" onclick=\"cl()\" class=\"btn btn-default btn-xs\" value=\"清空\" />";
        // var clbutton = '&nbsp;&nbsp;<a onclick="cl()" class="btn  btn-default btn-xs" href="javascript:void(0)"> <i class="icon-repeat"></i> 清空</a>';
        $('#tijiao').click(function (event) {
            // this.getUrl();
            getNewLink();
        });
    },
    getUrl: function () {

    },

}
