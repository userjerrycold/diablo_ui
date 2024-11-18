<template>
    <div class="unique-item-detail">
      <p class="item-name">{{ item.value.indexZh }} ({{ item.value.lvl }})</p>
      <p class="item-en-name">{{ item.value.index }}</p>
      <p class="item-level-req">等级要求：{{ item.value.lvlReq }}</p>
      <div v-for="(prop, index) in properties" :key="index">
        <p class="item-property">{{ prop }}</p>
      </div>
    </div>
  </template>
  
  <script>
export default {

  props: {
    item: {
        type: Object,
        required: true
    }
  },
  mounted() {
    console.log('mounted', this.item);
    console.log('computed', this.item.value.pro);
  },
  
  computed: {

    
    properties() {
      return [
        this.item.value.prop1Str,
        this.item.value.prop2Str,
        this.item.value.prop3Str,
        this.item.value.prop4Str,
        this.item.value.prop5Str,
        this.item.value.prop6Str,
        this.item.value.prop7Str,
        this.item.value.prop8Str,
        this.item.value.prop9Str,
        this.item.value.prop10Str,
        this.item.value.prop11Str,
        this.item.value.prop12Str
      ].filter(prop => prop); // 过滤掉为空的属性
    }
  }
}
</script>
  
  <style scoped>
  .unique-item-detail {
  text-align: center; /* 全局居中 */
}

.item-name {
  color: #FFD700; /* 改为亮金色，提升对比度 */
  font-size: 26px; /* 稍微增大字体 */
  font-family: "KaiTi", serif;
  margin-bottom: 12px;
  font-weight: bold; /* 加粗文字 */
}

.item-en-name {
  color: #D3D3D3; /* 浅灰色，亮度适中 */
  font-size: 22px; /* 字体增大 */
  font-family: "Arial", serif;
}

.item-level-req {
  color: #FFFFFF; /* 白色，适合暗色背景 */
  font-size: 22px; /* 字体稍大 */
  font-family: "KaiTi", serif;
  margin-bottom: 12px;
}

.item-property {
  color: #87CEFA; /* 亮蓝色，提升对比度 */
  font-size: 22px; /* 字体稍大 */
  font-family: "KaiTi", serif;
  font-weight: bold; /* 加粗文字 */
}
  </style>