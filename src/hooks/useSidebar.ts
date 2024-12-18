import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { setSidebarDashboards } from '@/redux/dashboardSlice';
import getDashboards from '@/lib/mydashboard/getDashboard';

export default function useSidebarDashboards() {
  const pageSize = 10;
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  const fetchSidebarDashboards = async (currentPage: number) => {
    try {
      setIsLoading(true);
      const response = await getDashboards({
        page: currentPage,
        size: pageSize,
        navigationMethod: 'pagination',
      });

      setTotalPages(Math.ceil(response.totalCount / pageSize));
      dispatch(setSidebarDashboards(response.dashboards)); // 사이드바 상태 업데이트
    } catch (error) {
      console.error('대시보드 데이터를 가져오는데 실패했습니다:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, totalPages, fetchSidebarDashboards };
}
