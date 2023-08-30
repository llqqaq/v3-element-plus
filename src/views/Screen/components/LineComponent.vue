<template>
    <div class="box5">
        <div class="title">
            <p>未来七天游客数量趋势图</p>
            <img src="../images/dataScreen-title.png" alt="">
        </div>
        <div class="charts" ref='line'></div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
const line = ref()
onMounted(() => {
    const myEcharts = echarts.init(line.value)
    const option = {
        title: {
            text: '游客'
        },
        legend: {
            data: ['数据1', '数据2'],
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 14,
            right: 5,
            textStyle: {
                fontSize: 14,
                color: '#FFFFFF'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,  // 两边不留白
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            //分割线不要
            splitLine: {
                show: false
            },
            //轴线的设置
            axisLine: {
                show: true
            },
            //刻度
            axisTick: {
                show: true
            }
        },
        yAxis: {
            axisLine: {
                show: true // 显示y轴
            },
            splitLine: {
                show: false  // y轴的分割线
            },
            axisTick: {
                show: true // y轴刻度
            }
        },
        series: [
            {
				name: '数据1',
                type: 'line',
                data: [120, 1240, 66, 2299, 321, 890, 1200],
                smooth: true, // 平滑
                areaStyle: {  // 区域填充颜色
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                                offset: 0, color: 'red' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'blue' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                }, 
            },
            {
				name: '数据2',
                type: 'line',
                data: [231, 23, 5, 62, 333, 44, 22],
                smooth: true, // 平滑
                areaStyle: {  // 区域填充颜色
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                                offset: 0, color: 'red' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'blue' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                }, 
            }
        ],
        grid: {
            left: 40,
            top: 10,
            right: 10,
            bottom: 20
        },
        
        tooltip: {
          trigger: "axis",
          axisPointer: {
            label: {
              show: true,
              backgroundColor: "#fff",
              color: "#556677",
              borderColor: "rgba(0,0,0,0)",
              shadowColor: "rgba(0,0,0,0)",
              shadowOffsetY: 0,
            },
            lineStyle: {
              width: 1,
            },
          },
          backgroundColor: "#fff",
          textStyle: {
            color: "#5c6c7c",
          },
          padding: [20, 10],
          extraCssText: "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)",
        },
    }
    myEcharts.setOption(option)
})
</script>

<style lang='scss' scoped>
.box5 {
    width: 100%;
    height: 100%;
    background: url(../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin: 0px 20px;

    .title {
        margin-left: 10px;

        p {
            color: white;
            font-size: 20px;
        }
    }

    .charts {
        height: calc(100% - 40px);
    }

}
</style>