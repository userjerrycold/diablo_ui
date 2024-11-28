<template>
  <div class="unique-item-detail">
    <!-- 其他字段 -->
    <div class="item-section">
      <h3 class="section-title">其他字段</h3>
      <hr class="section-divider" />
      <div class="attributes-container">
        <div
          v-for="(value, key) in otherAttributes"
          :key="key"
          class="attribute-row"
        >
          <label class="attribute-key">{{ key }}:</label>
          <el-input
            v-model="editableAttributes[key]"
            :placeholder="`请输入${key}`"
            class="attribute-input"
          />
        </div>
      </div>
    </div>

    <!-- 装备属性 -->
    <div class="item-section">
      <h3 class="section-title">装备属性</h3>
      <hr class="section-divider" />
      <div class="attributes-container">
        <div
          v-for="(value, key) in filteredAttributes"
          :key="key"
          class="attribute-row"
        >
          <label class="attribute-key">{{ key }}:</label>
          <el-input
            v-model="editableAttributes[key]"
            :placeholder="`请输入${key}`"
            class="attribute-input"
          />
        </div>
      </div>
    </div>

    <!-- 按钮 -->
    <div class="actions">
      <el-button type="primary" @click="saveChanges">保存</el-button>
      <el-button @click="cancelChanges">取消</el-button>
      <el-button @click="previewItem">预览</el-button>
    </div>

    <!-- 详情弹窗 -->
    <el-dialog
      title=""
      width="50%"
      :modal="true"
      v-model="previewVisible"
      :append-to-body="true"
      style="background-color: rgba(3, 3, 3, 0.9);"
    >
      <UniqueItemDetail :item="editableAttributes" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import UniqueItemDetail from './UniqueItemDetail.vue';

export default defineComponent({
  name: 'UniqueItemEdit',
  components: {
    UniqueItemDetail,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const editableAttributes = reactive({ ...props.item });
    const previewVisible = ref(false);
    const editAttributes = reactive({
      xId: 1,
      index: '',
      rarity: '1',
      lvl: 12,
      lvlReq: 9,
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
      prop1: '',
      par1: '',
      min1: 1,
      max1: 1,
      prop2: '',
      par2: '',
      min2: 1,
      max2: 1,
      prop3: '',
      par3: '',
      min3: 1,
      max3: 1,
      prop4: '',
      par4: '',
      min4: 1,
      max4: 1,
      prop5: '',
      par5: '',
      min5: 1,
      max5: 1,
      prop6: '',
      par6: '',
      min6: 1,
      max6: 1,
      prop7: '',
      par7: '',
      min7: 1,
      max7: 1,
      prop8: '',
      par8: '',
      min8: 1,
      max8: 1,
      prop9: '',
      par9: '',
      min9: 1,
      max9: 1,
      prop10: '',
      par10: '',
      min10: 1,
      max10: 1,
      prop11: '',
      par11: '',
      min11: 1,
      max11: 1,
      prop12: '',
      par12: '',
      min12: 1,
      max12: 1,
                
    });
    

    // 过滤仅显示 prop1~prop12 和对应的 par/min/max 属性，隐藏 *str 属性
    const filteredAttributes = computed(() => {
      const validKeys = [];
      for (let i = 1; i <= 12; i++) {
        validKeys.push(`prop${i}`, `par${i}`, `min${i}`, `max${i}`);
      }
      return Object.keys(editableAttributes)
        .filter((key) => validKeys.includes(key))
        .reduce((result, key) => {
          result[key] = editableAttributes[key];
          return result;
        }, {});
    });

    // 显示其他字段，排除装备属性字段和隐藏 *str 属性
    const otherAttributes = computed(() => {
      const excludedKeys = [];
      for (let i = 1; i <= 12; i++) {
        excludedKeys.push(`prop${i}`, `par${i}`, `min${i}`, `max${i}`, `par${i}str`);
      }
      return Object.keys(editableAttributes)
        .filter((key) => !excludedKeys.includes(key))
        .reduce((result, key) => {
          result[key] = editableAttributes[key];
          return result;
        }, {});
    });

    const saveChanges = () => {
      emit('save', { ...editableAttributes });
      ElMessage.success('保存成功！');
    };

    const cancelChanges = () => {
      // 刷新页面
      window.location.reload();
    };

    const previewItem = () => {
      previewVisible.value = true;
    };

    return {
      editableAttributes,
      filteredAttributes,
      otherAttributes,
      editAttributes,
      saveChanges,
      cancelChanges,
      previewItem,
      previewVisible,
    };
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
}

.section-divider {
  border: none;
  border-top: 1px solid #555;
  margin-bottom: 10px;
}

.attributes-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.attribute-row {
  display: flex;
  align-items: center;
  width: calc(25% - 10px); /* 每行展示四个 */
}

.attribute-key {
  width: 80px;
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
</style>