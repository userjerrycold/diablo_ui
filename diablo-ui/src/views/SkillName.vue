<template>
  <div class="skill-name">
    <!-- 查询条件 -->
    <el-card class="search-panel" shadow="hover">
      <el-form :model="searchForm" inline>
        <el-form-item label="关键字">
          <el-input v-model="searchForm.keyword" placeholder="请输入技能关键字" clearable />
        </el-form-item>
        <el-form-item label="职业">
          <el-select v-model="searchForm.player" placeholder="请选择职业" clearable>
            <el-option label="全部" value="all"></el-option>
            <el-option label="亚马逊" value="ama"></el-option>
            <el-option label="死灵法师" value="nec"></el-option>
            <el-option label="法师" value="sor"></el-option>
            <el-option label="刺客" value="ass"></el-option>
            <el-option label="德鲁伊" value="dru"></el-option>
            <el-option label="野蛮人" value="bar"></el-option>
            <el-option label="圣骑士" value="pal"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="表类型">
          <el-select v-model="searchForm.isTable" placeholder="请选择表类型" clearable>
            <el-option label="技能名映射" value="true"></el-option>
            <el-option label="技能表映射" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchSkills">查询</el-button>
          <el-button type="default" @click="resetSearchForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 查询结果 -->
    <el-card class="result-panel" shadow="hover">
      <el-table :data="skillData.records" border stripe style="width: 100%">
        <el-table-column prop="id" label="编号" width="80" align="center" />
        <el-table-column prop="enUs" label="技能英文名" align="center" />
        <el-table-column prop="skillNo" label="技能编号" align="center" />
        <el-table-column prop="player" label="职业" align="center" />
        <el-table-column prop="skillName" label="技能名" align="center" />
        <el-table-column prop="skillInfo" label="技能信息" align="center" />
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :page-size="searchForm.pageSize"
        :total="skillData.total"
        :current-page="searchForm.page + 1"
        @current-change="handlePageChange"
      />
    </el-card>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { apiQuerySkill, SkillQueryParams, SkillRecord } from "@/api/interface_plug";

export default defineComponent({
  name: "SkillName",
  setup() {
    // 搜索表单类型定义
    interface SearchForm {
      keyword: string;
      player: string;
      isTable: string;
      page: number;
      pageSize: number;
    }

    // 搜索结果类型定义
    interface SkillData {
      records: SkillRecord[];
      total: number;
    }

    // 搜索表单数据
    const searchForm = ref<SearchForm>({
      keyword: "",
      player: "all",
      isTable: "true",
      page: 0,
      pageSize: 10,
    });

    // 查询结果数据
    const skillData = ref<SkillData>({
      records: [],
      total: 0,
    });

    // 获取技能数据
    const fetchSkills = async () => {
      try {
        const result = await apiQuerySkill(searchForm.value as SkillQueryParams);
        skillData.value.records = result.items;
        skillData.value.total = result.total;
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    // 重置搜索表单
    const resetSearchForm = () => {
      searchForm.value = {
        keyword: "",
        player: "all",
        isTable: "true",
        page: 0,
        pageSize: 10,
      };
      fetchSkills();
    };

    // 页码切换
    const handlePageChange = (page: number) => {
      searchForm.value.page = page - 1; // 后端分页从 0 开始
      fetchSkills();
    };

    return {
      searchForm,
      skillData,
      fetchSkills,
      resetSearchForm,
      handlePageChange,
    };
  },
});
</script>

<style scoped>
.skill-name {
  padding: 20px;
}
.search-panel {
  margin-bottom: 20px;
}
.result-panel {
  margin-top: 10px;
}
</style>
