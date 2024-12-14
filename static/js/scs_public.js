// JavaScript Document
$(function(){
		//设置左侧最小高度
		function minHeight(){
			var leftHeight=$('.leftPart').height();
			var rightHeight=$('.rightPart').height();
			if(leftHeight<rightHeight){
				$('.leftPart').height(rightHeight);
			}
		};
		minHeight();
		
		//面包屑第一个加粗
		function breadcrumbNav(){
			$('.BreadcrumbNav a:first').css('font-weight','bold');
		};
		breadcrumbNav()
		
		//tab标题第一个没有左内距离
		function channelTab(){
			$('div.channel_tab2 span:first').css('padding-left','0px');
		};
		channelTab()
		
		//常务院列表下划线最后一个去掉
		function cwhybox2(){
			$('.cwhybox2 ul li:last').css('border-bottom','none');
		};
		cwhybox2()
})