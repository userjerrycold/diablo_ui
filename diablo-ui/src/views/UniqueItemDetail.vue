<template>
    <div class="unique-item-detail">
      <p class="item-name">{{ item.indexZh }} ({{ item.lvl }})</p>
      <p class="item-en-name">{{ item.index }}</p>
      <p class="item-level-req">等级要求：{{ item.lvlReq }}</p>
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
  },
  
  computed: {

    
    properties() {
      return [
        this.item.prop1Str,
        this.item.prop2Str,
        this.item.prop3Str,
        this.item.prop4Str,
        this.item.prop5Str,
        this.item.prop6Str,
        this.item.prop7Str,
        this.item.prop8Str,
        this.item.prop9Str,
        this.item.prop10Str,
        this.item.prop11Str,
        this.item.prop12Str
      ].filter(prop => prop); // 过滤掉为空的属性
    }
  }
}
</script>
  
<style scoped>
@font-face {
  font-family: "BlizzardGlobal";
  src: url("../assets/fonts/blizzardglobal-v5_81.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

.unique-item-detail {
  text-align: center; /* 全局居中 */
}

.item-name {
  color: #c5b176; /* 改为亮金色，提升对比度 */
  font-size: 28px; /* 稍微增大字体 */
  font-family: "BlizzardGlobal", serif; /* 使用自定义字体 */
  margin-bottom: 12px;
  font-weight: bold; /* 加粗文字 */
}

.item-en-name {
  color: #D3D3D3; /* 浅灰色，亮度适中 */
  font-size: 22px; /* 字体增大 */
  font-family: "BlizzardGlobal", serif; /* 使用自定义字体 */
}

.item-level-req {
  color: #FFFFFF; /* 白色，适合暗色背景 */
  font-size: 24px; /* 字体稍大 */
  font-family: "BlizzardGlobal", serif; /* 使用自定义字体 */
  margin-bottom: 12px;
}

.item-property {
  color: #7272ff; /* 亮蓝色，提升对比度 */
  font-size: 24px; /* 字体稍大 */
  font-family: "BlizzardGlobal", serif; /* 使用自定义字体 */
}
</style>
