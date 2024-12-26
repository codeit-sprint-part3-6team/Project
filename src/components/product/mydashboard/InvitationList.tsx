import { useEffect, useCallback, useState } from 'react';
import putInvitations from '@/lib/mydashboard/putInvitations';
import getInvitations from '@/lib/mydashboard/getInvitations';
import debounce from '@/utils/debounce';
import SearchIcon from 'public/ic/ic_search.svg';
import CDSButton from '@/components/common/button/CDSButton';
import NoInvitationImg from 'public/ic/ic_uncall.svg';
import styles from './InvitationList.module.css';
import { toast } from 'react-toastify';

export default function InvitationList() {
  const [invitations, setInvitations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursorId, setCursorId] = useState<number | null>();
  const [keyword, setKeyword] = useState<string>();

  // 초대 수락/거절 이벤트
  const handleInvitation = async (action, invitationId) => {
    try {
      const inviteAccepted = action === 'accept';
      await putInvitations({
        invitationId,
        inviteAccepted,
      });
      toast.success(
        action === 'accept' ? '초대를 수락했습니다.' : '초대를 거절했습니다.',
      );

      // 성공 시 상태 업데이트
      setInvitations((prev) =>
        action === 'accept'
          ? prev.map((invite) =>
              invite.id === invitationId
                ? { ...invite, inviteAccepted: true }
                : invite,
            )
          : prev.filter((invite) => invite.id !== invitationId),
      );
    } catch (error) {
      toast.error('초대 응답 처리 중 오류가 발생했습니다.');
    }
  };

  // 초대 목록 불러오기
  const fetchInvitations = useCallback(
    async (reset = false) => {
      if (isLoading || (!hasMore && !reset)) return;
      setIsLoading(true);

      try {
        const response = await getInvitations({
          size: 10,
          cursorId: reset ? null : cursorId,
          title: keyword,
        });

        if (response.invitations.length > 0) {
          setInvitations((prev) =>
            reset ? response.invitations : [...prev, ...response.invitations],
          );
          setCursorId(response.cursorId);
          setHasMore(!!response.cursorId);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('초대 목록 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [cursorId, isLoading, hasMore, keyword],
  );

  const handleSearch = () => {
    setHasMore(true);
    setCursorId(null);
    setInvitations([]);
    fetchInvitations(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 스크롤 이벤트 감지
  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        hasMore &&
        !isLoading &&
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100
      ) {
        fetchInvitations();
      }
    }, 200);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchInvitations, hasMore, isLoading]);

  useEffect(() => {
    fetchInvitations();
  }, []);

  return (
    <div>
      {/* 초대받은 대시보드 목록 */}
      <div className={styles['invitation-container']}>
        <div className={styles.head}>
          <h1 className={styles.title}>초대받은 대시보드</h1>
          <div className={styles['input-container']}>
            <SearchIcon
              width={24}
              height={24}
              onClick={handleSearch}
              className={styles.icon}
            />
            <input
              placeholder="검색"
              className={styles.input}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>

        {invitations.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr className={styles['table-head']}>
                <th className={styles['table-title']}>이름</th>
                <th className={styles['table-title']}>초대자</th>
                <th className={styles['table-title']}>수락 여부</th>
              </tr>
            </thead>

            <tbody>
              {invitations.map((invite) => (
                <tr
                  key={`InvitationList_${invite.id}`}
                  className={styles['table-body']}
                >
                  <td className={styles['table-content']}>
                    <span className={styles['table-content-title']}>이름</span>
                    <span className={styles['table-content-dashboard']}>
                      {invite.dashboard.title}
                    </span>
                  </td>
                  <td className={styles['table-content']}>
                    <span className={styles['table-content-title']}>
                      초대자
                    </span>
                    <span className={styles['table-content-dashbaord']}>
                      {invite.inviter.nickname}
                    </span>
                  </td>
                  <td className={styles['invitation-btn']}>
                    {invite.inviteAccepted ? (
                      <span>수락됨</span>
                    ) : (
                      <>
                        <CDSButton
                          btnType="normal_colored"
                          onClick={() => handleInvitation('accept', invite.id)}
                        >
                          <span>수락</span>
                        </CDSButton>
                        <CDSButton
                          btnType="normal"
                          onClick={() => handleInvitation('reject', invite.id)}
                        >
                          <span>거절</span>
                        </CDSButton>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles['no-invitations']}>
            <NoInvitationImg
              width={100}
              height={100}
              className={styles['no-invitations-icon']}
            />
            <p className={styles['no-invitations-text']}>
              아직 초대받은 대시보드가 없어요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
