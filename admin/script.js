/* global $ */
var color = 'line_blue';//全局变量,获取后台页面里面的颜色class，将它的值赋给localStorage里面的value,实现信息共享
/**
 * 后台页面报表选择按钮触发函数
 * 实现将颜色保存到localStorage
 * @param obj
 */
function myFunction(obj){
    var storage = window.localStorage;
    storage[obj] = color;
    // console.log('myfunction');
    // console.log(obj);
    // console.log(color);

    // 监听点击事件是否触发，为变量赋值

}

/**
 * 自动触发后台管理页面
 */
// $(window).load(function() {
$(window).on('load',function () {
	preloadImagesForCarousel();
	
	// $(".carousel").on("aCarouselHasBeenAdjusted", function() {
		sizeChoosing();
		chooseColor();
		adjustIndexesOfCarousel();
	// });
	
	// adjustAllCarousels();
});

function sizeChoosing() {
	$(".size .options").hide();
	
	$(".carousel").off("click").on("click", ".size", function() {
		$(this).clearQueue();
		
		if ($(this).hasClass("shown"))
		{
			$(this).clearQueue().removeClass("shown").find(".options").slideUp(800);
		}
		else
		{
			$(this).clearQueue().addClass("shown").find(".options").slideDown(800);
			console.log(option);
		}
	});
	
	$(".carousel").on("click", ".option", function() {
		$(this).closest(".size").find(".header .number").html($(this).text());
	});
}

/**
 * 调用chooseColor函数通过返回拼接的路径来实现同一文件夹下的图片切换
 */
function chooseColor() {
	$(".carousel").on("click", ".choose-color div", function() {
		// alert("xxxxx")
		color = $(this).attr("class");
	    // alert(color);
        // console.log(color);
		var img_path =findPathToDirectory($(this).closest(".flex-item").find(".good-image img").attr("src"))+$(this).attr("class")+ ".png";
		$(this).closest(".flex-item").find(".good-image img").stop().fadeTo("slow", 0, function() {
			$(this).attr("src", img_path);
		}).fadeTo("slow", 1);
	});
}

/**
 * 通过查找返回文件路径
 * @param path_to_file
 * @returns {*}
 */
function findPathToDirectory(path_to_file) {
	return path_to_file.slice(0, path_to_file.lastIndexOf("/") + 1);
}

function adjustIndexesOfCarousel() {
	$(".carousel").each(function() {
		setupIndexesOfCarousel($(this));
	});
	$(".carousel").on("slid.bs.carousel", function() {
		setupIndexesOfCarousel($(this));
	});
}

function setupIndexesOfCarousel(carousel) {
	var total_number = $(carousel).find(".item").length;
	var current_number = $(carousel).find(".item.active").index() + 1;
	//alert(total_number)
	//alert(current_number)
	console.log(current_number)
	$(carousel).find(".index").text(String(current_number) + " / " + String(total_number));
}

function preloadImages(images) { 
  for (var i = 0; i < images.length; i++) {
    $("<img />").attr("src", images[i]);
  }
}

function collectImagesForPreloading() {
	var images = [];
	
	$(".carousel .choose-color").each(function() {
		var files = [];
		
		$(this).find("div").each(function() {
			files.push($(this).attr("class"));
		});
		
		var directory = findPathToDirectory($(this).closest(".flex-item").find(".good-image img").attr("src"));
		
		for (var i = 0; i < files.length; i++)
		{
			images.push(directory + files[i] + ".png");
		}
	});
	
	return images;
}

function preloadImagesForCarousel() {
	var images = collectImagesForPreloading();
	preloadImages(images);
}


/**
 * 菜单栏收起样式函数
 */
(function () {
    "use strict";

    var treeviewMenu = $('.app-menu');

    // Toggle Sidebar
    $('[data-toggle="sidebar"]').click(function(event) {
        event.preventDefault();
        $('.app').toggleClass('sidenav-toggled');
    });

    // Activate sidebar treeview toggle
    $("[data-toggle='treeview']").click(function(event) {
        event.preventDefault();
        if(!$(this).parent().hasClass('is-expanded')) {
            treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
        }
        $(this).parent().toggleClass('is-expanded');
    });

    // Set initial active toggle
    $("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');

    //Activate bootstrip tooltips
    $("[data-toggle='tooltip']").tooltip();

})();
