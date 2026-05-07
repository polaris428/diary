## 16. DB / RLS 설계

### 16-1. entries 테이블 스키마

| 컬럼 | 타입 | 제약 | 설명 |
| --- | --- | --- | --- |
| `id` | UUID | PK, `DEFAULT gen_random_uuid()` | 고유 식별자 |
| `user_id` | UUID | `NOT NULL`, FK → `auth.users.id ON DELETE CASCADE` | 소유자 |
| `title` | TEXT | `NOT NULL` | 일기 제목 |
| `content` | TEXT | `NOT NULL`, 길이 ≤ 5000 | 일기 본문 |
| `mood` | TEXT | NULLABLE, enum 6개 | 감정 값 |
| `created_at` | TIMESTAMPTZ | `NOT NULL`, `DEFAULT now()` | 작성 시각 |
| `updated_at` | TIMESTAMPTZ | `NOT NULL`, `DEFAULT now()` | 수정 시각 |
- **mood 허용값**: `joy / calm / complex / tired / anxious / sad`

### 16-2. RLS 정책

| 정책명 | 명령 | 조건 | 의도 |
| --- | --- | --- | --- |
| --- | :---: | --- | --- |
| `entries_select_own` | SELECT | `auth.uid() = user_id` | 본인 데이터만 조회 |
| `entries_insert_own` | INSERT | `auth.uid() = user_id` | 위조 방지 |
| `entries_update_own` | UPDATE | `auth.uid() = user_id` (`USING + WITH CHECK`) | 본인 데이터만 수정 |
| `entries_delete_own` | DELETE | `auth.uid() = user_id` | 본인 데이터만 삭제 |

### 16-3. 인덱스

| 인덱스명 | 컬럼 | 목적 |
| --- | --- | --- |
| `idx_entries_user_created` | `(user_id, created_at DESC)` | 목록 조회 핵심 인덱스 |
| `idx_entries_user_month` | `(user_id, date_trunc('month', created_at))` | 월별 필터 보조 |

### 16-4. 기타 설계 결정

| 항목 | 결정 |
| --- | --- |
| `updated_at` 자동 갱신 | DB 트리거(`set_updated_at` → `update_updated_at_column()`)로 자동 갱신 확정 |
| content 전문검색 인덱스 (GIN) | Phase 2 |
| tags 테이블 | Phase 2 |
| auth.users 삭제 | Phase 2 |