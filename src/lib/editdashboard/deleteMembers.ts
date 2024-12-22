import instance from '../instance';

const deleteMembers = async (memberId: number) => {
  try {
    await instance.delete(`/11-6/members/${memberId}`);
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default deleteMembers;
