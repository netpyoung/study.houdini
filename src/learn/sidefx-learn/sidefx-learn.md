
# Learning Paths

- 튜토리얼이 vimeo로 된게 많은데 느릴시 CDN Priority 조정
  - https://player.vimeo.com/flags?p=general

##  [Learn > Learning Paths > Unity](https://www.sidefx.com/learn/unity)

### START HERE

- [UNITY STARTER KIT](https://www.sidefx.com/tutorials/unity-starter-kit/)
  - https://www.youtube.com/playlist?list=PLXNFA1EysfYl0noIUdMUSsG-TOpkm0-CQ
  - 여러 툴들 소계
  - Tree
    - 가지
      - Curve로 나무 기둥을 잡고
      - Resample - Subdivision Curve로 부드럽게 함
      - Facet으로 점 정리를 하고
      - 기둥 중간에서 렌덤으로 위치를 잡고
      - distancefromtarget으로 바닥에서 멀어질 수록 짧게 가지가 자랄 수 있도록 한다
        - https://www.sidefx.com/docs/houdini/nodes/sop/distancefromtarget.html
      - 가지가 자랄때는 Bend로 위를 향하게 하고 몇번 반복하고 Sweep하면 가지는 완성
    - 나뭇잎영역
      - 가지 영역을 Bound/Remesh후 Ray하면 가지 영역을 랩핑한것과 같아짐
      - Remesh/ Smooth/ Peak하면 나뭇잎영역을 얻을 수 있음
    - 나뭇잎은
      - Grid 3장을 90도 각도로 겹쳐서 나뭇잎 영역에 뿌림
  - UNITY Starter Kit | Rock Tool
    - 바위 영역
      - Voxel Mesh로 바위를 생성할 영역을 둥글게 만들어 주고
      - 메인 바위는 Scatter로
      - 주변 바위는 edgegroup to curve / scatter / peak으로 펼쳐서 뿌려준다
      - 바위 설정은 Point VOP로 그라디언트로 색입히기(아레쪽이 어둡게)
  - UNITY Starter Kit | Modular Wall Tool
    - 나무 타입
      - Box를 Poly Bevel로 부드럽게 한 후 9도정도 기울이게
      - mountain대신에 point jitter로 살짝 모양 변형
      - symmetrize로 앞뒤 같게
    - 바위 타입
      - lot_subdivision로 영역을 나누고
      - attr random - float point:Cd ramp
      - attr promote - point:Cd => - primitive:Cd
      - Poly Extrude : insert 마이너스
        - indivisual elements / output side은 필요없음
      - Poly Extrude : distance
        - Local Control로 Distance Scale : Cd
      - Attr noise - pscale
      - Divide
      - Poly Bevel - Scale by Attribute : pscale
  - FOLIAGE
    - :TODO
    - 모드 Leave/ Plant /Ivy
    - 담쟁이처럼 물체따라 가는거
  - UNITY Starter Kit | Edge Damage Tool
    - switch-if : npoints(0)==0
    - remesh 스므스 살짝 / smooth / normal / mountain / peak / normal 그리고 boolean
  - UNITY Starter Kit | Level from PSD Tool
    - :pass
  - UNITY Starter Kit | Placement Tool
    - :pass
  - UNITY Starter Kit | Level from WFC
    - :todo
  - UNITY Starter Kit | Pipe Tool
    - 커브에서 Bevel을 적용한 다음 그 꺽인 부분에 이음세를 넣는 방식
  - UNITY Starter Kit | Platform Tool
  - Unity Starter Kit | Terrain Tool
  - Unity Starter Kit | Trim Tool
  - Unity Starter Kit | Road Tool



- [GETTING STARTED WITH HOUDINI ENGINE FOR UNITY](https://www.sidefx.com/tutorials/getting-started-with-houdini-engine-for-unity/)
  - 육각형 지형, HDA 생성, unity_instance
  - Attribute Create
  - Attribute Randomize
- [HOUDINI ENGINE FOR UNITY | INSTANCING & VARIATION](https://www.sidefx.com/tutorials/houdini-engine-for-unity-instancing/)
  - Scatter and Align 로 뿌려넣고 unity_instance로 소환
  - Attribute Randomize
    - Options / Global Seed
  - Parameter Description / Type: String / Tags / TagName: heuassetpath 로 엔진파라미터로 프리팹 받을 수 있도록 설정.
- [HOUDINI ENGINE FOR UNITY | SESSION SYNC](https://www.sidefx.com/tutorials/houdini-engine-for-unity-session-sync/)
  - https://www.sidefx.com/docs/houdini/ref/panes/enginesessionsync.html
  - Houdini > New Pane Tab Type > Misc > Houdini Engine SessionSync > Start
  - Unity > Houdini Engine > Session Sync > Connect to Houdini
  - 유니티에서 hda 불러오면, 후디니에서도 보기 가능
  - 유니티에서 New Node를 생성하면, 후디니에서도 생성됨. 후디니에서 편집가능.
    - 유니티에서 Save Node로 저장하면 .hess(`H`oudini `E`ngine `S`ession`S`ync)
    - 유니티에서 Load NodeSync로 불러오기 가능.
- [GAMES QUICKSTART](https://www.sidefx.com/tutorials/games-quickstart/)
  - 간단한 모델링, 그루핑, 어트리뷰트, HDA, Curve
  - Desktop 설정
  - 단축키 C
    - [HOTKEYS](https://www.sidefx.com/tutorials/hotkeys/)
  - node
    - Poly Extrude
    - Poly Bevel
    - Poly Split
    - Bend
    - Edit
    - Fuse
    - Resample
    - Copy To Point
    - Orientation Along Curve // Curve에서 각도 유지
      - 파라미터 조정을 통해 사슬과 같은 효과를 낼 수 있다.
    - Copy To Curve == Orientation Along Curve + Copy To Point
    - Draw Curve // 축 기반으로 그리거나, 매쉬에 그릴 수 있음.
    - Match Size // 중점 이동
    - Trace // Traces curves from an image file or heightfield.
  - Group
    - Group
    - Group by Range // with Tube, Poly Extrude
    - Group Combine
    - Group Promote
  - Attribute
    - Attribute Create
    - Attribute Noise // Cd, scale, N, pscale
    - Attribute Randomize
    - Attribute Promote
  - 6 | MAKE GAME-READY ASSETS
    - 1
      - File
      - Labs Game Res // Reduce, Auto UV, Bake
      - ROP FBX Output
    - 2
      - Poly Reduce
      - Auto UV
      - Soften Normals
      - Labs Map Baker
    - 블록 모서리 깍인 효과
      - Attribute Noise - pscale
      - Poly Bevel
        - Ignore Flat Edges
        - Scale By Attribute
- [HOUDINI DIGITAL ASSETS](https://www.sidefx.com/tutorials/houdini-digital-assets/)
  - 사슬
    - Draw Curve - Resample - CopyToCurve
      - Apply Yaw
        - Yaw: 90
      - Apply Roll or Twist
        - Full Twists: 7
  - 팬스
    - 노드
      - output, color
      - Point Jitter로 변형 (crooked)
      - Poly Bevel - Round
      - Attribute Noise - scale 로 높이조정
      - Attribute Noise - N 로 흩으러짐(회전) 효과
      - Distance Along Geometry
        - Output Mask로 Ramp값을 할당
      - Attribute VOP
        - Import Point Attribute - mask
        - 변형주고 scale에 할당.
      - Labs Color Gradient로 y축 기반 색상 지정.
      - Copy To Curve
        - Target Type: Next Edge로 이어진 팬스
        - Target Up Vector 조절로 뒤집힘 방지.
    - HDA
      - Parameter
      - Match Current Definition
    - vex: ch
  - Type Properties > Node > Guide Geometry
    - 가이드라인으로 와이어 프레임으로 보여짐.
    - Switch추가로 Toggle하여 사용

## [Sci Fi Level Design](https://www.sidefx.com/learn/collections/sci-fi-level-design/)

### SCI FI PANEL GENERATOR
- PART 1 | MODELING THE PANEL
  - PSD를 읽어 모델에 반영
  - GameDev Trace PSD File 노드
    - 레이어 및 Brightness Threshold 지정 가능
  - Split으로 그룹을 일단 나누고.
  - Blaster로 PSDLayerNumber 분리
    - @PSDLayerNumber=1 // Delete Non Selected
  - GameDev Thicken
  - GameDev Axis Align
  - 원통의 Bound를 구하고 Blast로 옆면을 때 Fuse로 중앙 점을 찾음
    - Attribute Randomize로 index를 설정하고
    - Copy - Stamp - Stamp Input 체크 및 Attribute Stamps에 index ?? 스탬프가 뭘까?
    - Switch 쪽에서 stamp("../copy1", "index", 0)
    - Create Meta Import Node
      - iteration, numiterations, value, ivalue
    - Attribute Randomize의 Seed에
      - detail("../repeat_begin1_metadata1/", "iteration", 0)
      - rand(detail("../repeat_begin1_metadata1/", "iteration", 0) + $F)
  - Assemble : 매쉬 정리
    - Create Packed Geometry
  - Blast로 원하는거 몇개 골라서 @P.z > 5
  - Unpack
  - For-Each Connected Pieces
    - Transform
      - Pivot Translate : $CEX, $CEY, $CEZ (영상에선 preset 활용했음)
      - Scale: 1, 0, 0
    - Scatter로 랜덤하게 좀 뿌려주고
      - Seed: detail("../repeat_begin1_metadata1/", "iteration", 0)
    - Fuse로 붙어있는거 좀 정리해주고
    - Create Meta Import Node
    - 새로운 갈래
      - Transform
        - Translate : - $CEX, - $CEY, - $CEZ
        - Scale: 0.1, 1, 1
        - Pivot Translate : $CEX, $CEY, $CEZ (영상에선 preset 활용했음)
      - PolyBevel로 볼트처럼 만들고
    - Copy To Point
    - 볼트 종류는 Switch로 (switch2)
    - Attribute Randomize에서 
      - Max Value: opninputs("../switch2/") - 1 : opninputs 인풋 갯수 반환
- PART 2 | ADDING DETAIL
  - GameDev Trace PSD File 노드
    - Split으로 그룹을 일단 나누고. @Cd.r > 5 - Invert Selection
      - 그룹1 - 선으로 면에 이음선 넣기
        - GameDev Straight Skeleton 2D (Beta) / Facet / Fuse 로 선을 얻고 / Attribute Create N을 사이즈3. 값 0, 0, 1
        - Sweep - Skin Unclosed으로 Line과 엮어서 판을 만듬.
        - For-Each Connnected Piece
          - Boolean Shatter
          - Poly Bevel
        - Attribute Delete - Cd
      - 그룹2
        - For-Each Connnected Piece
          - Fuse
        - Transform으로 위치를 올려서
        - Ray 로 닿는 면과 달라붙도록 만듬.
        - Attribute Randomize - N
  - 그냥 표면
    - GameDev Voxel Mesh
    - GameDev Measure Culvature 
    - Blast - @Cd > 0.2
    - Group - Keep by Normals - 0, 1, 0
    - Scatter
  - 추가 작업
    - GameDev Voxel Mesh - Resolution을 다르게 해서 high, low폴리 제작
    - Lattice
    - Poly Reduce
    - Group - 0, -1, 0의 하단 패널 부분을 선택
    - Blast
    - GameDev Delete Small Parts
  - 파이프
    - Group - Include by Edge - Min Edge Angle을 조정하여 각진 부분만 그룹핑
    - Poly Bevel
    - Subdivide
  - 파이프 클립
    - Clip으로 파이프 전체가 아닌 단면만을 사용가능.
  - 마무리
    - GameDev Remove Inside Faces
    - GameDev Auto UV - UV Unwrap
    - GameDev Soften Normal - Harden UV Seams
- PART 3 | CREATING THE DIGITAL ASSET
  - HDA 설정

### SCI FI CRATE GENERATOR

- PART 1 | MODEL THE CRATE
  - Box / GameDev Axis Align / Null(IN)
  - Boolean - Shatter로 뚜껑을 구분지음 - A-Only Piece
    - Grid - 0, bbox("../IN/", D_YSIZE) * 0.8
  - IN_Part_01
    - group / blast / polybevel / polyfill 로 윗단을 날리고 하단을 부드럽게 하고 윗단을 다시 채운다
- PART 3 | BAKE THE TEXTURE MAPS
- PART 4 | ADD DECALS


### SCI FI DOOR GENERATOR

Box - PolyBevel 이랑 Boolean (Shatter) - Poly Expand 2D를 사용해서 문 패턴

그룹을 쉽게할 수 있는 Quick Group이라는 서브네트워크가 있음


###	SCI FI TERMINAL & FUEL TANKS
Carve랑 Boolean 조합 모양잡기

### SCI FI STAIR GENERATOR

Line을 Resample한것과 Line을 Bound한것을 Ray(Minimum Distance)시켜서 라인의 크기 방향이 변해도 꺽이는게 일정하도록 끝부분만 꺽이게 만듬.
- PART 3 | UNWRAP UVS FOR TRIM SHEET
  - UV 입힐때는 일단 파츠별로 색 입히고 ID할당한다음 Foreach돌면서 UV Transform활용하여 트림에 맞춰서 위치시킴


### SCI FI CORE

- Tube로 삼각형 만들 수 있고
- Copy - Rotate.y : 360 / ch("ncy") 으로 Total Number에 맞게 회전하게 했다.
- Lab Lighting이라는 노드도 있네

### SCI FI LEVEL BUILDER

- 커브를 Fuse의 Snap To: Grid 로 그리드로 스냅핑했다. 그런 후 Grid와 Copy To Point. Fuse로 중복 점 제거, Labs Dissolve Flat Edges로 엣지정리.
- Poly Extrude를 하면서 Output Front를 빼면 벽이 처짐
- Measure Curvature로 인코스/아웃코스 구분하여 코너에 배치할 물체 회전

---


### DUNGEON PROPS

#### 2. MODEL THE WOOD CRATES

스타일라이즈 형태의 나무제질

- Attribute Noise로 Cd를 확인하고 그다음 pscale로 변경
  - Poly Bevel시 Offsetting에서 Scale By Attribute로 pscale 사용.
- Remesh Grid로 잘게 쪼개주고
- Point VOP
  - Vein과 Displace Along Normal로 나이테에 따른 높이조절
  - 정사각형같은 건 Cylinder. 판자같은건 Linear로 함
  - GUARD TOWER 2 | WOOD WALL PART 9 참조
 
### WFC DUNGEON GENERATOR

- WaveFunctionCollapse 
  - https://www.gridbugs.org/wave-function-collapse/
  - https://github.com/merrell42/model-synthesis
  - [WaveFunctionCollapse Supercharged with PDG for Level Generation | Paul Ambrosiussen | HOUDINI HI...](https://www.youtube.com/watch?v=X8pNAKtWllc)
- Wang
  - https://www.boristhebrave.com/permanent/24/06/cr31/stagecast/wang/blob_g.html
  - https://www.boristhebrave.com/permanent/24/06/cr31/stagecast/wang/blob.html


while True:            # 반복
    x = collapse(wave) # 붕괴
    if x is False:
        break
    propagate(wave, x) # 전파


- Labs WFC Initialize Grid로 그리드 판을 만들고
  - 이미지 로드시 1픽셀 단위로 포인트가 생성되기 때문에 주의 .
- 2D Wave Funtion Collapse 로 함수를 적용
- Labs Wang Tiles Decorator로 포인트를 만들고
  - https://en.wikipedia.org/wiki/Wang_tile
  - https://skidvis.itch.io/sharkjets-3d-wang-tileset
- Copy To Point 로 Labs Wang Tiles Sample에서 미리 준비해둔 타일 조각들을 배치한다
  - Piece Attribute: name


- Blast @name==0 으로 빈칸 삭제 가능
- Extract Silhouette의 Y축으로 하면 실루엣도 얻을 수 있음.
- Delete Small Parts로 삐져나온것도 정리 가능
- Labs Attribute Value Replace로 Wang번호를 게임엔진에서 사용할 문자열로 변경할 수 있다.


- [WFC Dungeon | Part 3 | Add Walls and Cliffs](https://www.youtube.com/watch?v=YDpVUl213yo&list=PLXNFA1EysfYny9oR45bFI7edFi_A2-8b8&index=4)
  - 라바랑 배치쪽은 나중에 보도록 하자




---



### Guard Tower

- made in Houdini 16.5 for Beginner by Kenny Lammers
- https://www.sidefx.com/learn/collections/guard-tower/
- https://www.sidefx.com/media/uploads/tutorial/indiepixel/guard_tower_project_files.zip

- 좋았던점
  - 나이태 부분
  - 볼트의 우둘투둘한 부분
  - 콜리전 영역만들기

#### GROUND PART

- GUARD TOWER 1 | GROUND PART 1 | CREATING THE GROUND ASSET
  - hda 만들기 : grid - uvflatten
- GUARD TOWER 1 | GROUND PART 2 | ADDING NOISE TO THE GROUND
  - mountain 적용
  - Point VOP로 Noise를 주고 Cd에 맵핑
    - shader에 lerp값으로 사용
- GUARD TOWER 1 | GROUND PART 3 | ADDING MATERIALS WITH HOUDINI ENGINE
  - UV Transform
    - Scale
  - Attribute Create 로 머티리얼 지정가능
    - Name: unity_material
    - String: Assets/Gaurd_Tower/Art/Shared_Textures/Ground/Blend_Materials/Ground_Blended_MAT.mat
    - Unity 에디터 > Houdini Engine > Plugin Settings > ADVANCED > Unity Material Attribute : unity_material (기본값)

#### WOOD WALL PART

- GUARD TOWER 2 | WOOD WALL PART 1 | CREATING A WOOD PLANK
  - Box
  - Group
    - Group Name : $OS
      - $OS : Operator String. Contains the current OP’s name. 노드 이름
      - H20.5 Legacy Preset > Save As Permanent Defaults
  - Attribute Randomize
  - Poly Bevel
    - Offsetting
      - Distance : Scale By Attribute
      - Point Offset Scale : randbevel
  - Point
    - Attribute: Normal(N)
    - VExpression: set(0, 0, 1)
  - Mountain
  - Point
    - Attribute: Normal(N)
    - VExpression: set(0, 1, 0)
  - Mountain
  - UV Flatten
  - UV Layout
  - Normal
    - Cusp Angle 을 조절해서 하드/소프트 한 느낌 조정
- GUARD TOWER 2 | WOOD WALL PART 2 | ASSEMBLING THE WOOD WALL
  - Type Properties > Tools > Context > TAB Submenu Path : Shape Utils/
  - 만들어진 hda가지고 위로 Copy
    - Translate.y : bbox("../gt_wood_plank_shape1/", D_YSIZE)
  - 옆으로 Copy
  - Offset용 Transform 
  - Clip: Keep Primitive Above the Plane
  - Clip: Keep Primitive Below the Plane
- GUARD TOWER 2 | WOOD WALL PART 3 | CREATING THE WALL POSTS
  - Transform
    - Translate.y : -bbox("../gt_wood_plank_shape1/", D_YMIN)
  - Transform
    - Translate.z : -bbox("../gt_wood_plank_shape1/", D_ZSIZE) * 0.5
  - 기타
    - Box
      - Center.y : ch("sizey") * 0.5
- GUARD TOWER 2 | WOOD WALL PART 4 | PLACING POSTS
  - Line
    - Origin.x : -ch("dist") * 0.5
    - Length : bbox("../wall_copy", D_XSIZE)
  - Carve 로 지지대 새울 위치 조정
    - Second U : 1 - ch("domainu1")
  - Transform
    - Translate.z : bbox("../wall_copy", D_ZMAX) + bbox("gt_wood_post_shape1/", D_ZSIZE) * 0.5
  - Copy To Point
- GUARD TOWER 2 | WOOD WALL PART 5 | CREATING BOLTS FOR THE WALL
  - Tube (Polygon)
    - Center.y : ch("height") * 0.5
  - 튜브 2개로 볼트만듬
- GUARD TOWER 2 | WOOD WALL PART 6 | PLACING THE BOLTS
  - 라인 활용 post에 ray를 쏴서 bolt를 Copy To Point
- GUARD TOWER 2 | WOOD WALL PART 7 | VARIATION WITH COPIES
  - foreach 
    - Create Meta Import Node
      - detail("../plank_loop_data/", "iteration", 0)
- GUARD TOWER 2 | WOOD WALL PART 8 | HI RES DISPLACEMENT
  - high res 모델링
  - Object Merge로 불러오고
  - Blast로 영역 구분
  - **Wall 나이테**
    - VDB From Polygon
      - Voxel Size : 0.002
    - Convert VDB (Polygon)
    - Point VOP
      - Vein 으로 나무 나이테 효과
        - Vein Spacing : 6
        - Vein Attenuation: 1.5
        - Vein Frequency : 5
        - Noise Frequency : 0.5 / 4 / 2
      - Display Among Normal 에 연결
        - Scale : -0.005
    - **Bolt 모퉁이**
      - VDB From Polygon
          - Voxel Size : 0.002
      - Convert VDB (Polygon)
      - Labs Measure Curvature
        - 곡률(Culvature)을 구하고 후에 VOP를 이용 변화량에 맞게 노이즈 적용할거임
        - r은 모퉁이가 될 것이고
        - g는 접합부가 될꺼임
      - Point VOP
        - Anti-Aliased Noise
          - 3D Frequency : 1.5
          - Roughness : 0.6
        - (Cd.r * Tubulent Noise) + Anti-Aliased Noise 계산하고
        - Display Among Normal 에 연결
          - Scale : 0.01
- GUARD TOWER 2 | WOOD WALL PART 9 | HIGH RESOLUTION POSTS
  - Post 기둥에 나이테효과주기.
    - 윗단계처럼 옆면에 나이테 효과 주고
    - **상단은 원형 나이테를 만들어주자**
    - Group - tops
      - Keep in Bounding Region으로 윗 영역만 잡아주고
    - Group Combine
      - left랑 tops를 intersect해서 lefttop을 만듬
    - Smooth
    - Point VOP
      - (Turbulent Noise + P.xz) => ripple => Cd
    - Attribute Blur
      - Cd
    - @P.y += @Cd.r * chf("Scale")
- GUARD TOWER 2 | WOOD WALL PART 10 | BAKING TEXTURES IN HOUDINI
  - 벽/기둥/나사에 색깔을 입히고
  - Object Merge로 Low/High을 불러오고 Low, High순서로
  - **Labs Simple Baker**
- GUARD TOWER 2 | WOOD WALL PART 11 | LAYOUT THE WALL ASSET
  - curve로 영역을 만들고
  - Reverse
  - Attribute Wrangle(Point)
    - @P.x = rint(@P.x / 2) * 2;
    - @P.z = rint(@P.z / 2) * 2;
  - Resample
    - Length: 2
  - PolyFrame 면을 따라 Point Normal생성
    - Entity: Point
    - Style: First Edge
    - Normal Name : 체크 해제
    - Tangent Name : N
  - Group
    - allpts
  - PolyCut
    - Cut Points: allpts
    - Strategy: Cut
  - 그 다음으로 foreach - Blast (1) - Copy To Point해서 울타리를 쳐준다.
- GUARD TOWER 2 | WOOD WALL PART 12 | COMPLETING THE WALL ASSET
  - 울타리의 봉우리 뚜껑을 만들어 준다
  - Curve 영역에서
  - Remesh
  - Group
    - Include By Edges
      - Enable
      - Unshared Edges
  - Color
  - Attribute Blur
    - Attributes : Cd
  - Point Wrangle
    - @P.y += @Cd.r * chf("Shape");
  - Normal
  - Point VOP
    - @Cd.r * Turbulent Noise => Displace Along Normal => @P
- GUARD TOWER 2 | WOOD WALL PART 13 | SETTING UP THE WALL ASSET IN UNITY
  - HDA설정
  - Type Properties
    - Operator Path
      - Name : wallmodel
      - Op Filter : Any SOP
    - Operator Path
      - Name : usercurve
      - Op Filter : Any SOP
  - Object Merge
    - Object 1 : `chsop("../wallmodel")`
  - Object Merge
    - Object 1 : `chsop("../usercurve")`
  - 유니티에서
    - UNITY_MESH
    - HDA
      - Unity 에디터 > Houdini Engine > New Curve Asset
        - Reverse

#### Sandbag Part

- GUARD TOWER 3 | SANDBAG PART 1 | CREATING THE SANDBAG ASSET
  - Subdivide
  - Sculpt
  - Soft Peak
    - 코너 부분만 그룹으로 잡아서
  - Smooth
  - UV Flatten
    - Flatting Contrains
      - Seams에 가운데 가로로 빙둘러싼 엣지를 선택하고
  - UV Layout
  - Normal
- GUARD TOWER 3 | SANDBAG PART 2 | CREATING THE SANDBAG WALL PATTERN
  - Labs Edge Group To Curve
    - Group은 가운데 가로로 빙둘러싼 엣지를 선택하여 샌드백의 봉제선 모양을 만들어주자
    - Thickness
      - Thicken을 선택해서 
  - 그 다음으로 High res버전
    - VDB From Polygons
    - Convert VDB
    - Point VOP
      - @P.xz => Boxes => Displace Among Normal => @P
    - Smooth
  - 앞서만든 모래주머니로 울타리
    - 앞에서 만든것 처럼 영역만들고 모래주머니 단을 만들어주자
    - Foreach
      - Resample
      - Point Jitter
      - PolyFrame
        - Tangent Name : N
      - Copy And Transform으로 단을 쌓을 포인트들을 만들어주고
        - Copy Number Attribute : copynum
      - Attribute Promote
        - Original Name : copynum
        - Original Class : Primitive
        - New Class : Point
        - Promotion Method : Maximum
      - Point Wrangle
        - 지그제그 효과
        - int id = @copynum / 2;
        - if (id > 2) { @P += @N * chf("offset"); }
        - @P += @N * chf("push");
    - Foreach
      - Copy To Point로 모래주머니를 쌓자
- GUARD TOWER 3 | SANDBAG PART 3 | CREATING THE SANDBAG WALL ASSET
  - HDA설정
  - Type Properties
    - Operator Path
- GUARD TOWER 3 | SANDBAG PART 4 | COMPLETING THE SANDBAG WALL
  - 유니티에 배치
  - 샌드백 벽에 Labs Calculate Occlusion을 추가해서 Cd에 오쿨루젼 정보를 추가

#### LADDER PART

- GUARD TOWER 4 | LADDER PART 1 | BUILDING A LADDER
- GUARD TOWER 4 | LADDER PART 2 | CREATING THE LADDER DIGITAL ASSET
- GUARD TOWER 4 | LADDER PART 3 | LADDER TRANSFORM FIX
  - pass
- GUARD TOWER 4 | LADDER PART 4 | COMPLETING THE LADDER
  - Group 유니티에서 컬리전
    - Group Name: collision_geo

#### Tower Part

- GUARD TOWER 5 | TOWER PART 1 | BUILDING THE BASE
- GUARD TOWER 5 | TOWER PART 2 | BUILDING THE TOWER HOUSE
  - pass

#### OilBarrel Part

- The Barrel is in there: https://www.dropbox.com/sh/1ck8tiizis73gnf/AAB5C0YzLlSd9UbVs21xsLVAa?dl=0

- GUARD TOWER 6 | OILBARREL PART 1 | BUILDING THE OIL BARREL
  - pass
- GUARD TOWER 6 | OIL BARREL PART 2 | BARREL STACKING
  - 여기서는 컬리젼 영역을 만들려고
    - VDB From Polygon
    - Convert VDB
    - Tetrahedralize( Convex Hull ) 노드를 쓰는데 해당 노드는 16.0 부터 지원을 안한다
    - 대신 Shrinkwrap 를 쓰면 동일한 결과를 얻을 수 있다.