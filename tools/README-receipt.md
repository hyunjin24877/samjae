# TM-T83III USB 영수증 출력

## macOS 자동 실행

LaunchAgent 원본: `tools/com.samjae.receipt-server.plist`.
설치 위치: `~/Library/LaunchAgents/com.samjae.receipt-server.plist`.
로그인 후 백그라운드에서 실행하며 종료 시 launchd가 5초 간격으로 재시작합니다.
실행 시간 제한은 없습니다. 동일 LaunchAgent는 하나의 프로세스만 관리하고,
127.0.0.1:8765 포트 바인딩이 중복 서버의 실행을 막습니다.

현재 환경에서 확인한 실행 경로:
- Python: `/Library/Developer/CommandLineTools/usr/bin/python3`
- 서버 원본: `/Users/hyeonjin/Desktop/samjae_wep/tools/receipt_server.py`
- 자동 실행용 복사본: `~/Library/Application Support/SamjaeReceipt/receipt_server.py`

macOS가 LaunchAgent의 Desktop 접근을 차단할 수 있으므로 서버 파일은
Application Support에 복사하여 실행합니다. 서버 코드를 수정했다면 복사본도 갱신하고
LaunchAgent를 재시작합니다.

```sh
sh tools/install_receipt_server.sh
```

상태 확인 / 재시작 / 현재 로그인 세션에서 중지:

```sh
launchctl print "gui/$(id -u)/com.samjae.receipt-server"
launchctl kickstart -k "gui/$(id -u)/com.samjae.receipt-server"
launchctl bootout "gui/$(id -u)/com.samjae.receipt-server"
```

로그: `~/Library/Logs/SamjaeReceipt/server.log`, `error.log`.
자동 실행을 영구 중지하려면 bootout 후 설치 위치의 plist를 제거합니다.
수동 실행이 필요하면 LaunchAgent를 먼저 중지한 뒤 `python3 tools/receipt_server.py`를 실행합니다.

서버 코드에는 2시간 종료 타이머가 없습니다. 30초 요청 수신 제한과 60초 CUPS
작업 접수 제한은 서버 수명과 무관하며 기존 출력 동작을 보호하므로 유지합니다.

사이트는 localhost/127.0.0.1 HTTP 개발 서버 또는 GitHub Pages에서 엽니다.
백그라운드 서버는 127.0.0.1:8765의 출력 요청을 받습니다.
GitHub Pages
(https://hyunjin24877.github.io/samjae/)에서도 출력 버튼을 사용할 수 있습니다.
GitHub Pages에서 출력하려면 프린터가 연결된 Mac에서 이 서버가 실행 중이어야 하며,
Chrome이 로컬 네트워크 접근 허용을 물으면 허용합니다. file:// 페이지는 지원하지 않습니다.

출력 버튼은 원본 PNG를 수정하지 않고 종횡비 유지하여 540dots 폭으로 변환합니다.
576dots 래스터의 기본 중앙 위치(18dots)에서 왼쪽으로 12dots 보정하여
이미지를 x=6dots에 배치합니다. 최종 비트맵의 여백은 왼쪽 6dots, 오른쪽 30dots이며,
CSS 정렬이 아닌 래스터 데이터 자체에 적용됩니다.
850px 원본을 540dots로 축소하므로 원본 픽셀 1:1 출력은 아닙니다. 세로는 비율에 따라 모두
포함하며 고정 mm 또는 페이지 높이를 사용하지 않습니다.
출력용 래스터의 상단에서 완전히 빈 행만 생략하여 첫 내용부터 출력합니다.
원본 PNG는 변경하지 않으며 별도의 상단 feed 명령은 보내지 않습니다.

서버는 전체 래스터를 받은 후 1024줄 이하의 GS v 0 스트립들을 한 RAW CUPS 작업에
담습니다. 마지막 스트립 뒤에 GS V 66 32(커터 위치까지 이송 + 추가 이송 후
부분 절단)를 한 번 추가합니다. RAW 출력은 드라이버의 용지 길이, 축소 및 커팅
필터를 우회합니다. 스트립 높이는 전송 단위이며 페이지/용지 높이가 아닙니다.
16MiB 요청 메모리 한도 초과 또는 불완전 데이터는 출력 전에 거절하며 잘라 출력하지 않습니다.

성공 응답은 CUPS 작업 접수이며 물리적 인쇄 완료 확인은 아닙니다. 통신/용지 오류 시
대기열을 확인하십시오. 자동 재시도는 중복 출력 방지를 위해 하지 않습니다.
서버 종료 후에는 출력할 수 없으며 window.print()로 대체하지 않습니다.

프린터 대기열 이름이 다르면 --printer NAME을 지정하십시오.
검증: python3 -m unittest discover -s tools -p 'test_*.py'

실물 확인: 가장 긴 PNG를 출력해 하단 표시까지 나온 뒤 한 번만 커팅되는지 확인합니다.
명령 참고: https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/commands.html
