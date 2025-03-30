# 노드

## Add

- 포인트 추가
- 포인트 제거
  - Polygons / Remove Unused Points
- 포인트만 남기기 - 내부 선 지우기
  - Points / Delete Geometry But Keep the Points
- 선만들기 - 점을 선으로 잇기
  - Polygons / By Group
- 면만들기
  - Polygons / By Group
    - Closed 체크

## Transform

- translate: -$CEX / -$CEY / -$CEZ
- vex에서는 vector cent = getpointbbox_center(0);
- 바닥에서 띄우기
  - translate.y : -$YMIN

## Box

- Center.y : ch("sizey") * 0.5

## Line

### width line (x dir) 보통 sweep이랑 같이 쓰임

- Origin.x : -ch("dist") * 0.5
- Direction: 1/0/0

## Tube

### 바닥붙이기

- Center.y : ch("height") * 0.5

- 아니면 Transform 하나 써서
  - translate.y : -$YMIN

## Grid

### 평면상에서 점 흐트리기

- Grid
- Attribute Expression
  - Attribute : N
  - VEXpression: @P
- Mountain

## Carve

### First U랑 Second U를 동기화

- Second U : 1 - ch("domainu1")

## Group

### Group의 이름을 노드의 이름으로

- Group Name : $OS
- $OS : Operator String. Contains the current OP’s name. 노드 이름
- H20.5 Legacy Preset > Save As Permanent Defaults

#### 선 양끝

- Group by Range
  - Group Type : Point
    - Start:1
    - End:1
    - Invert Range
    - Connectivity
      - Affect Disconnected Geometry Seperately

## Foreach

### iteration 숫자 가져오기

- Create Meta Import Node
- detail("../foreach_begin2_metadata1/", "iteration", 0)

## Switch

### Foreach의 iteration 숫자 가져다 쓰기

- rand(detail("../foreach_begin2_metadata1/", "iteration", 0)) * opinputs(".")

### 첫번째는 기본, 두번째는 Object Merge로 가져다 쓸때

npoints(1) > 0 로 포인트가 있으면 Object Merge를 가리키도록

## Poly Frame

### 선의 Tangent를 노말을 할당해서 노말이 선따라 가게

- TangentName: N


## Orient Along Curve

- Frame
  - Tangent Type : Next
  - Tangent Up Vector : Y Axis


## 라인에 있는 점 지우기

- Facet으로 Remove Inline Points 하거나
- Refine으로 Unrefine탭 사용


## Sweep

- Surface Shape : Ribbon / Columns: 1로하면 라인따라 트랙모양으로 변함


## 띄엄띄엄 선

- 라인을 Resample
- Convert Line으로 점사이를 primitive로 변환
- Carve
  - First U: 알아서 조절
  - Second V: 1-ch("domainu1")