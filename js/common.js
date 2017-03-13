$(function() {
	//导航条跟随滑块效果
	var m = $(".nav"); //一般只需修改这儿的ID
	var mc = m.find(".start"); //获取需要高亮的对象
	var ml = mc.position().left; //高亮对象相对父级元素的左边距
	var mw = mc.outerWidth(); //获取高亮对象的宽度
	m.append("<li class='slide' style='left:" + ml + "px;width:" + mw + "px'></li>"); //追加滑动样式的html代码，并设定宽度和左边距
	var ms = m.find(".slide"); //获取滑动对象
	m.find("li").hover(function() { //此导航下li鼠标移上去的事件
		var li_le = $(this).position().left; //此子项相对父级元素的左边距
		var li_wid = $(this).outerWidth(); //此子项的宽度
		ms.animate({
			left: li_le,
			width: li_wid
		}, {
			queue: false,
			duration: 300
		});
		$(this).addClass("cur").siblings().removeClass("cur");
	}, function() { //鼠标移开事件
		ms.animate({
			left: ml,
			width: mw
		}, {
			queue: false,
			duration: 300
		}); //滑回
		$(".start").addClass("cur").siblings().removeClass("cur");
	});

	//设置banner全屏
	var win_w = $(window).width();
	var win_h = $(window).height();
	$(".banner").css({
		"width": win_w,
		"height": win_h
	});

	//设置遮罩
	$(".case-express-layer").mouseover(function() {
		$(".case-express-mask").stop().animate({
			opacity: ".6"
		}, 500);
	}).mouseout(function() {
		$(".case-express-mask").stop().animate({
			opacity: ".4"
		}, 500);
	});
});