<template>
    <div class="box6">
        <div class="title">
            <p>热门景区排行</p>
            <img src="../images/dataScreen-title.png" alt="">
        </div>
        <!-- 图形图标的容器 -->
        <div class="charts" ref='charts'></div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import * as echart from 'echarts'
const charts = ref()
onMounted(() => {
    const myEchart = echart.init(charts.value)
    // 排行榜最终版
    const ydata = ['峨眉山', '稻城亚丁', '九塞沟', '万里长城', '北京故宫']
    const xdata = [55, 65, 75, 90, 92]
    const option = {
        backgroundColor: '#091636',
        //你的代码
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
            backgroundColor: 'rgba(13, 64, 71, 0.50)',
            borderColor: 'rgba(143, 225, 252, 0.60)',
            padding: 8,
            textStyle: {
                color: '#fff',
            },
            formatter: function(params) {
                if (params[0].seriesIndex === 0) {
                    return params[0].name + '：' + params[0].value + '%';
                }
                return '';
            },
        },
        grid: {
            left: "80",
            right: "20",
            bottom: "20",
            top: "20",
            containLabel: false,
        },
        xAxis: {
            type: "value",
            show: false
        },
        yAxis: {
            type: "category",
            data: ydata,
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                margin: 80,
                align: "left",
                color: '#e5e5e5',
                formatter: function (value, index) {
                    let ind = index + 1;
                    if (ind == ydata.length) {
                        return "{one|" + "NO." +(ydata.length - index) + "} {a|" + value + "}";

                    } else if (ind + 1 == ydata.length) {
                        return "{two|" + "NO." + (ydata.length - index) + "} {b|" + value + "}";
                    } else if (ind + 2 == ydata.length) {
                        return (
                            "{three|" + "NO." + (ydata.length - index) + "} {c|" + value + "}"
                        );
                    }
                    if (ydata.length - index > 9) {
                        return (
                            "{five|" + "NO." + (ydata.length - index) + "} {d|" + value + "}"
                        );
                    }
                    return "{four|" + "NO." + (ydata.length - index) + "} {d|" + value + "}";
                },
                rich: {
                    // 第一名
                    one: {
                        backgroundColor: "#F6BD16",
                        color: "white",
                        width: 40,
                        height: 16,
                        padding: [1, 0, 0, 5],
                        borderRadius: 10,
                        fontSize: 11,
                    },
                    // 第二名
                    two: {
                        backgroundColor: "#FF9845",
                        color: "white",
                        width: 40,
                        height: 16,
                        padding: [1, 0, 0, 5],
                        borderRadius: 10,
                        fontSize: 11,
                    },
                    // 第三名
                    three: {
                        backgroundColor: "#F6BD16",
                        color: "white",
                        width: 40,
                        height: 16,
                        padding: [1, 0, 0, 5],
                        borderRadius: 10,
                        fontSize: 11,
                    },
                    // 一位数
                    four: {
                        backgroundColor: "#33CCCC",
                        color: "white",
                        width: 40,
                        height: 16,
                        padding: [1, 0, 0, 5],
                        borderRadius: 10,
                        fontSize: 11,
                    },
                    // 两位数
                    five: {
                        backgroundColor: "#33CCCC",
                        color: "white",
                        width: 16,
                        height: 16,
                        padding: [1, 0, 0, 1],
                        borderRadius: 10,
                        fontSize: 11,
                    },
                },
            },
        },
        series: [
            {
                type: "bar",
                label: {
                    show: true,
                    position: "right",
                    offset: [3, 1],
                    color: "#e5e5e5",
                    formatter: '{c}%'
                },
                barWidth: 10,
                itemStyle: {
                    //颜色样式部分
                    normal: {
                        barBorderRadius: 8,
                        color: new echart.graphic.LinearGradient(0, 0, 1, 0, [
                            { offset: 0, color: "rgba(51, 204, 204,.4)" },
                            { offset: 1, color: "rgba(51, 204, 204, 1)" },
                        ]),
                    },
                },
                data: xdata,
                z: 3
            },
            {
                type: "bar",
                barGap: '-130%',
                barWidth: 16,
                itemStyle: {
                    //颜色样式部分
                    normal: {
                        barBorderRadius: 8,
                        color: 'transparent',
                        borderColor: '#18457E'
                    },
                },
                // data: xdata.map(i => i + 1),
                data: [100, 100, 100, 100, 100],
                tooltip: {
                    showContent: false 
                }
            }],
    }
    myEchart.setOption(option)
})
</script>

<style lang='scss' scoped>
.box6 {
    width: 100%;
    height: 100%;
    background: url(../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin: 20px 0px;

    .title {
        margin-left: 5px;

        p {
            color: white;
            font-size: 20px;
        }
    }

    .charts {
        height: calc(100% - 30px);
    }
}
</style>