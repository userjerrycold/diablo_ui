<template>
  <div class="diablo-edit">
    <el-form :model="editItem">
      <!--序号-->
      <el-form-item label="序号" label-width="100px">
        <el-input v-model="editItem.id" :disabled="isEdit"></el-input>
      </el-form-item>
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
        <el-input v-model="editItem.enUS"></el-input>
      </el-form-item>

      <!-- 中文名称 --> 
      <el-form-item label="中文名称" label-width="100px">
        <el-input v-model="editItem.zhTW"></el-input>
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
import { ElMessage } from 'element-plus';



export default defineComponent({
  name: 'DiabloEdit',
  props: {
    paramValue: {
      type: String as PropType<string>,
      required: true
    },
    editItem: {
      type: Object as PropType<{
        id: number;
        key: string;
        type: string;
        enUS: string;
        zhTW: string;
      }>,
      required: true,
      default: () => {
        return {
          id: 0,
          key: '',
          type: '',
          enUS: '',
          zhTW: ''
        };
      }
      
    }
  },
  setup(props) {
    const editItem = ref<{
      id: number;
      key: string;
      type: string;
      enUS: string;
      zhTW: string;
    }>({
      id: 0,
      key: '',
      type: '',
      enUS: '',
      zhTW: ''
    });

    const isEdit = ref<boolean>(false);

    const requestParam = ref<{ keyword: string }>({
      keyword: props.paramValue
    });

    const editAndSave = () => {
      console.log('passResult->' + editItem.value);
      //校验editItem.id如果等于0弹出错误提示并终止
      if (editItem.value.id == 0) {
        ELMessage.error('请先选择要编辑的行');
        return;
      }


    };

    onMounted(() => {
      console.log('mounted');

      console.log(props.editItem) 
      editItem.value = props.editItem;

      if(props.editItem.id == 0){
        isEdit.value = true;
      }


    });

    return {
      isEdit,
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
