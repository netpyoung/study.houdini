
- 간략하게
  - 바닥 면 만들고
  - 바닥을 둘러싸는 태두리 면을 만들고
    - Bottom/Floor의 그룹을 구할 수 있다.
      - nprims("../isolateWall")
  - 층계를 구성하고
  - 코너를 구분하고
  - 태두리 면의 기준점을 구한다
    - 태두리 면의 중점을 (층계의 높이/2)를 이용하여 바닥에 붙인다.


tip
- 지우는걸 빨간색


- 시작 - 바닥
  - `Object Merge`를 첫 노드로 활용하여 입력으로 활용한다.
    - Curve를 인풋으로 받음.
  - `Attribute Delete`로 포인트의 scale/rot를 제거한다.
  - `Ends` - Close U - Close Straight로 닫아준다.

``` vex
@P.x = rint(@P.x);
@P.y = 0;
@P.z = rint(@P.z);


```

- 행은 Attribute Create
  - $PR 넣어서 프리미티브랑 맞춰 COLUMN.
- 열은 Copy에서
  - Translate의 y는 높이값 복사하고.
  - Copy Number Attribute로 ROW 지정.
- 기둥
  - Group Create - Include by Edges의 Min Edge Angle을 이용하여 기둥 구분 GRP_CORNER
  - Group Promote로 edge를 primitive로 만들어서 기둥공간 확보
  - Attribute Create로 앞선 primitive의 어트리뷰트 이름짓기 ATTR_CORNER
- 벽면
  - For-Each Primitive로 돌면서
    - Attribute Promte로 Primitive의 어트리뷰트들을 Point로 이동시키고
    - Normal - Points로 N을 할당한다.
    - Fuse로 Snap Distance/Fuse Snapped Points를 체크해제하여 센터를 얻고 - Recompute Affected Normals 체크해제
    - 또 Fuse를 사용하여 Keep Fused Points/Remove Repeated Vertices and Degenerate Primitives를 체크해제하여 어트리뷰트상 P가 하나만 남도록 해준다. - Recompute Affected Normals 체크해제



point("node", number-point, "attributename", index)
prim("node", number-prim, "attributename", index)
vertex("node", number-prim, number-vert, "attributename", index)
detail("node", "attributename", index)
nprims("../isolateWall")

clamp( ch("barOffset") ,  bbox(-1, D_YMIN) , bbox(-1, D_YMAX) - + ch("../../frameThickness"))

- 문 프레임

``` txt
  - Poly Extrude - insert/Front를 날려서 가운데 뚤어주고
3     2
  6 7
  5 4
1     0 

Blaster 0번쩨 프리미티브 날리면 하단 바가 날라감
Transfer 4 5번의 y를 0으로 옮기고
Attribute Wrangle로 상단 문 위치를 조절할 수 있게 만들어주고
Fuse로 상단 문이 완전히 닫혔을시 겹친 점을 제거해주면
문 프레임 완성.
```

- Switch
  - Spare Input추가: ../tileData
  - SelectInput : point(-1, 0, "ATTR_TILE_ID", 0)
  - 루프 돌면서 문/창문이 생김.



- 기본조작
  - 활용: Spare Input
- 쉐이핑
- 노말
- 텍스쳐
- 콜리젼
  - Object Merge로 로우폴리를 불러와서
  - Attribute Delete로 속성을 다 날려준다.
  - Group Delete로 그룹을 다 날려준다.
  - Divide 로 Don't Generate Slivers/Avoid Small Angles 동시 체크
  -  Group
     - <https://www.sidefx.com/docs/houdini/unreal/meshes/collisions.html>
     - <https://www.sidefx.com/docs/houdini/unity/meshes.html>
     - collision_geo
   - 그릴꺼는
     - rendered_collision_geo
       - ^Cd
       - ^N ^uv
       - ^shop_materialpath
   - 나중에 합치고
     - Group Delete에서 ^collision_geo ^rendered_collision_geo



