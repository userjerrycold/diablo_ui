<template>
    <el-container style="height: 100vh;">
        <el-header>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input v-model="searchKeyword" placeholder="请输入关键字搜索" clearable
                        @keyup.enter.native="handleSearch" style="width: 300px;">
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button @click="addItem" type="primary">新增</el-button>
                    &nbsp;
                    <el-button @click="exportData" type="primary">导出</el-button>
                </el-col>
            </el-row>
        </el-header>

        <el-main>
            <el-table :data="uniqueItems" style="width: 100%" stripe @row-dblclick="handleRowDblClick">
                <el-table-column prop="xId" label="编号" width="80"></el-table-column>
                <el-table-column prop="index" label="英文名" width="200"></el-table-column>
                <el-table-column prop="indexZh" label="中文名" width="200"></el-table-column>
                <el-table-column prop="enabledStr" label="状态" width="120"></el-table-column>
                <el-table-column prop="rarity" label="稀有度" width="120"></el-table-column>
                <el-table-column prop="lvl" label="装备等级" width="120"></el-table-column>
                <el-table-column prop="lvlReq" label="等级要求" width="120"></el-table-column>
                <el-table-column prop="codeStr" label="类型" width="150"></el-table-column>
                <el-table-column label="操作" width="140" fixed="right">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="editItem(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="deleteItem(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination @current-change="handlePageChange" :current-page="currentPage" :page-size="pageSize"
                :total="totalItems" layout="prev, pager, next" style="margin-top: 20px; text-align: center;">
            </el-pagination>

            <!-- 详情弹窗 -->
            <el-dialog
                title=""
                width="50%"
                :modal="true"
                v-model="detailDialogVisible"
                :append-to-body="true"
                style="background-color: rgba(3, 3, 3, 0.9); "
                >
                <UniqueItemDetail :item="selectedItem" />
            </el-dialog>

            <!-- 编辑弹窗 -->
            <el-dialog
                :title="editTitle"
                :modal="true"
                v-model="editDialogVisible"
                :style="{
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    borderRadius: '10px',
                    boxShadow: '0 0 20px rgba(0, 0, 0, 0.7)',
                }"
                :close-on-click-modal="false"
                @close="closeDialog"
                width="90%"
            >
                <UniqueItemEdit :item="selectedItem" @save="saveItem" />
            </el-dialog>

            <!-- 弹窗 背景模糊化 -->
            <div v-if="editDialogVisible || detailDialogVisible" class="blur-background"></div>
        </el-main>
    </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import UniqueItemDetail from './UniqueItemDetail.vue';
import UniqueItemEdit from './UniqueItemEdit.vue';
import { apiUniqueQuery } from '@/api/interface_plug';

export default defineComponent({
    name: 'UniqueItem',
    components: {
        UniqueItemDetail,
        UniqueItemEdit,
    },
    setup() {
        const searchKeyword = ref('');
        const currentPage = ref(1);
        const pageSize = ref(10);
        const totalItems = ref(0);
        const uniqueItems = ref([]);
        const detailDialogVisible = ref(false);
        const editDialogVisible = ref(false);
        const selectedItem = reactive({});
        const editTitle = ref('编辑');

        onMounted(() => {
            handleSearch(); // 页面加载时自动调用查询函数
        });

        
        const handleSearch = async () => {
            try {
                const response = await apiUniqueQuery({
                    keyword: searchKeyword.value,
                    page: currentPage.value,
                    pageSize: pageSize.value,
                });
                uniqueItems.value = response.items || [];
                totalItems.value = response.total || 0;
            } catch (error) {
                ElMessage.error('获取数据失败');
            }
        };

        const closeDialog = () => {
            //刷新reload
            window.location.reload();
        };

        const addItem = () => {
            editTitle.value = '新增';
            Object.assign(selectedItem, {}); // 清空选中项
            editDialogVisible.value = true;
        };

        const exportData = () => {
            ElMessageBox.confirm('确认导出所有数据吗？', '导出确认', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                // 执行导出逻辑
                ElMessage.success('导出成功');
            }).catch(() => {
                ElMessage.info('导出取消');
            });
        };

        const handlePageChange = (page) => {
            currentPage.value = page;
            handleSearch();
        };

        const handleRowDblClick = (row) => {
            Object.assign(selectedItem, row); // 将双击行的数据赋值给 selectedItem
            detailDialogVisible.value = true; // 打开详情弹窗
        };

        const editItem = (item) => {
            Object.assign(selectedItem, item);
            editTitle.value = `编辑 - ${item.indexZh}`;
            editDialogVisible.value = true;
        };

        const deleteItem = (item) => {
            ElMessageBox.confirm('确认删除此记录吗？', '删除确认', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                // 执行删除逻辑
                ElMessage.success('删除成功');
            }).catch(() => {
                ElMessage.info('删除取消');
            });
        };

        const saveItem = (item) => {
            ElMessage.success('保存成功');
            editDialogVisible.value = false;
            handleSearch();
        };

        return {
            searchKeyword,
            currentPage,
            pageSize,
            totalItems,
            uniqueItems,
            detailDialogVisible,
            editDialogVisible,
            selectedItem,
            editTitle,
            closeDialog,
            handleSearch,
            addItem,
            exportData,
            handlePageChange,
            handleRowDblClick,
            editItem,
            deleteItem,
            saveItem,
        };
    },
});
</script>

<style scoped>


.blur-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    /* 半透明背景 */
    backdrop-filter: blur(5px);
    /* 虚化程度，可调节为 3px 或 10px */
    z-index: 999;
    /* 确保层级在页面顶部 */
}
</style>