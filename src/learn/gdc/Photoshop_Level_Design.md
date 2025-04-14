
[Rapid Level Creation for Unity Mobile | Paul Ambrosiussen | GDC 2019](https://www.youtube.com/watch?v=_YGdUkDETkQ)
[Photoshop Level Design in Unity using Houdini Engine | Luiz Kruel | GDC 2019](https://www.youtube.com/watch?v=sDDruhbcEAk)


COLOR
    인덱스용
Playable
    흰 플레이 가능 영역
    회색 플레이 가능 영역 높이
SPAWN
    주황 소환
Turret
    빨강 소환
Road
    연노 길
BARRIOR
    파랑 울타리
TREE
    초록 나무
BUSH
    진녹 식생
Rock
    검정 돌

Labs Snow Buildup 눈쌓이기
https://www.sidefx.com/docs/houdini/nodes/sop/labs--snow_buildup-2.0.html

Labs Dirt Skirt 가장자리
https://www.sidefx.com/docs/houdini/nodes/sop/labs--dirtskirt.html

---



COP 네에서 
File노드 Add AOVs from File로 불러오기

Arbitrary Output Variables


- Trace
  - Threshold: 0.01
    - Add Point Texture
  - COP
    - COP path: ../copnet1/hello/
- Reverse
- //Cleanup//
  - Fuse
  - Facet
    - Remove Inline Points
    - Distance: 0.0003
- //Shrink UVs//
  - Point Wrangle move to uv space
    - v@rest = v@P;
    - v@P = v@uv; 
    - v@P.z = 0;

  - Poly Extrude
    - Insert: 0.005
  - Point Wrangle back to world space
    - v@uv = v@P;
    - v@P = v@rest;
- // Add Vertex Color //
  - Attribute From Map
    - Texture Map: op:\`opfullpath("../copnet1/null1/")\`
- // Clean up //
  - Transform
    - Rotate: 90/180/180
  - Normal


Labs Trace PSD File



Bound - Bounding Type : Rectangle하면 바운딩 박스얻을 수 있다.


터레인작업에서는 PSD불러온것을

- Divide
  - Convex Polygons 해제
  - Bricker Polygons 체크
    - Size: 0.01 / 0.01 / 0.01
- Attribute From Map
  - Texture Map : op:\`opfullpath("./trace_psd_file1/cop2net/")\`  // trace_psd_file1 안에서 에서 이미지를 찾을 수 있는 노드 선택
- Point Wrangle
  - v@P.y += (pow(v@Cd.r, 0.45) * 2 - 1) * chf("offset");
- Remesh To Grid
  - Division Size: 0.01
  - VDB Smoothing
    - Dilate/Erode : 0.005
- Color 로 전체 한번 색칠해주고
- Group
  - Keep By Normal
  - Direction: 0 / 1 / 0
- Color 로 그룹한 상단면을 색칠해준다
- Fuse
- Poly Reduce
- Remesh
  - Iteration: 1
  - Smoothing: 0
  - Target Size : 0.02
- Group 하단 매쉬는 안보이니까
  - Keep By Normal
  - Direction: 0 / -1 / 0
- Blast 으로 제거
- Auto UV
  - Method: UV Unwrap
- Normal


---

점뿌리기

- Foreach Connectivity
  - Measure
  - Scatter
    - Force Total Count: prim("../measure1/", 0, "area", 0) * 1000

---

펜스같은거 만들기

- Labs Straight Skeleton 2D 쓰면 라인얻을 수 있고
- Resample

짧은거 없에기는 Forech Connectivity에서  널 2개랑 스위치 활용해서 arclen
arclen("../null1", 0, 0, 1) > 1


---

PSD -> Extract Layer -> Extract Method
 - As IS
 - Sweep
 - Point
 - Terrain
 - Scatter Area
 - Fence
 - Building
 - Decal


