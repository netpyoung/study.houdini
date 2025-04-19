# 조작키

## Overview

|             |                         |                                          |
| ----------- | ----------------------- | ---------------------------------------- |
| 마우스      | 좌클릭 + 이동           | 선택                                     |
|             | 우클릭 + 이동           | 줌                                       |
|             | 휠클릭 + 이동           | 뷰 잡아서 이동                           |
|             | ALT 좌클릭 + 이동       | 복제                                     |
|             | Enter                   | 핸들 보여주기 ( 노드 별 다름 )           |
| 뷰모드      | Space                   | 토글 / 누른채로도 유지 가능              |
|             | F                       | 오브젝트 포커스                          |
|             | W                       | Wire 프레임                              |
|             | Shift + W               | Shaded/Wire-overShaded                   |
|             | D                       | 옵션 -  Display Option                   |
|             | Y                       | 고스트 오브젝트 하이드 토글              |
|             | Ctrl + B                | 뷰포트 전체화면                          |
|             | Space + B               | 뷰포트 4분할 (씬 뷰)                     |
|             | Space + G               | 오브젝트 중심으로 줌                     |
|             | Ctrl + J                | 토글 멀티 스냅핑                         |
| 선택모드    | S                       | 토글                                     |
|             | T                       | 움직임(`T`ranslate)                      |
|             | R                       | 회전(`R`otate)                           |
|             | E                       | 스케일(scal`E`)                          |
|             | 1                       | Select - Object                          |
|             | 2                       | Select - Point                           |
|             | 3                       | Select - Edge                            |
|             | 4                       | Select - Primitive                       |
|             | 드래그                  | 선택                                     |
|             | Shift + 드래그          | 선택 - 추가                              |
|             | Ctrl + 드래그           | 선택 - 해제                              |
|             | C                       | 메뉴                                     |
|             | Ctrl + Shift + 2 / 3/ 4 | 선택 변경                                |
| 카메라 모드 | ESC                     | View Tool                                |
| Viewport    | 1                       | Viewport - perspective                   |
|             | 2                       | Viewport - Top                           |
|             | 3                       | Viewport - Front                         |
|             | 4                       | Viewport - Right                         |
|             | 5                       | Viewport - UV                            |
|             | CTRL + 1,2,3,4,5,6,7,8  | Viewport - 분할뷰                        |
| Pane        | CTRL + W                | Pane 닫기                                |
| Pane        | CTRL + B                | Pane 최대/최소화                         |
|             | ALT + [                 | Pane 세로로 줄귿기                       |
|             | ALT + ]                 | Pane 가로로 줄귿기                       |
|             | ** ALT + 1              | 씬 뷰                                    |
|             | ** ALT + 2              | 네트워크 뷰                              |
|             | ALT + 3                 | 파라메터                                 |
|             | ALT + 4                 | 트리                                     |
|             | ALT + 5                 | 텍스트포트 (여기서는 알트 단축키 안먹음) |
|             | ALT + 6                 | 애니메이션 에디터                        |
|             | ALT + 7                 | 머티리얼                                 |
|             | ** ALT + 8              | 지오메트리 스프레드 시트                 |
|             | ALT + 9                 | 렌더뷰                                   |
|             | ALT + 쉬프트 + W        | 새로운 창                                |


https://www.sidefx.com/docs/houdini/basics/radialmenus.html
X Snapping controls
C The “Current” menu. You can choose the menu on this key using the  Radial switching menu at the top of the main interface.
V View controls

## Object View

- https://www.sidefx.com/docs/houdini/network/wire.html

| Object View         |                                                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Y                   | 가위자르기                                                                                                                     |
| J + 드래그          | 선따라 라인 생성                                                                                                               |
| P                   | 프로퍼티 보기                                                                                                                  |
| U                   | 상위 노드로 이동 (`U`p)                                                                                                        |
| O                   | 네트워크 오버뷰                                                                                                                |
| Z                   | 노드 모양 // Ctrl + 드래그로 기본 노드 모양 변경 가능                                                                          |
| C                   | 노드 색깔 // Ctrl + 드래그로 기본 노드 색깔 변경 가능                                                                          |
| A + 마우스 아레     | 노드 Layout 정렬. 노드 선택후 A키 누른상태에서 아래로 (https://siver.artstation.com/blog/zORm/houdini-blog-22-tips-and-tricks) |
| L                   | 노드 Layout 정렬. 선택한것들 Layout                                                                                            |
| Shift + L           | 노드 Layout 정렬. 전체 Layout 정렬                                                                                             |
| .                   | .                                                                                                                              |
| **Shift + R**       | 입력 순서 교체                                                                                                                 |
| Shift + S           | 선 스타일 바꾸기 // wiring style change: rounded <-> straight                                                                  |
| Shift + Z           | 그룹보기                                                                                                                       |
| Shift + O           | Network Box                                                                                                                    |
| Shift + P           | Sticky 노트                                                                                                                    |
| Shift               | Shft키를 누르고 노드를 움직이면 상위노드들도 같이 이동                                                                         |
| Ctrl + I            | Background Images: Enable/Disable    // Shift + I 혹은 Labs > Sticker Placer                                                   |
| Ctrl + F            | 노드 찾기                                                                                                                      |
| Alt                 | 선을 끌어당기고 있는 상태에서 이음 노드 추가.                                                                                  |
| Page Up / Page Down | 윗노드 / 아랫노드                                                                                                              |
| Ctrl + 숫자         | 노드에 단축키 지정. 숫자로 이동가능하게 됨                                                                                     |

- [네트워크상 키](https://www.sidefx.com/docs/houdini/network/flags.html)

|       |                                 |
| ----- | ------------------------------- |
| Q/B   | 노랑색 Bypass                   |
| W     | 진한 보라색                     |
| E     | 연한 보라색 미리보기 토글       |
| **R** | 파랑색 선택된것들 돌아가며 선택 |


| Composite View     |                          |
| ------------------ | ------------------------ |
| Shift + H          | Fit To Viewport          |
| \` / 1 / 2 / 3 / 4 | all / r / g / b / a 채널 |

## Keyframe

alt

## Ref


- Ctrl + Alt + Shift + Click : Hotkey Manager
  - Spreadsheet  : Shift + B
- Ctrl + Alt + S : tab menu 제거
- Alt + P : timeline 축소

- Ctrl + E : vex 편집창
- Ctrl + 마우스 중간 : Revert To Default
- Ctrl + Shift + 마우스 왼쪽 : Delete Channel

- 코드 폰트 확대 축소
  - 확대: Ctrl + `+`
  - 축소: Ctrl + `-`

Alt + 마우스 가운데 버튼 : Export Parameter to Type Properties