- ERWIN HEYMS - Techinical Artist
  - Ghost Recon Wildlands / Breakpoint - Ubisoft


  - [Foundation Module - The Foundation Project](https://youtube.com/playlist?list=PLd959VTYXCB747UsN1EV8_bLUVEhhtL3i)


Introduction - ( Free Houdini Tutorial for Game Dev with the Unreal Engine )
01 - Project Setup & Example Files
01.5 - On-boarding for Houdini 19 Users
02 - Setting Up the Ground Plane
03 - Extruding The Walls
04 - Basic Tile Generation
05 - Assigning Tile Groups
06 - Modeling the Wall Tiles
07 - Exporting Clean Assets To Unreal


[08 - Interior Grid With VEX](https://youtu.be/GrJWjtNLqdE)
  건물에 계단이랑 엘리베이터를 넣을껀데 사전작업으로 구멍뚫음.

  그리드와 바닦면을 겹치고. 겹쳐진 그리드의 영역을 구해 랭글로 작은 영역을 제거한다.
  Extract Centroid의 Bounding Box Center로 중심점을 구함.


Grid에 Spare Input으로 영역을 넣고
size: bbox(-1, D_XSIZE) + (  ch("../../interiorGridScale") * 6 ), bbox(-1, D_ZSIZE) + (  ch("../../interiorGridScale") * 6 )
center: centroid(-1, D_X), 0, centroid(-1, D_Z)
rows: ch("sizey")
columns: ch("sizex")


v@P.x = rint( v@P.x / ch("gridSize") ) * ch("gridSize") + ( ch("offsetX") % ch("gridSize") );
v@P.y = 0;
v@P.z = rint( v@P.z / ch("gridSize") ) * ch("gridSize") + ( ch("offsetZ") % ch("gridSize") );


Boolean Intersect - Surface / Surface



``` vex
float area = f@area;

float gridScale = pow( chf("gridScale"), 2 );

if ( abs(gridScale - area) > 0.001 )
{
    removeprim(0, @primnum, 1);
}

i@validPiece = @primnum;
```

[09 - Staircase Placement Controls](https://youtu.be/YXYEkRhVX88)
OUT_ElevatorShaft
엘리베이터용 박스의 크기를 조절 후, 엘리베이터 위치에 위치.

``` txt
Convert Line

Attribute Wrangle - Primitive
addpoint(0, v@P);
removeprim(0, @primnum, 1);


Attribute Wrangle - Point
// input0: point
// input1: center position
// input2: edge position
vector originPos = v@P;
vector pos = point(1, "P", nearpoint(1, v@P));
v@P = pos;
vector snapPos = point(2, "P", nearpoint(2, originPos));
v@N = normalize(snapPos - pos);
```


``` txt
Box
ch("../../interiorGridScale"), bbox("../copyFloor/", D_YSIZE) + ch("../../doorUpperBarOffset") + ch("../../frameThickness") + ch("../../floorDepth"), ch("../../interiorGridScale")
0, ch("sizey") * 0.5, 0



Box
ch("../../interiorGridScale") * ch("../../stairDepth"), bbox("../copyFloor/", D_YSIZE) + ch("../../doorUpperBarOffset") + ch("../../frameThickness") + ch("../../floorDepth"), ch("../../interiorGridScale") * ch("../../stairWidth")
0, ch("sizey") * 0.5, 0
Translate
( ch("../../interiorGridScale") * ch("../../stairDepth") * 0.5 ) - ( ch("../../interiorGridScale") * 0.5 ) , 0, ( ch("../../interiorGridScale") * ch("../../stairWidth") * 0.5 ) - ( ch("../../interiorGridScale") * 0.5 )

```


Unreal - Use Mesh Center
World Outliner Input
Keep World Transform
if(ch("../../inputMethodStaircase") == 0, 2, 1)

[10 - Delete By Distance Utility](https://youtu.be/VW2xUuK5qOg)

STUB_UTIL_DeleteByDistance 만듬.

- Digital Asset의 Icon을 다른 노드에서 가져왔다
  - Type Properties > Basic > Icon
- 아이콘색
  - Script > Event Handler > On Created
``` python
node = kwargs["node"]

color = (0.976, 0.78, 0.26)
hou_color = hou.Color(color)

node.setColor(hou_color)
```

- 더미그룹
  - Group
  - Union with Exisiting // !*



[11 - How To Make A Visualizer](https://youtu.be/kWbmgr51TxM)
Grid 표시도구 만듬.

Blast // 0 `nprims(0) - 1` // Delete Non Selected
Group Expression // neighbourcount(0, @ptnum) == 3
Group Expression // v@P.y < 0.001 / Merge Op : Intersect with Existing


Line // ch("../../floorHeight") * ( ch("../../floorCount") + 1 )


그리드 라인에 그냥 PolyWire쓰면 메쉬가 깔끔하지 않으니 중간에 Point Split을 놔줌

[12 - Setting Up Unreal Instances (1)](https://youtu.be/_N_oyT9FN30)

instance 사용하면 빠르고 가볍다.
언리얼
 - Split Instancing : 개별 메쉬
 - Instances : 뭉처진 단일 메쉬

https://www.sidefx.com/docs/houdini/unity/instancing.html



앞서 만든 STUB_UTIL_DeleteByDistance 로 계단, 승강기에서 비어있는 그리드 영역을 찾고 Copy To Point로 기둥을 세운다.

13 - Spawning Unreal Instances (2)
14 - Generating FBX Instances (3)
15 - How to make Collisions for Unreal
16 - Updating an Existing Utility Asset
17 - Status Readout Visualizer
18 - Understanding Texture UVs
19 - Unreal Material Utility Node
20 - Extrude and Texture Node (1/2)
21 - Extrude and Texture Node (2/2)
22 - Procedurally Texturing Our Building
23 - Modeling The Elevator Shaft
24 - Building The Staircase Housing
25 - Modeling a Procedural Staircase
26 - Finishing the Procedural Staircase
27 - Installing the Balcony Framework
28 - Modeling Balconies using Vex
29 - How to Compile And Optimize Houdini Tools
30 - Re-Texturing using Vex and Groups
31 - How to Migrate a Projects to Houdini 19
32 - Wrapping up the Foundation Project



=======================

- [Procedural House in Houdini - Aleksandr Shtyvoloka](https://www.udemy.com/course/procedural-house-in-houdini/)

- 큐브로 뼈대를 만든다.
  - 포인트로 가운데는 유지, 사이드는 sort로 랜덤섞고, wrangle removepoint로 지움. 큐브랑 copy to point.
  - wrangle로 nearpoints나 point cloud를 이용하여 혼자만 동떨어진 포인트를 삭제.
  - 3층 같은 경우 아레로 레이를 쏴서 칸이 비면 생성 안함.
  - Merge 후 Boolean(union)으로 묶어준다.

- @facing
  - N.y ==  1 : top
    - P.y가 가장 높으면 :roof
    - 아니면 : balcony
      - balcony_door랑 붙어있으면 : balcony_floor
  - N.y == -1 : bottom
  - else : wall
    - balcony의 Primitive의 중앙 점들을 구하여, 건물 중앙으로 ray후, Sort(random)으로 하나 픽 : balcony_door
    - 1층의 벽중 하나를 : door
    - 랜덤으로 : window
      - 다만, balcony랑 붙어있으면 : wall

- 지지대 기둥 (sub:support)
  - bottom을 아래로 이동. 건물에 (1,0,0)을 입히고 Attribute Transfer의 Distance Threshold로 건물에 닿는 점을 구해서 그 점을 Blast로 빼면 그곳이 메인 지지대를 추가할 기준점이 됨.

- 발코니 지붕(sub:balcony_roof)
  - balcony에서 
    - 테두리: Cube를 사선으로 잘라서
    - 코너쪽: Cube를 직각 사각뿔로 만들어서
      - 코너쪽은 지붕면이 맞닿은 부분의 점을 선택 resample하여 추후 휜거 구현할때 사용.
- 발코니 난간(sub:balcony_handrail)
  - 벽에 붙어있지 않는 점에는 작은 지지대
  - balcony floor에서 벽에 붙지않는 선을 따서 polyframe으로 N을 구하고 Extra centroid로 중앙점을 구해 난간 구조물 설치
- 판자 수평지지대(sub:plank)
  - 벽을 connectivity foreach로 돌면서 연결된 프리미티갯수를 저장하며(i@nop = @numprim;) 중점을 구하고, 연결된 프리미티브 갯수만큼 판자크기를 조정
- 벽기둥(sub:pillar)
  - bottom에서 Divide(remove shared edge)로 하나로 만들고 점마다 기둥을 만듬

- roof
  - Blast: @facing=roof
    - 큰 지붕(지붕선 포인트들을 top_pts로 그룹핑)
      - Poly Extrude & Group(Keep in Bounding Regions)로 가운데 점만 얻어와서 결합
    - 작은 지붕(지붕선 포인트들을 top_pts로 그룹핑)
      - Extract Centroid로 가운데 Point를 따서 Wangle로 주변 포인트 갯수가 3이상인 것들만 뽑아서 결합.
      - @N.y=0인걸 뽑아서 큰 지붕으로 Ray를 쐈는데 맞지 않으면 큰 지붕과 연결하도록 90도를 회전.
      - 다시 @N.y=0에서 큰 지붕으로 Ray를 쏴서 top_pts들만 이동시키면 큰 지붕과 연결됨.
  - Quad를 Remesh해서 내부 점을 만들고, Point Jitter로 산란

- 굴뚝
  - roof에 normal을 입혀 @N.y>0인 상단을 향하는 면을 Measure로 영역을 구해 일정역역이면 굴뚝 후보
  - For-Each Primitive로 돌면서 Poly Frame으로 Tangent를 N으로 할당 후, Facet으로 한번 합쳐주고, Peak으로 굴뚝 후보 영역을 지정한다.
  - Scatter를 이용하는데 Force Total Count를 1로하고 Seed로 랜덤성을 줘서 거기에 굴뚝을 연결.
=======================

## 기둥만들기

- [Houdini Procedural House with Unreal Engine 5](https://www.udemy.com/course/houdini-procedural-house-with-unreal-engine-5/)

### (sub: profile_revolver)

- Wrangle(detail) Ramp로 모양잡고
```vex
int point_arr[];

float profile = chramp("profile", 1);
int pointCount = chi("./profile");

for (int i = 1; i < pointCount; ++i)
{
    float p_pos = ch("./profile" + itoa(i) + "pos");
    float p_val = ch("./profile" + itoa(i) + "value");
    int new_point = addpoint(0, set(p_pos, p_val, 0));
    append(point_arr, new_point);
}

addprim(0, "polyline", point_arr);
```
- Transform rotate.z = 90
- Transform scale.x = 0.5
- revolve
- reverse
- uvproject
- uvlayout
- wrangle(point)

``` vex
int point_arr[] = neighbours(0, @ptnum);

foreach (int pt; point_arr)
{
    vector pos = point(0, "P", pt);
    if (abs(pos.y - @P.y) > 0.01)
    {
        setedgegroup(0, "vertical", @ptnum, pt, 1);
    }
}
```

- wrangle(primitive)

``` vex
if (inprimgroup(0, "endcaps", @primnum))
{
    if (@N.y > 0.1)
    {
        i@group_topcap = 1;
    }
    else
    {
        i@group_botcap = 1;
    }
}
```

--
- 창문
  - profile로 윤곽잡고 mirror. 그리고 grid랑 sweep
- 문 축회전
wrangle(detail)로 두번째 인풋 활용해서 bbox정보 얻어서 넣어주고
vector min;
vector max;
getbbox(1, min, max);
v@doorRotPivot = set(min.x, 0, max.z);
  - Pivot Translate.xyz => detail(opinputpath(".", 0), "doorRotPivot", 0) detail(opinputpath(".", 0), "doorRotPivot", 1) detail(opinputpath(".", 0), "doorRotPivot", 2)


---

직각삼각형 right-angled triangle
밑변 B base
빗변 H hypotenuse
수직 P perpendicular

cos$ = B / H
H = B / cos$

직각 삼각형 난간
float cos_X = dot(line_dir, {1, 0, 0});
float B = pillar_thickness / 2;
float H = B / cos_X;
float P = 

float cos_X = dot(line_dir, {1, 0, 0});
@projected_pillar_half_thickness = pillar_thickness / 2 / cos_X; // H = B / cos$


---


## Building Generator

- <https://www.sidefx.com/tutorials/bsp-to-building-ue4/>
  - Binary Space Partitioning, BSP
- <https://www.sidefx.com/tutorials/games-workshop-artist-track/>
  - [Building Generator | Simon Verstraete | Games Workshop](https://www.youtube.com/watch?v=imuPUxCUJ3U)


- building_generator_utility로 모듈별 이름을 짓고
- building_generator로 만듬
  - Face Module Pattern : Wall*
  - Concave Corner Module: Corner_L / Corner_R
  - Concave Corner Module: Corner_L_IN / Corner_R_IN
  - 