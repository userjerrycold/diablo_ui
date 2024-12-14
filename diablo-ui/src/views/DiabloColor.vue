<template>
  <div class="color-grid">
    <div
      v-for="color in colors"
      :key="color.code"
      class="color-item"
      @click="assignColorCode(color.code)"
    >
      <div :style="{ backgroundColor: color.hex }" class="color-box"></div>
      <p class="color-name">{{ color.name }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {ElMessage} from "element-plus";

export default defineComponent({
  name: 'DiabloColor',
  setup() {
    // 定义颜色数据
    const colors = ref([
      { code: 'ÿc0', hex: '#ffffff', name: '白色' },
      { code: 'ÿc1', hex: '#ff5c5c', name: '浅红色' },
      { code: 'ÿc2', hex: '#00ff00', name: '绿色' },
      { code: 'ÿc3', hex: '#7c7cff', name: '浅蓝色' },
      { code: 'ÿc4', hex: '#cebc84', name: '浅棕色' },
      { code: 'ÿc5', hex: '#777777', name: '灰色' },
      { code: 'ÿc6', hex: '#000000', name: '黑色' },
      { code: 'ÿc7', hex: '#d6c98a', name: '浅卡其色' },
      { code: 'ÿc8', hex: '#ffb200', name: '橙黄色' },
      { code: 'ÿc9', hex: '#ffff72', name: '浅黄色' },
      { code: 'ÿc;', hex: '#b700ff', name: '紫色' },
      { code: 'ÿc:', hex: '#008d00', name: '深绿色' },
      { code: 'ÿcO', hex: '#ff8dff', name: '粉紫色' },
      { code: 'ÿcS', hex: '#d64c4c', name: '深红色' },
      { code: 'ÿcU', hex: '#ff0000', name: '红色' },
      { code: 'ÿcI', hex: '#63d8f0', name: '浅青色' },
      { code: 'ÿcN', hex: '#0bafe1', name: '蓝绿色' },
      { code: 'ÿcT', hex: '#8fccff', name: '浅天蓝色' },
      { code: 'ÿcP', hex: '#b4b4ff', name: '浅紫蓝色' },
      { code: 'ÿcM', hex: '#f0db99', name: '浅米黄色' },
    ]);


    // 赋值颜色代码
    const selectedColor = ref('');
    const assignColorCode = (code: string) => {
      selectedColor.value = code;
      navigator.clipboard.writeText(code).then(() => {

        ElMessage.success(`复制成功！颜色代码值为：${code}`)
      }).catch(() => {
        ElMessage.success('复制到剪切板失败，请手动复制！');
      });
    };

    return {
      colors,
      assignColorCode,
      selectedColor,
    };
  },
});
</script>

<style scoped>
.color-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 16px;
}

.color-item {
  text-align: center;
  cursor: pointer;
}

.color-box {
  width: 80px;
  height: 80px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 0 auto;
  transition: transform 0.2s ease;
}

.color-box:hover {
  transform: scale(1.1);
}

.color-name {
  margin-top: 8px;
  font-size: 14px;
  color: #333;
}
</style>
