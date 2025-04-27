# Procedural Race Tracks - Houdini 17.5/18 and Houdini Engine

- <https://www.indie-pixel.com/unityCourses/procedural-race-tracks-with-houdini-%26-houdini-engine>
- <https://www.udemy.com/course/procedural-race-tracks-houdini-175-and-houdini-engine>

### 섹션 5: Tool Kit Planning

- Track Tool
  - Bumper
  - Terrain
- Fence Tool
  - Chain Link Fence
  - Guard Fence
- Prop Tool
  - Road Cone
  - Tire Stack
  - Signs
  - Light Post
- Foliage
  - Tree
  - Grass
  - Bush

### 섹션 6: Building the Track Tool

- UV Texture
  - Texture Type: Arc Length Spline 곡선을 직선으로 폈을때
  - Attribute Class : Point
  - Scale: arclen(0, 0, 0, 1) // 1 // 1
  - Angle : -90
- arclen(surface_node, prim_num, ustart, ustop)
  - Returns the arc length of a curve between two U positions.


### 섹션 7: Fixing the Track Tool

- Resample로 점을 더 채우고
- Convert Line
- Carve
  - Second U : 1-ch("domainu1")

### 섹션 8: Utilizing HDA Inputs & Debugging

:pass

### 섹션 9: Creating the Track Bumpers

범퍼만들기

- 양 사이드를 반으로 나눠서
- Convert Line으로 점사이들의 길이 구하고
- Wrangle Primitive
``` vex
// Wrangle (Primitive)
float other_length = prim(1, "restlength", @primnum);
float diff = f@restlength - other_length;

float diff_amount = clamp(abs(diff), 0, 1);
if (diff_amount < 0.15)
{
    removeprim(0, @primnum, 1);
    // int  removeprim(int geohandle, int prim_number, int andpoints)
    //   - If this is 1, the function will also delete any points associated with the primitive that are not associated with any other primitives.
    return;
}

// 양 라인을 비교해서 길어지는 쪽(코너 바깥쪽)이 빨강색으로
if (diff > 0)
{
    @Cd = set(diff_amount, 0, 0);
}
else
{
    @Cd = set(0, diff_amount, 0);
}
```
- Convert Line
  - Connect Path 로 길게 이어주자
  - 아니면 Join-Only Connected + measure로 해도 됨.
- Reverse
  - 아웃라인 쪽에는 리버스를 걸어주고
- Merge 후
- Wrangle (primitive)
  ``` vex
  if (f@restlength < chf("min_length"))
  {
      removeprim(0, @primnum, 1);
  }
  ```
- Carve
  - First U : 0
  - Second U : 1 - ch("domainu1")
- Resample
  - Treat Polygons As : Subdivision Curves
- Refine
  - First U : 0
  - Second U : 1
  - Unrefine
- Resample
- Group - @Cd.r>0
- Group - @Cd.g>0
- Blast 그린(짧은 안쪽 코스)
- Sweep
  - End Cap Type : Single Polygon
    - End Caps Group : endcaps
- Normal
- Split : endcaps
  - Invert Selection

스플릿 1 - 번갈아 색깔칠하기

- 코너 만드는 쪽에서 미리 carve
    - First U : 0
    - Second U : 1
    - BreakPoints
      - Cut At Internal U Breakpoints
- 다시 스플릿으로 돌아와서 Group By Range
  - Range Filter
    - Select : nprims("../carve2/")
    - of : ch("selectamount1") * 2

스플리 2 - endcaps 부분 다듬기

- PolyExtrude
  - 살짝 내려가게
  - Extrusion/ Front Transform
    - Transform Extrude Front
    - Transform Space : Global
    - Translate.y : -0.05
  - Front Group : extrudeFront
- Group Promote
  - extrudeFront:primitive => bevel_edge:edge
  - Include Only Elements Entirely Contains in Original Group
- Poly Bevel

그 다음으로 Merge후 Fuse


### 섹션 10: Houdini Core Concepts - Curve Directions and Vectors
### 섹션 11: Creating the Gaurd Rails
gr_red를 foreach(primitive)에서

- Peek 하여 밀어내고
  - Recompute Point Nomals 해제
