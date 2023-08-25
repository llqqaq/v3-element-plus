<template>
    <div class="container">
        <div class="screen" ref="screen">
            <div class="top">
                <top-component></top-component>
            </div>
            <div class="bottom">
                <div class="l">
                    <tourist-component class="tourist"></tourist-component>
                    <sex-component class="age"></sex-component>
                    <age-component class="sex"></age-component>
                </div>
                <div class="c">
                    <map-component class="map"></map-component>
                    <line-component class="line"></line-component>
                </div>
                <div class="r">右</div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import TopComponent from './components/TopComponent.vue'
import TouristComponent from './components/TouristComponent.vue'
import AgeComponent from './components/AgeComponent.vue'
import SexComponent from './components/SexComponent.vue'
import MapComponent from './components/MapComponent.vue'
import LineComponent from './components/LineComponent.vue'
const screen = ref()
const callback = () => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}
onMounted(() => {
    callback()
    window.addEventListener("resize", callback)
})
const getScale = (w=1920, h=1080) => {
    let ww = window.innerWidth / w
    let hh = window.innerHeight / h
    return ww < hh ? ww : hh
}
</script>

<style lang='scss' scoped>
.container {
    width: 100vw;
    height: 100vh;
    background: url('./images/bg.png') no-repeat;
    background-size: cover;
    // overflow: hidden;
    .screen {
        position: fixed;
        top: 50%;
        left: 50%;
        transform-origin: left top;
        width: 1920px;
        height: 1080px;
        .bottom {
            display: flex;
            height: calc(100% - 40px);
            .l {
                flex: 1;
                display: flex;
                flex-direction: column;

                .tourist {
                    flex: 1.2;
                }

                .sex {
                    flex: 1;

                }

                .age {
                    flex: 1;
                }
            }
            .c {
                flex: 1.5;
                display: flex;
                flex-direction: column;

                .map {
                    flex: 4;
                }

                .line {
                    flex: 1;
                }
            }
            .r {
                flex: 1;
            }
        }
    }
}
</style>