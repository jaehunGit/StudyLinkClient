# StudyLink

**StudyLink**는 스터디 그룹이나 프로젝트 팀원을 구하는 공고를 올리고, 팀을 구하고 싶은 사용자가 공고에 신청할 수 있는 애플리케이션입니다. 사용자는 간단한 회원가입 및 로그인을 통해 공고를 작성하거나 다른 사용자의 공고에 지원할 수 있습니다.

---

## 주요 기능

### 1. 회원가입 / 로그인
- **회원가입**:
  - 아이디, 비밀번호 형식 검증.
  - 비밀번호 확인 필드.
  - 이메일로 인증번호 전송 기능. (**구현 예정**)
- **로그인**:
  - 일반 로그인 (아이디/비밀번호).
  - 카카오 로그인 또는 구글 로그인 지원. (**개발 중**)

### 2. 마이페이지
- **프로필 관리**:
  - 아이디는 변경 불가.
  - 비밀번호와 닉네임 변경 가능.
  - 프로필 이미지 업로드 기능 (미등록 시 디폴트 이미지 사용). (**구현 예정**)
- **자기소개 등록**:
  - 보유 기술, 포트폴리오(GitHub 링크 등)를 등록 가능. (**구현 예정**)

### 3. 스터디 및 프로젝트 공고 게시판
- **게시판 형식**:
  - 공고는 카드형식으로 표시 및 무한 스크롤
  - 공고를 클릭하면 상세 내용으로 이동.
- **공고 내용**:
  - 제목, 구하는 기간.
  - 상세 내용.
  - 태그 기능 ( React, Java, Ruby 등 선택 가능).

### 4. 공고 신청 및 연결
- 관심 있는 공고에 신청 버튼을 눌러 간단한 메시지와 함께 신청 가능. 
- 공고 작성자가 신청자의 프로필을 검토한 뒤, 특정 사용자와 1:1 메시지 방 생성. (**구현 예정**)

### 5. 1:1 채팅방
- 공고 작성자와 지원자 간의 실시간 1:1 메시지 기능 제공. (**구현 예정**)
- 
---

## 기술 스택

- **React Native**: 네이티브 모바일 앱 개발을 위한 프레임워크
- **TypeScript**: 타입 안정성을 제공하는 자바스크립트 슈퍼셋
- **TailwindCSS**: 유틸리티 기반의 CSS 프레임워크
- **Axios**: API 요청 처리를 위한 HTTP 클라이언트
- **React Native Vector Icons**: 아이콘 사용을 위한 라이브러리
- **React Native Image Picker**: 이미지 업로드 및 선택 기능 제공
