<template>
    <el-container>
        <el-aside width="200px">
            <Menu :routes="routes"></Menu>
        </el-aside>
        <el-container>
            <el-header>
                <Header></Header>
                <!--<Breadcrumb>后期做面包屑</Breadcrumb>-->
            </el-header>
            <el-main>
                <Main></Main>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import {menu} from "../routes/const_routes";
    import Menu from './Dashboard/Menu';
    import Header from './Dashboard/Header';
    import Main from './Dashboard/Main';
    export default {
        name: "Layout",
        components: {
            Menu,
            Header,
            Main,
        },
        data() {
            return {
                routes: menu,
            }
        }
    }
</script>

<style scoped>
</style>