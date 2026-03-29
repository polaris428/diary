# 1차 MVP 기능 체크리스트

기준 일자: 2026-03-29

판정 기준

- `[x] 반영됨`: 문서의 핵심 동작이 현재 코드에 실제로 들어가 있음
- `[-] 부분 반영`: 화면이나 일부 흐름만 있고, 실제 저장/검증/예외 처리까지는 완성되지 않음
- `[ ] 미반영`: 현재 코드에서 확인되지 않음

## 기능 01 — 구글 OAuth 인증

- [ ] 버튼 클릭 시 구글 OAuth 동의 화면으로 이동한다
  현재 `stores/auth.store.ts`의 `signInWithGoogle()`은 구글 OAuth 대신 로컬 데모 유저를 세팅한 뒤 `/home`으로 이동합니다.
- [-] 계정 선택 완료 후 세션 생성 → `/home` 으로 이동한다
  `/home` 이동은 구현돼 있지만 실제 계정 선택, OAuth 콜백 처리, 세션 생성은 없습니다.
- [ ] OAuth 취소 시 로그인 화면 복귀 + 에러 문구가 표시된다
  `pages/index.vue`, `pages/auth/callback.vue` 어디에도 취소/실패 쿼리 처리와 인라인 에러 문구가 없습니다.
- [x] `/auth/callback` 처리 중 "로그인 중..." 상태가 표시된다
  `pages/auth/callback.vue`에 세션 확인 중 안내 문구가 있습니다.
- [x] 세션 없이 `/home` 직접 접근 시 `/` 로 리다이렉트된다
  `middleware/auth.global.ts`에서 비로그인 사용자의 보호 라우트 접근을 `/`로 보냅니다.

## 기능 02 — 일기 작성

- [x] content 1자 이상일 때만 저장 버튼이 활성화된다
  `pages/write.vue`에서 `!content.trim()` 기준으로 버튼을 비활성화합니다.
- [-] 저장 성공 시 row 생성 후 `/home` 으로 이동한다
  `stores/diary.store.ts`에서 로컬 메모리 배열에는 추가되고 `pages/write.vue`에서 `/home` 이동도 하지만, DB row 생성은 없습니다.
- [ ] 저장 실패 시 입력값이 사라지지 않는다
  실패 분기와 에러 처리 자체가 구현돼 있지 않습니다.
- [ ] 미저장 이탈 시 confirm 이 노출된다
  `beforeunload`, `onBeforeRouteLeave`, `isDirty` 처리가 없습니다.
- [-] mood 미선택 저장 시 DB에 null 로 저장된다
  화면과 로컬 store에서는 `null` 전달이 가능하지만 DB 저장 경로가 없습니다.

## 기능 03 — 일기 목록

- [-] 목록이 `created_at DESC` 로 정렬된다
  현재는 `MOCK_ENTRIES`를 그대로 사용하며 월 범위 조회나 정렬 로직은 없습니다.
- [ ] 타인 데이터가 반환되지 않는다
  Supabase/RLS 연동이 없어 현재 코드만으로는 검증할 수 없습니다.
- [x] 빈 달 진입 시 BaseEmptyState가 노출된다
  `pages/diary/index.vue`에서 `entries.length === 0`일 때 빈 상태 UI를 보여줍니다.
- [ ] 월 이동 시 해당 월 데이터로 갱신된다
  `goToPreviousMonth()`, `goToNextMonth()`가 비어 있고, 화면의 `year`, `month`도 고정값입니다.
- [-] 현재 월에서 다음 달 버튼이 비활성화된다
  `pages/diary/index.vue`에서 `disable-next`를 `true`로 넘겨 버튼은 비활성화되지만, 현재 월 기준의 동적 계산은 없습니다.

## 기능 04 — 일기 상세

- [-] 본인 entry 접근 시 전체 내용이 렌더링된다
  `pages/diary/[id].vue`는 store에 이미 들어 있는 entry만 렌더링합니다. 개별 조회 `fetchEntry(id)`는 없습니다.
- [ ] 타인 entry 직접 URL 접근 시 404 처리된다
  RLS나 user 조건 조회가 없어서 타인 데이터 차단 로직은 확인되지 않습니다.
- [ ] mood가 null이면 BaseBadge가 표시되지 않는다
  `components/base/BaseBadge.vue`는 `null`이어도 "미선택" 배지를 렌더링합니다.

## 기능 05 — 일기 수정

- [ ] 수정 저장 후 변경된 내용이 즉시 반영된다
  상세 페이지에 수정 모드, 저장 버튼, `updateEntry()` 구현이 없습니다.
- [ ] 취소 시 원본 내용으로 복원된다
  수정 모드 자체가 없습니다.
- [ ] `updated_at` 이 갱신된다
  update 로직과 `updated_at` 필드가 없습니다.
- [ ] content 비워서 저장 시 버튼이 비활성화된다
  수정 UI가 없습니다.

## 기능 06 — 일기 단건 삭제

- [ ] 확인 없이 DELETE가 실행되지 않는다
  삭제 버튼, 확인 다이얼로그, delete 로직이 없습니다.
- [ ] 삭제 후 목록에서 해당 항목이 사라진다
  단건 삭제 기능이 없습니다.
- [ ] 삭제된 id 접근 시 404 처리된다
  삭제 기능이 없어 이 흐름도 없습니다.

## 현재 구현 요약

- 인증: 데모 로그인 수준
- 작성: 로컬 상태 저장 수준
- 목록: 목업 데이터 렌더링 수준
- 상세: 읽기 전용 단순 조회 수준
- 수정/삭제: 미구현
