// alert(color);
// console.log(color);

/**
 * 定义全局变量，用以初始化echarts报表
 * @type {null}
 */
var cloudchart = null;
var line_chart_one = null;
var line_chart_two = null;
var line_chart_three = null;
var EC = null;
var sexchart = null;

function addition_scroll(data){
    /**
     *实现销售额数字增量滚动效果的基本项声明
     */
    var market_money_options = {
        useEasing: true, 	    // 使用缓和
        useGrouping: true,      // 使用分组(是否显示千位分隔符,一般为 true)
        separator: ',',         // 分隔器(千位分隔符,默认为',')
        decimal: '.',          // 十进制(小数点符号,默认为 '.')
        prefix: '¥',	            // 字首(数字的前缀,根据需要可设为 $,¥,￥ 等)
        suffix: ''              // 后缀(数字的后缀 ,根据需要可设为 元,个,美元 等)
    };
    var add_market_money = new CountUp('market_money',  0, data, 2, 1, market_money_options);
    var add_market_money_two = new CountUp('market_money_two',  0, data, 2, 1, market_money_options);

    if (!add_market_money.error) {
        add_market_money.start();
    } else if (!add_market_money_two.error){
        add_market_money_two.start();
    } else {
        console.error(add_market_money.error);
    }
}

/**
 * 自动触发函数，自动触发显示大屏
 * 在后台对数据大屏进行修改前第一次完整显示大屏
 * 调用changeChartTypeAndColor(),通过初始化参数指定第一次显示的报表类型
 */
window.onload = function (){
    changeChartTypeAndColor('line_chart_one','blue');
    changeChartTypeAndColor('cloud','blue');
    changeChartTypeAndColor('map','blue');
    changeChartTypeAndColor('sex','blue');
    allmoney();


}
/**
 * 窗口大小改变时，重置报表表大小
 *
 * by: linjie
 */
window.onresize = function(){
    cloudchart.resize();
    line_chart_one.resize();
    // line_chart_three.resize();
    // line_chart_two.resize();
    sexchart.resize();
    EC.resize();
}

/**
 * 事件监听，监听已经改过的事件
 * 监听后台页面对数据大屏的修改事件
 */
window.addEventListener("storage", function (obj) {

    var key = obj.key;
    var color_value = obj.newValue;
    localStorage.clear();
    changeChartTypeAndColor(key,color_value);

});

/**
 * 通过共享数据信息key和value，来调用，切换所有报表
 * @param key
 * @param value
 */
function changeChartTypeAndColor(key,color_value) {
    // console.log('enter');
    if (key === 'line_chart_one'||key === 'line_chart_two' || key === 'line_chart_three') {
        line_chart(key,color_value);
    } else if (key === 'cloud') {
        cloud_chart(color_value);
    } else if (key === 'map') {
        map_chart(color_value);
    }else {
        sex_chart(color_value);
    }
}

/**封装的第三种折线图js，line_chart_threefunction()，
 * 根据需要可以自由切换
 * 修改报表颜色的函数
 * 通过不同的color_value值来区分需要修改的颜色
 */

function line_chart_threefunction(datetimes,flows,color_value) {
    // console.log('line_chart_threefunction')
    if (color_value === 'line_yellow_three') {
        color_value = 'yellow';
    } else if (color_value === 'line_green_three') {
        color_value = 'green';
        // console.log(line_color)
    } else {
        color_value = 'blue';
        // console.log(line_color)
    }
    line_chart_three = echarts.init(document.getElementById('linechart'));

    var line_chart_threeoption = {
        title: {
            top:0,
            text: '>>总销售额环比增长速度',
            // subtext: '纯属虚构',
            // textAlign:'right',
            // color:'#FF8C00',
            x:'center',
            textStyle: {
                fontSize: 18,//字体大小
                color: '#FF8C00'//字体颜色
            }

        },
        "tooltip": {
            "trigger": "axis",
            "axisPointer": {
                "type": "shadow",
                textStyle: {
                    color: "#fff"
                }

            },
        },
        "grid": {
            "borderWidth": 0,
            "top": 40,
            "bottom": 15,
            textStyle: {
                color: "#fff"
            }
        },
        "legend": {
            x: 'right',
            // top: '',
            textStyle: {
                color: '#cccccc',
            },
        },


        "calculable": true,
        "xAxis": [{
            "type": "category",
            "axisLine": {
                lineStyle: {
                    color: '#90979c'
                }
            },
            "splitLine": {
                "show": false
            },
            "axisTick": {
                "show": false
            },
            "splitArea": {
                "show": false
            },
            "axisLabel": {
                "interval": 0,

            },
            "data": datetimes,
        }],
        "yAxis": [{
            name:"（%）",
            "type": "value",
            "splitLine": {
                "show": false
            },
            min:0,
            max:100,
            "axisLine": {
                lineStyle: {
                    color: '#90979c'
                }
            },
            "axisTick": {
                "show": false
            },
            "axisLabel": {
                "interval": 0,

            },
            "splitArea": {
                "show": false
            },

        }],
        "series": [{
            // "name": "女",
            "type": "bar",
            "stack": "总量",
            "barMaxWidth": 25,
            "barGap": "10%",
            "itemStyle": {
                "normal": {
                    // "color": "rgba(255,144,128,1)",
                    color: color_value,
                    "label": {
                        "show": true,
                        "textStyle": {
                            "color": "#fff"
                        },
                        // lineStyle: {
                        //     color: color_value//折线的颜色
                        // },
                        "position": "insideTop",
                        formatter: function (p) {
                            return p.value > 0 ? (p.value) : '';
                        }
                    }
                }
            },
            "data": flows
        },
            {
                "name": "总数",
                "type": "line",
                "stack": "总量",
                symbolSize: 10,
                symbol: 'circle',
                "itemStyle": {
                    "normal": {
                        "color": "red",
                        // color: color_value,
                        "barBorderRadius": 0,
                        "label": {
                            "show": true,
                            "position": "top",
                            formatter: function (p) {
                                return p.value > 0 ? (p.value) : '';
                            }
                        }
                    }
                },
                "data": flows
            },
        ]
    }
    line_chart_three.setOption(line_chart_threeoption,true);
}
/**
 * 封装折线图js,默认加载的第一张折线图报表，line_chart_onefunction()
 * 店铺订单总销售额折线图line_chart_one
 */
