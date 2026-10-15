# 실습 아카이브 처음 세팅 — Claude가 따라 할 순서

이 문서는 학생의 Claude(Claude 데스크톱 앱 **Code** 탭)가 읽고 순서대로 실행하는 세팅 절차입니다.
학생은 디자인 전공(개발자 아님)입니다. 명령어를 설명하지 말고, 지금 무엇을 하는지 한 줄로만 알려 줍니다.
**★ 표시는 학생이 직접 하는 일입니다.** 거기서만 멈추고, 학생이 끝냈다고 하면 이어서 진행합니다.

- 템플릿 저장소: `KIKI0715/si-setup` (리허설용. 수업용 주소가 정해지면 이 줄과 README의 주소만 바꿉니다)
- 결과: 학생 계정의 **공개** 저장소 `si-archive` + 공개 주소 `https://<아이디 소문자>.github.io/si-archive/` + 문서 폴더의 `si-archive` 폴더

## 하지 않는 것 (세팅 내내)
- 비밀번호·인증 코드·토큰을 묻거나 받지 않습니다. 로그인은 학생이 브라우저에서 직접 합니다.
- 저장소를 지우거나 비공개로 바꾸지 않습니다. `si-archive` 외의 저장소는 건드리지 않습니다.
- 이미 있는 폴더나 저장소를 덮어쓰지 않습니다. 있으면 멈추고 묻습니다.
- 프로그램은 GitHub 공식 배포(`github.com/cli/cli/releases`)와 운영체제 기본 설치 창으로만 설치합니다.
- 어느 단계든 예상과 다른 오류가 나면 같은 명령을 반복하지 말고, 오류 문장을 그대로 보여 주며 "TA에게 이 화면을 보여 주세요"라고 하고 멈춥니다.

## 0. 시작 전에 한 번에 묻기
1. GitHub 가입과 메일 인증을 마쳤나요? → 아니면 README의 "1. GitHub 가입"을 먼저 하고 오라고 하고 멈춥니다.
2. 사이트 첫 화면에 쓸 **공개용 이름**(실명 대신 별명 가능)
3. 이 컴퓨터에서 처음 세팅하나요, 다른 컴퓨터에서 이미 세팅했나요? → 이미 했으면 맨 아래 "다른 컴퓨터에서 이어 하기"로 갑니다.

## 1. 도구 확인
1. `git --version`
   - 맥에서 "명령어 개발자 도구를 설치하겠습니까?" 창이 뜨면 ★학생에게 **설치**를 누르고 끝날 때까지(수 분) 기다려 달라고 한 뒤 다시 확인합니다.
   - 윈도우에서 없으면 Claude 앱이 안내하는 Git 설치를 먼저 하라고 하고 멈춥니다.
2. `gh --version` (GitHub 명령어 도구). 없으면 설치합니다. 관리자 비밀번호가 필요 없는 방법을 씁니다.
   - 맥: `uname -m` 이 `arm64` 면 `macOS_arm64.zip`, 아니면 `macOS_amd64.zip`.
     ```
     mkdir -p ~/.si-tools && cd ~/.si-tools
     URL=$(curl -s https://api.github.com/repos/cli/cli/releases/latest | grep -o 'https://[^"]*_macOS_arm64\.zip' | head -1)   # amd64 면 이 부분만 바꿈
     curl -L -o gh.zip "$URL" && unzip -oq gh.zip && rm gh.zip
     ls -d ~/.si-tools/gh_*/bin/gh
     ```
     이후 `gh` 대신 위에서 나온 전체 경로를 씁니다.
   - 윈도우: 같은 배포에서 `windows_amd64.zip`(ARM 노트북은 `windows_arm64.zip`)을 받아 `%USERPROFILE%\.si-tools` 에 풀고 `bin\gh.exe` 전체 경로를 씁니다.

## 2. ★ GitHub 로그인 (학생이 한 번 승인)
1. `gh auth status` 가 이미 로그인 상태면 로그인된 아이디를 보여 주고 "이 아이디가 맞나요?"라고 확인한 뒤 3으로 갑니다.
2. 아니면 `gh auth login --hostname github.com --git-protocol https --web` 을 **백그라운드로** 실행합니다(학생이 승인할 때까지 기다리는 명령입니다).
3. 출력에 나온 `one-time code`(예: `ABCD-1234`)를 학생에게 크게 보여 주고, `https://github.com/login/device` 를 브라우저로 엽니다(맥 `open`, 윈도우 `start`).
4. ★학생: 열린 페이지에 코드를 넣고 계속 → **GitHub CLI** 를 승인(Authorize)합니다(버튼 문구는 조금 다를 수 있음). GitHub에 로그인돼 있지 않으면 먼저 로그인 화면이 나옵니다. 비밀번호·인증 코드는 그 페이지에 직접 입력하고 Claude에게 보내지 않습니다.
5. `gh auth status` 로 로그인을 확인한 뒤 `gh auth setup-git` 을 실행합니다(이후 올리기에 쓰는 설정).

