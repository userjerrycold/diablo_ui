<template>
  <el-menu
    :default-active="activeMenu"
    class="el-menu-vertical-demo"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    center
  >
    <el-menu-item index="/">首页</el-menu-item>

    <el-sub-menu index="1">
      <template #title>
        <span>暗黑资料</span>
      </template>
      <el-menu-item index="/diablostring">暗黑文本</el-menu-item>
      <el-menu-item index="/unique">暗金装备</el-menu-item>
      <el-menu-item index="/skill">技能查询</el-menu-item>
      <el-menu-item index="/properties">属性列表</el-menu-item>
      <el-menu-item index="/color">颜色代码</el-menu-item>
      <!-- 你可以在这里添加更多子菜单项 -->
    </el-sub-menu>
    <!-- 你可以在这里添加更多菜单项 -->
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: 'Navigation',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const activeMenu = ref(route.path);

    const handleSelect = (key: string) => {
      router.push(key);
    };

    onMounted(() => {
      activeMenu.value = route.path;
    });

    return {
      activeMenu,
      handleSelect,
    };
  },
});
</script>

<style scoped>
.el-menu{
  position:fixed;
  top:0;
  left:0;
  width: 100%;
  height: 100vh;
}



.el-menu {
  width: 200px;
  height: 100vh;
}
</style>
