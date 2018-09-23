<template>
    <el-tooltip class="item" :effect="color" :content="show" :placement="direct">
        <i class="el-icon-info"></i>
    </el-tooltip>
</template>

<script>
    export default {
        name: "Help",
        props: {
            contents: {
                type: String,
                default: '',
            },
            directive: {
                type: String,
                default: 'right',
            },
            bgColor: {
                type: String,
                default: 'dark',
            }
        },
        data() {
            return {
                show: this.contents,
                direct: this.directive,
                color: this.bgColor,
            };
        }
    }
</script>
<style scoped>
    .item {
        margin-left: 10px;
        color: silver;
        vertical-align: middle;
    }
</style>
