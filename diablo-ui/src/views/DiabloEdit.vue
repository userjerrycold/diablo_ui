<template>
  <div class="diablo-edit">
    <el-form :model="editItem" label-width="100px">
      <!-- 序号 -->
      <el-form-item label="序号">
        <el-input
          style="width: 150px;"
          v-model="editItem.id"
          :disabled="isEdit"
          @blur="validateId"
        ></el-input>
        <span v-if="idError" class="error-text">&nbsp;&nbsp;序号必须为数字且不能为空</span>
      </el-form-item>

      <!-- 编码 -->
      <el-form-item label="编码">
        <el-input
          style="width: 350px;"
          v-model="editItem.key"
          @blur="validateKey"
        ></el-input>
        <span v-if="keyError" class="error-text">&nbsp;&nbsp;编码只能包含字母、数字、符号、空格且不能为空</span>
      </el-form-item>

      <!-- 文本名称 (改为单选框) -->
      <el-form-item label="文本名称">
        <el-select
          style="width: 200px;"
          v-model="editItem.type"
          placeholder="请选择文本名称"
          @blur="validateType"
        >
          <el-option
            v-for="option in options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
        <span v-if="typeError" class="error-text">&nbsp;&nbsp;请选择文本名称</span>
      </el-form-item>

      <!-- 英文名称 -->
      <el-form-item label="英文名称">
        <el-input @blur="validateEnUS" v-model="editItem.enUS"></el-input>
        <span v-if="enUSError" class="error-text">&nbsp;&nbsp;英文名称不能为空</span>
      </el-form-item>

      <!-- 中文名称 -->
      <el-form-item label="中文名称">
        <el-input @blur="validateZhTW" v-model="editItem.zhTW"></el-input>
        <span v-if="zhTWError" class="error-text">&nbsp;&nbsp;中文名称不能为空</span>
      </el-form-item>
    </el-form>

    <el-row>
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <el-button type="primary" @click="editAndSave">保存</el-button>
      </el-col>
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <el-button type="primary" @click="closePage">取消</el-button>
      </el-col>
    </el-row>
    <br />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted} from 'vue';
import { save } from '@/api/interface_plug';
import type { PropType } from 'vue';
import { ElMessage } from 'element-plus';

const options = [
  { label: 'item-names', value: 'item-names' },
  { label: 'bnet', value: 'bnet' },
  { label: 'chinese-overlay', value: 'chinese-overlay' },
  { label: 'commands', value: 'commands' },
  { label: 'item-gems', value: 'item-gems' },
  { label: 'item-modifiers', value: 'item-modifiers' },
  { label: 'item-nameaffixes', value: 'item-nameaffixes' },
  { label: 'item-runes', value: 'item-runes' },
  { label: 'keybinds', value: 'keybinds' },
  { label: 'levels', value: 'levels' },
  { label: 'mercenaries', value: 'mercenaries' },
  { label: 'monsters', value: 'monsters' },
  { label: 'npcs', value: 'npcs' },
  { label: 'objects', value: 'objects' },
  { label: 'presence-states', value: 'presence-states' },
  { label: 'quests', value: 'quests' },
  { label: 'shrines', value: 'shrines' },
  { label: 'skills', value: 'skills' },
  { label: 'ui-controller', value: 'ui-controller' },
  { label: 'ui', value: 'ui' },
  { label: 'vo', value: 'vo' }
];

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
      default: () => ({
        id: 0,
        key: '',
        type: '',
        enUS: '',
        zhTW: ''
      })
    }
  },
  setup(props) {
    const editItem = ref({ ...props.editItem });
    const isEdit = ref<boolean>(false);
    const idError = ref(false);
    const keyError = ref(false);
    const typeError = ref(false);
    const enUSError = ref(false);
    const zhTWError = ref(false);

    const validateId = () => {
      idError.value = editItem.value.id === null || String(editItem.value.id).trim() === '' || isNaN(Number(editItem.value.id));
    };

    const validateKey = () => {
      keyError.value = !/^[A-Za-z0-9\s]*$/.test(editItem.value.key) || !editItem.value.key;
    };

    const validateType = () => {
      typeError.value = !editItem.value.type;
    };

    const validateEnUS = () => {
      enUSError.value = !editItem.value.enUS;
    };

    const validateZhTW = () => {
      zhTWError.value = !editItem.value.zhTW;
    };

    const editAndSave = () => {
      validateId();
      validateKey();
      validateType();
      validateEnUS();
      validateZhTW();

      if (idError.value || keyError.value || typeError.value || enUSError.value || zhTWError.value) {
        ElMessage.error('请先检查输入格式是否有误');
        return;
      }

      // 验证通过，执行保存逻辑
      console.log('保存数据:', editItem.value);
      //调用save方法
      save(editItem.value).then((result) => {
        console.log('result: ',result.code)
        if(result.code == 0){
          ElMessage.success('保存成功')
        }else{
          ElMessage.error('保存失败['+result.code+']')
        }
      }).catch(error => {
        ElMessage.error('保存失败');
      });
    };

    const closePage = () => {
      window.location.reload();
    }

    onMounted(() => {
      editItem.value = { ...props.editItem };
      isEdit.value = props.editItem.id === 0;
    });

    return {
      isEdit,
      editItem,
      editAndSave,
      options,
      validateId,
      validateKey,
      validateType,
      validateEnUS,
      validateZhTW,
      closePage,
      idError,
      keyError,
      typeError,
      enUSError,
      zhTWError
    };
  }
});
</script>

<style scoped>
.diablo-edit {
  margin: 20px;
}

.error-text {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