function line_chart_twofunction(datetimes,flows,color_value) {

    if (color_value === 'line_yellow_two'){
        color_value = 'yellow';
    } else if (color_value === 'line_green_two'){
        color_value = 'green';
        // console.log(line_color)
    } else {
        color_value = 'blue';
        // console.log(line_color)
    }
    line_chart_two = echarts.init(document.getElementById('linechart'));
    var line_chart_twooption = {
        title: {
            top:10,
            text: '>>总销售额环比增长速度',
            // subtext: '纯属虚构',
            // textAlign:'right',
            // color:'#FF8C00',
            x:'left',
            textStyle: {
                fontSize: 18,//字体大小
                color: '#FF8C00'//字体颜色
            }

        },
        // backgroundColor:'#011e48',
        xAxis: {
            data: datetimes,
            axisLine:{
                lineStyle:{
                    color:'#006cc2'
                }
            },
            axisLabel:{
                color:'#fff',
                fontSize:16
            },
            splitLine:{
                lineStyle:{
                    color:'#fff'
                }
            }
        },
        yAxis: {
            name:"（%）",
            nameTextStyle:{
                color:'#fff',
                fontSize:14
            },
            min:0,
            max:100,
            axisLine:{
                lineStyle:{
                    color:'#006cc2'
                }
            },
            axisLabel:{
                color:'#fff',
                fontSize:14
            },
            splitLine:{
                lineStyle:{
                    color:'#0469bf'
                    // color:'#cccccc'
                }
            }
        },
        series: [{
            type: 'line',

            itemStyle: {
                normal: {
                    // color: "#386db3",//折线点的颜色
                    lineStyle: {
                        color: color_value//折线的颜色
                    }
                }
            },
            symbolSize:5,
            lineStyle:{
                normal:{
                    width:3
                }
            },
            data: flows
        }]
    };
    line_chart_two.setOption(line_chart_twooption,true);
}


/**
 * 封装折线图js，第二张折线图报表，line_chart_twofunction（）
 * 店铺订单总销售额折线图line_chart_two
 * @param line_color
 */

function line_chart_onefunction(datetimes,flows,color_value) {

    /**
     * 判断传入的值line_color与哪一个值相等，找到相应的值，为line_color赋值
     */
    if (color_value === 'line_yellow'){
        color_value = 'yellow';
        // console.log(line_color)
    } else if (color_value === 'line_green'){
        color_value = 'green';
        // console.log(line_color)
    } else {
        color_value = 'blue';
        // console.log(line_color)
    }
    // var lineColor = line_color;//全局变量，将获取到的value值赋给lineColor,以此来改变折线颜色
    line_chart_one = echarts.init(document.getElementById('linechart'));
    var lineoption = {
        title: {
            top:10,
            text: '>>总销售额环比增长速度',
            // subtext: '纯属虚构',
            // textAlign:'right',
            // color:'#FF8C00',
            x:'left',
            textStyle: {
                fontSize: 18,//字体大小
                color: '#FF8C00'//字体颜色
            }

        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            x:'right',
            data:['最高环比增长速度','最低环比增长速度'],
            textStyle: {
                fontSize: 10,//字体大小
                color: '#ffffff'//字体颜色
            }
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: datetimes,
            axisLine: {
                lineStyle: {
                    color:'#fff'//修改X轴为白色
                }
            }
        },
        yAxis: {
            name:"（%）",
            type: 'value',

            min:0,
            max:100,
            axisLine: {
                lineStyle: {
                    color:'#fff'//修改y轴为白色
                }
            }
        },
        series: [
            {
                // name:'最低气温',
                type:'line',
                data:flows,
                itemStyle: {
                    normal: {
                        // color: "#386db3",//折线点的颜色
                        lineStyle: {
                            color: color_value//折线的颜色
                        }
                    }
                },
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'},
                        [{
                            symbol: 'none',
                            x: '90%',
                            yAxis: 'max'
                        }, {
                            symbol: 'circle',
                            label: {
                                normal: {
                                    position: 'start',
                                    formatter: '最大值'
                                }
                            },
                            type: 'max',
                            name: '最高点'
                        }]
                    ]
                }
            }
        ]
    };
    line_chart_one.setOption(lineoption,true);
    // $(window).onresize = function() {
    // linechart.resize();
    //
    // }
}



