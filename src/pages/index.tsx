import CommentInput from '@/components/common/input/CommentInput';
import DeadlineInput from '@/components/common/input/DeadlineInput';
import TestTitleTagInput from '@/components/common/input/TestTitleTagInput';
import Codeit from 'public/ic/ic_codeit.svg';

export default function Home() {
  return (
    <>
      중급 프로젝트-taskify
      <CommentInput />
      <TestTitleTagInput />
      <DeadlineInput />
      <br />
      <Codeit width={50} height={50} />
    </>
  );
}
