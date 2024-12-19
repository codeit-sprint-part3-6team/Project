import { PutInvitationsParams, PutInvitationsResponse } from '@/type/dashboard';
import instance from '../instance';

export default async function putInvitations(
  params: PutInvitationsParams,
): Promise<PutInvitationsResponse> {
  const { invitationId, inviteAccepted } = params;

  try {
    const { data } = await instance.put<PutInvitationsResponse>(
      `/11-6/invitations/${invitationId}`,
      { inviteAccepted },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return data;
  } catch (error) {
    if (error.response) {
      console.log('API 응답 에러:', error.response.data);
    }
    throw new Error(
      error.response?.data?.message || '초대 응답에 실패했습니다.',
    );
  }
}
