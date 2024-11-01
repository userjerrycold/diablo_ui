
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
