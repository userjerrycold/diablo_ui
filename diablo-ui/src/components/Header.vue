<template>
  <el-header>
    <h1>暗黑2WIKI</h1>
  </el-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderComponent',
});
</script>

<style scoped>
el-header {
  background-color: #409EFF;
  color: white;
  text-align: center;
  line-height: 60px;
}
h1 {
  margin: 0;
}
</style>
