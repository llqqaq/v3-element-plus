<template>
    <template v-for="item in menuRoute" ::key="item.path">
        <!-- 没有子路由 -->
        <template v-if="!item.children">
            <el-menu-item :index="item.path" v-if="!item.meta.hidden">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                   {{ item.meta.title }}
                </template>
            </el-menu-item>
        </template>
        <!-- 有且只有一个子路由 -->
        <template v-if="item.children && item.children.length === 1">
            <el-menu-item :index="item.children[0].path" v-if="!item.children[0].hidden">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    {{ item.children[0].meta.title }}
                </template>
            </el-menu-item>
        </template>
        <!-- 有多个子路由 -->
        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <MenuComponent :menuRoute="item.children"></MenuComponent>
        </el-sub-menu>
    </template>
</template>

<script setup lang='ts'>
defineProps(['menuRoute'])
</script>

<style lang='scss' scoped>

</style>