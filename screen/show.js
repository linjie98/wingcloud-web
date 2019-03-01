$(function() {
    var $uList1 = $(".scroll-box-1 ul");
    var timer1 = null;
    //触摸清空定时器
    $uList1.hover(function() {
            clearInterval(timer1);
        },
        function() { //离开启动定时器
            timer1 = setInterval(function() {
                    scrollList1($uList1);
                },
                1000);
        }).trigger("mouseleave"); //自动触发触摸事件
    //滚动动画
    function scrollList1(obj) {
        //获得当前<li>的高度
        var scrollHeight = $("ul li:first").height();
        //滚动出一个<li>的高度
        $uList1.stop().animate({
                marginTop: -scrollHeight
            },
            600,
            function() {
                //动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
                $uList1.css({
                    marginTop: 0
                }).find("li:first").appendTo($uList1);
            });
    }
    var $uList2 = $(".scroll-box-2 ul");
    var timer2 = null;
    //触摸清空定时器
    $uList1.hover(function() {
            clearInterval(timer2);
        },
        function() { //离开启动定时器
            timer2 = setInterval(function() {
                    scrollList2($uList2);
                },
                1000);
        }).trigger("mouseleave"); //自动触发触摸事件
    //滚动动画
    function scrollList2(obj) {
        //获得当前<li>的高度
        var scrollHeight = $("ul li:first").height();
        //滚动出一个<li>的高度
        $uList2.stop().animate({
                marginTop: -scrollHeight
            },
            600,
            function() {
                //动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
                $uList2.css({
                    marginTop: 0
                }).find("li:first").appendTo($uList2);
            });
    }
    var $uList3 = $(".scroll-box-3 ul");
    var timer3 = null;
    //触摸清空定时器
    $uList1.hover(function() {
            clearInterval(timer3);
        },
        function() { //离开启动定时器
            timer3 = setInterval(function() {
                    scrollList3($uList3);
                },
                1000);
        }).trigger("mouseleave"); //自动触发触摸事件
    //滚动动画
    function scrollList3(obj) {
        //获得当前<li>的高度
        var scrollHeight = $("ul li:first").height();
        //滚动出一个<li>的高度
        $uList3.stop().animate({
                marginTop: -scrollHeight
            },
            600,
            function() {
                //动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
                $uList3.css({
                    marginTop: 0
                }).find("li:first").appendTo($uList3);
            });
    }
});