/**
 * 封装地图js
 * 商品订单销量地图
 */
function map_chartfunction(maparray,color_value) {
    //alert("aaasss");
    console.log("aaaapppppppp");
    // 判断传入的值map_color与哪一个值相等，找到相应的值，为map_color赋值
    if (color_value === 'map_yellow'){
        color_value = 'yellow';
        // console.log(line_color)
    } else if (color_value === 'map_green'){
        color_value = 'green';
        // console.log(line_color)
    } else {
        color_value = '#0f1c30';
        // console.log(line_color)
    }
    let data = maparray;
    console.log("kk  data : %o",data);
    let geoCoordMap = {
        '海门':[121.15,31.89],
        '鄂尔多斯':[109.781327,39.608266],
        '招远':[120.38,37.35],
        '舟山':[122.207216,29.985295],
        '齐齐哈尔':[123.97,47.33],
        '盐城':[120.13,33.38],
        '赤峰':[118.87,42.28],
        '青岛':[120.33,36.07],
        '乳山':[121.52,36.89],
        '金昌':[102.188043,38.520089],
        '泉州':[118.58,24.93],
        '莱西':[120.53,36.86],
        '日照':[119.46,35.42],
        '胶南':[119.97,35.88],
        '南通':[121.05,32.08],
        '拉萨':[91.11,29.97],
        '云浮':[112.02,22.93],
        '梅州':[116.1,24.55],
        '文登':[122.05,37.2],
        '上海':[121.48,31.22],
        '攀枝花':[101.718637,26.582347],
        '威海':[122.1,37.5],
        '承德':[117.93,40.97],
        '厦门':[118.1,24.46],
        '汕尾':[115.375279,22.786211],
        '潮州':[116.63,23.68],
        '丹东':[124.37,40.13],
        '太仓':[121.1,31.45],
        '曲靖':[103.79,25.51],
        '烟台':[121.39,37.52],
        '福州':[119.3,26.08],
        '瓦房店':[121.979603,39.627114],
        '即墨':[120.45,36.38],
        '抚顺':[123.97,41.97],
        '玉溪':[102.52,24.35],
        '张家口':[114.87,40.82],
        '阳泉':[113.57,37.85],
        '莱州':[119.942327,37.177017],
        '湖州':[120.1,30.86],
        '汕头':[116.69,23.39],
        '昆山':[120.95,31.39],
        '宁波':[121.56,29.86],
        '湛江':[110.359377,21.270708],
        '揭阳':[116.35,23.55],
        '荣成':[122.41,37.16],
        '连云港':[119.16,34.59],
        '葫芦岛':[120.836932,40.711052],
        '常熟':[120.74,31.64],
        '东莞':[113.75,23.04],
        '河源':[114.68,23.73],
        '淮安':[119.15,33.5],
        '泰州':[119.9,32.49],
        '南宁':[108.33,22.84],
        '营口':[122.18,40.65],
        '惠州':[114.4,23.09],
        '江阴':[120.26,31.91],
        '蓬莱':[120.75,37.8],
        '韶关':[113.62,24.84],
        '嘉峪关':[98.289152,39.77313],
        '广州':[113.23,23.16],
        '延安':[109.47,36.6],
        '太原':[112.53,37.87],
        '清远':[113.01,23.7],
        '中山':[113.38,22.52],
        '昆明':[102.73,25.04],
        '寿光':[118.73,36.86],
        '盘锦':[122.070714,41.119997],
        '长治':[113.08,36.18],
        '深圳':[114.07,22.62],
        '珠海':[113.52,22.3],
        '宿迁':[118.3,33.96],
        '咸阳':[108.72,34.36],
        '铜川':[109.11,35.09],
        '平度':[119.97,36.77],
        '佛山':[113.11,23.05],
        '海口':[110.35,20.02],
        '江门':[113.06,22.61],
        '章丘':[117.53,36.72],
        '肇庆':[112.44,23.05],
        '大连':[121.62,38.92],
        '临汾':[111.5,36.08],
        '吴江':[120.63,31.16],
        '石嘴山':[106.39,39.04],
        '沈阳':[123.38,41.8],
        '苏州':[120.62,31.32],
        '茂名':[110.88,21.68],
        '嘉兴':[120.76,30.77],
        '长春':[125.35,43.88],
        '胶州':[120.03336,36.264622],
        '银川':[106.27,38.47],
        '张家港':[120.555821,31.875428],
        '三门峡':[111.19,34.76],
        '锦州':[121.15,41.13],
        '南昌':[115.89,28.68],
        '柳州':[109.4,24.33],
        '三亚':[109.511909,18.252847],
        '自贡':[104.778442,29.33903],
        '吉林':[126.57,43.87],
        '阳江':[111.95,21.85],
        '泸州':[105.39,28.91],
        '西宁':[101.74,36.56],
        '宜宾':[104.56,29.77],
        '呼和浩特':[111.65,40.82],
        '成都':[104.06,30.67],
        '大同':[113.3,40.12],
        '镇江':[119.44,32.2],
        '桂林':[110.28,25.29],
        '张家界':[110.479191,29.117096],
        '宜兴':[119.82,31.36],
        '北海':[109.12,21.49],
        '西安':[108.95,34.27],
        '金坛':[119.56,31.74],
        '东营':[118.49,37.46],
        '牡丹江':[129.58,44.6],
        '遵义':[106.9,27.7],
        '绍兴':[120.58,30.01],
        '扬州':[119.42,32.39],
        '常州':[119.95,31.79],
        '潍坊':[119.1,36.62],
        '重庆':[106.54,29.59],
        '台州':[121.420757,28.656386],
        '南京':[118.78,32.04],
        '滨州':[118.03,37.36],
        '贵阳':[106.71,26.57],
        '无锡':[120.29,31.59],
        '本溪':[123.73,41.3],
        '克拉玛依':[84.77,45.59],
        '渭南':[109.5,34.52],
        '马鞍山':[118.48,31.56],
        '宝鸡':[107.15,34.38],
        '焦作':[113.21,35.24],
        '句容':[119.16,31.95],
        '北京':[116.46,39.92],
        '徐州':[117.2,34.26],
        '衡水':[115.72,37.72],
        '包头':[110,40.58],
        '绵阳':[104.73,31.48],
        '乌鲁木齐':[87.68,43.77],
        '枣庄':[117.57,34.86],
        '杭州':[120.19,30.26],
        '淄博':[118.05,36.78],
        '鞍山':[122.85,41.12],
        '溧阳':[119.48,31.43],
        '库尔勒':[86.06,41.68],
        '安阳':[114.35,36.1],
        '开封':[114.35,34.79],
        '济南':[117,36.65],
        '德阳':[104.37,31.13],
        '温州':[120.65,28.01],
        '九江':[115.97,29.71],
        '邯郸':[114.47,36.6],
        '临安':[119.72,30.23],
        '兰州':[103.73,36.03],
        '沧州':[116.83,38.33],
        '临沂':[118.35,35.05],
        '南充':[106.110698,30.837793],
        '天津':[117.2,39.13],
        '富阳':[119.95,30.07],
        '泰安':[117.13,36.18],
        '诸暨':[120.23,29.71],
        '郑州':[113.65,34.76],
        '哈尔滨':[126.63,45.75],
        '聊城':[115.97,36.45],
        '芜湖':[118.38,31.33],
        '唐山':[118.02,39.63],
        '平顶山':[113.29,33.75],
        '邢台':[114.48,37.05],
        '德州':[116.29,37.45],
        '济宁':[116.59,35.38],
        '荆州':[112.239741,30.335165],
        '宜昌':[111.3,30.7],
        '义乌':[120.06,29.32],
        '丽水':[119.92,28.45],
        '洛阳':[112.44,34.7],
        '秦皇岛':[119.57,39.95],
        '株洲':[113.16,27.83],
        '石家庄':[114.48,38.03],
        '莱芜':[117.67,36.19],
        '常德':[111.69,29.05],
        '保定':[115.48,38.85],
        '湘潭':[112.91,27.87],
        '金华':[119.64,29.12],
        '岳阳':[113.09,29.37],
        '长沙':[113,28.21],
        '衢州':[118.88,28.97],
        '廊坊':[116.7,39.53],
        '菏泽':[115.480656,35.23375],
        '合肥':[117.27,31.86],
        '武汉':[114.31,30.52],
        '大庆':[125.03,46.58]
    };
    let convertData = function (data) {
        let res = [];
        for (let i = 0; i < data.length; i++) {
            let geoCoord = geoCoordMap[data[i].name];
            console.log("看看geocorrd");
            console.log(geoCoord);
            if (geoCoord) {
                //alert(data[i].name);
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        console.log("看看res: %o",res);
        return res;
    };
    // var a = 'blue';
    let box = document.getElementById('EC');
    EC = echarts.init(box);
    let myTooltip = new myTooltipC('EC');
    let op = {
        title: {
            // top: 20,
            // text: '引导线tooltip轮播动画效果',
            // subtext: '说明：打开页面3秒后开始自动轮播；鼠标移动停止轮播，静置2秒再次播放',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        // gird:{
        //     top:-20,
        //     bottom: 0,
        // },
        // backgroundColor: '#404a59',
        tooltip: {
            trigger: 'item',
            triggerOn: 'click',
            backgroundColor: 'transparent',
            position (pos) {
                let position = myTooltip.getPosOrSize('pos', pos);
                return position
            },
            formatter (params) {
                let text = `地点：${params.name}\n数量：${params.value[2]}`;
                let tooltipDom = myTooltip.getTooltipDom(text);
                return tooltipDom
            }
        },
        legend: {
            show: false
        },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },

            roam: false,
            itemStyle: {
                normal: {
                    // areaColor: '#101f32',
                    // areaColor:'#0f1c30',
                    areaColor:color_value,
                    // areaColor:a,
                    borderWidth: 1.1,
                    // borderColor: '#43d0d6'
                    // borderColor:'#66ffff'
                    // borderColor:'#00ffcc'
                    borderColor:'#00ffff'
                    // borderColor:'#00ccff'
                    // borderColor:'#33ccff'
                    // borderColor:'#34b7c5'
                    // borderColor: '#43d0d6'
                },
                emphasis: {
                    areaColor: '#069'
                }
            },
            // itemStyle: {
            //     normal: {
            //         areaColor: '#101f32',
            //         borderWidth: 1.1,
            //         borderColor: '#43d0d6'
            //     },
            //     emphasis: {
            //         areaColor: '#069'
            //     }
            // },
            top:10.5,
            bottom:10.5,
            right:10.5,
            left:10.5
        },

        series: [
            {
                name: 'Tooltip Test',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                symbolSize: function (val) {
                    return val[2] / 5;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f4e925',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            }
        ]
    }
    EC.setOption(op, true);

    let timer = null;
    /**
     * 定时播放数据提示框
     */
    const autoPlay = function (){
        let index = 0;
        // 取消由 setInterval() 函数设定的定时执行操作
        if (timer) clearInterval(timer);
        // timer = setInterval(_function(){
        timer=setInterval(function (){
            EC.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: index
            });
            index++;
            if (index >= data.length) {
                index = 0
            }
        }, 3000)
    };
    autoPlay();
    /**
     * 移动鼠标清空定时播放，鼠标停止移动自动播放数据提示框
     * @type {null}
     */
    let delay = null;
    // box.addEventListener('mousemove', e => {
    box.addEventListener('mousemove', function (e) {
        if (delay) clearTimeout(delay);
        if (timer) clearInterval(timer);
        // delay = setTimeout(_ => {
        delay=setTimeout(function (){
            autoPlay()
        }, 2000);
    });
    // $(window).onresize = function() {
    //     EC.resize();
    // }
}



/**
 * 男女比例接收数据函数
 */
function sex_chart(charts_color) {

    /**
     * 初始化男女比例报表数据
     * @type {number[]}
     */
    var sexdata = [20,10];

    /**
     * 接收后台推送
     * @type {*|AudioNode|void}
     */
    var socket = io.connect('localhost:9092');
    console.log('接收到后台推送');
    socket.on('connect_msg', function (data) {
        console.log("接收到后台数据的值: %o",data);
        $.each(data.list, function (index, item) {
            if (item.gender === 'w') {
                console.log("gender : w")
                //0:sexdata数组的索引位置
                //1:如果有数据则替换
                //item.count:数据
                sexdata.splice(0,1,item.count);
            } else {
                console.log("gender : m");
                sexdata.splice(1,1,item.count);
            }
        });

        console.log("查看男女比例报表的数据: %o",sexdata);
        sex_chartfunction(sexdata,charts_color);
    });
    //调用男女比例报表
    sex_chartfunction(sexdata,charts_color);
}
// $(function() {
//     // console.log(color);
//     /**
//      * 变量初始化
//      * $uList1、2、3 -> 找到相应列表
//      * timer -> 周期性触发事件的赋值结果变量
//      */
//     var $uList1 = $(".scroll-box-1 ul");
//     var $uList2 = $(".scroll-box-2 ul");
//     var $uList3 = $(".scroll-box-3 ul");
//     var timer = null;
//
//     /**
//      * 周期性调用滚动动画函数scrollList
//      * @param obj
//      */
//     function gettime(obj1,obj2,obj3) {
//         timer = setInterval(function() {
//                 scrollList(obj1,obj2,obj3);
//                 // console.log(color);
//             },
//             1000);
//         // console.log(obj);
//         // alert(obj)
//     }
//
//     /**
//      * 三列
//      */
//     gettime($uList1,$uList2,$uList3);
//     // gettime($uList2);
//     // gettime($uList3);
//
//
//     /**
//      * 滚动动画函数
//      * @param obj
//      */
//     function scrollList(obj1,obj2,obj3) {
//         //console.log(obj.);
//
//         //获得当前<li>的高度
//         var scrollHeight = $("ul li:first").height();
//         //滚动出一个<li>的高度
//         obj1.stop().animate({
//                 marginTop: -scrollHeight
//             },
//             600,
//             function() {
//                 //动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
//                 obj1.css({
//                     marginTop: 0
//                 }).find("li:first").appendTo(obj1);
//             });
//         obj2.stop().animate({
//                 marginTop: -scrollHeight
//             },
//             600,
//             function() {
//                 //动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
//                 obj2.css({
//                     marginTop: 0
//                 }).find("li:first").appendTo(obj2);
//             });
//         obj3.stop().animate({
//                 marginTop: -scrollHeight
//             },
//             600,
//             function() {
//                 //动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
//                 obj3.css({
//                     marginTop: 0
//                 }).find("li:first").appendTo(obj3);
//             });
//     }
//
// })


function sex_chartfunction(sexdata,sex_color) {
    // 判断传入的值sex_color与哪一个值相等，找到相应的值，为sex_color赋值
    if (sex_color === 'sex_yellow'){
        sex_color = 'image://../images/sex_yellow.png';
        // console.log(line_color)
    } else if (sex_color === 'sex_green'){
        sex_color = 'image://../images/sex_green.png';
        // console.log(line_color)
    } else {
        sex_color = 'image://../images/sex_blue.png';
        // console.log(line_color)
    }
    sexchart = echarts.init(document.getElementById('sexchart'));
    var sexoption = {
        "title": {
            "top":10,
            "text": ">>男女比例",
            "left": "left",
            "y": "0",
            "textStyle": {
                "color": "#FF8C00"
            }
        },
        // "backgroundColor": "yellow",
        "grid": {
            // "left": "20%",
            // "top": "10%",
            // "bottom": 10
        },
        "tooltip": {
            "trigger": "item",
            "textStyle": {
                "fontSize": 12
            },
            "formatter": "{b0}:{c0}"
        },
        "xAxis": {
            "max": 40,
            "splitLine": {
                "show": false
            },
            "axisLine": {
                "show": false
            },
            "axisLabel": {
                "show": false
            },
            "axisTick": {
                "show": false
            }
        },
        "yAxis": [
            {
                "type": "category",
                "inverse": false,
                "data": [
                    "男",
                    "女"
                ],
                "axisLine": {
                    "show": false
                },
                "axisTick": {
                    "show": false
                },
                "axisLabel": {
                    "margin": -4,
                    "textStyle": {
                        "color": "#fff",
                        "fontSize": 16.25
                    }
                }
            },

        ],
        "series": [
            {
                "type": "pictorialBar",
                "symbol":sex_color,
                // "symbol": "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAADYElEQVR4nO2dz0sUYRjHP7tIdAmxQ1LdlhCKMohAIsgiyEuHjkUEFQTlpejS/xCCBB06RBGBBKIG4cGyH0qHBKE9eKyFqBQPRQeNCt06vGNY7bq7szPfeZLnAwuzM+/zgw/DDvMu70wOIVveLscJOwycA44A24CfwAfgKXAbeFVvovlC/o/vuVwuTj+x0FWiYdGbgXvA8RrjHgAXgIVaCbMU3SKr1BhtwEtgZx1jTwI7gG7ga5pNNUO+9pBMuEN9klfYD9xMqZdEsCj6AHAiRtxZYFeyrSSHRdGnYsblCD8jJrEoek8TsbsT6yJhLIrelFFsqlgUPZtRbKpYFP2kidjxxLpIGIuiB4AvMeLmgJGEe0kMi6I/AVdjxPVSx91hVlgUDXAXuEaY16jFMnAJeJhqR01iVTTAdeAYUFxjzBRwCLgl6agJrM51rDAO7AP2EmbxthPO8vfAc2Ams84axLpoCGKLrH1mm8eC6KPAGaAL2Fpj7AZgY7T9DfhRY/wc4eflPmH+OjOynI8uEGbpukXlJ4Dz84V8aWWHcj46q4thFzCNTjJRren2UrlLWPM3WYjuAMYIk/tq2oCx9lK5Q11YLboFGARaxXVX0woMtpfK0uuTWvRFoFNcsxKdhF5kqEX3iuuthbQXtehG/gdMG2kvlm/B1xUuWoSLFmFF9CRwg2TnM4pRzskEc8bGiugR4ArhNjkpJqKcJv51sSJ63eOiRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEWvTHKvs/p1izWu5qvaSCWvTlCvtmgeEUaw5TeUVtpV5SQy16COgBRoHXhMWb3aS7PnAhqjEQ1RwFeuYL+aEUa/5DFmtYHkefOEwQVmcBvKD+FQNvgNN/P+pHiV8MRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEixbhokVYEx3nudGKXE1jTfS6xUWLcNEiXLQIFy3CRYtw0SJctAgXLcJFi3DRIv430eUq2+axJvp7jePPqmzHySXFmuhHwFKVYzNA/6rv/VR/s9BSlMsM1kTPEN4DPkU4I8vAO6APOAgsrhq7GO3ri8aUo5ipKIep1zv9AtipgOACGIrLAAAAAElFTkSuQmCC",
                // "symbolRepeat": "fixed",
                "symbolRepeat":"on-repeat",
                "symbolMargin": "5%",
                "symbolClip": true,
                "symbolSize": 22.5,
                "symbolPosition": "start",
                "symbolOffset": [
                    20,
                    0
                ],
                "symbolBoundingData": 300,
                "data":sexdata,
                "z": 10
            },
            {
                "type": "pictorialBar",
                "itemStyle": {
                    "normal": {
                        "opacity": 0.3
                    }
                },
                "label": {
                    "normal": {
                        "show": false
                    }
                },
                "animationDuration": 0,
                "symbolRepeat": "fixed",
                "symbolMargin": "5%",
                // "symbol":"image://../images/wc_chart.png",
                "symbol":sex_color,
                // "symbol": "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAADYElEQVR4nO2dz0sUYRjHP7tIdAmxQ1LdlhCKMohAIsgiyEuHjkUEFQTlpejS/xCCBB06RBGBBKIG4cGyH0qHBKE9eKyFqBQPRQeNCt06vGNY7bq7szPfeZLnAwuzM+/zgw/DDvMu70wOIVveLscJOwycA44A24CfwAfgKXAbeFVvovlC/o/vuVwuTj+x0FWiYdGbgXvA8RrjHgAXgIVaCbMU3SKr1BhtwEtgZx1jTwI7gG7ga5pNNUO+9pBMuEN9klfYD9xMqZdEsCj6AHAiRtxZYFeyrSSHRdGnYsblCD8jJrEoek8TsbsT6yJhLIrelFFsqlgUPZtRbKpYFP2kidjxxLpIGIuiB4AvMeLmgJGEe0kMi6I/AVdjxPVSx91hVlgUDXAXuEaY16jFMnAJeJhqR01iVTTAdeAYUFxjzBRwCLgl6agJrM51rDAO7AP2EmbxthPO8vfAc2Ams84axLpoCGKLrH1mm8eC6KPAGaAL2Fpj7AZgY7T9DfhRY/wc4eflPmH+OjOynI8uEGbpukXlJ4Dz84V8aWWHcj46q4thFzCNTjJRren2UrlLWPM3WYjuAMYIk/tq2oCx9lK5Q11YLboFGARaxXVX0woMtpfK0uuTWvRFoFNcsxKdhF5kqEX3iuuthbQXtehG/gdMG2kvlm/B1xUuWoSLFmFF9CRwg2TnM4pRzskEc8bGiugR4ArhNjkpJqKcJv51sSJ63eOiRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEWvTHKvs/p1izWu5qvaSCWvTlCvtmgeEUaw5TeUVtpV5SQy16COgBRoHXhMWb3aS7PnAhqjEQ1RwFeuYL+aEUa/5DFmtYHkefOEwQVmcBvKD+FQNvgNN/P+pHiV8MRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEixbhokVYEx3nudGKXE1jTfS6xUWLcNEiXLQIFy3CRYtw0SJctAgXLcJFi3DRIv430eUq2+axJvp7jePPqmzHySXFmuhHwFKVYzNA/6rv/VR/s9BSlMsM1kTPEN4DPkU4I8vAO6APOAgsrhq7GO3ri8aUo5ipKIep1zv9AtipgOACGIrLAAAAAElFTkSuQmCC",
                "symbolSize": 22.5,
                "symbolBoundingData": 300,
                "symbolPosition": "start",
                "symbolOffset": [
                    20,
                    0
                ],
                "data":sexdata,
                "z": 5,

            }
        ]
    };
    sexchart.setOption(sexoption,true);
    // $(window).onresize = function() {
    //     sexchart.resize();
    // }
}

/***
 * 地图分布数据
 * @param charts_type
 * @param charts_color
 */
function map_chart(charts_color) {
    /**
     * 定义地图数据数组变量
     */
    var maparray = [];

    /**
     * 如果有相同键则为1
     * 没有则为0
     * 标志作用
     * @type {number}
     */
    var flag = 0;

    /**
     * 接收后台推送
     * @type {*|AudioNode|void}
     */
    var socket = io.connect('localhost:9092');
    console.log('接收到后台推送');
    socket.on('connect_msg_map', function (data) {
        flag = 0;
        console.log("接收到后台数据的值: %o",data);
        $.each(data.list, function (index, item) {

            console.log(item)
            console.log(item.name);
            /**
             * 后台返回键值对，如果键已经在maparray中存在则相加count，否则直接插入数据
             */
            for (let i = 0; i < maparray.length; i += 1) {
                if (maparray[i].name === item.name) {
                    maparray[i].value = item.value + maparray[i].value;
                    flag = 1;
                    break;
                }else {
                    continue;
                }
            }
            /**
             * 如果flag不等于1说明maparray中没有同key数据
             * 则需要插入到数组中
             */
            if (flag !== 1) {
                maparray.push(item);
                flag = 0;
            }
            console.log("查看maparray数据: %o", maparray);
        });
        map_chartfunction(maparray,charts_color);
    });
    console.log("在看看aaaa ： %o",maparray);
    map_chartfunction(maparray,charts_color);
}


/**
 * 词云报表数据
 * @param charts_type
 * @param charts_color
 */
function cloud_chart(charts_color) {
    /**
     * 定义地图数据数组变量
     */
    var cloudarray = [];

    /**
     * 如果有相同键则为1
     * 没有则为0
     * 标志作用
     * @type {number}
     */
    var flag = 0;

    /**
     * 接收后台推送
     * @type {*|AudioNode|void}
     */
    var socket = io.connect('localhost:9092');
    console.log('接收到后台推送');
    socket.on('connect_msg_cloud', function (data) {
        flag = 0;
        console.log("接收到后台数据的值: %o",data);
        $.each(data.list, function (index, item) {

            console.log(item)
            console.log(item.name);
            /**
             * 后台返回键值对，如果键已经在cloudarray中存在则相加，否则直接插入数据
             */
            for (let i = 0; i < maparray.length; i += 1) {
                if (cloudarray[i].name === item.name) {
                    cloudarray[i].value = item.value + cloudarray[i].value;
                    flag = 1;
                    break;
                }else {
                    continue;
                }
            }
            /**
             * 如果flag不等于1说明cloudarray中没有同key数据
             * 则需要插入到数组中
             */
            if (flag !== 1) {
                cloudarray.push(item);
                flag = 0;
            }
            console.log("查看cloudarray数据: %o", cloudarray);
        });
        cloud_chartfunction(cloudarray,charts_color);
    });
    console.log("在看看aaaa ： %o",cloudarray);
    cloud_chartfunction(cloudarray,charts_color);
}
/**
 * 封装词云js,
 */
function cloud_chartfunction(cloudarray,color_value) {
    /*判断传入的值cloud_color与哪一个值相等，找到相应的值，为cloud_color赋值*/
    if (color_value === 'cloud_yellow'){
        color_value = 'yellow';
        // console.log(line_color)
    } else if (color_value === 'cloud_green'){
        color_value = 'green';
        // console.log(line_color)
    } else {
        color_value = '#00ffff';
        // console.log(line_color)
    }
    cloudchart = echarts.init(document.getElementById('cloudchart'));
    var cloudoption = {
        tooltip: {},
        series: [ {
            type: 'wordCloud',
            gridSize: 2,
            sizeRange: [12, 50],
            rotationRange: [-90, 90],
            shape: 'pentagon',
            width: 400,
            height: 300,
            drawOutOfBound: true,
            textStyle: {
                normal: {
                    color: function () {
                        return 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')';
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: cloudarray
        } ]
    };

    cloudchart.setOption(cloudoption,true);
    // $(window).onresize = function() {
    // cloudchart.resize();
    // }
}


/**
 * 滚动流图
 */
function roll_chart() {
    /**
     * 定义滚动流图的数组
     * @type {Array}
     */
    var rolldata = [];

    /**
     * 接收后台推送
     * @type {*|AudioNode|void}
     */
    var socket = io.connect('localhost:9092');
    console.log('接收到后台推送');
    socket.on('connect_msg_roll', function (data) {
        $.each(data.list, function (index, item) {
            rolldata.splice(0,1,item.shopid);
            rolldata.splice(1,1,item.shopname);
            rolldata.splice(2,1,item.shoptype);
        });

    });

}

/**
 * 折线图环比增长速度报表数据
 */
function line_chart(key,charts_color) {
    /**
     * 定义折线图的数组
     * @type {Array}
     */
    var datetimes = [];    //类别数组（实际用来盛放X轴坐标值）
    var flows = [];
    /**
     * 接收后台推送
     * @type {string|Array<module:echarts~ECharts>|AudioNode|void|*}
     */
    var socket = io.connect('localhost:9092');
    console.log('接收到后台推送');
    socket.on('connect_msg_grow',function (data){
        datetimes = [];
        flows = [];
        $.each(data.list, function (index, item){
            datetimes.push(item.datetime);    //挨个取出类别并填入类别数组
            flows.push(item.flow);

        });
        console.log("查看datetimes数据: %o", datetimes);
        console.log("flow : %o",flows);

        if (key === 'line_chart_one') {
            line_chart_onefunction(datetimes,flows,charts_color);
        }else if(key ==='line_chart_two'){
            line_chart_twofunction(datetimes,flows,charts_color);
        }else{
            line_chart_threefunction(datetimes,flows,charts_color);
        }
    });
    if (key === 'line_chart_one') {
        line_chart_onefunction(datetimes,flows,charts_color);
    }else if(key ==='line_chart_two'){
        line_chart_twofunction(datetimes,flows,charts_color);
    }else{
        line_chart_threefunction(datetimes,flows,charts_color);
    }

}

/**
 * 总销售额
 */
function allmoney() {
    var additiondata = 0;
    var socket = io.connect("localhost:9092");
    socket.on("connect_msg_allmoney",function (data) {
        addition_scroll(data);
    })
    addition_scroll(additiondata);
}