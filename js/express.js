$(function() {
	//总页数
	var pageNum;
	//默认渲染第一页
	$.ajax({
		type: "post",
		url: "interface/case.php",
		async: false,
		data: {
			"value": "1"
		},
		dataType: "json",
		success: function(data) {
			pageNum = data.page;
			$(".count").text(pageNum);
			renderHtml(data, 0);
		},
		error: function(err) {
			alert("错误信息：" + err.status);
		}
	});
	//渲染页面
	function renderHtml(data, data_id) {
		var html = "";
		for(var i = 0; i < data.list.length; i++) {
			dataId = data_id + i + 1;
			html = '<a href="case-details/' + dataId + '.html" class="case-list-a" data-id=' + dataId + ' >';
			html += '<p class="case-type">' + data.list[i].type + '<i>' + data.list[i].time + '</i></p>';
			html += '<h3 class="case-title nowrap">' + data.list[i].title + '</h3>';
			html += '<p class="case-introduce line2">' + data.list[i].introduce + '</p>';
			html += '</a>';
			$("#case-list").append(html);
		};
	};
	//分页函数
	$('.M-box').pagination({
		pageCount: pageNum, //设置总页数
		callback: function(api) {
			$('.now').text(api.getCurrent()); //显示当前页码
			var pageIndex = api.getCurrent(); //获取当前页码
			$.ajax({
				type: "post",
				url: "interface/case.php",
				async: true,
				data: {
					"value": pageIndex
				},
				dataType: "json",
				success: function(data) {
					var attr_id = parseInt($(".case-list-a:last-child").attr("data-id"));
					$("#case-list").html("");
					renderHtml(data, attr_id);
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