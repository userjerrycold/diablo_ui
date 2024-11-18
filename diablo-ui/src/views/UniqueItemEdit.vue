<template>
    <div class="unique-item-detail">
      <div class="item-name">
        {{ item.indexZh }} (装备等级 {{ item.lvl }})
      </div>
      <div class="item-en-name">
        {{ item.index }}
      </div>
      <div class="item-level-req">
        等级要求：{{ item.lvlReq }}
      </div>
  
      <div v-for="(property, index) in itemProperties" :key="index" class="item-property">
        {{ property }}
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent,PropType } from 'vue';
  
  export default defineComponent({
    name: 'UniqueItemEdit',
    props: {
      item: {
        type: Object as PropType<{
          zhName: string;
          enName: string;
          equipLevel: number;
          levelReq: number;
          properties: string[];
        }>,
        required: true,
      },
    },
    computed: {
      itemProperties() {
        // 只取前 12 个属性
        return this.item.properties.slice(0, 12);
      },
    },
  });
  </script>
  
  <style scoped>
  .unique-item-detail {
    font-family: 'KaiTi', serif;
    color: white;
    line-height: 1.5;
  }
  .item-name {
    color: #61481f; /* 暗金色 */
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .item-en-name {
    color: #5a5858; /* 浅灰色 */
    font-size: 20px;
    margin-bottom: 10px;
  }
  .item-level-req {
    color: #FFFFFF; /* 白色 */
    font-size: 20px;
    margin-bottom: 20px;
  }
  .item-property {
    color: #0a22f6; /* 蓝色 */
    font-size: 20px;
  }
  </style>