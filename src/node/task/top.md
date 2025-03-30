# TOP

- TOP
  - `T`ask `OP`erator
  - <https://www.sidefx.com/docs/houdini/nodes/top/index.html>
  - <https://tokeru.com/cgwiki/HoudiniTops.html>
- PDG
  - `P`ROCEDURAL `D`EPENDENCY `G`RAPH
  - <https://www.sidefx.com/products/houdini/pdg/>
  - [PDG Automation Pipeline: Make More Assets | Rob Stauffer | GDC 2019](https://www.youtube.com/watch?v=lL_jUZtaF1k)

- New Pan Tab Type > TOPs > Task Graph Table

|                          |           |
| ------------------------ | --------- |
| Cook Node                | Shift + G |
| Dirty and Cook This Node | Shift + V |



| TOP Network       |               |
| ----------------- | ------------- |
| LocalScedular     | 이벤트 관리자 |
| Wedge             |               |
| HDA Processor     |               |
| File Pattern      |               |
| Merge             |               |
| Wait For All      |               |
| CSV Output        |               |
| Generic Generator |               |

|              |     |
| ------------ | --- |
| pdg_output   |     |
| pdg_output.1 |     |
| pdg_name     |     |
| pdg_index    |     |

## PDG for Indie Game Dev Tutorial Series

- <https://www.indie-pixel.com/unityCourses/pdg-for-indie-game-development>
- <https://www.sidefx.com/learn/collections/pdg-for-indie-gamedev/>
- <https://www.youtube.com/playlist?list=PLXNFA1EysfYnCqXOWZIiPNeukPT-thmGd>

### PDG for Indie Gamedev | Section 2 | Getting Set Up

#### 6 | Quickstart to the HDA Processor

- 샘플용 HDA만들고
  - scale_wtf:Float  // scale로 하면 안먹임
  - color:Color
- TOP Network
- Wedge
  - color: float vector
  - Random Samples
- HDA Processor
  - HDA File 지정하면 알아서 Output File Name 체워짐
  - HDA Parameters에 @scale_wtf / @color.r / @color.g / @color.b 해서 HDA로 넘겨짐



- $OS.`@pdg_name`.0.bgeo.sc => hdaprocessor1.hdaprocessor1_42.0.bgeo.sc
  - https://www.sidefx.com/docs/houdini/tops/attributes.html


#### 7 | Visualizing the TOP Network Results

- Geometry에서
- File 노드
  - Geometry File: \`@pdg_output\`
  - 후에 TOP에서 불들어온거 클릭하면 미리보기처럼 볼 수 있음.


#### 8 | Setting up Unity for TOPS

- Assets/unity_houdini.env
  - https://www.sidefx.com/docs/unity18.5/_environment.html
  - HEU_ENVPATH_ 프리픽스

HEU_ENVPATH_JOB=<프로젝트 폴더 경로>

#### 9 | Testing our TOP HDA in Unity

hda로 만들고 top가 잘 동작 안할때가 있는데 그때는 후디니를 다시 켜보자.

유니티에서 Create PDG Asset Link를 해서 링크를 만들고

- 문제가 생기면
  - Debug > Open Scene In Houdini

- 후디니 > Edit > Aliases and Variables...에서 확인

Schedular에서 Working Directory : $HEU_ENVPATH_JOB

### PDG for Indie Gamedev | Section 3 | Create Terrains


- Edit노드
  - Type Properties > Node > Editable Nodes
  - 유니티
    - ASSET OPTIONS
      - Enable Editable Node Tools


- File
  - Geometry File: \`@pdg_output\`
- Subnetwork > HDA
  - heightfield project
    - 입력으로 heightfield & input
  - heightfield blur
  - heightfield distort
  - heightfield mask by feature
  - heightfield slump
  - heightfield mask clear
  - Null: OUT_PROJECTED_TERRAIN


TOP 네트워크에서

- FilePattern
- HDA Processor
  - Input File Source: Upstream Output File
  - Output FileName: $HIP/geo/\`@pdg_name\`.0.bgeo.sc
  - Output Tag: file/geo/projected


- Sop에서 HeightField Layer 설정해주고
  - https://www.sidefx.com/docs/houdini/unity/terrain/basics.html#hfieldlayers
  - unity_hf_texture_diffuse
  - unity_hf_tile_size

- 다시 TOP에서 HDA Processor의 Iterations 옵션이 없다
  - split_terrain넣기전에 Generic Generator을 사용해야함.
  - Generic Generator
    - Copy Inputs to Outputs : 체크
    - Item Count: ch("../../hdap_tilecountx") * ch("../../hdap_tilecountx")
  - HDA Processor
    - Output File Name :
      ```
      $HIP/geo/$OS.`@pdg_index`.bgeo.sc
      ```
    - HDA Parameters
      - Tile Number : @pdg_index



### PDG for Indie Gamedev | Section 4 | Scatter Foilage

- prefab 경로를 넘겨 csv로 저장 후 지형에 뿌리기
  - SM_Tree_Pine_Dead_01.prefab을 쓰는데 아마 [POLYGON Nature - Low Poly 3D Art by Synty](https://assetstore.unity.com/packages/3d/vegetation/trees/polygon-nature-low-poly-3d-art-by-synty-120152) 인듯?

TOP 에서

- FilePattern
- Merge
- Wait For All
- CSV Output

- Partition By Index
  - Secondary Input Rule : All

- HDA Processor
  - Asset Input
    - Create File Inputs
    - Number of Inputs
      - `pdg_input.0`
- HeightFiled File
- HeightField Mask by Feature
- HeightField Noise
- HeightField Scatter - 첫번째 두번째 입력 모두
  - 노드 이름이 point어트리뷰트 tags로 들어가게 된다.
  - Keep Incoming Terrain 체크해제

스케터를 나무 0, 바위 1로하여 Wrangle(point)로 바위주변 나무 삭제

``` vex
int nearpnts[] = nearpoints(1, @P, chf("max_dist"));
if (len(nearpnts) > 0)
{
    removepoint(0, @ptnum);
}
```

타입별로 구분지어주고

``` vex
string path_curr = s@path;

i@type = 0;

i@index = find(path_curr, "Assets/");
if (@index < 0)
{
    return;
}

s@path = sprintf(path_curr[@index:]); 
int path_tree = find(path_curr, "Tree");
if (path_tree >= 0)
{
    i@type = 1;
}

int path_rock = find(path_curr, "Rock");
if (path_rock >= 0)
{
    i@type = 2;
}

int path_bush = find(path_curr, "Bush");
if (path_bush >= 0)
{
    i@type = 3;
}
```

type별로 blast한 후 최종 unity_instance를 셋팅해준다

``` vex
float ch_seed = chf("seed");

if (s@tag == "tag_tree")
{
    int npnts = npoints(1);
    int idx = int(rand(@ptnum + ch_seed) * npnts);
    s@unity_instance = point(1, "path", idx);
}

if (s@tag == "tag_rock")
{
    int npnts = npoints(2);
    int idx = int(rand(@ptnum + ch_seed) * npnts);
    s@unity_instance = point(2, "path", idx);
}

if (s@tag == "tag_bush")
{
    int npnts = npoints(3);
    int idx = int(rand(@ptnum + ch_seed) * npnts);
    s@unity_instance = point(3, "path", idx);
}
```

### PDG for Indie Gamedev | Section 5 | Create Gameplay Areas

커브를 셋팅

- Resample
  - Length : 2
  - Treat Polygon As : Subdivision Curves

TOP작업을 하는 HDA 파라미터 설정해주고

- Folder : Multiparam Block(list)
  - Name: area_list
  - Operator Path
    - Name: areasasset#

TOP 에서 영역 합치는 작업

- Wedge string attribute
  - \`chs("../../areasasset" + (@pdg_index + 1))\`
- Geometry Import
  - Geometry Source: SOP Node
- Wait For All
- Geometry Import
  - Merge Operation : Import and Merge All Geometry



- Partition by Index
  - Secondary Input Rule : All



프리뷰로 볼것은 이제
- Merge
  - File : \`@pdg_output\`
  - File : \`@pdg_output.1\`

- HeightField Mask by Object대신 HeightField Mask by Geometry
  - 지형도 빼주고
  - 점 스캐팅 하는 곳에서도 제외(나무랑 덤불)

- File
  - Geometry File : \`@pdg_output.1\`


테두리

- HeightField Mask by Geometry
  - 영역을 제외한 블러처리된 마스크
  - Blur Radius : 50
  - Invert Mask
- HeightField Mask by Geometry
  - 영역만 선택해주고 반전시켜주면 영역안 태두리에 블러처리된 효과
  - Combine with Existing : Subtract
  - Invert Mask
- HeightField Scatter 로 뿌려주면 됨.

``` vex
// 이건 앞서 봤듯이 가까이 있는거(돌같은거) 삭제해주는거고 
int nearpnts[] = nearpoints(1, @P, chf("max_dist"));
if (len(nearpnts) > 0)
{
    removepoint(0, @ptnum);
}
```

### PDG for Indie Gamedev | Section 6 | Paths & Roads

길을 만들고

- Curve
- Switch
  - Select Input : npoints(1) > 0
- Resample
  - Treat Polygon As : Subdivision Curves
- PolyFrame
  - Tangent Name : N
- Wrangle (point)
  ``` vex
  vector dir = @N;
  dir.y = 0;
  dir = normalize(dir);
  v@right = cross(dir, {0, 1, 0});
  v@up = cross(v@right, @N);
  ```
- Line
  - Origin.x : -ch("dist") * 0.5
  - Direction: 1/0/0
- Sweep
  - Surface/Reverse Cross Section


길을 내면 지형도 변화하고, 식생도 제거

- 길HDA를 Wedge로 얻어내고
- Geometry Import
- Partition By Bound
  - https://www.sidefx.com/docs/houdini/nodes/top/partitionbybounds.html
- Split
  - 인자가 하나(길이 없는거), 둘이상(길이 있는거) 받는걸로 나눔
  - Split Expression: @partitionsize == 1
- HDA Processor
  - Input File Source : Create File Input
  - Output File Name : $HIP/geo/$OS.\`@pdg_index\`.bgeo.sc
- Merge

길에 맞추어 지형 내리기

- HeightField Project - Maxium
- HeightField Project - Minimum 하면 길이 나게되고.
- HeightField Mask by Object 로 마스크 및 마스크 블러
- HeightFiled Blur로 블러처리
- HeightField Copy Layer
  - Source: mask
  - Destination: path
- Attrite Create
  - unity_hf_tile_size
  - unity_hf_texture_diffuse

HeightField에서 길의 레이어 mask를 빼주어서 길에도 돌이 안생기도록 하자.

- HeightField Layer
  - Layer Mode: Substract