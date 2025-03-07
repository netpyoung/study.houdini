# 팁

- 이전 버전 노드가 안보일때는
  -  Assets > Asset Definition Toolbar > Show Always
  - 예)
     - Curve
     - Lab Cylinder Generator

- 점을 선으로 잇기: add> polygons> by group
- 선을 나누기 : resample
- 내부 선 지우기: add> points> Delete Geometry But Keep the Points
- Rigid body dynamics : RBD to FBX
- 감마: Edit> Color Settings> Color correction> Gamma> 1
  - <https://www.sidefx.com/docs/houdini/render/linear.html>
- 각도설정
  - copytopoint로 circle을 점에 붙인다
  - carve의 U를 이용 각도를 가진 점을 얻고 - 포인트가 0부터 시작하는걸 변하게 하는게 좋을듯
  - 점과 점을 merge
  - add로 선을 이어주자 - polygons > By Group
- 어트리뷰트 비쥬얼라이제이션
  - 포인트 번호 표시해주는 툴바에 visualization 우클릭
- 디버그용 선을 이어보기
  - 어트리뷰트를 이용하여 정보용 점을 추가로 만들고
  - merge
  - Add> By Group> Add> By Attribute> Attribute Name 설정
- grid를 텍스쳐로 굽기
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
- https://www.sidefx.com/docs/houdini/unity/sourcecontrol.html
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
- 두 점 사이의 점
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
- 

---
- line
  - origin: -ch("dist") / 2
- box
  - center.y = ch("sizey")/2

- 백틱(``) : 이름 활용

``` txt
example_`rint(fit01(rand(detail("../foreach_begin2_metadata1/", "iteration", 0)), 1, 5))`
```

- 백틱(``) : 스위치에서 랜덤 활용

``` txt
rand(detail("../foreach_begin2_metadata1/", "iteration", 0)) * opinputs(".")
```

- vex
  - switch같은곳은 작아서 Ctrl+E로 확대해서 편집하자
  - if(a==b, 1, 2) 같은 식으로 넣을 수 도 있음.

- blast
  - @N.y=0
  - @P.y=0
  - @grp_a=hello
  
- 공유된거
  - Group - Include by Edges - Max Edge Angle 조절
  - Divide - Remove Shared Edges


-----

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

- Performance monitor pane
  - https://www.sidefx.com/docs/houdini/ref/panes/perfmon.html
  - Windows > Performance Monitor Alt + Y



---

matrix  maketransform(int trs, int xyz, vector t, vector r, vector s)
matrix  maketransform(vector zaxis, vector yaxis, vector translate)

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


---

상단 면 중앙에 점 찍기
vex 방식
if (@N.y > 0.1)
{
    string prim_str = itoa(@primnum);
    vector center = getbbox_center(0, prim_str);
    addpoint(0, center);
}
blast/name/foreach(primitive)/extractcentroid 방식

---


- 카메라를 통한 디버그 메시지 보여주기
  - 카메라노드에서 Edit Render Properties
    - Viewport Display > OpenGL View > Viewport Comment 추가해서 내용 입력하면 씬뷰에서 나타남. (``을 사용하여 vex코드 삽입가능)


- 각 구하기

``` vex
int ptnum_prev;
int ptnum_next;

int ptnum_last = npoints(0) - 1;
if (@ptnum  == 0)
{
    ptnum_prev = ptnum_last;
    ptnum_next = 1;
}
else if (@ptnum == ptnum_last)
{
    ptnum_prev = ptnum_last - 1;
    ptnum_next = 0;
}
else
{
    ptnum_prev = @ptnum - 1;
    ptnum_next = @ptnum + 1;
}


vector pos_prev = point(0, "P", ptnum_prev);
vector pos_next = point(0, "P", ptnum_next);

vector dir_prev = normalize(@P - pos_prev);
vector dir_next = normalize(@P - pos_next);

float angle = degrees(acros(dot(dir_prev, dir_next)));
```

---

- 분홍색 마크
  - Display Option : Marker
    - Set display option for : Tempalte Model Geometry 설정 바꿔주면 분홍색 마크시 보여지는거 달라지게 됨.