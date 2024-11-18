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
            <el-dialog  width="40%" :modal="false" style="background-color: rgba(0, 0, 0, 0.80); "   v-model="detailDialogVisible" >
                <UniqueItemDetail :item="selectedItem" />
            </el-dialog>

            <!-- 编辑弹窗 -->
            <el-dialog :title="editTitle" v-model="editDialogVisible" width="50%">
                <UniqueItemEdit :item="selectedItem" @save="saveItem" />
            </el-dialog>
        </el-main>
    </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, reactive ,onMounted} from 'vue';
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

        const xuniqueItem = reactive({
            xId: 1,
                index: 'Deathspade',
                indexZh: '死亡之鏟',
                enabledStr: '生效中',
                rarity: '1',
                lvl: 12,
                lvlReq: 9,
                codeStr: '斧',
                enabled: 1,
                version: 0,
                firstladderseason: '',
                lastladderseason: '',
                nolimit: '',
                code: 'axe',
                itemName: 'Axe',
                carry1: '',
                costMult: 5,
                costAdd: 5000,
                chrTransform: 'dgld',
                invTransform: '',
                flippyFile: '',
                invfile: 'invaxeu',
                dropsound: '',
                dropsfxframe: '',
                usesound: '',
                prop1: 'stupidity',
                par1: '',
                min1: 1,
                max1: 1,
                prop2: 'dmg-min',
                par2: '',
                min2: 8,
                max2: 8,
                prop3: 'att%',
                par3: '',
                min3: 15,
                max3: 15,
                prop4: 'mana-kill',
                par4: '',
                min4: 4,
                max4: 4,
                prop5: 'dmg%',
                par5: '',
                min5: 60,
                max5: 70,
                prop1Str: '击中使目标失明',
                prop2Str: '+8 最小傷害 [8-8]',
                prop3Str: '+15% 攻击命中率 [15-15]',
                prop4Str: '击杀后恢复法力 +4 [4-4]',
                prop5Str: '+70% 傷害强化 [60-70]',
                prop6Str: '',
                prop7Str: '',
                prop8Str: '',
                prop9Str: '',
                prop10Str: '',
                prop11Str: '',
                prop12Str: '',
        });
        const uniqueItems = ref([
            {
                xId: 1,
                index: 'Deathspade',
                indexZh: '死亡之鏟',
                enabledStr: '生效中',
                rarity: '1',
                lvl: 12,
                lvlReq: 9,
                codeStr: '斧',
                enabled: 1,
                version: 0,
                firstladderseason: '',
                lastladderseason: '',
                nolimit: '',
                code: 'axe',
                itemName: 'Axe',
                carry1: '',
                costMult: 5,
                costAdd: 5000,
                chrTransform: 'dgld',
                invTransform: '',
                flippyFile: '',
                invfile: 'invaxeu',
                dropsound: '',
                dropsfxframe: '',
                usesound: '',
                prop1: 'stupidity',
                par1: '',
                min1: 1,
                max1: 1,
                prop2: 'dmg-min',
                par2: '',
                min2: 8,
                max2: 8,
                prop3: 'att%',
                par3: '',
                min3: 15,
                max3: 15,
                prop4: 'mana-kill',
                par4: '',
                min4: 4,
                max4: 4,
                prop5: 'dmg%',
                par5: '',
                min5: 60,
                max5: 70,
                prop1Str: '击中使目标失明',
                prop2Str: '+8 最小傷害 [8-8]',
                prop3Str: '+15% 攻击命中率 [15-15]',
                prop4Str: '击杀后恢复法力 +4 [4-4]',
                prop5Str: '+70% 傷害强化 [60-70]',
                prop6Str: '',
                prop7Str: '',
                prop8Str: '',
                prop9Str: '',
                prop10Str: '',
                prop11Str: '',
                prop12Str: '',

            },
            {
                xId: 2,
                index: 'Bladebone',
                indexZh: '肩胛骨',
                enabledStr: '生效中',
                rarity: '1',
                lvl: 20,
                lvlReq: 15,
                codeStr: '雙刃斧',
                enabled: 1,
                version: 0,
                firstladderseason: '',
                lastladderseason: '',
                nolimit: '',
                code: '2axe',
                itemName: 'Double Axe',
                carry1: '',
                costMult: 5,
                costAdd: 5000,
                chrTransform: 'dpnk',
                invTransform: '',
                flippyFile: '',
                invfile: 'inv2axeu',
                dropsound: '',
                dropsfxframe: '',
                usesound: '',
                prop1: 'dmg-max',
                par1: '',
                min1: 12,
                max1: 15,
                prop2: 'att%',
                par2: '',
                min2: 10,
                max2: 10,
                prop3: 'lifesteal',
                par3: '',
                min3: 5,
                max3: 5,
                prop4: 'dmg%',
                par4: '',
                min4: 50,
                max4: 60,
                prop1Str: '+15 最大傷害 [12-15]',
                prop2Str: '+10% 攻击命中率 [10-10]',
                prop3Str: '生命偷取 +5% [5-5]',
                prop4Str: '+50% 傷害强化 [50-60]',
                prop5Str: '+70% 傷害强化 [60-70]',
                prop6Str: '',
                prop7Str: '',
                prop8Str: '',
                prop9Str: '',
                prop10Str: '',
                prop11Str: '',
                prop12Str: '',
            },
            {
                xId: 3,
                index: 'Rakescar',
                indexZh: '猛刺',
                enabledStr: '生效中',
                rarity: '1',
                lvl: 25,
                lvlReq: 20,
                codeStr: '戰斧',
                enabled: 1,
                version: 0,
                firstladderseason: '',
                lastladderseason: '',
                nolimit: '',
                code: 'axe',
                itemName: 'Battle Axe',
                carry1: '',
                costMult: 6,
                costAdd: 7000,
                chrTransform: 'dgld',
                invTransform: '',
                flippyFile: '',
                invfile: 'invaxeu',
                dropsound: '',
                dropsfxframe: '',
                usesound: '',
                prop1: 'dmg-min',
                par1: '',
                min1: 10,
                max1: 10,
                prop2: 'dmg-max',
                par2: '',
                min2: 30,
                max2: 40,
                prop3: 'dmg%',
                par3: '',
                min3: 75,
                max3: 85,
                prop1Str: '+10 最小傷害 [10-10]',
                prop2Str: '+40 最大傷害 [30-40]',
                prop3Str: '+85% 傷害强化 [75-85]',
                prop4Str: '生命偷取 +5% [5-5]',
                prop5Str: '+70% 傷害强化 [60-70]',
                prop6Str: '',
                prop7Str: '',
                prop8Str: '',
                prop9Str: '',
                prop10Str: '',
                prop11Str: '',
                prop12Str: '',
            }
        ]);
        const detailDialogVisible = ref(false);
        const editDialogVisible = ref(false);
        const selectedItem = reactive<xuniqueItem>({});
        const editTitle = ref('编辑');

        
        onMounted(() => {
            handleSearch(); // 页面加载时自动调用查询函数
        });

        const handleSearch = async() => {
            console.log("查询");
            // 这里可以调用查询函数
            try {
                const response = await apiUniqueQuery({
                    keyword: searchKeyword.value,
                    page: currentPage.value,
                    pageSize: pageSize.value
                });
                console.log('Response:', response);
                uniqueItems.value = response.items; // 当前页的数据
                totalItems.value = response.total; // 设置总条数以用于分页
            }catch (error) {
                console.error('Error:', error);
            }
            
        };

        const addItem = () => {
            editTitle.value = '新增';
            selectedItem.xId = undefined; // 清空选中项
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
            // 这里可以触发获取当前页数据的逻辑
            handleSearch()
        };

        const handleRowDblClick = (row:xuniqueItem) => {
            selectedItem.value = row;
            detailDialogVisible.value = true;
        };

        const editItem = (item) => {
            selectedItem.value = item;
            editTitle.value = `编辑 - ${item.zhName}`;
            editDialogVisible.value = true;
        };

        const deleteItem = (item) => {
            ElMessageBox.confirm('确认删除此记录吗？', '删除确认', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                ElMessage.success('删除成功');
                // 执行删除逻辑
            }).catch(() => {
                ElMessage.info('删除取消');
            });
        };

        const saveItem = (item) => {
            ElMessage.success('保存成功');
            editDialogVisible.value = false;
            // 保存逻辑
        };

        return {
            searchKeyword,
            currentPage,
            pageSize,
            totalItems,
            xuniqueItem,
            uniqueItems,
            handleSearch,
            addItem,
            exportData,
            handlePageChange,
            handleRowDblClick,
            editItem,
            deleteItem,
            detailDialogVisible,
            editDialogVisible,
            editTitle,
            saveItem,
            selectedItem,
        };
    },
});
</script>

<style scoped>
.el-header {
    padding: 10px;
}

.el-select {
    width: 300px;
}
</style>