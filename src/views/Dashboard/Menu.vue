<template>
    <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical-demo">
        <div  v-for="(m, k) in routes" :key="k">
            <router-link v-if="m.menu" :to="m.path" :key="k" class="router">
                <el-menu-item :index="m.path" class="menu-item" :title="m.label">
                    <i class="el-icon-menu"></i>
                    <span slot="title" v-text="m.label_en"></span>
                </el-menu-item>
            </router-link>
        </div>
    </el-menu>
</template>

<script>
    export default {
        name: "Menu",
        props: {
            routes: {
                type: Array,
                default: [],
            }
        },
        computed: {
            defaultActive() {
                if (this.routes.length > 0) {
                    let r = this.routes[0];
                    return r.path;
                }
                return ''
            },
        },
    }
</script>

<style scoped>
    .router {
        text-decoration: none;
    }

    .menu-item {
        text-align: left;
    }
</style>