$(function(){
	// search in navigator
	(function(){
		$('#header .contWidth .search').children()
			.focus(function(event) {
				if ($(this).val() === '输入商品名称') {
					$(this).val('');
				}	
			}).blur(function(event) {
				if ($(this).val() === '') {
					$(this).val('输入商品名称');
				}
			});
	})();

	//change skin & store by cookie
	(function(){
		var skin_name = 'skinName';
		if ($.cookie(skin_name)) {			
			var idStore = $.cookie(skin_name);
			$('#'+idStore).addClass('selected')
				.siblings().removeClass('selected');
			$('#cssfile').attr('href', 'styles/skin/'+idStore+'.css');
		}
		$('#skin').find('li').on('click', function(event) {
			$(this).addClass('selected')
				.siblings().removeClass('selected');
			var curId = $(this).attr('id');
			$('#cssfile').attr('href', 'styles/skin/'+curId+'.css');
			$.cookie(skin_name, null, {path:'/'});
			$.cookie(skin_name, curId,{
				path:'/',
				expires: 10
			});
		});
	})();

	//nav
	(function(){
		var $liHover = $('#nav').find('.nav li a').not(':first, :last');
		$liHover.hover(function() {
			$(this).next().css('display', 'block');
		}, function() {
			$(this).next().css('display', 'none');
		});
	})();

	//left side adds hot effect
	$('#jnCatalog .promoted').append('<span class="hot"></span>');

	//ads slider
	(function(){
		var $scrolllist = $('#jnImageroll').find('div a');
		var len = $scrolllist.length;
		var index = 0;
		var timer = null;
		//when mouseover a list execute function imgshow
		//and firstly loaded show the first image
		$scrolllist.mouseover(function(event) {
			index = $scrolllist.index(this);
			showimage(index);
		}).eq(0).trigger('mouseover');


		//let the ads automotacally shows
		$('#jnImageroll').hover(function() {
			if (timer) {clearInterval(timer)}
		}, function() {
			timer = setInterval(function(){
				showimage(index);
				index++;
				if (index === len) {index = 0;}
			}, 3000);
		}).trigger('mouseleave')

		//function imgshow
		function showimage(index){
			var $imgs = $('#JS_imgWrap').find('img');
			var href = $scrolllist.eq(index).attr('href');
			$('#JS_imgWrap').attr('href', href);
			$imgs.eq(index).stop(true, true).fadeIn()
				.siblings().fadeOut();
			$scrolllist.eq(index).stop(true, true).addClass('chos')
				.siblings().removeClass('chos');
		}
	})();
    
    //immediately display the title and prevent the default display
	(function(){
		var x = 10,
			y = 20;
		$('#jnNoticeInfo ul a').mouseover(function(event) {
			this.myTitle = this.title;
			this.title = '';
			var showMsg = '<div id="tooltip">'+this.myTitle+'</div>';
			$('body').append(showMsg);
			$('#tooltip').css({
				left: (event.pageX+x) + 'px',
				top: (event.pageY+y) + 'px'
				}).show('fast');//原先我用的fadeIn('fast'),因为要立即显示不合适
		}).mouseout(function(event) {
			this.title = this.myTitle;
			// this.myTitle = '';
			// $('#tooltip').hide('fast');//result in the same title
			$('#tooltip').remove();
		}).mousemove(function(event) {
			$('#tooltip').css({
				left: (event.pageX+x) + 'px',
				top: (event.pageY+y) + 'px'
			});
		});
	})();
	
	//image slide
	(function(){
		var $tab = $('#jnBrandTab').find('li a');
		$tab.click(function(event) {
			var index = $tab.index(this);
			$(this).parent().addClass('chos')
				.siblings().removeClass('chos');
			scrollImage(index);
			return false;
		}).eq(0).click();
		//封装滚动图片函数
		function scrollImage(index){
			var scrollWidth = $('#jnBrandList').find('li').outerWidth();
			scrollWidth = scrollWidth*4;
			$('#jnBrandList').stop(true,false).animate({left: -scrollWidth*index}, 1000)
		}

		//add zoom effect
		$('#jnBrandList li').each(function(index, el) {
			var $width = $(this).find('img').width();
			var $height = $(this).find('img').height();
			var imgMask = '<div class="imageMask" style="width:'+$width+'px;height:'+$height+'px;"></div>';
			$(this).append(imgMask);
		});
		// $('#jnBrandList li').hover(function(){
		// 	$(this).find('.imageMask').toggleClass('imageOver');
		// });
		$('#jnBrandList li').on('mouseenter mouseleave', '.imageMask', function(event) {
			$(this).toggleClass('imageOver');
		});
	})();

	//侧边栏导航
	(function () {
        $(window).scroll(function () {
            var menu = $("#menu");
            var items = $("#menu-content").find(".item");
            var docTop = $(document).scrollTop();
            var firTop = items.eq(0).offset().top;
            if (docTop < firTop-200) {
            	menu.css("display","none");
            	return false;
            }else{
            	menu.css("display","block");
            	var currentId = ""; //滚动条现在所在位置的item id
            	items.each(function () {
	                var m = $(this);
	                // console.log(m.offset().top);
	                //m.offset().top代表每一个item的顶部位置
	                if (docTop > m.offset().top - 200) {
	                    currentId = "#" + m.attr("id");
	                } else {
	                    return false;
	                }
            	});

	            var currentLink = menu.find(".current");
	            if (currentId && currentLink.attr("href") != currentId) {
	                currentLink.removeClass("current");
	                menu.find("[href='" + currentId + "']").addClass("current");
	            }
            }
            
        });
    })();

});