import { useState } from 'react';
import TitleTagInput from './TitleTagInput';

export default function TestTitleTagInput() {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');

  const handleChange1 = (e) => {
    setTitle(e.target.value);
  };

  const handleChange2 = (e) => {
    setTag(e.target.value);
  };
  return (
    <>
      {/* <div style={{ width: '540px' }}> */}
      <TitleTagInput
        label="제목"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={handleChange1}
        required
      />

      <TitleTagInput
        label="태그"
        placeholder="입력 후 Enter"
        value={tag}
        onChange={handleChange2}
        required
      />
      {/* </div> */}
    </>
  );
}
