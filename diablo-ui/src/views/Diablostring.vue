<template>
  <el-container style="height: 100vh;">
    <el-header>
      <el-input
        v-model="searchKeyword"
        placeholder="请输入关键字搜索"
        clearable
        @keyup.enter.native="handleSearch"
        style="width: 300px;"
      >
        <template #append>
          <el-button @click="handleSearch" type="primary">搜索</el-button>
        </template>
      </el-input>
    </el-header>

    <el-main>
      <el-row :gutter="20" style="margin-bottom: 20px;">
        <el-col :span="12">
          <el-form :inline="true" :model="filters">
            <el-form-item label="文本名称">
              <el-select size="medium" v-model="filters.textName" placeholder="请选择" style="width: 300px;">
                <!-- 动态渲染下拉选项 -->
                <el-option
                  v-for="option in options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-table
        :data="paginatedData"
        style="width: 100%"
        stripe
      >
        <el-table-column prop="id" label="序号" width="80"></el-table-column>
        <el-table-column prop="key" label="编码" width="200"></el-table-column>
        <el-table-column prop="enus" label="英文名称" width="400"></el-table-column>
        <el-table-column prop="zhtw" label="中文名称" width="500"></el-table-column>
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @current-change="handlePageChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="filteredData.length"
        style="margin-top: 20px; text-align: right;"
      ></el-pagination>

      <!-- 编辑弹框 -->
      <el-dialog
        title="编辑项"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose"
      >
        <el-form :model="editItem">
          <el-form-item label="编码" label-width="100px">
            <el-input v-model="editItem.key" disabled></el-input>
          </el-form-item>
          <el-form-item label="英文名称" label-width="100px">
            <el-input v-model="editItem.enus"></el-input>
          </el-form-item>
          <el-form-item label="中文名称" label-width="100px">
            <el-input v-model="editItem.zhtw"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </template>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue';
import { ElMessage } from 'element-plus';

interface Uniqueitem {
  id: number;
  key: string;
  enus: string;
  zhtw: string;
}

const options = [
  { label: '全部', value: 'all' },
  { label: 'item-names.json', value: 'item-names.json' },
  { label: 'ui.json', value: 'ui.json' },
  { label: 'skills.json', value: 'skills.json' }
];

export default defineComponent({
  name: 'Diablostring',
  setup() {
    const searchKeyword = ref<string>('');
    const filters = reactive({
      textName: 'all' // 默认选中'全部'
    });

    const currentPage = ref<number>(1);
    const pageSize = ref<number>(10);
    const dialogVisible = ref<boolean>(false);
    const editItem = reactive<Partial<Uniqueitem>>({
      id: 0,
      key: '',
      enus: '',
      zhtw: '',
    });

    const allData = ref<Uniqueitem[]>([
      // Mock 数据
      { id: 1, key: 'item-names.json', enus: 'Item Names', zhtw: '物品名称' },
      { id: 2, key: 'ui.json', enus: 'UI Labels', zhtw: '界面标签' },
      { id: 3, key: 'skills.json', enus: 'Skill Names', zhtw: '技能名称' },
    ]);

    const filteredData = computed(() => {
      return allData.value.filter((item) => {
        const matchesKeyword =
          searchKeyword.value === '' ||
          Object.values(item).some((val) =>
            val.toLowerCase().includes(searchKeyword.value.toLowerCase())
          );
        const matchesFilter =
          filters.textName === 'all' || item.key === filters.textName;
        return matchesKeyword && matchesFilter;
      });
    });

    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      return filteredData.value.slice(start, end);
    });

    const handleSearch = () => {
      currentPage.value = 1;
    };

    const handlePageChange = (page: number) => {
      currentPage.value = page;
    };

    const handleEdit = (item: Uniqueitem) => {
      editItem.id = item.id;
      editItem.key = item.key;
      editItem.enus = item.enus;
      editItem.zhtw = item.zhtw;
      dialogVisible.value = true;
    };

    const handleDelete = (item: Uniqueitem) => {
      allData.value = allData.value.filter((i) => i.id !== item.id);
      ElMessage.success('删除成功');
    };

    const handleSave = () => {
      const index = allData.value.findIndex((i) => i.id === editItem.id);
      if (index !== -1 && editItem.enus && editItem.zhtw) {
        allData.value[index].enus = editItem.enus;
        allData.value[index].zhtw = editItem.zhtw;
        dialogVisible.value = false;
        ElMessage.success('保存成功');
      } else {
        ElMessage.error('保存失败');
      }
    };

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
      editItem,
      options,
    };
  },
});
</script>

<style scoped>
.el-header {
  padding: 10px;
  background-color: #f5f5f5;
}

.el-select {
  width: 300px;
}
</style>
