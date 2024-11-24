<template>
  <el-container>
    <el-header style="position: relative;">
      <div class="header-info">
        <span class="update-info">更新时间：{{ lastUpdateTime }}</span>
        <el-button
            type="primary"
            size="small"
            @click="openEditDialog"
            class="edit-button"
        >
          编辑公告
        </el-button>
      </div>
    </el-header>
    <el-main>
      <el-card class="announcement-card">
        <div class="content" v-if="announcementContent" v-html="renderedContent"></div>
        <div v-else style="text-align: center; color: gray;">暂无公告内容</div>
      </el-card>
    </el-main>

    <el-dialog v-model="dialogVisible" title="编辑公告" width="80%">
      <div>
        <div id="vditor" class="markdown-editor"></div>
        <div v-if="isPreview" class="preview-content" v-html="previewContent"></div>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveAnnouncement">保存</el-button>
      </template>
    </el-dialog>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, nextTick } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css'; // 引入 Vditor 样式
import markdownIt from 'markdown-it';
import axios from 'axios';

export default defineComponent({
  name: 'Announcement',
  setup() {
    const dialogVisible = ref(false); // 控制弹窗显示
    const draftContent = ref<string>(''); // 编辑中的内容
    const announcementContent = ref<string>(''); // 公告内容
    const lastUpdateTime = ref<string>(''); // 更新时间
    const isPreview = ref(false); // 控制预览模式
    const editor = ref<Vditor | null>(null); // 保存 Vditor 实例

    // 实时渲染 Markdown 内容为 HTML
    const renderedContent = computed(() => {
      const md = markdownIt();
      return announcementContent.value ? md.render(announcementContent.value) : '';
    });

    const previewContent = computed(() => {
      const md = markdownIt();
      return draftContent.value ? md.render(draftContent.value) : '';
    });

    // 初始化 Vditor 编辑器
    const initEditor = () => {
      editor.value = new Vditor('vditor', {
        height: 400,
        cache: false,
        placeholder: '输入公告内容，支持 Markdown 格式',
        toolbarConfig: {
          pin: true,
        },
        mode: 'sv', // sv 分屏模式
        preview: {
          show: true, // 默认开启分屏预览
          theme: {
            current: 'light', // 预览主题，可选值：'light' | 'dark'
          },
        },
        after: () => {
          if (draftContent.value) {
            editor.value?.setValue(draftContent.value);
          }
        },
        input: (value: string) => {
          draftContent.value = value;
        },
      });
    };


    // 初始化：从后端获取公告内容
    const fetchAnnouncement = async () => {
      try {
        const response = await axios.get('/quest/announcement');
        if (response && response.data && response.data.content) {
          const result = JSON.parse(response.data.content);
          announcementContent.value = result.content || ''; // 从接口中获取公告内容
          const updateDate = response.data.updatedAt.replace('T', ' ');
          lastUpdateTime.value = updateDate || ''; // 获取更新时间
        }
      } catch (error) {
        console.error('获取公告内容失败:', error);
      }
    };

    // 打开编辑弹窗
    const openEditDialog = () => {
      draftContent.value = announcementContent.value; // 初始化编辑内容
      dialogVisible.value = true;
      nextTick(() => initEditor()); // 弹窗打开后初始化 Vditor
    };


    // 保存公告内容到后端
    const saveAnnouncement = async () => {
      try {
        const content = editor.value?.getValue() || '';
        await axios.post('/quest/announcement', { content });
        announcementContent.value = content; // 保存成功后更新页面内容
        lastUpdateTime.value = new Date().toLocaleString(); // 更新为当前时间
        dialogVisible.value = false;
      } catch (error) {
        console.error('保存公告失败:', error);
      }
    };

    // 页面加载时获取公告内容
    onMounted(() => {
      fetchAnnouncement();
    });

    return {
      dialogVisible,
      draftContent,
      announcementContent,
      renderedContent,
      lastUpdateTime,
      isPreview,
      previewContent,
      openEditDialog,
      saveAnnouncement,
    };
  },
});
</script>

<style scoped>
.header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.update-info {
  color: #b8860b; /* 暗金色 */
  font-size: 14px;
}

.edit-button {
  background-color: #409eff;
  color: white;
}

.announcement-card {
  width: 80vw; /* 固定宽度 */
  height: 85vh; /* 固定高度 */
  margin: 0 auto;
  overflow-y: auto;
  background: url('@/assets/img/pageBGnew.png') no-repeat center center; /* 背景图片 */
  background-size: cover; /* 背景图全覆盖 */
  padding: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.9);
  border-radius: 20px;
}

.content {
  text-align: justify;
  line-height: 1.4;
  font-size: 16px;
  color: white; /* 调整文字颜色以适配背景 */
}

.markdown-editor {
  margin-bottom: 10px;
}

.preview-button {
  margin-top: 10px;
  text-align: right;
}

.preview-content {
  margin-top: 20px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
  font-size: 16px;
}
</style>
