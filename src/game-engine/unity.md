# Unity

- sidefx
  - <https://www.sidefx.com/tutorials/unity-starter-kit/>
    - <https://www.sidefx.com/contentlibrary/unity-starter-kit/>
  - <https://www.sidefx.com/learn/unity/>
    - <https://www.sidefx.com/docs/unity/>


- 유니티 엔진에서 후디니 엔진과 통신하는 것이므로 에디트모드일때만 동작한다.




- https://www.sidefx.com/docs/houdini/unity/attributes.html
- https://www.sidefx.com/docs/houdini/unity/meshes.html
- https://www.sidefx.com/docs/houdini/unity/instancing.html


## 

| attr           |                                                       |
| -------------- | ----------------------------------------------------- |
| unity_instance | point찍고 attr에 프리팝 경로 입력하면 알아서 생성해줌 |



##  [Learn > Learning Paths > Unity](https://www.sidefx.com/learn/unity)

### START HERE

- [UNITY STARTER KIT](https://www.sidefx.com/tutorials/unity-starter-kit/)
  - 여러 툴들 소계
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