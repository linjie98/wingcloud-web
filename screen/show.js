$(function() {
    /**
     * 变量初始化
     * $uList1、2、3 -> 找到相应列表
     * timer -> 周期性触发事件的赋值结果变量
     */
    var $uList1 = $(".scroll-box-1 ul");
    var $uList2 = $(".scroll-box-2 ul");
    var $uList3 = $(".scroll-box-3 ul");
    var timer = null;

    /**
     * 周期性调用滚动动画函数scrollList
     * @param obj
     */
    function gettime(obj1,obj2,obj3) {
        timer = setInterval(function() {
                scrollList(obj1,obj2,obj3);
            },
            1000);
        // console.log(obj);
        // alert(obj)
    }

    /**
     * 三列
     */
    gettime($uList1,$uList2,$uList3);
    // gettime($uList2);
    // gettime($uList3);


    /**
     * 滚动动画函数
     * @param obj
     */
    function scrollList(obj1,obj2,obj3) {
        //console.log(obj.);

        //获得当前<li>的高度
        var scrollHeight = $("ul li:first").height();
        //滚动出一个<li>的高度
        obj1.stop().animate({
                marginTop: -scrollHeight
            },
            600,
            function() {
                //动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
                obj1.css({
                    marginTop: 0
                }).find("li:first").appendTo(obj1);
            });
        obj2.stop().animate({
                marginTop: -scrollHeight
            },
            600,
            function() {
                //动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
                obj2.css({
                    marginTop: 0
                }).find("li:first").appendTo(obj2);
            });
        obj3.stop().animate({
                marginTop: -scrollHeight
            },
            600,
            function() {
                //动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
                obj3.css({
                    marginTop: 0
                }).find("li:first").appendTo(obj3);
            });
    }

});
