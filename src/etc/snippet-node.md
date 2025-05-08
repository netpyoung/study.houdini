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

### 선에서 가운데점만 뽑기

- First U : 0.5
- Extract 탭 선택

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


## 띄엄띄엄 선

- 라인을 Resample
- Convert Line으로 점사이를 primitive로 변환
- Carve
  - First U: 알아서 조절
  - Second V: 1-ch("domainu1")

## 라인에 원하는 수만큼 점 추가

- Resample
  - Maximum Segment Length 체크해제
  - Maximum Segments 체크하기

## 링형을 sweep시 시작-끝을 부분이 끊기는 현상 해결 (Open Curve Issue)

- 방법 1
  - 시작-끝 부분을 이어버리는것
  - Fuse / PolyFrame / Sweep
- 방법 2
  - 시작-끝 부분의 노말을 동기화
  - PolyFrame 으로 선의 Tangent를 노말을 할당해서 노말이 선따라 가게하고
    - TangentName: N
  - Wrangle (detail) 로 끝점의 노말을 시작 점의 노말로 셋팅한다
    ``` vex
    vector first_N = point(0, "N", 0);
    int last_pnt = npoints(0) - 1;
    setpointattrib(0, "N", last_pnt, first_N);
    ```
  - Sweep

- 원인
  - Fuse를 안했거나
  - Ends에서 Unroll with New Points로 새 포인트를 넣을 경우

## 링 2개 사이 채우기

링 하나가 프리미티브 하나라고 가정

- Group: Edges 으로 A/B를 지정
- Merge
- Poly Bridge
  - Group : A
    - Divide Into : Individual Elements
    - Reverse Winding
  - Group : B
    - Divide Into : Individual Elements
    - Reverse Winding

## 라인 점에서 선마다 프리미티브 붙이기

- Convert Line을 사용하거나
- Carv를 이용함
  - First U : 0
  - Second U : 1
  - Break Points
    - Cut At Internal U Breakpoints

## 스택

- Copy And Transform
  - Translate.y : bbox(0, D_YSIZE)

## UV Texture

Texture Type : Arc Length Spline
Attribute Class : Point
Scale.x : arclen(0, 0, 0, 1)



## Poly Wire

Edit Parameter Interface - Ramp(wradious)랑 Float(radious_mult)추가하고
Wire Radious: chramp("wradious", $BBY, 0) * chf("radious_mult");

## 에너지실드같은 벌집모양

Sphere만들고, Divide에서 Compute Dual체크


## RBD

- 글자같은건 RBD Pack 하면 좋음
- RBD Bullet Solver 에서 Collision - Ground Collision: Ground Plane 가 있음.