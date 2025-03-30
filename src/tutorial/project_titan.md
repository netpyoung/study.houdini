

- PROJECT TITAN https://www.sidefx.com/titan/
  - 배경
- PROJECT PEGASUS https://www.sidefx.com/pegasus/
  - 지형


## PROJECT TITAN STACKING TOOL

- https://www.sidefx.com/tutorials/project-titan-stacking-tool/
  - by Thomas Tobin - https://www.artstation.com/thomasctobin
  - https://www.youtube.com/playlist?list=PLXNFA1EysfYm0MPSArwg-Kdnb1fWyat1K

- 시뮬해서 떨어지게 하는 부분이 잼씀.
- 어럽네 중간에 디프리케이트된 노드랑 조금 개념에 안맞는게 있음.
- pivot문제랑 py_max구하는 부분

Groupd_props => gr_base_layer

### 1 | Unreal Engine Setup

- 속성
  - AssetPath
  - Width
  - Height
  - Length
  - Rotation
  - Scale_MIN
  - Scale_MAX

- Create > Place Actors > Panel
  - Geometry > Box
    - Activate Brush Editing Editing Mode (Shift + 6)

- Houdini
  - Windows > Houdini Engine Session Sync

### 2 | Setting up the HDA

- Object Merge로 언리얼 DataTable을 가져오면 point에 attribute를 가지게 됨.

- https://www.sidefx.com/ja/forum/topic/86532/?page=1#post-374007
  - Labs Building From Patterns 편집

#### 정보를 불러와서 더미에 셋팅

- CSV Import 노드 (csv를 로드)
  - Fill Attribute Info from Header로 간편하게 로드하자
- 필요시 Attribute Rename을 사용하여 이름을 바꾸자
- Wrangle (Point)
  ``` vex
    vector s = set(
        @Width,
        @Height,
        @Length
    );
    @scale = s;
    @P = {0, 0, 0};
  ```
- Color
  - Color Type: Random from Attribute
  - Attribute : AssetPath
- Copy to Point - 박스랑
  - Pack and Instance
- Connectivity - Primitive 로 class 어트리뷰트로 각 박스별 그룹지어주고
- Attribute Promote - 최대값을 저장해둔다
  - Original Name : class
  - Original Class : Primitive
  - New Class : Detail
  - Promotion Method : Maximum
  - Change New Name : max
  - Delete Original : 언체크
- Unpack
  - Transfer Attribute : *

``` txt
primitive:
    +class

detail:
    +max
```

#### 더미 위치 조정

class(primitive)를 point(variant)로 변환

- Foreach Primitive - Piece Attribute : class
  - Match Size
    - Justify Y : Min
  - Bound
  - Attribute Transfer
    - Detail
- Attribute Promote
  - Original Name : class (primitive)
  - New Name : variant (point)
- Null: INPUT_SCATTER

``` txt
point:
    +variant

primitive:
    -class =>  point:variant

detail:
    max
```

### 3 | Packing Assets

#### 배치 구역 밑바닥

- Object Merge로 영역을 가져고
- Group
  - Keep by Normal
      - Direction: 0, -1, 0
      - Spread Angle : 20
- Blast
- Reverse
- Null : OUT_BOTTOM_LAYER

#### 배치 구역 설정

OUT_BOTTOM_LAYER에 점을 뿌리고 variant를 랜덤화시킨다.

- Scatter and Algin 으로 점을 뿌리고
  - https://www.sidefx.com/docs/houdini/nodes/sop/scatteralign.html
  - Point Count Method : By Density
  - Density Scale에 따라 오브젝트 크기도 달라짐
- Wrangle (Point)
  - @id = @ptnum;
- Attribute Randomize
  - Attribute Name : variant
  - Dimensions: 1
  - Distribution : Uniform(Discrete)
  - Max Value : detail("-1", "max", 0)
  - Spare Input : ../INPUT_SCATTER
- Attribute Cast
  - Attributes : variant
  - Precision: 16-bit integer
- Null: INPUT_SPREAD_POINTS

``` txt
+point:id==@ptnum
+point:orient
+point:variant        // random from ../INPUT_SCATTER's detail:max
```

#### iscale셋팅

- Copy to Point - INPUT_SPREAD_POINTS의 variant 기반으로 INPUT_SCATTER를 변형하며 뿌리기
  - Piace Attribute : variant
  - Pack and Instance
- Attribute Transfer
  - Detail도 활성화
- Attribute Randomize
  - Attribute Name : iscale
  - Attribute Class : Primitive
  - Distribution : Uniform(Discrete)
  - Dimensions : 1
  - Min Value:
  - Max Value:
  - Step Size:
- Unpack
  - Transfer Attribute : *
- Null : RANDOMIZE_ISCALE

``` txt
point:
    variant
    id

primitive:
    +iscale

detail:max
```

#### uv layout을 사용한 배치

- UV Layout
  - UV Attribute : P / ZX Projection
  - Island Scale Attribute: iscale
  - Axis Alignment : None
  - Packing
    - Scale: Fixed
    - Spread Islands in Cavities of Other Islands
  - Targets
    - Pack Into : Islands From Second Input
      - 두번째 입력으로 Object Merge: ../OUT_BOTTOM_LAYER > Remesh TODO
    - UV Attribute : P / ZX Projection
  - Nonpacked Polygons : nonpacked
- Blast : nonpacked
- Null : OUT_BOTTOM_LAYER_PACKED

``` txt
point:
    variant
    id

primitive:
    iscale
    +group:nonpack

detail:
    max
    +coverage
    +numnopacked
```

### 4 | Stacking Assets

50분 정도 내용이라 따라가기 힘듬

- Partion 노드는 deprecated.
  - Use the Groups from Name node instead.

- Attribute Promote
  - id(point) => id(Primitive)
- Pack
  - https://www.sidefx.com/docs/houdini/nodes/sop/pack.html
  ``` txt
  - Path Attribute: op:\`opfullpath('.')\`
  - Name Attribute: id
  - Create Packed Fragments: 체크 해제
  - Transfer Attributes: *
  ```
- Group : gr_base_layer

``` txt
point:
    variant
    -id =>  primitive:id

primitive:
    +id
    +path  ex) op:/obj/geo1/pack1/0
    iscale
    -group:nonpack

detail:
    -max
    -coverage
    -numnopacked
```

#### 피드백을 이용해서 한단씩 쌓기

- For-Loop with Feedback
  - Null: PROCESS
  - Null: FEEDBACK 은 나중에 머지용으로 빼두고

**PROCESS 에서 상단면을 구하고**

- Unpack
- Group (gr_top_mesh)
  - Keep by Normal
      - Direction: 0, 1, 0
      - Spread Angle : 20
- Blast (gr_top_mesh)
- Group Promotion (gr_top_mesh)
  - Primitive to Point

**상단면에서 가장 높은 면만을 고른 뒤**

- Wrangle (Primitive)
  - f@py = @P.y;
- Attribute Promote
  - py(primitive) => py_max(detail)
  - Promotion Method : Maximum
- blast
  ``` txt
  @py=`detail(0, "py_max", 0)`
  ```

**무리지어 묶는다**

