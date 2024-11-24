<template>
  <el-container>
    <el-header>
      <h2 style="text-align: center;">公告页</h2>
    </el-header>
    <el-main>
      <el-card>
        <div v-if="content" v-html="renderedContent"></div>
        <div v-else style="text-align: center; color: gray;">暂无公告内容</div>
      </el-card>
      <el-button type="primary" @click="openEditDialog" style="margin-top: 20px;">编辑公告</el-button>
    </el-main>

    <el-dialog :visible.sync="dialogVisible" title="编辑公告" width="60%">
      <el-input
          type="textarea"
          v-model="markdownContent"
          :rows="10"
          placeholder="在这里输入 Markdown 格式的公告内容..."
      ></el-input>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveContent">保存</el-button>
      </template>
    </el-dialog>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import markdownIt from 'markdown-it';

export default defineComponent({
  name: 'Home',
  setup() {
    const dialogVisible = ref(false); // 控制弹窗显示
    const markdownContent = ref(''); // 编辑中的 Markdown 内容
    const content = ref(''); // 保存的公告内容

    // 实时渲染 Markdown 为 HTML
    const renderedContent = computed(() => {
      const md = markdownIt();
      return content.value ? md.render(content.value) : '';
    });

    // 打开编辑弹窗
    const openEditDialog = () => {
      markdownContent.value = content.value; // 初始化为当前内容
      dialogVisible.value = true;
    };

    // 保存编辑内容
    const saveContent = () => {
      content.value = markdownContent.value;
      dialogVisible.value = false;
    };

    return {
      dialogVisible,
      markdownContent,
      content,
      renderedContent,
      openEditDialog,
      saveContent,
    };
  },
});
</script>

<style scoped>
h2 {
  margin: 0;
  color: #333;
}

el-card {
  padding: 20px;
  background: #f9f9f9;
}

el-main {
  text-align: center;
}
</style>
