<template>
    <div class="box2">
        <div class="title">
            <p>年龄比例</p>
            <img src="../images/dataScreen-title.png" alt="">
        </div>
        <!-- 图形图标的容器 -->
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
//引入echarts
import * as echarts from 'echarts';
let charts = ref();
//组件挂载完毕初始化图形图标
onMounted(() => {
    const myEcharts = echarts.init(charts.value)
    const options = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: 'middle',
            right: 20,
            orient: 'vertical',
            itemGap: 15,
            textStyle: {
                color: 'white'
            }
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'inside',
                    color: '#fff',
                },
                center: ['40%', '50%'],
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 13,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ]
            }
        ]
    }
    myEcharts.setOption(options)
})
</script>

<style scoped lang="scss">
.box2 {
    width: 100%;
    height: 100%;
    background: url(../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;

    .title {
        margin-left: 20px;

        p {
            color: white;
            font-size: 20px;
        }
    }

    .charts {
        height: 260px;
    }

}
</style>