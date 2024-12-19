import { useEffect, useState } from 'react';
import { Member } from '@/type/member';
import getMembers from '@/lib/dashboard/getMembers';

interface UseMembersProps {
  teamId: string;
  dashboardId: number;
}

export default function useMembers({ teamId, dashboardId }: UseMembersProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getMembers({ teamId, dashboardId });
        setMembers(data.members);
      } catch (err) {
        console.error('멤버 데이터를 가져오는 중 오류 발생:', err);
        setError('멤버 데이터를 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchMembers();
  }, [teamId, dashboardId]);

  return { members, error };
}