- Pack (pack_for_cluster)
- Cluster Points
  - https://www.sidefx.com/docs/houdini/nodes/sop/clusterpoints.html
    - Point attribute가 cluster가 생기고 해당 클러스터 번호가 들어간다.
  - Clusters: ch("spare_input0") * 1.5
    - Clust : (모여있는 )무리
    - Clusters 수치를 조절하여 뭉처있는 것들을 조절
  - Spare Input 0 : \`npoints(-2)\`
    - The first spare input is -1, the second is -2, and so on 
  - Spare Input 1 : ../pack_for_cluster
- Attribute Promote
  - cluster:point > primitive
- Unpack
  - Transfer Attribute : *

**무리를 감싸는 영역을 만들고**

- foreach primitive로 Cluster 구역별로 묶기
  - Piece Attribute : cluster
- Shrinkwrap (2D) 로 엮여있는것들을 묶어주고
- Transform 조금작게 해주자
  - Uniform Scale: 0.8
  - Pivot Translate: $CEX/$CEY/$CEZ
- Remesh
- Null: HIGHER_AREA

**해당 영역에 다시 적층하자**

RANDOMIZE_ISCALE를 object merge로 가져오고, 다시 attribute randomize를 시켜주자. 그리고 

- UV Layout
  - UV Attribute : P / ZX Projection
  - Island Scale Attribute: iscale
  - Axis Alignment : None
  - Packing
    - Scale: Fixed
    - Spread Islands in Cavities of Other Islands
  - Targets
    - Pack Into : Islands From Second Input
      - 두번째 입력으로 Object Merge: ../OUT_BOTTOM_LAYER > Remesh TODO
    - UV Attribute : P / ZX Projection
  - Nonpacked Polygons : nonpacked
- Blast : nonpacked
- Attribute Promote
  - id:point > primitive
- Pack
- 그다음 FEEDBACK과 머지

- Attribute Promote
  - iscale:primitive => pscale:point
- Copy To Point - OUT_HIGH과 
  - Piace Attribute : variant
  - Pack and Instance
  - 추가 Points by Copying : pscale orient

### 5 | Simulation

- Group (gr_active)
  - Point
  - BaseGroup: gr_base_layer
- Split: gr_activate
  - unpack > Null (ACTIVE)
  - unpack > Null (NON_ACTIVE)

- NON_ACTIVE에서
- Wrangle (point)
  - f@active = 1;
  - v@v = chv("direction") * chf("boost") * rand(@ptnum);
- RBD Bullet Solver
  - Output: Transfer Attribute : orient
  - OUT_OBJECT_PLACEMENT랑 grid랑 MatchSize하고 ACTIVE랑 머지한걸 input4에 넣음
- Timeshift
  - Frame: 50
- Group : gr_inside_bound
  - Keep in Bouding Region
    - Bouding Object(point or vertices only)로 감싸는 영역만 하고
- Blast : gr_inside_bound
  - Delete Non Selected
- 그리고 ACTIVE랑 머지


**이제 포인트만 남기도록**

- Clean
  - Remove Attribs: `* ^N ^up ^orient ^scale ^pscale ^unreal_instance ^unity_instance`
- Connectivity
  - Primitive
- Foreach Primitive - Piece Attribute: class
- gr_piece
- Wrangle (detail)
  - vector min;
  - vector max;
  - getbbox(min, max);
  - vector center = (min + max) / 2;
  - vector combo = set(center.x, min.y, center.z);
  - addpoint(-1, combo);
- Blast : gr_piece
- Attribute Transfer 전부

그러면 이제 끝

---

## PROJECT TITAN CABLE TOOL

- https://www.sidefx.com/tutorials/project-titan-cable-tool/
  - https://www.youtube.com/playlist?list=PLXNFA1EysfYnkP5GncdwIVsZABbZ2z_Ud

- 라인 활용 Vellum Hair를 이용한 시뮬레이션
- Connect Adjacent Pieces 인접 조각 연결로 서브 케이블 만듬

### 2 | Create the Main Cables


- Circle
- Mountain
  - Noise Along Vector 해제 및 XY만 활성화
- Connect Adjacent Pieces - 이렇게 하면 primitive갯수가 늘어나버림
  - Adjacent Points
  - Search Radious: 10
- Convert Line
- Attribute Promote
  - restlength:primitive => minimum => point:pscale
- Attribute Transfer
  - 앞서 mountain된것에 point:pscale만 넘겨준다
- Sweep
  - Line / Resample 한것을 첫번째 인풋으로
  - Surface Type: Columns
- Attribute Randomize
  - random:primitive
- Attribute Promote
  - random:primitive => random:point
- Group by Range (gr_line_pins)
  - Point
  - Invert Range
  - Conectivity/Affect Disconnected Geometry Seperately
- Vellum Hair
  - Constraint Type: String
  - Pin to Animation
    - Pin Points: gr_line_pins
- Vellum Solver


### 3 | Create the Small Cables


### 4 | Build the Digital Asset

- 입력을 2개 추가한다
  - 1번째 입력은 line을 대체
  - 2번째 입력은 컬리전으로 Vellum Hair의 3번째 인자로 들어가게 된다.

### 5 | Open in Unreal

- Attribute Create
  - unreal_material

### 6 | Use Trimsheet Textures

- Sweap에서 Compute UVs

UV를 수평으로
- Labs Trim Texture Utility
  - Initialization Mode: Generate from ID Map 으로 색으로 구분된 ID맵을 입력받아 trim을 생성

없으면 Grid를 활용
- Grid
  - Row는 ID갯수 +1만큼
- Top뷰(2번키)로, Select(s키) 포인트(2번키)로 선택후 Translate(t키)를 눌러 y축 조정
- UV Project
  - Rotate: 90 / -180 / 0
- Primitive Split 으로 각 부분을 나눠주고
- Trim Texture Utility
  - Initialzie누르면 됨.
- Labs Automatic Trim Texture
  - UV 크기 비율에 맞추어 알아서 레이아웃시켜줌


---

PROJECT TITAN IVY TOOL

ivy: 담쟁이덩굴 

shrub 관목 (=bush)


PROJECT TITAN PLATFORM TOOL
PROJECT TITAN FENCE TOOL
PROJECT TITAN TREE PIVOT PAINTER
PROJECT TITAN RAILS TOOL
PROJECT TITAN VAT CHARACTERS
PROJECT TITAN BUILDING TOOL
PROJECT TITAN GPT SIGNAGE
