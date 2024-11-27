<template>
  <el-container>
    <el-header style="background-color: white;">
      <el-input
          v-model="keyword"
          placeholder="请输入关键字搜索"
          size="large"
          clearable
          @keyup.enter="fetchProperties"
          style="width: 300px; margin-right: 10px;"
      />
      <el-button type="primary" @click="fetchProperties">搜索</el-button>
      <el-button type="success" @click="openEditDialog()">新增</el-button>
    </el-header>
    <el-main>
      <el-table
          :data="properties"
          border
          style="width: 100%;"
          :pagination="pagination"
      >
        <el-table-column prop="id" label="编号" width="100" />
        <el-table-column prop="property" label="属性" />
        <el-table-column prop="state" label="状态" />
        <el-table-column prop="zhTw" label="描述" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" type="primary" @click="openEditDialog(scope.row)">编辑</el-button>
            <el-button
                size="small"
                type="danger"
                @click="confirmDelete(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          v-model:current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          @current-change="fetchProperties"
          layout="prev, pager, next, ->"
      />
    </el-main>

    <!-- 编辑弹框 -->
    <el-dialog v-model="dialogVisible" title="编辑属性">
      <el-form :model="editForm" ref="editForm">
        <el-form-item label="属性" prop="property">
          <el-input v-model="editForm.property" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input v-model="editForm.state" />
        </el-form-item>
        <el-form-item label="描述" prop="zhTW">
          <el-input v-model="editForm.zhTw" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveProperty">保存</el-button>
      </template>
    </el-dialog>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'Properties',
  setup() {
    const keyword = ref('');
    const properties = ref([]);
    const pagination = reactive({
      currentPage: 1,
      pageSize: 10,
      total: 0,
    });
    const dialogVisible = ref(false);
    const editForm = reactive({
      id: null,
      property: '',
      state: '',
      zhTw: '',
    });

    // 获取数据
    const fetchProperties = async (page = pagination.currentPage) => {
      try {
        const response = await axios.get('/quest/properties', {
          params: {
            keyword: keyword.value,
            page,
            pageSize: pagination.pageSize,
          },
        });
        const { data, total } = response.data;
        console.log('获取数据成功:', data)
        properties.value = data;
        pagination.total = total;
      } catch (error) {
        console.error('获取数据失败:', error);
      }
    };

    // 打开编辑弹窗
    const openEditDialog = (row: any = null) => {
      dialogVisible.value = true;
      if (row) {
        // 编辑现有项
        Object.assign(editForm, row);
      } else {
        // 新增项
        editForm.id = null;
        editForm.property = '';
        editForm.state = '';
        editForm.zhTw = '';
      }
    };

    // 保存或更新属性
    const saveProperty = async () => {
      try {
        if (editForm.id) {
          // 编辑
          await axios.put(`/quest/properties/${editForm.id}`, {
            property: editForm.property,
            state: editForm.state,
            zhTw: editForm.zhTw,
          });
        } else {
          // 新增
          await axios.post('/quest/properties', {
            property: editForm.property,
            state: editForm.state,
            zhTw: editForm.zhTw,
          });
        }
        dialogVisible.value = false;
        fetchProperties(); // 刷新列表
      } catch (error) {
        console.error('保存失败:', error);
      }
    };

    // 确认删除
    const confirmDelete = (id: number) => {
      if (confirm('确认删除该属性？')) {
        deleteProperty(id);
      }
    };

    // 删除属性
    const deleteProperty = async (id: number) => {
      try {
        await axios.delete(`/quest/properties/${id}`);
        fetchProperties(); // 刷新列表
      } catch (error) {
        console.error('删除失败:', error);
      }
    };

    // 初始化
    onMounted(() => {
      fetchProperties();
    });

    return {
      keyword,
      properties,
      pagination,
      dialogVisible,
      editForm,
      fetchProperties,
      openEditDialog,
      saveProperty,
      confirmDelete,
    };
  },
});
</script>

<style scoped>
.el-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 20px;
  background: #f5f5f5;
  border-bottom: 1px solid #ebeef5;
}

.el-table {
  margin-top: 20px;
}

.el-dialog .el-form {
  padding: 20px;
}
</style>
