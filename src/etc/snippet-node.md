# 노드

- Add 노드
  - 포인트 추가
  - 포인트 제거
    - Polygons
      - Remove Unused Points
  - 포인트만 남기기 - 내부 선 지우기
    -Points / Delete Geometry But Keep the Points
  - 선만들기 - 점을 선으로 잇기
    - Polygons / By Group
  - 면만들기
    - Polygons / By Group
      - Closed 체크

- Box
  - Center.y : ch("sizey") * 0.5

- Line
  - Origin.x : -ch("dist") * 0.5

- Carve의 Second U를 First U랑 동기화
  - Second U : 1 - ch("domainu1")

- Group의 이름을 노드의 이름으로
  - Group Name : $OS
  - $OS : Operator String. Contains the current OP’s name. 노드 이름
  - H20.5 Legacy Preset > Save As Permanent Defaults

- Foreach에서 데이터(iteration 숫자) 가져오기
  - Create Meta Import Node
  - detail("../foreach_begin2_metadata1/", "iteration", 0)

- Switch에서 Foreach의 iteration 숫자 가져다 쓰기
  - rand(detail("../foreach_begin2_metadata1/", "iteration", 0)) * opinputs(".")
