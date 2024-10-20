<template>
  <el-container style="height: 100vh;">
    <el-header>
      <HeaderComponent />
    </el-header>
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
import HeaderComponent from '@/components/Header.vue';
import Navigation from '@/components/Navigation.vue';

export default defineComponent({
  name: 'App',
  components: {
    HeaderComponent,
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
