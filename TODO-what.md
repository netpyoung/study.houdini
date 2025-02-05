물레방아
풍차
돌담벼락
다리
  철골
  돌
댐
터널
시카고 전철
  Lake Street
도로

그림에서 선따오기(패턴같은거)

https://www.artstation.com/kks
https://www.sidefx.com/titan/

=====================
vex 공부순서
Geometry SpreadSheet
Attribute Wrangle
기본자료형
빌트인 변수
ch 채널

====


[1MaFX - VFX Spherical Shield Mesh - Houdini](https://www.youtube.com/watch?v=aOk_qP463QY)


- Sphere - Polygon
- Divide
  - Smooth Polygons 체크 - Weight.x = 0
  - 혹은 Compute Dual만 체크
- Fuse
- Split Points
- Exploded View (for preview)
- Poly Extrude
  - Insect : 0.015
- Group
  - Group Name : edges
  - Edges
  - Base Group : disable
  - Include By Edges : enable
    - Unshared Edges // Groups all points/primitives/edges with unshared edges. For edge groups, an edge is added to the group if it only has one primitive adjacent to it.
- Color
  - Group : edges
  - Color : black
- UV Project
  - UV Attribute: uv
  - Projection : Polar
  - Pole Radious
- UV Smooth
  - Constrained Boundary: None
  - Filter Quality : 1
  - Strength : 5000
- UV Project
  - UV Attribute: uv1 
  - Projection : Polar
  - Pole Radious
- Normal
  - Cusp Angle : 180 // Cusp: 뾰족한 끝
- Labs Soften Normals



[Energy Shield Portal in Unreal Engine & Houdini (Pro Unreal Engine Tutorial)](https://www.youtube.com/watch?v=lzLfGRp-0_w)


- Ray
  - Labs Cylinder Generator
    - Outer Radious : 0.97
    - Sides 64
    - Segments 32
    - Enable Ramp
    - Add UVs
  - Labs Sphere Generator
    - Cut Sphere
- Transform
- ROP FBX Output


====

창문

- Grid
  - Rows/Cols : 2/2
- Poly Extrude
  - Distance 10
- Delete
  - Operation: Delete Non Selected
  - Normal
    - Spread Angle: 60
- Divide
  - Convert Polygons: disable (볼록 다각형(convex polygon))
  - Bricker Polygon : size 1.7/3.4/3.4
- Group // 테두리 포인트만 선택
  - Group Name : test
  - Group Type : Point
  - Base Group : disable
  - Include By Edges : enable
    - Unshared Edges 
- Blast // 테두리를 날리고
  - Group: test
- Add // 점으로 만들어서 창문 위치를 만듬
  - Delete Geometry But Keep the Points
- Copy To Point 로 창문을 담
- Boolean
  - 앞서 delete된것이랑
  - Output Gemetry
    - Operation : Substract
- Divide
- Poly Bevel
  - Ignore Flat Edges
  - Offset : 0.01
  - Shape : Round
  - Divisions : 4



창살
- Divide
- Facet
  - Divide만 하면 폴리곤이 연결되어있으니
  - Unique Points: enable 하여 개별컨트롤이 가능하도록
- Primitive
  - Transform : Rotate 하여 창살루버(Louver)처럼 보이게함.

기둥(상/하 사각에 중간은 원형인)
- Grid
- Carve
  - First U : 0
- Resample
  - Length : 0.3
- Fuse
- Point VOP
  - x = IntToFloat(ptnum) / Divider
  - FloatToVec => P
    - x => Cosine
    - x => Sin
- Transform
  - Scale 하여 원래 그리드랑 사이즈 비슷하게
- Point VOP // ramp로 기둥모양
  - Fuse한걸 Copy 하여 증가 - 입력1
  - 앞서 원형으로 된걸 Copy하여 증가 - 입력2
    - Import Point Attribute
  - P => Mix => P
    - bias: P => VecToFloat => Fit => Ramp
- Skin
- Rest Position
- Twist
- Point VOP를 한번 더 써서 중간만 twist되게
    


Circle에서 들어간 효과
- GroupByRange
  - Group : center
  - Group Type : Points
  - Select : 1 of 3
- Soft Transform
  - Group : center
  - Scale : 0.8
  - Soft Radious : 0.5

=====

- Circle
  - Primitive Type : Polygon
  - Arc Type : Open Arc
- Poly Frame
  - Normal Name : disable
  - Tangent Name : N
- Add로 연결을 끊어주고
- Attribute Create
  - Name : up
  - Type : Vector
  - Value : 0/1/0
- Copy To Point // 이제 이걸 사용해서 원 밖을 향하는 너클같은걸 만들 수 도 있다.


Select 모드에서 선택 위쪽 Radial Menu에서 Poly Modeling 로 변경 후 C키


====
트림시트
[Houdini & Substance Designer: Material Tutorial](https://www.youtube.com/watch?v=gfS6ylg9vbA)

- Line
  - Direction : 0/0/1 // 3차원을 2차원으로 z(v)를 1로
  - Points: 가로줄 갯수
- Edit 으로 가로줄 위치(포인트) 조절
- Poly Extrude
  - Transform Extruded Front : enable
  - Transform Space : Global
  - Translate : 1/0/0
- Primitive Split
- Group 으로 면을 선택하여 트림시트 섹션 이름 설정
- Blast
- 타일링 원하는 넘은 넉넉하게 스케일
  - Transform
    - Scale : 원하는만큼/1/1
    - Pivot Translate : $CEX/$CEY/$CEZ
- 혹은 세부디테일을 위한 잘게 쪼개기
  - Labs Lot Subdivision
  - Primitive Split
- Merge
- Poly Extrude
- Poly Bevel
- Clip하여 Scale된것도 짤라주기
- Normal
- Connectivity
- Color

- Grid
  - Size : 1/1
  - Center : 0.5/0/0.5
  - Rows : 2
  - Colums : 2
- UV Project // Initialize 탭에서 Initalize해도 됨.
  - Translate : 0.5/0/0.5
  - Rotate : 90/0/0
Labs Maps Baker



[Algorithmic drawing - Shaping functions](https://thebookofshaders.com/05/)
[Circular & Elliptical Shaping Functions](https://www.flong.com/archive/texts/code/shapers_circ/)


- Rebelway
  - BEGINNER 
    - [Houdini Fundamentals](https://www.rebelway.net/houdini-fundamentals)
  - INTERMEDIATE 
    - [HOUDINI FOR 3D ARTISTS](https://www.rebelway.net/houdini-for-3d-artists)
      - 고딕 건축
    - [STYLIZED FX FOR GAMES](https://www.rebelway.net/stylized-realtime-fx-games-course)
      - 후디니 베이스매쉬 섭디 텍스쳐, 언리얼 플레이
  - CORE 
    - [ADVANCED ASSET CREATION](https://www.rebelway.net/advanced-asset-creation-series/)
      - cop
    - [City Creation in Houdini](https://www.rebelway.net/city-creation-in-houdini-course)
    - [Environment Creation in Houdini](https://www.rebelway.net/mastering-environment)
    - [VEX FOR HOUDINI ARTISTS](https://www.rebelway.net/vex-for-houdini-artists)
      - vex로 맛보다가. 액채 이동
    - [Python for Houdini Artists](https://www.rebelway.net/python-for-houdini-artists)
  - ADVANCED
    - [Python For Production](https://www.rebelway.net/python-for-production)



- uv
  - [Simon Houdini - Houdini Unwrapping Techniques: The Basics](https://www.youtube.com/watch?v=VNX9Qf6a5hs)
  - [cgside - Procedural UVs - UV Layout Node in Depth](https://www.youtube.com/watch?v=7kUDLsNn0iA)
  - [Going Procedural - Introduction to Houdini 16: Simple Procedural UVs](https://www.youtube.com/watch?v=YFXdTfdrT4Y)


실린더
- Tube
  - Primitive Type : Polygon
  - End Caps : enable
- Transform
  - Pivot Translate : 0/$YMIN/0
  - Translate : 0/-ch("py")/0
- Blast 0 1
  - UV Texture
    - Texture Type : Cylindrical
    - Scale : (ch("../transform1/sy"))
    - Fix Boundary Seams
- Blast 0 1 (Delete None Selected)
  - UV Unwrap
- Merge
- Fuse
- UV Layout
- UV QuickShade
============

- Substance Designer
  - Cloud Noise
    - Multi Directional Warp
      - Anistropic Noise
      - Gaussian Noise
  - Slice Dust
    - Tile Sampler
      - Polygon : 삼각형
      - Gradient Linear 2
    - Shape로 공 4개만들고 TileSampler(paraboloid)랑 blend하여 마스크를 만듬


====================


[Houdini as a Comprehensive Gamedev Tool | Ben House | GDC 2019](https://www.youtube.com/watch?v=EjkQv8L3z4s)


============

trimsheet

[Sci Fi Stair Generator | Part 3 | Unwrap UVs for Trim Sheet](https://www.youtube.com/watch?v=cZYVdJLaDek)


==============


Introduction to houdini for 3d artists
아치형(터널) 3 packed primitives
- Circle
  - Primitive Type : Circle
  - Arc Type : Closed
  - Arc Angles : 180
- Poly Extrude
  - Distance : 0.2
- Poly Extrude
  - Distance : 0.2
  - Output Back : enable
- Group
  - Base Group : disable
  - Keep By Normal
    - Direction : 0/-1/0
    - Spread Angle : 89
- Transform
  - Scale : 1/0/1
  - Translate : 0/원하는만큼/0
