[Procedural Modelling | Houdini Tutorial](https://youtu.be/fdG0ZD8lDS4)

- 파라미터로 뺄 노드들은 따로 색칠해두었다.
- Null노드
  - In은 초록
  - Out은 빨강

- 외곽선
  - line -> point wrangle (i@id = i@ptnum;)으로 id를 할당하고
  - 추후 Add - Polygon - By Group > By Attribute > id로 외곽선을 딸 준비
  - Ends - Close U (Unroll with New Points)로 외곽선을 딴다
  - Fuse로 혹시나 겹치는 포인트 방지
  - assemble로 curve 그룹 생성
    - 0은 외곽, 1은 안쪽

Shift + L로 노드 레이아웃