<template>
  <el-container style="height: 100vh;">
    <el-container>
      <el-aside width="200px">
        <Navigation />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navigation from '@/components/Navigation.vue';

export default defineComponent({
  name: 'App',
  components: {
    Navigation,
  },
});
</script>

<style>
body, html, #app {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
