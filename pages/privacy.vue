<script setup lang="ts">
// 개인정보처리방침 페이지
</script>

<template>
  <div class="page">
    <AppHeader title="개인정보처리방침" :show-back="true" />
    <section class="panel">
      <h1>개인정보처리방침</h1>
      <p>본 개인정보처리방침은 The Frame 서비스의 개인정보 수집 및 이용에 대한 내용을 담고 있습니다.</p>
      
      <h2>1. 수집하는 개인정보 항목</h2>
      <p>회사는 서비스 제공을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
      <ul>
        <li>필수 항목: 이메일 주소, 이름 (소셜 로그인 시 제공받는 정보)</li>
        <li>서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보</li>
      </ul>

      <h2>2. 개인정보의 수집 및 이용 목적</h2>
      <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
      <ul>
        <li>서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</li>
        <li>회원 관리 (본인확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용 방지)</li>
      </ul>

      <h2>3. 개인정보의 보유 및 이용 기간</h2>
      <p>원칙적으로, 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</p>
    </section>
  </div>
</template>

<style scoped>
.page {
  display: grid;
  gap: 20px;
}

.panel {
  display: grid;
  gap: 16px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.86);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  color: var(--color-neutral-800);
  line-height: 1.6;
}

.panel h1 {
  font-size: 1.5rem;
  margin-bottom: 8px;
}

.panel h2 {
  font-size: 1.2rem;
  margin-top: 16px;
  margin-bottom: 8px;
  color: var(--color-neutral-900);
}

.panel p, .panel ul {
  font-size: 0.95rem;
  color: var(--color-neutral-700);
}

.panel ul {
  padding-left: 20px;
}
</style>
