<template>
    <div class="components-container">
        <el-form ref="add" :model="form" label-width="120px">
            <el-form-item label="任务名称">
                <el-input v-model="form.name" style="width: 300px" placeholder="任务名称" clearable></el-input>
                <Help contents="当前仅支持百度关键词截图"></Help>
            </el-form-item>
            <el-form-item label="关键词">
                <el-input type="textarea" v-model="form.contents" :autosize="{ minRows: 8, maxRows: 20}" style="width: 400px;" placeholder="关键词，每行一个关键词" clearable></el-input>
            </el-form-item>
            <el-form-item label="截图页数">
                <el-input-number v-model="form.page" style="width: 150px;" :max="5" :min="1" :step="1"></el-input-number>
            </el-form-item>
            <el-form-item label="添加时间">
                <el-switch v-model="form.add_time" :active-value="1" :inactive-value="0"></el-switch>
                <Help contents="时间为北京时间"></Help>
            </el-form-item>
            <!---->
            <el-form-item label="客户端">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="pc" name="type">PC端</el-checkbox>
                    <el-checkbox label="mob" name="type">移动端</el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item>
                <el-button type="success" @click="save">保 存</el-button>
                <el-button @click="back">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {deepCopy} from "../../plugins/utils";
    import Help from '../../components/Help';

    const initForm = {
        name: '',
        contents: '',
        page: 1,
        pack: 1,
        add_time: 1,
        type: ['pc'],
        id: 0,
    };

    export default {
        name: "add",
        components: {
            Help,
        },
        data() {
            return {
                form: deepCopy(initForm),
            }
        },
        mounted() {
            let param = this.$route.params;
            initForm.id = param.hasOwnProperty('id') ? param.id : 0;
            this.detail(initForm.id)
        },
        methods: {
            save() {
                let param = deepCopy(this.form);
                this.$api.screen_shot.job_save({
                    data: param
                }).then(resp => {
                    let data = resp.data;
                    if (data.code === 0) {
                        this.$router.push('/home/screen_shot');
                        this.$notify({
                            title: '提示',
                            type: 'success',
                            message: data.message,
                            duration: 3000,
                        });
                    } else {
                        this.$notify({
                            title: '错误',
                            type: 'error',
                            message: data.message,
                            duration: 3000,
                        });
                    }
                })
            },
            back() {
                this.$router.push('/home/screen_shot');
            },
            detail(id) {
                if (!id) {
                    return false;
                }
                this.$api.screen_shot.detail({
                    data: {
                        id: id
                    }
                }).then(resp => {
                    let data = resp.data;
                    if (data.code === 0) {
                        this.form = data.data;
                    } else {
                        this.$notify({
                            title: '错误',
                            type: 'error',
                            message: data.message,
                            duration: 3000,
                        });
                    }
                });
            },
        }
    }
</script>

<style scoped>
</style>