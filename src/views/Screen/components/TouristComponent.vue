<template>
    <div class="box">
        <div class="top">
            <p class="title">实时游客统计</p>
            <p class="bg"></p>
            <p class="right">可预约总量<span>99999</span>人</p>
        </div>
        <div class="number">
            <span v-for="(item, index) in people" :key="index">{{ item }}</span>
        </div>
        <!-- 盒子将来echarts展示图形图标的节点 -->
        <div class="charts" ref="charts">123</div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
let people = ref('215908人')
let charts = ref()
import * as echarts from 'echarts'
import 'echarts-liquidfill'
console.log(echarts)
onMounted(() => {
    var myChart = echarts.init(charts.value)
    // 绘制图表
    myChart.setOption({
        title: {
            text: '水球图'
        },
        
        series: {
            type: 'liquidFill',//系列
            data: [0.6, 0.4, 0.2],//展示的数据
            waveAnimation: true,//动画
            animationDuration: 3,
            animationDurationUpdate: 0,
            radius: '100%',//半径
            outline: {//外层边框颜色设置
                show: true,
                borderDistance: 8,
                itemStyle: {
                    color: 'skyblue',
                    borderColor: '#294D99',
                    borderWidth: 8,
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.25)'
                }
            },
        }
    })
})

</script>

<style lang='scss' scoped>
.box {
    background: url(../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    .top {
        margin-left: 20px;

        .title {
            color: white;
            font-size: 20px;

        }

        .bg {
            width: 68px;
            height: 7px;
            background: url(../images/dataScreen-title.png) no-repeat;
            background-size: 100% 100%;
            margin-top: 10px;
        }

        .right {
            float: right;
            color: white;
            font-size: 20px;

            span {
                color: yellowgreen;
            }
        }
    }

    .number {
        padding: 10px;
        margin-top: 30px;
        display: flex;


        span {
            flex: 1;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background: url(../images/total.png) no-repeat;
            background-size: 100% 100%;
            color: #29fcff;
        }
    }

    .charts {
        width: 100%;
        flex: 1;
    }
}
</style>