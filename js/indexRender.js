//首页banner
$.ajax({
	type: "get",
	url: "interface/banner-list.php",
	async: false,
	dataType: "json",
	success: function(data) {
		renderHtml_banner(data);
	},
	error: function(err) {
		alert("错误信息：" + err.status);
	}
});
//首页招聘
$.ajax({
	type: "get",
	url: "interface/zhaopin.php",
	async: true,
	dataType: "json",
	success: function(data) {
		renderHtml_job(data);
	},
	error: function(err) {
		alert("错误信息：" + err.status);
	}
});
//首页影片监测
$.ajax({
	type: "get",
	url: "interface/movie-list.php",
	async: true,
	dataType: "json",
	success: function(data) {
		renderHtml_movie(data);
	},
	error: function(err) {
		alert("错误信息：" + err.status);
	}
});
//渲染首页banner
function renderHtml_banner(data) {
	var html = "";
	for(var i = 0; i < data.list.length; i++) {
		html = '<li>';
		html += '<a href="javascript:;">';
		html += '<img src="img/banner' + data.list[i].img + '.png" alt="banner" />';
		html += '<div class="banner-title">';
		html += '<h1>' + data.list[i].title + '</h1>';
		html += '<p>' + data.list[i].instructions + '</p>';
		html += '</div></a></li>';
		$("#banner_ul").append(html);
	};
};
//渲染首页招聘
function renderHtml_job(data) {
	var html = "";
	for(var i = 0; i < data.list.length; i++) {
		html = '<li class="news-right-list">';
		html += '<a href="jionUs.html">';
		html += '<b class="news-right-time">' + data.list[i].time + '</b>' + data.list[i].title;
		html += '</a></li>';
		$("#zhaopin_ul").append(html);
	};
};
//渲染首页movie
function renderHtml_movie(data) {
	var html = "";
	for(var i = 0; i < data.list.length; i++) {
		html = '<div class="movie-list">';
		html += '<img src="img/movie-img' + data.list[i].img + '.png" alt="" />';
		html += '<div class="movie-mask"></div>';
		html += '<p class="movie-introduce">' + data.list[i].instructions + '</p>';
		html += '</div>';
		$(".movie").append(html);
	};
	$(".movie-list:nth-child(1)").addClass("movie-list-first");
	$(".movie-list:nth-child(2)").addClass("movie-list-second");
	$(".movie-list:nth-child(3)").addClass("movie-list-second");
	$(".movie-list:nth-child(4)").addClass("movie-list-third");
	$(".movie-list:nth-child(5)").addClass("movie-list-third");
	$(".movie-list:nth-child(6)").addClass("movie-list-third");
	$(".movie-list:nth-child(7)").addClass("movie-list-third");
};