$(function() {
	//默认渲染
	$.ajax({
		type: "get",
		url: "interface/dongtai.php",
		async: false,
		dataType: "json",
		success: function(data) {
			var html = "";
			var dataId = 0;
			for(var i = 0; i < data.list.length; i++) {
				dataId = i + 4;
				html = '<a href="dynamic-details/' + dataId + '.html" class="dynamic-list-a" data-id="' + dataId + '">';
				html += '<img src="img/dynamic-list_img' + data.list[i].img + '.png" alt="" />';
				html += '<p class="dynamic-list-title nowrap">' + data.list[i].title + '</p>';
				html += '<div class="movie-mask"></div>';
				html += '<div class="dynamic-layer">';
				html += '<p>查看</p></div></a>';
				$("#dynamic-list").append(html);
			};
		},
		error: function(err) {
			alert("错误信息：" + err.status);
		}
	});
	//加载更多
	$("#dynamic-more").click(function() {
		var offset = $(".dynamic-list-a:last").attr("data-id");
		$.ajax({
			type: "post",
			url: "interface/dongtai.php",
			async: false,
			//						data {
			//							"offset": offset
			//						},
			dataType: "json",
			success: function(data) {
				var html = "";
				var dataId = 0;
				for(var i = 0; i < data.list.length; i++) {
					dataId = parseInt(offset) + i + 1;
					html = '<a href="dynamic-details/' + dataId + '.html" class="dynamic-list-a" data-id="' + dataId + '">';
					html += '<img src="img/dynamic-list_img' + data.list[i].img + '.png" alt="" />';
					html += '<p class="dynamic-list-title nowrap">' + data.list[i].title + '</p>';
					html += '<div class="movie-mask"></div>';
					html += '<div class="dynamic-layer">';
					html += '<p>查看</p></div></a>';
					$("#dynamic-list").append(html);
				};
			},
			error: function(err) {
				alert("错误信息：" + err.status);
			}
		});
		//兼容ie8
		$(".dynamic-list-a:nth-child(4n)").css("marginRight", "0");
	});
});