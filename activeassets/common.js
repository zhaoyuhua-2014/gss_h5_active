//请求地址公用 获取tokenId公用
var common={
	//http:"http://app.guoss.cn/gss_api/server/api.do", // 正式
	http:"http://testapp.guoss.cn/gssapi/server/api.do", // 正式
	//http:"http://app.guoss.cn/gss_api/server/api.do", // 正式
	pageSize:'10',//请求商品每页的个数
	pageNo:'1',
	isalert:0,//自动登录时是否弹出异常信息
	isColl:'-1',//判断是否收藏  默认为-1
	isTrue:true,
	phoneNumberReg:/^(1)\d{10}$/,//判断手机号的正则表达式
	stopEventBubble:function (event){
		var e=event || window.event;
		if (e && e.stopPropagation){
			return e.stopPropagation();
		}
		else{
			return e.cancelBubble=true;
		}
	},
	appid:{
		"3301":"wx4e26ee7446c5aa37", // 正式
		"3201":'wx6a8d195d6acf1614',
		"3302":'wx8cc1a343dd5c87ac',
	},
	websitData:{
		"3201":"南京站",
		"3301":"杭州站",
		'3302':'宁波站'
	},
	httpData:{
		"3301":"http://wxhz.guoss.cn/html/login.html", // 正式
		"3201":"http://wxnj.guoss.cn/html/login.html",
		"3302":"http://wxnb.guoss.cn/html/login.html"
	},
	jumpwx:function(callbackUrl){
		window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+common.appid[common.websiteNode]+"&redirect_uri="+callbackUrl+"&response_type=code&scope=snsapi_userinfo&state=gss&connect_redirect=1#wechat_redirect"
	},
	back:function(){
		if (common.websiteNode == "3301") {
			return "http://wxhz.guoss.cn/html/login.html"
		}else if(common.websiteNode =="3201") {
			return "http://wxnj.guoss.cn/html/login.html"
		}else if(common.websiteNode == "3302") {
			return "http://wxnb.guoss.cn/html/login.html"
		}
	},
	jump:function(url){
		if ((url == "html/login.html" || url == "login.html") && common.isWeiXin() && !localStorage.getItem("openid")) {
			window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+common.appid[common.websiteNode]+"&redirect_uri="+common.httpData[common.websiteNode]+"&response_type=code&scope=snsapi_userinfo&state=gss&connect_redirect=1#wechat_redirect"
		}else{
			if (url.indexOf("?") > 1) {
				window.location.href = url+"&v=1009";
			}else{
				window.location.href = url+"?v=1009";
			}
			
		}
	},
	getUrlParam:function  ( mid ) {
        var reg = new RegExp("(^|&)" + mid + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) 
        	return decodeURIComponent(r[2]); 
        return null;
   	},
	isPc:function(){//检测运行环境 1-移动设备 2-pc设备
		var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            return 1;
        } else {
            return 2;
        }
	},
	// 判断是否为移动设备
	isPhone : function(){
		var 
		ua = navigator.userAgent.toLowerCase(),
        bIsIpad = ua.match(/ipad/i) == "ipad",
        bIsIphoneOs = ua.match(/iphone os/i) == "iphone os",
        bIsMidp = ua.match(/midp/i) == "midp",
        bIsUc7 = ua.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
        bIsUc = ua.match(/ucweb/i) == "ucweb",
        bIsAndroid = ua.match(/android/i) == "android",
        bIsCE = ua.match(/windows ce/i) == "windows ce",
        bIsWM = ua.match(/windows mobile/i) == "windows mobile";

	    return bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM;
	},
	isMobile:function(){//检测运行环境 android/ios
		var sUserAgent = navigator.userAgent.toLowerCase();
        var Android = sUserAgent.match(/Android/i) ? true : false;
        var Ios = sUserAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        if (Android) {
            return 1;
        } else if(Ios) {
            return 2;
        }else{
        	return -1;
        }
	},
	isAndroid : function(){
		var sUserAgent = navigator.userAgent.toLowerCase();
		return sUserAgent.match(/Android/i) ? true : false;
	},
	// 苹果
	isApple : function(){
		var sUserAgent = navigator.userAgent.toLowerCase();
		return sUserAgent.match(/iphone os/i) ? true : false;
	},
	// 判断环境是否为微信
	isWeiXin : function(){
		return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';
	},
	// APP
	isApp : function(){
		var 
		ua = navigator.userAgent.toLowerCase();
		return ua.match(/gss_app/i) == 'gss_app';
	},
	
	callback:function(obj){
		if(typeof obj == "undefined"){
			window.history.go(-1);
		}else if(typeof obj == "object"){
			obj.on('click',function(){
				window.history.go(-1);
			})	
		}
	},
	tokenId:function(){
		return localStorage.getItem("tokenId");
	},
	secretKey:function(){
		return localStorage.getItem('secretKey');
	},
	user_data:function(data){
		if (localStorage.getItem('user_data')) {
			return user_data={
				cuserInfoid:JSON.parse(localStorage.getItem('user_data')).cuserInfoid,
				firmInfoid:JSON.parse(localStorage.getItem('user_data')).firmInfoid,
				firmName:JSON.parse(localStorage.getItem('user_data')).firmName,
				linkTel:JSON.parse(localStorage.getItem('user_data')).linkTel,
				score:JSON.parse(localStorage.getItem('user_data')).score,
				next:JSON.parse(localStorage.getItem('user_data')).next,
				userGrade:JSON.parse(localStorage.getItem('user_data')).userGrade,
				websiteNode:JSON.parse(localStorage.getItem('user_data')).websiteNode,
				faceImgUrl:JSON.parse(localStorage.getItem('user_data')).faceImgUrl,
				websiteNodeName:JSON.parse(localStorage.getItem('user_data')).websiteNodeName
			}
		}else{
			return 0;
		}
		
	},
	prompt:function(str){
		var ele=document.createElement('div');
		ele.className='prompt';
		document.body.appendChild(ele)
		$('.prompt').html(str);
		$('.prompt').css({'left':'50%'});
		$('.prompt').css("margin-left",-(($('.prompt').width())/2)+'px');
		setTimeout(function(){
			$('.prompt').css("margin-left",-($('.prompt').width()/2 + 20)+'px');
		},10)
		$('.prompt').show().animate({
			'bottom':'100'
		},300)
		setTimeout(function(){
			$('.prompt').remove()
		},2000)
	},
	fadeIn : function( el, t, fn ){
		el = el || 'body';
		t = t || 300;
		fn = typeof fn === 'function' ? fn : undefined;
		$( el ).fadeIn( t, fn );
	},
	createPopup	: function(opt) {
        var obj = this,
        	flag = opt.flag,
        	stopMove = opt.stopMove,
        	msg = opt.msg,
        	noCoverEvent = opt.noCoverEvent,
        	stopMoveFun = function(e) {
	            e.preventDefault();
	        },
	        btnClose = false,
	        btnConfirm = false,
	        btnCancel = false,
	        btnEvent = function() {
            	obj.setDelayTime();
            	$('#modAlertDiv,#modAlertMask').hide().removeClass(' mod_alert_info show fixed');
        	};
        if (!$('#modAlertDiv').length) {
            $('body').append('<div id="modAlertDiv" class="mod_alert" style="display: none;"></div><div id="modAlertMask" class="mod_alert_mask" style="display: none;"></div>');
        }
        var $el = $('#modAlertDiv')
          , $cover = $('#modAlertMask');
        switch (flag) {
        case 1:
            $el.html('<i class="icon"></i><p>您还没关注京东服务号，<br>关注后才可以收到微信提醒噢~</p><div class="follow"><img src="' + JD.img.getImgUrl('//img11.360buyimg.com/jdphoto/s280x280_jfs/t3469/354/312631197/5626/21e9275b/5806d31eN2884548b.png', 180, 180) + '" alt="京东二维码"><p class="text">长按二维码关注</p></div>');
            break;
        case 2:
            $el.addClass('mod_alert_info');
            $el.html('<span class="close"></span><h3 class="title">' + opt.title + '</h3><div class="inner">' + opt.msg + '</div>');
            btnClose = 'span.close';
            break;
        case 3:
            if (opt.isNeedInfo)
                $el.addClass('mod_alert_info');
            $el.html('<p>' + msg + '</p><p class="btns"><a href="javascript:void(0);" class="btn btn_1">' + (opt.btnTxt || '知道了') + '</a></p>');
            btnConfirm = 'p.btns';
            break;
        case 4:
            $el.html((opt.icon != 'none' ? ('<i class="icon' + (opt.icon != 'info' ? (' icon_' + opt.icon) : '') + '"></i>') : '') + '<p>' + msg + '</p><p class="btns"><a href="javascript:;" class="btn btn_2">' + opt.cancelText + '</a><a href="javascript:;" class="btn btn_1">' + opt.okText + '</a></p>');
            btnConfirm = 'a.btn_1';
            btnCancel = 'a.btn_2';
            break;
        case 5:
            msg = '<i class="icon"></i><p>' + msg + '</p><div class="verify_input"><input class="input" type="text" id="verifyInput"><span class="wrap"><img src="' + (obj.priceVerify.img || '//fpoimg.com/75x30') + '" alt="点击刷新" id="verifyCodeImg"></span></div><p class="warn_text" id="warnTip">验证码错误，请重新输入</p>';
            $el.html(msg + '<p class="btns"><a href="javascript:void(0);" class="btn btn_1">提交</a></p>');
            break;
        case 6:
            $el.html('<span class="close"></span><i class="icon"></i><p>' + msg + '</p><p class="small">' + opt.small + '</p><p class="btns">' + '<a href="javascript:void(0);" class="btn" style="background: #e4393c;color: #fff">' + opt.btnTxt + '</a></p>');
            btnClose = 'span.close';
            btnConfirm = 'p.btns';
            break;
        case 7:
            $el.addClass('mod_alert_info');
            $el.html('<span class="close"></span><h3 class="title">手机号码登录</h3><div class="verify_inputs"><div class="verify_input"><input class="input" type="tel" mark="phonenum" placeholder="请输入手机号" maxlength="11"></div><div class="verify_input"><input class="input" mark="imgcode" type="text" placeholder="请输入图形码"><span class="wrap" mark="genimgcode"><img mark="img"/></span></div><div class="verify_input"><input class="input" mark="msgcode" type="text" placeholder="请输入验证码"><div class="verify_input_btn" mark="sendcode">发送验证码</div><div class="verify_input_btn type_disabled" style="display:none;"><span mark="sendcodesed"></span>后重发</div></div></div><p class="warn_text" style="display:none;" mark="errtips"></p><p class="btns"><a href="javascript:" class="btn btn_1">登录</a></p>');
            btnClose = 'span.close';
            btnConfirm = 'p.btns';
            break;
        case 8:
            $el.addClass('mod_alert_info');
            $el.html('<span class="close"></span><h3 class="title">历史收货人校验</h3><p class="alignLeft">您已有京东账号，为了保障账号安全，需要对您历史已完成订单的收货人信息进行校验（任意一个即可）</p><div class="verify_input type_no_padding"><input class="input" mark="shname" type="text" placeholder="历史完成订单的收货人姓名"></div><p class="warn_text" style="display:none;" mark="errtips"></p><p class="btns"><a href="javascript:" class="btn btn_1">完成校验去结算</a></p>');
            btnClose = 'span.close';
            btnConfirm = 'p.btns';
            break;
        }
        setTimeout(function() {
            $el.show().addClass('show fixed');
            $cover.show().addClass('show fixed');
            
        }, obj.isAndroid() ? 100 : 400);
        
        $el.off();
        if (btnClose) {
            $el.on('click', btnClose, function(e) {
                btnEvent();
                opt.onClose && opt.onClose();
            });
        }
        if (btnConfirm) {
            $el.on('click', btnConfirm, function() {
                var keep = false;
                if (opt.onConfirm) {
                    keep = !!opt.onConfirm();
                }
                if (keep)
                    return;
                btnEvent();
            });
        }
        if (btnCancel) {
            $el.on('click', btnCancel, function() {
                btnEvent();
                opt.onCancel && opt.onCancel();
            });
        }
        if (!noCoverEvent) {
            $cover.off().on('click', function() {
                btnEvent();
                opt.onClose && opt.onClose();
            });
        }
        console.log(new Date())
    },
    /*--------------尝试将所有的APP端交互统一处理---------------*/
	jsInteractiveApp : function(opt){
		var _this = this,
			name = opt.name,
			parameter = opt.parameter;
		var info = {};
			info.name = name;
		try{
			if (common.isApple()) {
				info.eq = 'ios';
			}
			if (common.isAndroid()) {
				info.eq = "android";
			}
			
			if (common.isApp()) {
				switch (name){
					//返回
					case 'gss_goBack':
						common.isApple() ? window.webkit.messageHandlers.gss_goBack.postMessage('') : android.gss_goBack();
						break;
					//返回
					case 'gss_goHome':
						common.isApple() ? window.webkit.messageHandlers.gss_goHome.postMessage('') : android.gss_goHome();
						break;
					//返回
					case 'gss_jumpCoupon':
						common.isApple() ? window.webkit.messageHandlers.gss_jumpCoupon.postMessage('') : android.gss_jumpCoupon();
						break;
					default:
						break;
				}
			}else{
				info.msg = "this is not gss_app" 
			}
			
		}catch(e){
			console.warn(info)
		}finally{
			console.log(JSON.stringify(info))
			console.log(JSON.stringify(opt))
		}
		
	},
	setDelayTime : function() {
        window.holdAction = true;
        setTimeout(function() {
            window.holdAction = false;
        }, 400);
    },
}
// 全局设置ajax请求
$.ajaxSetup({
	url: common.http,
	type: 'POST',
	dataType: 'jsonp'
});
// 统一接口处理函数
common.ajaxPost = function(data, done, fail){
	done = typeof done !== 'function' ? function( d ){} : done;
	fail = typeof fail !== 'function' ? function( d ){common.prompt(d.statusStr);} : fail;
	$.ajax({
		data : data,
		success : done,
		error : fail
	});
};
(function(){
	var div = $("<h5 class='networkError'>您的网络好像不太给力</h5>");
	
	window.addEventListener('online',  function(){
		$(".networkError").length && $("body").find(".networkError").remove()
	});
	window.addEventListener('offline', function(){
		if ($(".networkError").length == 0) {
			$("body").append(div)
		}
	});
})()