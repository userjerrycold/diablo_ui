<template>
  <el-menu
    :default-active="activeMenu"
    class="el-menu-vertical-demo"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-sub-menu index="1">
      <template #title>
        <span>暗黑知识库</span>
      </template>
      <el-menu-item index="/diablostring">暗黑文本</el-menu-item>
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
.el-menu {
  width: 200px;
  height: 100vh;
}
</style>
