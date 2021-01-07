<template>
    <div class="chinaMap">
        <div id="chinaMap-target"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    mounted() {
        this.initMap();
    },
    destroyed() {
    },
    methods: {
        initMap() {
            //二次重绘前清空图表
            var main = document.getElementById("chinaMap-target");
            // var existInstance = this.echarts.getInstanceByDom(main);
            // if (existInstance) {
            //     if (true) {
            //         this.echarts.dispose(existInstance);
            //     }
            // }
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.echarts.init(main);
            // 指定图表的配置项和数据
            var arr = [];
            for (var i = 0; i < 20; i++) {
                arr.push("iphone" + (i + 1));
            }
            var obj = {
                name: "iphone3",
                type: "map",
                map: "china",
                roam: true,
                itemStyle: {
                    normal:{label:{show:true}},
                    emphasis:{label:{show:true}}
                },
                data: [
                    { name: "北京", value: Math.round(Math.random() * 1000) },
                    { name: "天津", value: Math.round(Math.random() * 1000) },
                ],
            };
            var arrData = [];
            for (var i = 0; i < 20; i++) {
                obj.name = "iphone" + (i + 1);
                arrData.push(JSON.parse(JSON.stringify(obj)));
            }
            console.log(arr, arrData);
            var option = {
                title: {
                    text: "iphone销量", //标题
                    subtext: "纯属虚构", //小标题
                    x: "center", //x轴居中
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    x:'0',
                    data:arr,
                    height:'260px'
                },
                dataRange: {
                    min: 0,
                    max: 2500,
                    x: "left",
                    y: "bottom",
                    text: ["高", "低"], // 文本，默认为数值文本
                    calculable: true,
                    inRange: {
                        color: ["#e0ffff", "#58aaeb"],
                        symbolSize: [30, 100],
                    },
                },
                /*
                toolbox: {
                    show: true,
                    orient : 'vertical',
                    x: 'right',
                    y: 'center',
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                */
                // roamController: {
                //     show: true,
                //     x: 'right',
                //     mapTypeControl: {
                //         'china': true
                //     }
                // },
                series: arrData,
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            // 根据屏幕大小改变
            window.onresize = myChart.resize;

        },
    },
};
</script>
<style lang="scss" scoped>
.chinaMap {
    #chinaMap-target {
        margin: 0 auto;
        width: 100%;
        height: 600px;
        border: 1px solid red;
        padding: 5px;
    }
}
</style>