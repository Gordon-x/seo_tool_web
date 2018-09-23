<template>
    <div class="components-container">
        <div class="filter-container">
            <div class="filter-item">
                <el-input filterable clearable size="medium" v-model="search.name" placeholder="Enter task name"
                          @change="handleSearch" @keyup.enter="handleSearch"></el-input>
            </div>
            <div class="filter-item">
                <el-select filterable clearable value="" size="medium" v-model="search.status"
                           placeholder="Search status" @change="handleSearch">
                    <el-option
                            v-for="(item, key) in status_map"
                            :key="item"
                            :label="item"
                            :value="key">
                    </el-option>
                </el-select>
            </div>
            <div class="filter-item">
                <el-button type="primary" size="medium" @click="handleSearch" :loading="searchLoading"><i
                        class="el-icon-search"></i> Search
                </el-button>
            </div>
            <div class="filter-item">
                <el-button type="info" size="medium" @click="handleReset" :loading="searchLoading"><i
                        class="el-icon-refresh"></i> Reset
                </el-button>
            </div>

            <div class="filter-item">
                <el-button type="success" size="medium" @click="add"><i class="el-icon-plus"></i> Add</el-button>
            </div>
        </div>

        <el-table
                v-loading="tableLoading"
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="日期"
                    width="240">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.create_at }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="任务名称"
                    width="180" prop="name">
            </el-table-column>
            <el-table-column
                    label="关键词">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top" title="关键词" width="300">
                        <p>{{scope.row.content}}</p>
                        <div slot="reference" class="content-wrapper">
                            {{ scope.row.content }}
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    label="状态"
                    width="180">
                <template slot-scope="scope">
                    <el-tag size="medium" :type="scope.row.status | statusColorMap">{{ scope.row.status | statusMap }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="240">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="tip_desc(scope.row.status)" placement="top">
                        <el-button
                                @click="play(scope.row.id)"
                                type="success"
                                size="mini"><i class="iconfont icon-bofang1"></i>
                        </el-button>
                    </el-tooltip>
                    <el-button @click="edit(scope.row.id)"
                               type='primary'
                               size="mini"><i class="el-icon-edit"></i>
                    </el-button>
                    <el-button @click="del(scope.row.id)"
                               size="mini"
                               type="danger"><i class="el-icon-delete"></i>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="search.page"
                    :page-size="search.page_size"
                    layout="prev, pager, next"
                    :total="pagination.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {deepCopy} from "../../plugins/utils";

    const search = {
        name: '',
        status: '',
        page: 1,
        page_size: 10,
    };

    const map = {
        0: '创建成功',
        1: '待执行',
        2: '执行中',
        3: '截图成功',
        4: '截图失败',
    };

    export default {
        name: "Screen",
        data() {
            return {
                tableLoading: false,
                searchLoading: false,
                search: deepCopy(search),
                status_map: map,
                pagination: {
                    total: 0
                },
                tableData: [],
            };
        },
        filters: {
            statusColorMap: function (v) {
                const color = {
                    0: 'info',
                    1: 'primary',
                    2: 'warning',
                    3: 'success',
                    4: 'danger',
                };
                return color[v];
            },
            statusMap: function (v) {
                return map[v];
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            tip_desc(status) {
                if (+status === 3) {
                    return '重新截图';
                } else {
                    return '开始截图';
                }
            },
            getList() {
                this.searchLoading = true;
                this.tableLoading = true;
                let data = deepCopy(this.search);
                this.$api.screen_shot.job_list({
                    data: data
                }).then(resp => {
                    this.tableLoading = false;
                    let data = resp.data;
                    if (data.code === 0) {
                        this.tableData = data.data.list;
                        this.pagination.total = +data.data.total;
                    }
                    this.searchLoading = false;
                });
            },
            handleCurrentChange(val) {
                this.search.page = +val;
            },
            handleSearch() {
                this.getList();
            },
            handleReset() {
                this.search = deepCopy(search);
                this.getList();
            },
            add() {
                this.$router.push('/home/screen_shot/add');
            },
            edit(id) {
                this.$router.push('/home/screen_shot/add/' + id)
            },
            del(id) {
                this.$api.screen_shot.del({
                    data: {
                        id: id,
                    }
                }).then(resp => {
                    let data = resp.data;
                    if (data.code === 0) {
                        this.$notify({
                            title: '提示',
                            type: 'success',
                            message: data.message,
                            duration: 3000,
                        });
                        this.getList();
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
            play(id) {
                this.$api.screen_shot.play({
                    data: {
                        id: id,
                    }
                }).then(resp => {
                    let data = resp.data;
                    if (data.code === 0) {
                        this.$notify({
                            title: '提示',
                            type: 'success',
                            message: data.message,
                            duration: 3000,
                        });
                        this.getList();
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
    .filter-item {
        margin-right: 20px;
    }

    .content-wrapper {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>