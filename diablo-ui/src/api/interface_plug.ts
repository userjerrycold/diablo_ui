
import axios from '@/api/axios'

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


export function queryDiabloEdit(paramValue: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 模拟的返回数据
        const mockData = {
          code: 200,
          data: {
            key: paramValue,
            enus: `English Name for ${paramValue}`,
            zhtw: `中文名称 for ${paramValue}`,
          },
          message: '查询成功'
        };
        resolve({ data: mockData });
      }, 500); // 模拟网络延迟
    });
  }
  
  export function updateDiabloEdit(editItem: { key: string; enus: string; zhtw: string }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 模拟保存成功
        const mockResponse = {
          code: 200,
          message: '保存成功',
        };
        resolve({ data: mockResponse });
      }, 500); // 模拟网络延迟
    });
  }
  
  export function sync() {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 模拟同步成功
        const mockSyncResponse = {
          code: 200,
          message: '同步成功',
        };
        resolve({ data: mockSyncResponse });
      }, 300); // 模拟同步延迟
    });
  }

  // API 查询方法封装
export const apiQuery = async (params: QueryParams): Promise<ApiResponse<Uniqueitem>> => {
  try {
    const response = await axios.get('http://localhost:8095/quest/diablo/search', {
      params: {
        keyword: params.keyword,
        type: params.type,
        page: params.page,
        pageSize: params.pageSize
      }
    });
    return {
      items: response.data.content,
      total: response.data.totalElements
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}