import {Component, createSignal} from 'solid-js';

const Login: Component = () => {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // TODO: 로그인 처리 로직 구현
    console.log(email(), password());
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email(),
        password: password(),
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // 로그인 성공 시 처리
          console.log('로그인 성공');
        } else {
          // 로그인 실패 시 처리
          console.log('로그인 실패:', data.message);
        }
      })
      .catch(error => {
        console.error('로그인 요청 중 오류 발생:', error);
      });
  };

  const handlePasswordChange = (e: any) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
    setPassword(value);
  };

  return (
    <div class="login">
      <form onSubmit={handleSubmit}>
        <div>
          <label>이메일</label>
          <input
            type="email"
            value={email()}
            onInput={e => setEmail(e.currentTarget.value)}
            required
          />
        </div>
        <div>
          <label>비밀번호 (4자리)</label>
          <input
            type="password"
            value={password()}
            onInput={handlePasswordChange}
            maxLength={4}
            pattern="[0-9]*"
            inputMode="numeric"
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
