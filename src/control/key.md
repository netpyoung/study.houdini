# 조작키

## Overview

|             |                        |                                          |
| ----------- | ---------------------- | ---------------------------------------- |
| 마우스      | 좌클릭 + 이동          | 선택                                     |
|             | 우클릭 + 이동          | 줌                                       |
|             | 휠클릭 + 이동          | 뷰 잡아서 이동                           |
|             | ALT 좌클릭 + 이동      | 복제                                     |
|             | Enter                  | 핸들 보여주기 ( 노드 별 다름 )           |
| 뷰모드      | Space                  | 토글 / 누른채로도 유지 가능              |
|             | F                      | 오브젝트 포커스                          |
|             | W                      | Wire 프레임                              |
|             | D                      | 옵션 -  Display Option                   |
|             | Y                      | 고스트 오브젝트 하이드 토글              |
|             | Ctrl + B               | 뷰포트 전체화면                          |
|             | Space + B              | 뷰포트 4분할 (씬 뷰)                     |
|             | Space + G              | 오브젝트 중심으로 줌                     |
|             | Ctrl + J               | 토글 멀티 스냅핑                         |
| 선택모드    | S                      | 토글                                     |
|             | T                      | 움직임(`T`ranslate)                      |
|             | R                      | 회전(`R`otate)                           |
|             | E                      | 스케일(scal`E`)                          |
|             | 1                      | Select - Object                          |
|             | 2                      | Select - Point                           |
|             | 3                      | Select - Edge                            |
|             | 4                      | Select - Primitive                       |
|             | 드래그                 | 선택                                     |
|             | Shift + 드래그         | 선택 - 추가                              |
|             | Ctrl + 드래그          | 선택 - 해제                              |
|             | C                      | 메뉴                                     |
| 카메라 모드 | ESC                    | View Tool                                |
| Viewport    | 1                      | Viewport - perspective                   |
|             | 2                      | Viewport - Top                           |
|             | 3                      | Viewport - Front                         |
|             | 4                      | Viewport - Right                         |
|             | 5                      | Viewport - UV                            |
|             | CTRL + 1,2,3,4,5,6,7,8 | Viewport - 분할뷰                        |
| Pane        | CTRL + W               | Pane 닫기                                |
| Pane        | CTRL + B               | Pane 최대/최소화                         |
|             | ALT + [                | Pane 세로로 줄귿기                       |
|             | ALT + ]                | Pane 가로로 줄귿기                       |
|             | ** ALT + 1             | 씬 뷰                                    |
|             | ** ALT + 2             | 네트워크 뷰                              |
|             | ALT + 3                | 파라메터                                 |
|             | ALT + 4                | 트리                                     |
|             | ALT + 5                | 텍스트포트 (여기서는 알트 단축키 안먹음) |
|             | ALT + 6                | 애니메이션 에디터                        |
|             | ALT + 7                | 머티리얼                                 |
|             | ** ALT + 8             | 지오메트리 스프레드 시트                 |
|             | ALT + 9                | 렌더뷰                                   |
|             | ALT + 쉬프트 + W       | 새로운 창                                |


## Object View

- https://www.sidefx.com/docs/houdini/network/wire.html

| Object View |                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
| Y           | 가위자르기                                                                                                   |
| P           | 프로퍼티 보기                                                                                                |
| U           | up 상위 노드로 이동                                                                                          |
| O           | 네트워크 오버뷰                                                                                              |
| Z           | 노드 모양 // Ctrl + 드래그로 기본 노드 모양 변경 가능                                                        |
| C           | 노드 색깔 // Ctrl + 드래그로 기본 노드 색깔 변경 가능                                                        |
| 정렬        | 노드 선택후 A키 누른상태에서 아래로 (https://siver.artstation.com/blog/zORm/houdini-blog-22-tips-and-tricks) |
| Shift + S   | 선 스타일 바꾸기 // wiring style change: rounded <-> straight                                                |
| Shift + R   | *입력 순서 교체*                                                                                             |
| Shift + L   | *Layout 정렬*                                                                                                |
| Shift + Z   | 그룹보기                                                                                                     |
| Shift + O   | Network Box                                                                                                  |
| Shift + P   | Sticky 노트                                                                                                  |
| Ctrl + I    | Background Images: Enable/Disable    // Shift + I 혹은 Labs > Sticker Placer                                 |
| Alt         | 이음 노드 추가                                                                                               |
| Q/B         | 노랑색 Bypass                                                                                                |
| W           | 진한 보라색                                                                                                  |
| E           | 연한 보라색 미리보기 토글                                                                                    |
| R           | 파랑색 선택된것들 돌아가며 선택                                                                              |

## Keyframe

alt

## Ref

- [네트워크상 키](https://www.sidefx.com/docs/houdini/network/flags.html)

- Ctrl + Alt + Shift + Click : Hotkey Manager
  - Spreadsheet  : Shift + B