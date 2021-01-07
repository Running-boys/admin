<template>
    <div class="echarts">
        <div
            :class="className"
            :id="id"
            :style="{ height: height, width: width }"
            ref="myEchart"
        ></div>
        <!-- <Title :title="title"></Title>
    <Search :placeholder="placeholder" :find="find" @listenSearch="searchItem" @listenAdd="addNew" @listenLeadIng="leadingItem"></Search> -->
        <!-- <div id="provinceChart" class="charts" ref="myEchart1" style="height:400px;"></div> -->
    </div>
</template>
<script>
import { worldChina } from "@/api/map"
import echarts from "echarts";
export default {
    name: "worldMap",
    props: {
        className: {
            type: String,
            default: "yourClassName",
        },
        id: {
            type: String,
            default: "yourID",
        },
        width: {
            type: String,
            default: "100%",
        },
        height: {
            type: String,
            default: "1000px",
        },
    },
    data() {
        return {
            title: "图表",
            placeholder: "用户名/电话",
            find: "2", //1显示新增按钮，2显示导入按钮，若不显示这两个按钮可以写0或者不写值
            chart: null,
        };
    },
    components: {},
    mounted() {
        
        this.initWorldMap()
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        
        //搜索回调
        searchItem(val) {
            console.log(val);
        },
        //新增回调
        addNew(val) {
            console.log(val);
        },
        //导入
        leadingItem(val) {
            console.log(val);
        },
        initWorldMap() {
            worldChina().then(res=>{
                // 获取JSON 注册给echarts
                this.echarts.registerMap("world",res.data);
                this.chart = this.echarts.init(this.$refs.myEchart);
                window.onresize = this.echarts.init(this.$refs.myEchart).resize;
                this.chart.setOption({
                title: {
                    text: "iphone销量", //标题
                    subtext: "纯属虚构", //小标题
                    x: "center", //x轴居中
                },
                tooltip: {
                    trigger: "item",
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    x:'10px',
                    data:['china','日本']
                },
                dataRange: {
                    show: true,
                    min: 0,
                    max: 1000000,
                    text: ["高", "低"],
                    realtime: true,
                    calculable: true,
                    color: ["orangered", "yellow", "lightskyblue"],
                },
                series: [{
                    type: 'map',
                    map: 'world',
                    roam: true,
                    itemStyle: {
                        normal:{label:{show:true}},
                        emphasis:{label:{show:true}}
                    },
                    // 下面2行 
                    zoom: 5,
                    center: [110.97, 35.71],
                    // nameMap: [
                    //     {name:'中国',value:12},
                    //     {name:'日本',value:11}

                    // ],
                    data:[
                        {name:'中国',value:12},
                        {name:'日本',value:11}
                    ],
                }]
            });
            })
            
        },
        
    },
};
</script>