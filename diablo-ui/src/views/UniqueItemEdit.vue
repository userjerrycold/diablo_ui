<template>
  <div class="unique-item-detail">
    <div class="item-section">
      <h3 class="section-title">基本属性</h3>
      <div v-for="(value, key) in editableAttributes" :key="key" class="attribute-row">
        <label class="attribute-key">{{ key }}:</label>
        <el-input
          v-model="editableAttributes[key]"
          :placeholder="`请输入${key}`"
          class="attribute-input"
        />
      </div>
    </div>
    <div class="actions">
      <el-button type="primary" @click="saveChanges">保存</el-button>
      <el-button @click="cancelChanges">取消</el-button>
      <el-button @click="previewItem">预览</el-button>
    </div>
    <!-- 预览弹窗 -->
    <el-dialog v-model="previewVisible" title="预览" width="40%">
      <div class="preview-content">
        <p class="item-name">{{ editableAttributes.indexZh }}</p>
        <p class="item-en-name">{{ editableAttributes.index }}</p>
        <p class="item-level-req">等级要求：{{ editableAttributes.lvlReq }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'UniqueItemEdit',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const editableAttributes = reactive({ ...props.item.value });
    const previewVisible = ref(false);

    const saveChanges = () => {
      emit('save', { ...editableAttributes });
      ElMessage.success('保存成功！');
    };

    const cancelChanges = () => {
      Object.assign(editableAttributes, props.item.value);
      ElMessage.info('已取消更改');
    };

    const previewItem = () => {
      previewVisible.value = true;
    };

    return { editableAttributes, saveChanges, cancelChanges, previewItem, previewVisible };
  },
});
</script>

<style scoped>
.unique-item-detail {
  font-family: 'KaiTi', serif;
  color: white;
  padding: 20px;
}

.item-section {
  margin-top: 10px;
}

.section-title {
  font-size: 20px;
  color: #d4af37; /* 金色 */
  margin-bottom: 10px;
  border-bottom: 1px solid #555;
  padding-bottom: 5px;
}

.attribute-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.attribute-key {
  width: 150px;
  color: #a8a8a8; /* 浅灰色 */
  font-size: 16px;
  text-align: right;
  margin-right: 10px;
}

.attribute-input {
  flex: 1;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.actions .el-button {
  margin-left: 10px;
}

.preview-content {
  text-align: center;
}

.preview-content .item-name {
  color: #c5b176; /* 金色 */
  font-size: 24px;
  font-weight: bold;
}

.preview-content .item-en-name {
  color: #D3D3D3; /* 灰色 */
  font-size: 20px;
}

.preview-content .item-level-req {
  color: white;
  font-size: 18px;
}
</style>