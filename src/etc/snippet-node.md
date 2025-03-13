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

## Box

- Center.y : ch("sizey") * 0.5

## Line

- Origin.x : -ch("dist") * 0.5

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

## Foreach

### iteration 숫자 가져오기

- Create Meta Import Node
- detail("../foreach_begin2_metadata1/", "iteration", 0)

## Switch

### Foreach의 iteration 숫자 가져다 쓰기

- rand(detail("../foreach_begin2_metadata1/", "iteration", 0)) * opinputs(".")

## Poly Frame

### 선의 Tangent를 노말을 할당해서 노말이 선따라 가게

- TangentName: N