- Group By Range
  - Name : odds
  - Group Type : Point
  - Select 1 of 3
- Group By Range
  - Name : odds
  - Group Type : Point
  - Merge Method: Union With Existing
  - Start : 1
  - End : 1
  - Select 1 of 1
- Blast : odds - Delete Non Selected
- Copy To Points

기둥 부분과 기둥을 이어주는 레일 부분(라인)을 각각 그룹짓고 Copy To Point 이후에 나누어서 레일 부분은 Skin으로 이어주고 다시 Merge

### 섹션 12: Creating the Tire Stack



- Copy And Transform
  - Translate.y : bbox(0, D_YSIZE)
  - Copy Number Attribute : tire

- Foreach : tire
- Attribute Promote:
  - tire:primitive => tire:detail
- Transform
  - translate.xz: fit(rand(detail(0, "tire", 0)), 0, 1, -1, 1) * 0.5
  - rotate.y: fit(rand(detail(0, "tire", 0)), 0, 1, -1, 1) * 90

collision_geo 어트리뷰트로 컬리젼 지정(유니티에서 렌더는 안됨)


### 섹션 13: Setting up Post Processing

:pass

### 섹션 14: Creating Terrain with Houdini Engine

https://www.sidefx.com/docs/houdini/unity/terrain/basics.html

| Houdini Height Field Size | Houdini Grid Spacing | width: 8% Unity Terrain Size | Unity Heightmap Resolution |
| ------------------------- | -------------------- | ---------------------------- | -------------------------- |
| 512×512                   | 1                    | 513×513                      | 513×513                    |
| 512×512                   | 2                    | 514×514                      | 257×257                    |
| 512×512                   | 4                    | 516×516                      | 129×129                    |
| 1024×1024                 | 1                    | 1025×1025                    | 1025×1025                  |
| 1024×1024                 | 2                    | 1026×1026                    | 513×513                    |
| 1024×1024                 | 4                    | 1028×1028                    | 257×257                    |
| 2048×2048                 | 2                    | 2050×2050                    | 1025×1025                  |
| 4096×4096                 | 2                    | 4098×4098                    | 2049×2049                  |




Grid Volumns
- HeightField: height / mask
- Erode: sediment / bedrock / debris / water
- Slump: flow / flowdir.x / flowdir.y / flowdir.z
- Blast
  - @name=bedrock @name=flow @name=flowdir.x @name=flowdir.y @name=flowdir.z @name=sediment @name=water
  - 결과적으로 height / mask / debris 남음
- HeightField Mask


l_ 레이어
grass에 나무가 심길것이고 dirt랑 debris에는 돌을 심을거임.

마무리 작업

- 레이어별 Attribute Create ( Primitive ) 셋팅
  - string: unity_hf_texture_diffuse
  - float array: unity_hf_tile_size

- 머티리얼 셋팅
  - @name=height
  - s@unity_material = "Assets/hello.mat";


### 섹션 15: Designing our Terrains with Houdini Engine

트랙을 Object Merge로 임포트해서 OUT_TRACK_GEO 로 할당

- Circle
  - Radius: bbox("../OUT_TRACK_GEO/", D_XSIZE) * 0.75 / bbox("../OUT_TRACK_GEO/", D_ZSIZE) * 0.75
  - Center: centroid("../OUT_TRACK_GEO/", D_X) / bbox("../OUT_TRACK_GEO/", D_YMIN) / centroid("../OUT_TRACK_GEO/", D_Z)
- @N = normalize(@P - getbbox_center(0));
- Mountain으로 조금 변형을 주고
- Color + Alpha조절로 영역 색깔

다음 HeightField쪽에가서

- Project - Maximum
- Project - Minimum 으로 평평하게 만들고
- Mask by Object
- Mask Expand
- Blur
- Blur
  - Blur Layer : height
- Clear



