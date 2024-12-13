import CommentInput from '@/components/common/input/comment-input';
import DeadlineInput from '@/components/common/input/deadline-input';
import TagInput from '@/components/common/input/tag-input';
import TitleInput from '@/components/common/input/title-input';
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
