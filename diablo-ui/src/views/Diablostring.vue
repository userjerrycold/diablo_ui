<template>
  <el-container style="height: 100vh;">
    <el-header>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="searchKeyword" placeholder="请输入关键字搜索" clearable @keyup.enter.native="handleSearch"
            style="width: 300px;">
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button @click="addJson" type="primary">新增</el-button>
        </el-col>

      </el-row>
    </el-header>

    <el-main>
      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :span="12">
          <el-form :inline="true" :model="filters">
            <el-form-item label="文本名称">
              <el-select v-model="filters.textName" placeholder="请选择" style="width: 300px;">
                <!-- 动态渲染下拉选项 -->
                <el-option v-for="option in options" :key="option.value" :label="option.label"
                  :value="option.value"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-table :data="paginatedData" style="width: 100%" stripe>
        <el-table-column prop="id" label="序号" width="80"></el-table-column>
        <el-table-column prop="type" label="文本名称" width="150"></el-table-column>
        <el-table-column prop="key" label="编码" width="250"></el-table-column>
        <el-table-column prop="enUS" label="英文名称" width="400"></el-table-column>
        <el-table-column prop="zhTW" label="中文名称" width="500"></el-table-column>
        <el-table-column label="操作" width="140" fixed="right">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @current-change="handlePageChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="totalItems"
        layout="prev, pager, next"
        style="margin-top: 20px; text-align: center;">
      </el-pagination>

      <!-- 编辑弹框 -->
      <el-dialog :title="diabloTitle" v-model="dialogVisible" :modal-append-to-body="true" :lock-scroll="true"
        :close-on-click-modal="false" width="80%" height="100%" @close="diablo_clear" @before-close="diablo_clear">
        <!-- DiabloEdit 组件 -->
        <DiabloEdit v-if="dialogVisible" :paramValue="editItem.key" :editItem="editItem" />
      </el-dialog>

    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed,onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { apiQuery } from '@/api/interface_plug';
import DiabloEdit from './DiabloEdit.vue'; // 导入自定义的 DiabloEdit 组件

interface Uniqueitem {
  id: number;
  type: string;
  key: string;
  enUS: string;
  zhTW: string;
}

const options = [
  { label: '全部', value: 'all' },
  { label: 'item-names', value: 'item-names' },
  { label: 'bnet', value: 'bnet' },
  { label: 'chinese-overlay', value: 'chinese-overlay' },
  { label: 'commands', value: 'commands' },
  { label: 'item-gems', value: 'item-gems' },
  { label: 'item-modifiers', value: 'item-modifiers' },
  { label: 'item-nameaffixes', value: 'item-nameaffixes' },
  { label: 'item-runes', value: 'item-runes' },
  { label: 'keybinds', value: 'keybinds' },
  { label: 'levels', value: 'levels' },
  { label: 'mercenaries', value: 'mercenaries' },
  { label: 'monsters', value: 'monsters' },
  { label: 'npcs', value: 'npcs' },
  { label: 'objects', value: 'objects' },
  { label: 'presence-states', value: 'presence-states' },
  { label: 'quests', value: 'quests' },
  { label: 'shrines', value: 'shrines' },
  { label: 'skills', value: 'skills' },
  { label: 'ui-controller', value: 'ui-controller' },
  { label: 'ui', value: 'ui' },
  { label: 'vo', value: 'vo' }
];

export default defineComponent({
  name: 'Diablostring',
  components: { DiabloEdit }, // 注册 DiabloEdit 组件
  setup() {

    onMounted(() => {
      fetchData(); // 页面加载时自动调用查询函数
    });

    const searchKeyword = ref<string>('');  // 搜索关键字
    const filters = reactive({
      textName: 'all' // 默认选中'全部'
    });

    const currentPage = ref(1);
    const pageSize = ref(10);
    const totalItems = ref(0);

    const dialogVisible = ref<boolean>(false);
    const diabloTitle = ref<string>('编辑项'); // 弹框标题
    const editItem = reactive<Partial<Uniqueitem>>({
      id: 0,
      type: '',
      key: '',
      enUS: '',
      zhTW: '',
    });

    const allData = ref<Uniqueitem[]>([{
      id: 0,
      type: '',
      key: '',
      enUS: '',
      zhTW: '',
    }]); // 初始空的数组，待后端数据填充
    

    // 获取数据并更新totalItems
    const fetchData = async () => {
      try {
        const response = await apiQuery({
          keyword: searchKeyword.value,
          type: filters.textName,
          page: currentPage.value,
          pageSize: pageSize.value
        });

        console.log('Response:', response);
        allData.value = response.items; // 当前页的数据
        totalItems.value = response.total; // 设置总条数以用于分页
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // 分页变更时调用查询
    const handlePageChange = (page: number) => {
      currentPage.value = page;
      fetchData(); // 重新获取数据
    };


    const filteredData = computed(() => {
      return allData.value;  // 这里不再过滤，由后端直接返回正确的数据
    });

    const total = ref<number>(0);  // 总记录数

    const paginatedData = computed(() => {
      return allData.value;  // 后端已分页处理，这里无需再分页
    });

    const handleSearch = () => {
      currentPage.value = 1;
      fetchData();  // 在搜索时触发数据刷新
    };

    const addJson = () => {
      dialogVisible.value = true;
      clearEditItem()
    };

    const clearEditItem = () => {
      editItem.id = 0;
      editItem.enUS = '';
      editItem.zhTW = '';
      editItem.key = '';
      editItem.type = '';
    };


    const diablo_clear = () => {
      dialogVisible.value = false;
    };

    const handleEdit = (item: Uniqueitem) => {
      console.log('handleEdit', item);
      editItem.id = item.id;
      editItem.enUS = item.enUS;
      editItem.zhTW = item.zhTW;
      editItem.key = item.key;
      editItem.type = item.type;
      dialogVisible.value = true; // 确保设置为 true

    };

    const handleDelete = (item: Uniqueitem) => {
      allData.value = allData.value.filter((i) => i.id !== item.id);
      ElMessage.success('删除成功');
    };

    const handleSave = () => {
      const index = allData.value.findIndex((i) => i.id === editItem.id);
      if (index !== -1 && editItem.enUS && editItem.zhTW) {
        allData.value[index].enUS = editItem.enUS;
        allData.value[index].zhTW = editItem.zhTW;
        dialogVisible.value = false;
        ElMessage.success('保存成功');
      } else {
        ElMessage.error('保存失败');
      }
    };

    // 定义 handleClose 方法
    const handleClose = () => {
      dialogVisible.value = false;
    };

    return {
      searchKeyword,
      filters,
      currentPage,
      pageSize,
      filteredData,
      paginatedData,
      handleSearch,
      handlePageChange,
      handleEdit,
      handleDelete,
      handleSave,
      dialogVisible,
      diabloTitle,
      editItem,
      totalItems,
      addJson,
      diablo_clear,
      options,
      handleClose, // 确保这个方法被返回
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
