<template>
  <div class="diablo-edit">
    <el-form :model="editItem">
      <!-- 编码 -->
      <el-form-item label="编码" label-width="100px">
        <el-input v-model="editItem.key" ></el-input>
      </el-form-item>

      <!-- 文本名称 -->
      <el-form-item label="文本名称" label-width="100px">
        <el-input v-model="editItem.type" ></el-input>
      </el-form-item>

      <!-- 英文名称 -->
      <el-form-item label="英文名称" label-width="100px">
        <el-input v-model="editItem.enus"></el-input>
      </el-form-item>

      <!-- 中文名称 -->
      <el-form-item label="中文名称" label-width="100px">
        <el-input v-model="editItem.zhtw"></el-input>
      </el-form-item>
    </el-form>

    <el-row>
      <el-col :span="6">&nbsp;</el-col>
      <el-col :span="6">&nbsp;</el-col>
      <el-col :span="6">&nbsp;</el-col>
      <el-col :span="6">
        <el-button type="primary" @click="editAndSave">保存</el-button>
      </el-col>
    </el-row>
    <br />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from 'vue';

export default defineComponent({
  name: 'DiabloEdit',
  props: {
    paramValue: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props) {
    const editItem = ref<{
      key: string;
      type: string;
      enus: string;
      zhtw: string;
    }>({
      key: '',
      type: '',
      enus: '',
      zhtw: ''
    });

    const requestParam = ref<{ keyword: string }>({
      keyword: props.paramValue
    });

    const editAndSave = () => {
      console.log('passResult->' + editItem.value);




    };

    onMounted(() => {
      console.log('mounted');

      
    });

    return {
      editItem,
      editAndSave
    };
  }
});
</script>

<style scoped>
.diablo-edit {
  margin: 20px;
}
</style>
