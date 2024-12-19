import axios from '@/lib/instance';

const deleteColumns = async (columnId: number) => {
  try {
    await axios.delete(`/11-6/columns/${columnId}`);
  } catch (error) {
    console.error('컬럼 삭제 실패:', error);
    throw error;
  }
};

export default deleteColumns;
