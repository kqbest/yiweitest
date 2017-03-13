//返回顶部
(function() {
	var back = $('<div id="backTop" title="回到顶部"></div>');
	$("body").append(back);
	var backTop = $("#backTop");
	backTop.css({
		"position": "fixed",
		"left": "50%",
		"margin-left": "600px",
		"bottom": "50px",
		"width": "36px",
		"height": "65px",
		"background-image": "url(../img/Top.png)",
		"background-repeat": "no-repeat",
		"cursor": "pointer",
		"z-index": "100",
		"display": "none"
	});
	$(window).scroll(function() {
		var scTop = $(window).scrollTop();
		var winH = $(window).height();
		if(scTop > winH) {
			backTop.fadeIn();
		} else {
			backTop.fadeOut();
		}
	});
	backTop.hover(function() {
		$(this).css("background-position", "0 -65px");
	}, function() {
		$(this).css("background-position", "0 0");
	});
	backTop.click(function() {
		$("html,body").animate({
			scrollTop: 0
		}, 1000);
		return false;
	});
})();