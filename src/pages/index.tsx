import CommentInput from '@/components/common/input/CommentInput';
import Codeit from 'public/ic/ic_codeit.svg';

export default function Home() {
  return (
    <>
      중급 프로젝트-taskify
      <br />
      <CommentInput />
      <Codeit width={50} height={50} />
    </>
  );
}
