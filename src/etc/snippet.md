# 팁



### FBX 머티리얼별 색칠

파일로 fbx불러오고
파티션 Rule : $MAT하면 머티리얼별로 그룹이 생김.
Color로 해당 그룹 색칠

### 점 선 면

면/선 => 점
Add - Delete Geometry But Keep the Points

면 => 선
Ends - Close U: Unroll with New Points
Convert Line

선 => 면
Skin

Poly Fill

### 아이콘모양 변경 유지

C/Z로 컬러/모양을 띄우고 Ctrl을 누른후 드래그 드랍으로 노드를 변경하면 나중 노드들도 반영됨.

### 자동 저장 횟수

- 기본값 1분으로 되어있다. 바꾸려면
  - Edit > Preferences > Save and Load Options > Auto Save Every x Minutes

### 이전 버전 노드가 안보일때는

-  Assets > Asset Definition Toolbar > Show Always
- 예)
    - Curve
    - Lab Cylinder Generator

### Color correction

- 감마: Edit> Color Settings> Color correction> Gamma> 1
  - <https://www.sidefx.com/docs/houdini/render/linear.html>

### Circle을 사용한 각도설정

- copytopoint로 circle을 점에 붙인다
- carve의 U를 이용 각도를 가진 점을 얻고 - 포인트가 0부터 시작하는걸 변하게 하는게 좋을듯
- 점과 점을 merge
- add로 선을 이어주자 - polygons > By Group

### 어트리뷰트 비쥬얼라이제이션

- 포인트 번호 표시해주는 툴바에 visualization 우클릭

### 디버그용 선을 이어보기

- 어트리뷰트를 이용하여 정보용 점을 추가로 만들고
- merge
- Add> By Group> Add> By Attribute> Attribute Name 설정

### grid를 텍스쳐로 굽기

- <https://blog.naver.com/checkjei/222622327344>
- geo > grid / uvtexture / attribvop
- Material Palette
  - Principled Shader 드래그
  - 드래그된것 우클릭 파라미터 편집 색 조정및 기타 러프니스등 조정
- Network view 탭에서 out
  - baketexture 노드 생성
  - UV Object1에 geo노드 등록
  - Surface Unlit Base Color (basecolor) 선택
-  Render to Disk 버튼 클릭

### 유니티 소스 컨트롤

- <https://www.sidefx.com/docs/houdini/unity/sourcecontrol.html>
- <UnityProject>/heu_session.txt : 현재 세션 정보를 저장하는 데 사용하는 임시 파일
  - .gitignore 할것
- <UnityProject>/heu_settings.ini
  - 이 파일에는 플러그인의 설정이 들어 있습니다
- 폴더
  - Assets/Plugins/HoudiniEngineUnity/ : 플러그인 
  - Assets/HoudiniEngineAssetCache/Working/
    - 캐쉬폴더라서 사용자간 작업공유 안할꺼면 버전관리 안해도됨.
    - 캐쉬라서 베이크안하면 날라감.
    - HoudiniEngine ▸ Plugin Settings ▸ GENERAL ▸ Houdini Asset Cache Path 해서 사용자별 버전관리해도 좋을듯
  - Assets/HoudiniEngineAssetCacheBaked/
    - 여기는 HDA에서 베이크된 에셋 파일이 생성되는 곳. 버전관리 해야함.

### 두 점 가운데에 점 찍기

- subdivide로 가운데 점 찍고
- delete
  - Operation: Non-selected
  - Entity: Point
  - Number
    - Operation : Delete by Range
    - Start/End : 1
    - Select _ of _ : 1 / 3



-----
- 지붕 널 만들때
  - remesh로 포인트 늘려주고 point jitter로 흩트려주면 좋음
- Lattice 사용
  - 집 휜거 나타낼때
    - Bound를 잡고 임의의 Box로 가운데 점들을 그룹핑해서 Edit으로 휘어주고
    - Lattice를 사용해서 적용
  - 지붕 휜거는
    - Bound를 잡고 지붕마루 맡닿은 선을 polywire와 transform으로 영역을 만들어 그룹핑해서 Edit으로 휘어주고
    - Lattice를 사용해서 적용
