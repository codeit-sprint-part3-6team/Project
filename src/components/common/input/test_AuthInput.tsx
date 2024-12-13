import AuthInput from '@/components/common/input/AuthInput';
import { useState } from 'react';

export default function TestAuthInput() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  return (
    <>
      <div style={{ width: '540px' }}>
        <AuthInput
          htmlFor="email"
          title="이메일"
          id="email"
          type="text"
          placeholder="이메일을 입력해 주세요"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          error={true}
          errorMessage="이메일 형식으로 작성해 주세요."
        />

        <AuthInput
          htmlFor="password"
          title="비밀번호"
          id="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
      </div>
    </>
  );
}
