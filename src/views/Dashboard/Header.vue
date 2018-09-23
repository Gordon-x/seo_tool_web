<template>
    <div class="header-container">
        <el-dropdown trigger="click" class="user-menu"  @command="handleCommand">
                <span class="el-dropdown-link dropdown-cursor">
                    Welcome <strong>{{user_name}}</strong>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="modify_password" key="modify_password">修改密码</el-dropdown-item>
                <el-dropdown-item command="sign_out" key="sign_out" @click="sign_out">注销</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                user_name: '',
                levelList: [],
            };
        },
        methods: {
            handleCommand(command) {
                if (this.hasOwnProperty(command)) {
                    this[command]();
                }
            },
            sign_out() {
                localStorage.setItem('x-token', null);
                this.$api.common.sign_out({}).then(resp => {
                    let data = resp.data;
                    if (+data.code === 0) {
                        location.reload();
                    } else {
                        this.$notify({
                            title: '错误',
                            message: '注销失败',
                            type: 'error',
                            duration: 3000,
                        })
                    }
                });
            },
            modify_password() {

            },
            getUserInfo() {
                let _this = this;
                this.$api.common.user_info({}).then(resp => {
                    let data = resp.data;
                    if (data.code === 0) {
                        this.user_name = data.data.user_name;
                    }
                });
            },
        },
        mounted() {
            this.getUserInfo();
        },
    }
</script>

<style scoped>
    .header-container {
        background: aliceblue;
        line-height: 60px;
        text-align: right;
    }
    .dropdown-cursor {
        cursor: pointer;
        outline: none;
    }

    .user-menu {
        margin-right: 20px;
    }
</style>