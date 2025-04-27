

## PROJECT PEGASUS | PILE TOOL

뿌릴 영역을 잘 쌓일 수 있도록 taper를 사용 하는

물체들은 name을 달고 merge시키고 넘기고

- 안쪽에서는 attr swap을 통해
  - source: name 을  (언리얼인 경우 unreal_input_mesh_name)
  - destination: _PILE_name 으로 변경

- Grid
  - XY Plane - 2x2
- Linear Taper
  - capture origin : centroid(0,D_X) / bbox(0,D_YMIN) / centroid(0,D_Z)
  - capture length : bbox(0,D_YSIZE)
- scatteralign
- Attr Randomize
  - N
- Attr From Piece로 _PILE_name을 사용하여 파일을 랜덤으로 뿌리도록
- Copy to Point
  - Piece Attribute: _PILE_name