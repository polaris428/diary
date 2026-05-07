# 1차 MVP 기능 체크리스트

기준 일자: 2026-05-07 (최신화)

판정 기준

- `[x] 반영됨`: 문서의 핵심 동작이 현재 코드에 실제로 들어가 있음
- `[-] 부분 반영`: 화면이나 일부 흐름만 있고, 실제 저장/검증/예외 처리까지는 완성되지 않음
- `[ ] 미반영`: 현재 코드에서 확인되지 않음

## 기능 01 — 구글 OAuth 인증

- [x] 버튼 클릭 시 구글 OAuth 동의 화면으로 이동한다
  `supabase.auth.signInWithOAuth`를 통해 정상 이동합니다.
- [x] 계정 선택 완료 후 세션 생성 → `/home` 으로 이동한다
  `pages/auth/callback.vue`에서 세션 확인 후 이동을 완벽히 처리합니다.
- [x] OAuth 취소 시 로그인 화면 복귀 + 에러 문구가 표시된다
  `callback.vue` 및 `index.vue`에서 쿼리 파라미터를 감지하여 처리합니다.
- [x] `/auth/callback` 처리 중 "로그인 중..." 상태가 표시된다
  `pages/auth/callback.vue`에 세션 확인 중 안내 문구가 있습니다.
- [x] 세션 없이 `/home` 직접 접근 시 `/` 로 리다이렉트된다
  `middleware/auth.global.ts`에서 비로그인 사용자의 보호 라우트 접근을 `/`로 보냅니다.


## 기능 02 — 일기 작성

- [x] content 1자 이상일 때만 저장 버튼이 활성화된다
  `pages/write.vue`에서 `!content.trim()` 기준으로 버튼을 비활성화합니다.
- [x] 저장 성공 시 row 생성 후 `/home` 으로 이동한다
  `useDiaryWrite` 컴포저블을 통해 Supabase에 데이터를 저장하고 이동합니다.
- [x] 저장 실패 시 입력값이 사라지지 않는다
  `pages/write.vue`의 `try-catch`에서 실패 시 에러 토스트만 띄우고 상태는 유지됩니다.
- [x] 미저장 이탈 시 confirm 이 노출된다
  `isDirty` 상태와 `onBeforeRouteLeave`, `beforeunload` 이벤트를 통해 방어합니다.
- [x] mood 미선택 저장 시 DB에 null 로 저장된다
  선택하지 않은 경우 `null` 값이 Supabase 테이블의 `mood` 컬럼에 정상 기록됩니다.


## 기능 03 — 일기 목록

- [x] 목록이 `created_at DESC` 로 정렬된다
  `diaryList.store.ts`에서 Supabase 쿼리 시 `.order('created_at', { ascending: false })`를 사용합니다.
- [x] 타인 데이터가 반환되지 않는다
  Supabase RLS 정책(`entries_select_own`)을 통해 본인 데이터만 조회되도록 강제되어 있습니다.
- [x] 빈 달 진입 시 BaseEmptyState가 노출된다
  `pages/diary/index.vue`에서 `entries.length === 0`일 때 빈 상태 UI를 보여줍니다.
- [x] 월 이동 시 해당 월 데이터로 갱신된다
  `diaryList.store.ts`의 `fetchEntries()`에서 `currentYear`, `currentMonth` 범위를 기반으로 쿼리합니다.
- [x] 현재 월에서 다음 달 버튼이 비활성화된다
  `pages/diary/index.vue`의 `isCurrentMonth` 계산을 통해 미래 달로의 이동을 방지합니다.

## 기능 04 — 일기 상세

- [x] 본인 entry 접근 시 전체 내용이 렌더링된다
  `pages/diary/[id].vue` 진입 시 `fetchEntryById(id)`를 호출하여 실시간 데이터를 가져옵니다.
- [x] 타인 entry 직접 URL 접근 시 404 처리된다
  `useDiaryDetail`에서 `user_id`를 조건으로 조회하며, 결과가 없을 시 상세 페이지에서 에러 상태를 표시합니다.
- [x] mood가 null이면 BaseBadge가 표시되지 않는다
  `[id].vue`에서 `v-if="entry.mood"` 조건을 통해 배지 노출 여부를 제어합니다.

## 기능 05 — 일기 수정

- [x] 수정 저장 후 변경된 내용이 즉시 반영된다
  `updateEntry()` 호출 성공 후 페이지 상태(`entry.value`)를 즉시 업데이트합니다.
- [x] 취소 시 원본 내용으로 복원된다
  수정 모드 취소 시 별도의 상태(`editTitle`, `editContent` 등)만 초기화하고 원본은 유지됩니다.
- [x] `updated_at` 이 갱신된다
  DB 트리거(`set_updated_at`)를 통해 수정 시 시각이 자동으로 갱신됩니다.
- [x] content 비워서 저장 시 버튼이 비활성화된다
  `isSaveDisabled` 계산된 속성을 통해 제목이나 본문이 비어있으면 저장 버튼을 비활성화합니다.

## 기능 06 — 일기 단건 삭제

- [x] 확인 없이 DELETE가 실행되지 않는다
  `BaseDialog`를 통해 사용자에게 최종 삭제 의사를 확인한 후 삭제를 진행합니다.
- [x] 삭제 후 목록에서 해당 항목이 사라진다
  삭제 성공 시 자동으로 `/diary` 목록 페이지로 리다이렉트되며, 목록은 새로 갱신됩니다.
- [x] 삭제된 id 접근 시 404 처리된다
  삭제된 후 해당 ID로 접근하면 `fetchEntryById`가 `null`을 반환하여 에러 상태가 표시됩니다.

## 현재 구현 요약

- 인증: Supabase Auth 기반 구글 로그인 및 라우트 가드 완성
- 작성: Supabase DB 연동 및 이탈 방지 로직 완성
- 목록: 월별 필터링, DESC 정렬, RLS 보안 적용 완료
- 상세: 실시간 개별 조회 및 예외 처리 완료
- 수정/삭제: 상세 페이지 내 인라인 수정 및 다이얼로그 기반 삭제 기능 완성
