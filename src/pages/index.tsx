import CommentInput from '@/components/common/input/CommentInput';
import DeadlineInput from '@/components/common/input/DeadlineInput';
import TagInput from '@/components/common/input/TagInput';
import TitleInput from '@/components/common/input/TitleInput';
import Codeit from 'public/ic/ic_codeit.svg';

export default function Home() {
  return (
    <>
      중급 프로젝트-taskify
      <CommentInput />
      <TitleInput />
      <TagInput />
      <DeadlineInput />
      <br />
      <Codeit width={50} height={50} />
    </>
  );
}
