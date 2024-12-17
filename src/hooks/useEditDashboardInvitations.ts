import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import getDashboardInvitations from 'src/apis/getDashboardInvitations';
import deleteDashboardInvitation from 'src/apis/deleteDashboardInvitation';

const usePagenationDashboardInvitations = () => {
  const [data, setData] = useState<any>(null); // API 데이터를 저장할 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [allPage, setAllPage] = useState(1); // 총 페이지 수
  const [nowPage, setNowPage] = useState(1); // 현재 페이지
  const [isStart, setIsStart] = useState(true); // 첫 페이지 여부
  const [isEnd, setIsEnd] = useState(false); // 마지막 페이지 여부
  const [isPending, setIsPending] = useState(false); // 삭제 작업 진행 상태

  const router = useRouter();
  const { boardId } = router.query; // Next.js의 dynamic route 파라미터

  // 초대장 데이터를 가져오는 함수
  const fetchInvitations = async (page: number) => {
    if (!boardId) return;

    setIsLoading(true);
    try {
      const response = await getDashboardInvitations(boardId as string, page);
      setData(response);
      const totalCount = response.totalCount || 0;
      const calculatedAllPage = Math.ceil(totalCount / 5);
      setAllPage(calculatedAllPage === 0 ? 1 : calculatedAllPage);
    } catch (error) {
      throw new Error('초대장 데이터를 불러오는데 실패했습니다.', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 초대장 삭제 버튼 클릭 처리 함수
  const handleDeleteButtonClick = async (invitationId: number) => {
    if (isPending || !boardId) return;

    setIsPending(true);
    try {
      await deleteDashboardInvitation(boardId as string, invitationId);
      await fetchInvitations(nowPage); // 삭제 후 현재 페이지의 데이터를 다시 불러옴
    } catch (error) {
      throw new Error('초대장 삭제에 실패했습니다.', error);
    } finally {
      setIsPending(false);
    }
  };

  // 페이지가 변경될 때마다 데이터를 가져옴
  useEffect(() => {
    if (boardId) {
      fetchInvitations(nowPage);
    }
  }, [boardId, nowPage]);

  // 첫 페이지 및 마지막 페이지 상태 업데이트
  useEffect(() => {
    setIsStart(nowPage === 1);
    setIsEnd(nowPage === allPage);
  }, [nowPage, allPage]);

  // 이전 페이지 버튼 클릭 처리
  const handleBackwardButtonClick = () => {
    if (nowPage > 1 && !isLoading) {
      setNowPage((prev) => prev - 1);
    }
  };

  // 다음 페이지 버튼 클릭 처리
  const handleForwardButtonClick = () => {
    if (nowPage < allPage && !isLoading) {
      setNowPage((prev) => prev + 1);
    }
  };

  return {
    boardId,
    data,
    isLoading,
    allPage,
    nowPage,
    setNowPage,
    handleBackwardButtonClick,
    handleForwardButtonClick,
    handleDeleteButtonClick,
    isStart,
    isEnd,
  };
};

export default usePagenationDashboardInvitations;
