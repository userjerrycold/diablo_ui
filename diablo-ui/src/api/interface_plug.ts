import axios from './index';

// 定义查询参数的接口
interface QueryParams {
  keyword: string;
  type: string;
  page: number;
  pageSize: number;
}

// 定义API响应数据格式
interface ApiResponse<T> {
  items: T[];
  total: number;
}

// 定义Uniqueitem的数据格式
interface Uniqueitem {
  id: number;
  type: string;
  key: string;
  enus: string;
  zhtw: string;
}



interface QueryParamX {
  keyword: string;
  page: number;
  pageSize: number;
}

interface UniqueItemX {
  xId: number;                     // 唯一标识符
  index: string;                   // 英文名称
  indexZh: string;                 // 中文名称
  enabledStr: string;              // 状态字符串（例如“生效中”）
  rarity: string;                  // 稀有度
  lvl: number;                     // 等级
  lvlReq: number;                  // 等级要求
  codeStr: string;                 // 物品类型字符串
  enabled: number;                 // 是否启用（0 或 1）
  version: number;                 // 版本号
  firstladderseason: string;       // 第一个天梯赛季
  lastladderseason: string;        // 最后一个天梯赛季
  nolimit: string;                 // 是否无限制
  code: string;                    // 物品代码
  itemName: string;                // 物品名称
  carry1: string;                  // 是否只能携带一个
  costMult: number;                // 成本倍率
  costAdd: number;                 // 额外成本
  chrTransform: string;            // 角色转换外观代码
  invTransform: string;            // 背包图标转换代码
  flippyFile: string;              // 物品掉落图标文件
  invfile: string;                 // 背包图标文件
  dropsound: string;               // 掉落声音
  dropsfxframe: string;            // 掉落音效帧
  usesound: string;                // 使用声音
  prop1: string;                   // 属性 1 标识
  par1: string;                    // 属性 1 参数
  min1: number;                    // 属性 1 最小值
  max1: number;                    // 属性 1 最大值
  prop2: string;                   // 属性 2 标识
  par2: string;                    // 属性 2 参数
  min2: number;                    // 属性 2 最小值
  max2: number;                    // 属性 2 最大值
  prop3: string;                   // 属性 3 标识
  par3: string;                    // 属性 3 参数
  min3: number;                    // 属性 3 最小值
  max3: number;                    // 属性 3 最大值
  prop4: string;                   // 属性 4 标识
  par4: string;                    // 属性 4 参数
  min4: number;                    // 属性 4 最小值
  max4: number;                    // 属性 4 最大值
  prop5: string;                   // 属性 5 标识
  par5: string;                    // 属性 5 参数
  min5: number;                    // 属性 5 最小值
  max5: number;                    // 属性 5 最大值
  prop1Str: string;                // 属性 1 描述
  prop2Str: string;                // 属性 2 描述
  prop3Str: string;                // 属性 3 描述
  prop4Str: string;                // 属性 4 描述
  prop5Str: string;                // 属性 5 描述
  prop6Str: string;               // 属性 6 描述（可选）
  prop7Str: string;               // 属性 7 描述（可选）
  prop8Str: string;               // 属性 8 描述（可选）
  prop9Str: string;               // 属性 9 描述（可选）
  prop10Str: string;              // 属性 10 描述（可选）
  prop11Str: string;              // 属性 11 描述（可选）
  prop12Str: string;              // 属性 12 描述（可选）
}

// 定义查询参数类型
interface SkillQueryParams {
  keyword?: string; // 可选查询关键字
  player: string;   // 职业，必填
  isTable: string;  // 表类型，必填
  page: number;     // 当前页
  pageSize: number; // 每页大小
}


// 定义返回的技能数据类型
interface SkillNameMapping {
  id: number;
  enUs: string;
  skillNo: number;
  player: string;
  skillName: string;
  skillInfo: string;
}

// API 查询方法
export const apiQuerySkill = async (
  params: SkillQueryParams
): Promise<ApiResponse<SkillNameMapping>> => {
  try {
    console.log("apiQuerySkill params: ", params);
    const response = await axios.get('http://localhost:8095/quest/diablo/search/skill', {
      params: {
        keyword: params.keyword,
        player: params.player,
        isTable: params.isTable,
        page: params.page,
        pageSize: params.pageSize,
      },
    });
    console.log("API Response: ", response.data);
    return {
      items: response.data.data.content,
      total: response.data.data.totalElements,
    };
  } catch (error) {
    console.error("Error fetching skill data:", error);
    throw error;
  }
};





  // API 查询方法封装
export const apiQuery = async (params: QueryParams): Promise<ApiResponse<Uniqueitem>> => {
  try {
    console.log("apiQuery params: ", params)
    const response = await axios.get('http://localhost:8095/quest/diablo/search', {
      params: {
        keyword: params.keyword,
        type: params.type,
        page: params.page,
        pageSize: params.pageSize
      }
    });
    console.log(response.data);
    return {
      items: response.data.data.content,
      total: response.data.data.totalElements
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}


export const apiUniqueQuery = async (params: QueryParamX): Promise<ApiResponse<UniqueItemX>> => {
  try {
    console.log("apiUniqueQuery params: ", params);
    const response = await axios.get('http://localhost:8095/quest/diablo/unique/search', {
      params: {
        keyword: params.keyword,
        page: params.page,
        pageSize: params.pageSize
      }
    });
    console.log("apiUniqueQuery response data: ", response.data);
    return {
      items: response.data.data.content,
      total: response.data.data.totalElements
    };
  } catch (error) {
    console.error('Error fetching unique items:', error);
    throw error;
  }
};




/**
 * save
 */
export async function save(params: any) {
  try {
    console.log("save params: ", params)
    const response = await axios.post('http://localhost:8095/quest/diablo/save', params);
    console.log('response : ',response)
    return {
      code : response.data.code,
      message : response.data.message
    }
  } catch (error) {
    console.error('Error save data:', error);
    throw error;
  }
}

/**
 * delete
 * http://localhost:8095/quest/diablo/delete/{id}
 */
export async function del(id: number) {
  try {
    console.log("del id: ", id)
    const response = await axios.delete(`http://localhost:8095/quest/diablo/delete/${id}`);
    return {
      code : response.data.code,
      message : response.data.message
    }
  } catch (error) {
    console.error('Error del data:', error);
    throw error;
  }
}


/**
 * export
 * param: type: string
 */
export async function exportData(type: string) {
  try {
    console.log("exportData type: ", type);
    
    // 使用 blob 类型来处理文件下载
    const response = await axios.get(`http://localhost:8095/quest/diablo/export?type=${type}`, {
      responseType: 'blob' // 设置响应类型为 blob
    });

    // 创建一个下载链接
    const url = window.URL.createObjectURL(new Blob([response.data]));
    
    // 创建一个临时的 <a> 元素并触发下载
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${type}.json`); // 设置下载文件名

    // 触发下载
    document.body.appendChild(link);
    link.click();

    // 清理
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url); // 释放内存

    console.log('File exported successfully.');

    return {
      code: 0,
      message: 'Export successful.'
    };
  } catch (error) {
    console.error('Error exporting data:', error);
    throw error;
  }


}

