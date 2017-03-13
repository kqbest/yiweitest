$(function() {
	//总页数
	var pageN;
	//默认渲染第一页
	$.ajax({
		type: "post",
		url: "interface/jionUs.php",
		async: false,
		data: {
			"value": "1"
		},
		dataType: "json",
		success: function(data) {
			pageN = data.page;
			$(".count").text(pageN);
			renderHtml(data);
		},
		error: function(err) {
			alert("错误信息：" + err.status);
		}
	});
	//渲染页面
	function renderHtml(data) {
		var html = "";
		for(var i = 0; i < data.job.length; i++) {
			html = '<tr>';
			html += '<td>' + data.job[i].name + '</td><td>' + data.job[i].school + '</td><td>' + data.job[i].num + '</td><td>' + data.job[i].time + '</td>';
			html += '<td><a href="javascript:;" class="detailsBtn" data-id=' + i + '>点击查看</a>';
			html += '<div class="joinUs-details"><div class="back">&Chi;</div><div class="wrapper">';
			html += '<h2 class="recruitment-title">' + data.job[i].name + '</h2>';
			html += '<ul class="recruitment-info clearfix">';
			html += '<li>职位薪资：' + data.job[i].salary + '元/月</li><li>工作地点：杭州-西湖区</li><li>发布日期：' + data.job[i].time + '</li><li>工作性质：' + data.job[i].type + '</li>';
			html += '<li>工作经验：' + data.job[i].experience + '</li><li>最低学历：' + data.job[i].school + '</li><li>招聘人数：' + data.job[i].num + '人</li><li>部门：' + data.job[i].department + '</li></ul>';
			html += '<div class="recruitment-responsibility">';
			html += '<h3>一、岗位职责：</h3><ol>';
			//岗位职责
			for(var j = 0; j < data.job[i].list1.length; j++) {
				html += '<li>' + data.job[i].list1[j].li + '</li>';
			}
			html += '</ol></div>';
			html += '<div class="recruitment-responsibility"><h3>二、岗位要求：</h3><ol>';
			//岗位要求
			for(var j = 0; j < data.job[i].list2.length; j++) {
				html += '<li>' + data.job[i].list2[j].li + '</li>';
			}
			html += '</ol></div>'
			html += '<div class="recruitment-responsibility"><h3>工作地址：</h3><p>杭州市西湖区文一西路767号西溪国际商务中心A座302-305</p></div></div></div></td></tr>';
			$("#joinUs-table tbody").append(html);
		};
	};
	//详情弹出框
	$("body").on("click", ".detailsBtn", function() {
		$(this).siblings(".joinUs-details").fadeIn(600).parents("html,body").css({
			overflowY: "hidden",
			paddingRight: "8.5px"
		});
		$(".nav").css("padding-right", "17px");
	});
	//返回透明度
	$("body").on("mouseover", ".back", function() {
		$(this).stop().animate({
			opacity: "0.7"
		}, 400);
	});
	$("body").on("mouseout", ".back", function() {
		$(this).stop().animate({
			opacity: "1"
		}, 400);
	});
	//点击关闭遮罩层
	$("body").on("click", ".back", function() {
		$(".joinUs-details").fadeOut();
		$(".detailsBtn").parents("html,body").css({
			overflowY: "auto",
			paddingRight: "0"
		});
		$(".nav").css("padding-right", "0");
	});
	//分页函数
	$('.M-box').pagination({
		pageCount: pageN, //设置总页数
		callback: function(api) {
			$('.now').text(api.getCurrent()); //显示当前页码
			var pageIndex = api.getCurrent(); //获取当前页码
			$.ajax({
				type: "post",
				url: "interface/jionUs.php",
				async: true,
				data: {
					"value": pageIndex
				},
				dataType: "json",
				success: function(data) {
					$("#joinUs-table tbody").html("");
					renderHtml(data);
				},
				error: function(err) {
					alert("错误信息：" + err.status);
				}
			});
		}
	}, function(api) {
		$('.now').text(api.getCurrent());
	});
});