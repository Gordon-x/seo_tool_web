<template>
    <div class="home">
        <img alt="Seo Tool logo" class="logo" src="../assets/image/logo_200.png">

        <el-form ref="sign_in" :rules="rules" :model="form" class="sign-in-form">
            <el-form-item prop="user_name">
                <el-input type="text" placeholder="Username" v-model="form.user_name"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="Password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="sign-in-btn" :loading="submit" @click="sign_in">Sign in</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    export default {
        name: 'Login',
        data() {
            return {
                submit: false,
                form: {
                    user_name: '',
                    password: '',
                },
                rules: {
                    user_name: [
                        {required: true, message: '请填写用户名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请填写密码', trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            sign_in() {
                let _this = this;
                _this.submit = true;
                _this.$refs.sign_in.validate(function(isValid, invalidFields) {
                    if (!isValid) {
                        _this.submit = false;
                        return false;
                    }
                    _this.$api.common.sign_in({
                        data: _this.form
                    }).then(resp => {
                        _this.submit = false;
                        let data = resp.data;
                        if (data.code === 0) {
                            localStorage.setItem('x-token', data.data.token);
                            location.reload();
                        } else {
                            _this.$notify({
                                title: '错误',
                                message: data.message,
                                type: 'error',
                                duration: 3000,
                            })
                        }
                    });
                });
            },
        }
    }
</script>

<style scoped>
    .home {
        margin-top: 100px;
    }
    .logo {
        margin-bottom: 50px;
    }
    .sign-in-form {
        width: 300px;
        margin: 0 auto;
    }

    .sign-in-btn {
        width: 300px;
    }
</style>