- 건물에 인접한 점과 그렇지 않는 점
  - Attribute TransferDistance Threshold로 구할 수 있음.
- 텐트모양
  - Box에 Facet(Post-Compute Normal)로 노말을 주고, Group(Keep By Normal)로 상단점을 선택후 Wrangle(@P.z = 0;)로 가운데로 뭉치고 Fuse로 중복을 없에 텐트모양을 만든다.

---

### 백틱(``) : 이름 활용 예제

``` txt
example_`rint(fit01(rand(detail("../foreach_begin2_metadata1/", "iteration", 0)), 1, 5))`
```

### 성능 모니터

- Performance monitor pane
  - <https://www.sidefx.com/docs/houdini/ref/panes/perfmon.html>
  - Windows > Performance Monitor Alt + Y

### 이동/회전 행렬 활용

``` vex
// matrix  maketransform(int trs, int xyz, vector t, vector r, vector s)
// matrix  maketransform(vector zaxis, vector yaxis, vector translate)

matrix location_matrix = maketransform(
    XFORM_TRS,
    XFORM_XYZ,
    p0,
    {0, 0, 0}
);
matrix rotation_matrix = maketransform(right, world_up, {0, 0, 0});
matrix m = rotation_matrix * location_matrix;

@P = invert(m);
@P = m;
```

### 상단 면 중앙에 점 찍기

- vex 방식
  ``` vex
  if (@N.y > 0.1)
  {
      string prim_str = itoa(@primnum);
      vector center = getbbox_center(0, prim_str);
      addpoint(0, center);
  }
  ```
- 노드 방식
  - blast/name/foreach(primitive)/extractcentroid 방식

### 카메라를 통한 디버그 메시지 보여주기

- 카메라노드에서 Edit Render Properties
  - Viewport Display > OpenGL View > Viewport Comment 추가해서 내용 입력하면 씬뷰에서 나타남. (``을 사용하여 vex코드 삽입가능)

### 분홍색 마크

- Display Option : Marker
  - Set display option for : Tempalte Model Geometry 설정 바꿔주면 분홍색 마크시 보여지는거 달라지게 됨.

### 이미지 카메라 매칭

- [Houdini Image Camera Matching](https://www.youtube.com/watch?v=qWD1nRqf2bk)
  - houdini Perspective Match
  - <https://pixabay.com/photos/lost-places-hall-columns-pforphoto-2963764/>
  - <https://fspy.io/>
    - <https://github.com/stuffmatic/fSpy>
  - <https://www.andre-gaschler.com/rotationconverter/>
    - Input angle format / Output angle format을 Degree로 설정
  - 이미지를 fspy로 불러와서 앵글을 잡는다
    - Vanishing points axes
      - 1 : x
      - 2 : -z
  - 후디니
    - 카메라 View
      - bacgkround image에 이미지 깔아주고
      - resolution에 fspy Image Width/Height
      - aperture에 fspy Focal length - Sensor.x
      - Focal Length에 fspy Focal length - Value (mm)
    - 카메라 Transform
      - Translate:
        - fspy Camera position x/y/z
      - Rotation
        - fspy의 Camera Orientation (Axis angle (degrees))를 rotationconverter에 복사(x/y/z/angle)
        - rotationconverter의 Axis with angle magnitude (radians) [x, y, z]
- <https://github.com/Njordy/nLib>
  - <https://www.youtube.com/watch?v=rVduzdrKYZg&t=171s>

### HOUDINI_PATH

- New Pane Tab Type > Misc > Textport
  - echo $HOUDINI_PATH
- New Pane Tab Type > Python Shell
  - hou.getenv("HOUDINI_PATH")
  - hou.houdiniPath()

### 뭔가 쌓인 효과

- Bound
  - Lower Padding : 적절히(0.1)
  - Upper Padding : 적절히(0.1)
- Group & Blast
  - 윗 영역을 구하고
- point N을 {0, -1, 0}
- Scatter로 뿌려질 점들을 만들어주고
- Ray로 원래 물체로
  - Ray Hit Group : rayHitGroup
- Blast : rayHitGroup
- Fuse
- VDB From Particle
  - Distance VDB 해제
  - Fog VDB
  - Point Radius Scale 올리고
  - Minimum Radius in Voxels 낮춰주고
- VDB Smooth
- Volume VOP 으로 노이즈 주고
- Convet VDB로 폴리곤으로
- Poly Reduce
- Normal

### 라인의 양쪽 선 구하기

- Sweep
  - Surface Shape : Ribbon
  - Columns : 1
- Add
  - Points : Delete Geometry But Keep the Points
  - Polygons / By Group
    - Add : Skip every Nth point
    - N : 2

### 나무 가지에 뭔가 걸치기

- Shrinkwrap로 나무 영역을 구해보고
- Remesh to Grid로 잘개 쪼갠후
- Attribute Blur로 부드럽게 해주자
- Clip 으로 나무 기둥만큼 잘라주고
- Scatter로 점뿌리기
- Attribute Randomize로 속성 조정
  - ex) pscale, Cd