## 3. 아이디 확인
```
LOGIN=$(gh api user --jq .login)
GHID=$(gh api user --jq .id)
```
- 기록에 남길 메일은 `${GHID}+${LOGIN}@users.noreply.github.com` 입니다(개인 메일을 쓰지 않습니다).
- 사이트 주소의 아이디는 **소문자**로 바꿔 씁니다.

## 4. 내 저장소 만들고 문서 폴더로 받기
1. 문서 폴더(맥 `~/Documents`, 윈도우 `%USERPROFILE%\Documents`)에 `si-archive` 폴더가 이미 있으면 멈추고 묻습니다.
2. `gh repo view "$LOGIN/si-archive"` 로 같은 이름의 저장소가 있는지 봅니다.
   - **없으면:** 문서 폴더에서 `gh repo create si-archive --public --template KIKI0715/si-setup --clone`
     - 받기(clone)가 실패하면 템플릿 복사가 덜 끝난 것입니다. 10초 뒤 `gh repo clone "$LOGIN/si-archive"` 를 한 번만 다시 합니다.
   - **있으면:** 새로 만들지 말고 "이미 si-archive 저장소가 있어요. 그걸 이 컴퓨터로 받을까요?"라고 묻고, 그렇다고 하면 `gh repo clone "$LOGIN/si-archive"` 만 합니다.
3. `gh repo view "$LOGIN/si-archive" --json visibility --jq .visibility` 가 `PUBLIC` 인지 확인합니다. 아니면 멈추고 "무료 계정은 공개 저장소여야 사이트가 생겨요. 공개로 바꿀까요?"라고 묻습니다.
4. 받은 `si-archive` 폴더 안에서 (이 저장소에만 적용, `--global` 쓰지 않음):
   ```
   git config user.name "$LOGIN"
   git config user.email "${GHID}+${LOGIN}@users.noreply.github.com"
   ```

## 5. 공개 주소 켜기
1. `gh api "repos/$LOGIN/si-archive/pages"`
   - **404(없음)면:** `gh api -X POST "repos/$LOGIN/si-archive/pages" -f "source[branch]=main" -f "source[path]=/"`
   - **이미 있으면:** 응답의 `source` 가 `main` · `/` 인지 확인합니다. 다르면 학생에게 묻고 고칩니다.
2. 다시 `gh api "repos/$LOGIN/si-archive/pages"` 로 `html_url` 을 확인합니다.

## 6. 첫 화면에 이름 넣고 올리기
1. `data/works.js` 의 `student.name` 에 공개용 이름, `student.github` 에 `$LOGIN` 을 적습니다(JSON 문자열 규칙, 다른 줄은 건드리지 않음).
2. CLAUDE.md "1. 실습 추가" 7번과 같은 방법으로 works.js 문법을 확인합니다.
3. `git add data/works.js` → `git commit -m "첫 화면에 이름 넣기"` → `git push`

## 7. 열리는지 확인하고 마무리
1. `https://<아이디 소문자>.github.io/si-archive/` 를 30초마다 확인합니다(최대 10분). 200이 나오면 브라우저로 열어 줍니다.
   - 10분이 지나도 안 열리면 `gh api "repos/$LOGIN/si-archive/pages" --jq .status` 결과를 보여 주고 TA에게 알리라고 합니다.
2. 학생에게 세 줄로 알려 줍니다.
   - 내 사이트 주소 (TA에게 제출. 제출 방법은 수업에서 안내)
   - 앞으로는 Claude 앱 Code 탭에서 폴더를 **문서 › si-archive** 로 고르고 시작하기
   - 실습은 "23번 따라 하기 추가해 줘", 올리기는 "올려 줘"

## 다른 컴퓨터에서 이어 하기
1~3을 똑같이 한 뒤, 문서 폴더에서 `gh repo clone "$LOGIN/si-archive"` → 4의 4번(git config)만 합니다.
저장소 만들기(4의 2번 "없으면")·공개 주소 켜기(5)·이름 넣기(6)는 하지 않습니다. 이미 되어 있습니다.
