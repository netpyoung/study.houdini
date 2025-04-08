# Procedural Race Tracks - Houdini 17.5/18 and Houdini Engine

- https://www.indie-pixel.com/unityCourses/procedural-race-tracks-with-houdini-%26-houdini-engine
- https://www.udemy.com/course/procedural-race-tracks-houdini-175-and-houdini-engine




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



opdef - https://www.sidefx.com/docs/houdini/assets/opdef.html

opdef:.?mountain_001.bgeo.sc

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
- https://www.sidefx.com/docs/houdini/unity/meshes/lod.html
  
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



s@unity_hf_layer_type = "detail";

s@unity_hf_detail_prototype_texture = "Assets/Race_Track_Tools/Art/Textures/Grass/grass_clump_001.png";
f@unity_hf_detail_prototype_maxheight = 3;
f@unity_hf_detail_prototype_maxwidth = 3;
f@unity_hf_detail_prototype_minheight = 1;
f@unity_hf_detail_prototype_minwidth = 1;

f@unity_hf_detail_prototype_bendfactor = 50;
i@unity_hf_detail_prototype_rendermode = 0;


s@unity_hf_tree_prototype0 = "Assets/Race_Track_Tools/Art/Objects/Trees/Tree_001_SM.prefab";
s@unity_hf_tree_prototype1 = "Assets/Race_Track_Tools/Art/Objects/Trees/Tree_002_SM.prefab";
s@unity_hf_tree_prototype2 = "Assets/Race_Track_Tools/Art/Objects/Trees/Tree_003_SM.prefab";

i@unity_hf_detail_distance = 200;
f@unity_hf_detail_density = 1;
i@unity_hf_detail_resolution_patch = 128;

### 섹션 19: Creating Rocks with Houdini
### 섹션 20: Creating Grass with Houdini
### 섹션 21: Building a Generic Object Placer Tool
### 섹션 22: Creating a Perimeter Fence
### 섹션 23: Creating Procedurally generated Signs
### 섹션 24: Rally Tracks - Creating the Terrain
### 섹션 25: Rally Tracks - Track Deformation
### 섹션 26: Conclusion
### 섹션 27: Procedural Tracks - Houdini 18 - Building the User Curve
### 섹션 28: Procedural Tracks - Houdini 18 - Building the Road
### 섹션 29: Procedural Tracks - Houdini 18 - Fences, Bumpers, Foliage, and Tire Stacks




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