- [opdef](https://www.sidefx.com/docs/houdini/assets/opdef.html)

opdef:.?mountain_001.bgeo.sc


여기서는 지형을 내리는 쪽으로 했는데, 지형 위로 트랙을 올리려면 Ray를 활용. Ray후 Smooth를 사용해서 부드럽게해주자.

Smooth 2개(약Strength/강Strength) 이용시
vector other_pos = point(1, "P", @ptnum);
@P.y = other_pos.y;

https://www.houdinikitchen.net/2019/09/06/lines-and-curves/
[Tutorial 11. Lines and Curves](https://www.youtube.com/watch?v=rsYQWnu5tgg)


### 섹션 16: Houdini Core Concept - Curve Gradients
### 섹션 17: Creating Trees with Houdini

나무 몸통

- Line
- Wrangle
  ``` vex
  float perc = (float)@ptnum / (@numpt - 1);
  float ramp = chramp("ramp", perc);
  ```
- Wrangle
  ``` vex
  vector right = {1, 0, 0};
  @N = right * @gradient;
  ```
- Mountain
- Resample
- Wrangle
  ``` vex
  @gradient = (float)@ptnum / (@numpt - 1);
  @pscale = chramp("shape", @gradient);
  ```
- Copy To Point로 Circle이랑 합치고 Skin으로 묶기
- 다시 Wrangle
  ``` vex
  vector right = {1, 0, 0};
  @N = right * @gradient;
  ```
- Mountain
- Color 입혀서 나무 몸통 완성

나무의 윗부분

- 몸통 라인에서
- Carve로 윗 부분 영역
- Resample
  - Maximum Segements로 갯수 조절
- PolyFrame
  - Tangent : N
- 하단이 0부터 시작하므로 노멀이 아래를 향하게 되니 위로 올려주자
  - @N *= -1;
- Copy To Point

나무 삿갓모양

- line과 pointwrangle(ramp)를 섞어서 곡선을 만들고
- Revolve
  - 이정도만 해서 Low폴리곤 삿갓
- 하단 원부분만 따서
- 노말을 밖으로
  - @N = normalize(@P - getbbox_center(0));
- Foreach Copy to point로 복사를 하는데
  - Circle 을 활용 부채꼴을 잘라넣기 좋게 만들고
- Boolean으로 겹치는 모양을 없에 삿갓모양을 오려주고
  - 이건 High 폴리곤 삿갓
- Mountain으로 울퉁불퉁하게

AO 작업 - Disable Light하는게 좋음

Labs Physical Ambient Occlusion
https://www.sidefx.com/docs/houdini/nodes/sop/labs--physical_ambient_occlusion-1.1.html
[SideFXLabsツール 1.Labs Physical Ambient Occlusion SOP](https://www.youtube.com/watch?v=_z3LcbPiMvg)


Labs Calculate Occlusion
Mask By Feature와 동일. Cd를 미리 삭제해야 적용되는거 확인가능



기타 작업

lod
- <https://www.sidefx.com/docs/houdini/unity/meshes/lod.html>
  
- lod_0에선
  - 디테일 삿갓 앞뒷면
- lod_1에선
  - 디테일 삿갓 앞면
  - Poly Reduce
- lod_2에선
  - 디테일 뺀 삿갓 앞면
  - Poly Reduce


LOD Screen Size
primitive float
|        |                 |
| ------ | --------------- |
| unity  | lod_screensizes |
| unreal | lod_screensize  |

### 섹션 18: Scattering Trees onto Terrains

- HF Copy Layer
  - l_grass를 mask로 복사
- HF Mask By Feature
  - Slope 말고
  - Height로 상위 부분만 빼고
- HF Mask by Geometry로 트랙을 불러와서 빼주자
  - Combine with Existing: Subtract
  - Blur Method: Expand로 조금 영역을 넓힌걸 빼자
  - Blur Radius: 7
- HF Scatter의 마스크로 활용

트리 스캐터링

https://www.sidefx.com/docs/houdini/unity/terrain/scattering.html
unity_hf_tree_prototype + index string attribute on the height layer


- primitive @name=height
  - unity_hf_tree_prototype0 - Assets/Tree/large_tree.prefab




s@unity_hf_tree_prototype0 = "Assets/Race_Track_Tools/Art/Objects/Trees/Tree_001_SM.prefab";
s@unity_hf_tree_prototype1 = "Assets/Race_Track_Tools/Art/Objects/Trees/Tree_002_SM.prefab";
s@unity_hf_tree_prototype2 = "Assets/Race_Track_Tools/Art/Objects/Trees/Tree_003_SM.prefab";

### 섹션 19: Creating Rocks with Houdini

- Box
- iso offset
  - Uniform Sampling Divs : 50
- Scatter
  - Force Total Count : 100
- Voronoi Fracture 로 균열을 만들고
- Foreach Connective Pieces를 돌도록 하자
  - primitivewrangle
    ``` vex
    if (inprimgroup(0, "inside", @primnum))
    {
        return;
    }

    for (int i = 0; i < nprimitives(0); ++i)
    {
        removeprim(0, i, 1);
    }
    ```
// - convexdecomposition1
// - Convex hull

- Foreach Connective Piece 로 다시 돌면서
  - Match Size를 Box랑 해주자
    - Scale To Fit
- PolyBevel
  - Distance: 0.02
- Color
- Normal
  - Cusp Angle : 15
  - By Face Area
- Blast
  - @class==\`ch("../rock_id")\`
  - Delete Non Selected

xx

hf에서 dirt랑 debris를 mask로 해서 합치고 scatter로 흩뿌리기. s@tag==로 필터링가능하게 태그도 달아주자.

### 섹션 20: Creating Grass with Houdini

- Line 풀 심을 라인을 만들고
- Point Wrangle로 pscale과 bendangle을 구함
  - f@gradient = (float)@ptnum / (@numpt - 1);
  - f@pscale = chramp("ramp", f@gradient);
  - f@bendangle = fit(@gradient, 0, 1, -1, 1) * -60;
- Point Jitter 로 위치 변환
- Foreach Point
  - Copy to Point로 풀 복사
  - 풀에 벤딩을 줘서
    - point("../foreach_begin1/", 0, "bendangle", 0)
- physical_ambient_occlusion1
- @Cd *= point(1, "ao_mask", @ptnum);

카메라

- Transform
  - Translate : 0 / 0.5 / 1
- View
  - Resolution: 1024/1024
  - Projection: Orthographic
  - Ortho Width: 1

/out쪽에가서 Mantra

- 카메라 설정
  - Camera 이름 지정하고
  - Images
    - OUtput Picture: 에서 이미지 포맷정하고
  - Objects
    - Candidate Objects: 해당 geometry 넣고

유니티 기타 설정

s@unity_hf_layer_type = "detail";

s@unity_hf_detail_prototype_texture = "Assets/Race_Track_Tools/Art/Textures/Grass/grass_clump_001.png";
f@unity_hf_detail_prototype_maxheight = 3;
f@unity_hf_detail_prototype_maxwidth = 3;
f@unity_hf_detail_prototype_minheight = 1;
f@unity_hf_detail_prototype_minwidth = 1;

f@unity_hf_detail_prototype_bendfactor = 50;
i@unity_hf_detail_prototype_rendermode = 0;


i@unity_hf_detail_distance = 200;
f@unity_hf_detail_density = 1;
i@unity_hf_detail_resolution_patch = 128;

언리얼 기타 설정 풀 노드에서

- Point Wrangle
  - @P.z = 0;
  - 로 앞뒤 0으로 셋팅하고
- shrinkwrap
  - Type: 2D
  - 동영상에서는 Triangulate2D로 전체를 덮는 영역 해서 edge를 blast함
- divide
  - Dont Generate Slivers
  - Avoid Small Angles
- Normal
- UV Project
- Quick Material
  - 앞서 렌더한 이미지를 넣어주고
- Rop Geometry로 내보내기

이미지에서 메쉬를 가져오려면 trace 노드 사용


### 섹션 21: Building a Generic Object Placer Tool

라인을 기준으로 번갈아 좌우로 오브젝트 배치

- Line
- Resample
- PolyFrame : tangent => N
- Point Wrangle
  ``` vex
  vector dir = @N;
  dir.y = 0;
  dir = normalize(dir);
  v@right = cross(dir, {0, 1, 0});
  v@up = cross(v@right, @N);
  ```
- Group By Range
  - 짝수
- Point Wrangle
  ``` vex
  if(inpointgroup(0, "even", @ptnum))
  {
      @N = v@right;
  }
  else
  {
      @N = -1 * v@right;
  }
  ```
- Copy to Point하는데
  - Line에서 PolyFrame tanget N을 걸고 Blast 0해서 일정 거리만큼 떨어진 포인트를 얻음
- Copy To Point 다시해서 이번엔 유니티 오브젝트 인스턴싱하도록 하고
- Detail Wrangle 로 스테틱으로 변경하도록
  - i@unity_static = 1; // detail. 1은 스테틱

### 섹션 22: Creating a Perimeter Fence

모델링은 넘어가고 벽에 표지판용 판 만들기.

일단 판에 대한 UV설정하고

- Grid
  - Orientation : XY Plane
  - Size : 1 / 1
  - Rows : 4 (분할하고자 하는 갯수에서 하나 더하기 3 + 1)
  - Columns : 2
- Poly Extrude
  - Divide Into : Individual Elements
  - Insert: 0.01
- UV Project
- Blast
  - Group: \`detail("../loop_data/", "iteration", 0)%3\`
  - Delete Non Selected

표지판의 판을 foreach connective로 돌면서

- UV Layout
  - Targets
    - Pack Into : Islands From Second Input
- Color
  - Class : Primitive
  - Color Type : Random from Attribute
  - Attribute: class

그다음 머티리얼 설정

s@unreal_material
s@unity_material

이렇게해서 판의 UV를 설정

### 섹션 23: Creating Procedurally generated Signs

COP가 20.5에서 새로이 개편



### 섹션 24: Rally Tracks - Creating the Terrain
:pass
### 섹션 25: Rally Tracks - Track Deformation
:pass
### 섹션 26: Conclusion
:pass
### 섹션 27: Procedural Tracks - Houdini 18 - Building the User Curve

뭐 18버전으로 하면서 복습개념인데

Line에서 Sweep후

- Measure
  - Element Type : Point
  - Measure : Culvature / Gaussian


코스가 오픈코스인지 클로즈 코스인지에 따라 Add랑 Ends를 잘 사용.

### 섹션 28: Procedural Tracks - Houdini 18 - Building the Road

로드

- Line
- Carve해서 꺽일만큼 공간을 주고
- 중간에는 Resample로 포인트를 늘려주고
- Fuse로 정리
- Poly Path로 일단 하나의 프리미티브로 만들고
- 앞서 중간 포인트들만 위로 살짝 들어올린다
- 도로 색을 살짝 주기위해 Color (하얀)랑 Color Gradient(검하검하검)로 색을 주고 Color Blend

로드 양쪽 사이드 라인

커브라인이랑 라인을 Sweep(Row)하고 Carve로 조절
Add로 사이드 라인 연결하고
Resample후 Sweep(Ribbon)으로 함


스키드마크

메인커브에서 가운데 라인에서 Curvature
스키드 마크 횟수만큼 Foreach를 도는데 Gather Method: Merge Each Iteration으로
여기서 Mountain(Primitive)으로 Element사이즈는 넉넉하게 Offset에는 

fit(rand(detail("../loop_data/", "iteration", 0)), 0, 1, -ch("../../min_max_noise"), ch("../../min_max_noise"))

이런식으로 써서 오프셋 조정.
그 루프 다 돌면 Sweep하고 Alpha조정해서 텍스쳐 입히면 됨.
COP로 fractalnoise1 > streakblur1

Quick Material
op:\`opfullpath("../skid_texture/OUT_TEXTURE/")\`

데칼

메인커브에서 가운데 라인2개를 Skin 후에 Scatter로 점 뿌리고 UVProject된 Grid를 뿌려주면됨.

### 섹션 29: Procedural Tracks - Houdini 18 - Fences, Bumpers, Foliage, and Tire Stacks

:pass




- 3dsMax - 오토데스크
  - 바이패드 쉽고 간결
  - MAXScript / Python 
  - 년 250$
- Maya - 오토데스크
  - 애니메이션 커브를 쉽게 컨트롤할 수 있다
  - MEL / Python
- Cascadeur
  - 애니메이션
  - 월 인디 12$ /프로 33$



## 참고

- [Procedural Race Tracks for Mobile Games | Stoyan Dimitrov | GDC 2019](https://www.youtube.com/watch?v=1qjRWmqbzp8)