- 그 다음 Copy to Point

-----


### TODO

- blast
  - @N.y=0
  - @P.y=0
  - @grp_a=hello
  
- 공유된거
  - Group - Include by Edges - Max Edge Angle 조절
  - Divide - Remove Shared Edges



vex연습
- chramp로 그리고 chi갯수만큼
  - point 추가
  - primitive 추가


- pivot
  - bbox(opinputpath(".", 0), D_XSIZE)
  - bbox(opinputpath(".", 0), D_YSIZE)
  - bbox(opinputpath(".", 0), D_ZSIZE)



- uv project 1
  - wrangle ( detail )

vector size = getbbox_size(0);
if (size.x > size.z)
{
    @project_size = size.x;
}
else
{
    @project_size = size.z;
}

  - uv project
    - translate
      - centroid(opinputpath(".", 0), D_X)
      - centroid(opinputpath(".", 0), D_Y)
      - centroid(opinputpath(".", 0), D_Z)
    - scale
      - detail(opinputpath(".", 0), "project_size", 0)

---

## 주의

- 파라미터에서 그룹과 관련된 수식 넣을때 주의
  - Blast// Group: `@Cd.r==0`와 `@Cd.r == 0`과는 다름
- 그룹 날라가는 노드
  - Carve

## 그룹

| 타입      | 프리픽스 | 예시                       |
| --------- | -------- | -------------------------- |
| primitive | gr_pr_   | gr_pr_building, gr_pr_tree |
| point     | gr_pt_   | gr_pt_crowd, gr_pt_dust    |
| vertex    | gr_vt_   | gr_vt_borders, gr_vt_seams |
| edge      | gr_ed_   | gr_ed_support, gr_ed_bevel |


## trouble shoot

- HeightField에서 흰색판이 보이는 문제
  - 벌칸렌더러의 문제로 보임
    - <https://www.reddit.com/r/Houdini/comments/1jloe5r/random_white_plane_using_terrainheightfield_tools/>
  - Edit > Preferences > 3D Viewports
    - Renderer : OpenGL 로 변경. 단, OpenGL로 변경시 변경사항이 잘 반영 안된다던지 다른 쪽에서 Viewport문제가 발생할 가능성이 있음.

### 나선형(Helix)

- Point Wrangle : @N = {0, 1, 0};
- Resample
  - curveu
- Poly Frame
  - tangentu
  - tangentv

``` vex
#include <math.h>

float resolution = chf("resolution");
float radius = chf("radius");

float u = fit01(@curveu, -PI, PI) * resolution;
vector pos = set(sin(u), cos(u), 0) * radius;
matrix3 t = set(v@N, v@tangentv, v@tangentu);

@P += pos * t;
```
- UV Texture
  - Texture Type: Uniform Spline
  - Attribute Class : Point
- Polyextrude
  - Transform Extrude Front
  - Translate 조절
- Point Wrangle
  - @uv.y = 1;

## 전깃줄같이 선 연결시 양끝단의 점에 bevel써주면 좋음

foreach를 돌고 끝단을 그룹핑하며 나중에 Bevel.