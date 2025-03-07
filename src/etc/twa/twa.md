
## [HOUDINI 최초 입문 강의](https://www.youtube.com/playlist?list=PLcg9CGPYCmyhq9oPLhCKUjdnjYaJoDNR2)

### 1_1

간단한 레이아웃

### 1_2

box sphere rubbertoy tommy
null
transform
mountain
merge
switch

### 1_3

grid
  배경
tube

platonic
씬뷰 > No cam > New Camera : 지금 보고 있는 화면 그대로 카메라
Lock camera/light to view


/out > Mantra
Objects에서 필터링가능
Rendering - Sampling - Pixel Samples 화질 - 2/2 추천
Rendering - Rendering Engine - Physically Based Rendering
Image - Output Picture
Render To Disk

Render View
 Snapshot


material
/mat > Principled Shader

/obj > Light
Type: Sun
색온도 확인위해 주황 파랑 준비
Light - Distant Light Options - Sun Angle 그림자 엣지 날카로움 정도

bevel

### 2_1

Scene View
View 모드
Select 모드
    Select Group or Connected Geometry 단축키 9 . 옆에 Select 버튼있는데 3D Connected Gemoetry등 여러 선택 옵션들이 있음.

    Delete => Blast
    Tab => 메뉴 선택

group
convert
remesh

### 2_2

box에서 add로 점만남기기
box에서 scatter로 점 뿌리기

box랑 scatter된걸 merge후 add - Polygon - Remove Unused Points에서 내부 점 삭제

- Add 노드
  - 포인트 추가
  - 포인트 제거
    - Polygons
      - Remove Unused Points
  - 포인트만 남기기 : Delete Geometry But Keep the Points
  - 선만들기
    - Polygons / By Group
  - 면만들기
    - Polygons / By Group
      - Closed 체크

y로 선자르기


box - iso offset부피감 - scatter 점을 뿌리고 - Voronoi Fracture 조각내기
grid - scatter 점을 뿌리고 - Voronoi Fracture 조각내기 - exploded view 흩뿌리기

color
poly wire
subdivide
polyframe
connect adjacent pieces - 선 엮여있음에 따라 견고하거나 쉽게 깨지게 설정하는데 사용할 수 도 있음.

### 2_3

의자만들기

add로 점(  4개 만들고 면으로 만들 ) 혹은 아레 키 누르면 됨
null을 컨트롤러로 Edit Parameter Interface...


copy to point
circle > carve(UV설정) > blast 0(Delte None Selected)으로 0번 

### 2_4

facet
poly frame
skin
poly extrude
reverse
object merge
boolean

### 2_5

sort

### 3_1_1

에니메이션 키프레임
- 왼쪽 하단에 Global Animation Options...

우클릭 Keyframes > Set Keyframe ( Alt + 좌클릭 ) 혹은 아레 키 누르면 됨
우클릭 Keyframes > Remove Keyframe ( Ctrl + 좌클릭 )

씬뷰의 좌측 하단에 Render Flip Book 버튼

마우스 가운데 버튼 +  드래그 : 타임라인 상에서 키 프레임 옮기기
Shift + 드래그 : 여러 키 프레임 선택

New Pane Tab Type > Animation > Animation Editor

### 3_1_2

HScript Global Variable
$F

### 3_2_1

시계 베이스

add(0, 1.1, 0) -> Copy To Point의 Number of Copies(60) Rotate(6)사용하여 360도 회전 점을 만듬.

### 3_2_2

시계 FBX 분리

translate -$CEX -$CEY -$CEZ

### 3_3

시계 똑딱거림 모션

- 에니메이션 커브용으로
  - add로 라인을 만들고, subdivide로 점을 체움. Edit으로 점의 y좌표를 조절하고 Convert(NURBS Curve)로 부드럽게 만듬.
  - Carve의 U로 조정, Blast 0


### 3_4_1

attribute wrangle

### 3_4_2

attribute VOP

### 3_5

시계를 wrangle과 vop로 구현

### 3_6

pass

### 3_7

램프 모델링
addpoint(입력인덱스, 포즈)

chf / chv


점 위치 구하기

- 피타고라스 정리 직각삼각형 길이 a^2 + b^2 = c^2


``` txt
           bending

       /      |     \
      /       |      \
     A        Y       B
    /         |        \
   /          |          \

base -- X -- mid -- Y -- neck -- head

 |----------- C -----------|
```

- 작도
  - boolean이용 두 구의 겹친 부분의 원을 구한다.
    - 두 Sphere가 직선상 동일한 방향을 바라봐 점이 고르게 펼쳐짐.
    - Output Edge Groups - A-B Seams 선택
  - Blast - Group: abscemes , Group Type : Edge, Delete Non Selected하면 점이 나온다.
  - Add : Delete Geometry But Keep the Points로 포인트만 남겨주고
  - Sort - By Y, Reverse Point Sort로 0번이 위로 오게
  - Blast - Group: 0 , Delete Non Selected하면 겹친 원에서 상단 포인트만 남게된다.
  - wrangle이 아닌 이 방식을 사용하게 되면 성능상 느리지만 상황에 따라 직관적이니 알아서 판단.


### 3_8_1

- attribute create를 디버그 용도로 달아주자.

```
// wrangle_neck
float limit = chf("limit");

vector pos_base   = point(1, "P", 0);
vector pos_target = point(2, "P", 0);

vector base_to_target = pos_target - pos_base;
vector dir = normalize(base_to_target);
float len = length(base_to_target);

float amount = min(len, limit);
vector pos_neck = pos_base + amount * dir;

addpoint(0, pos_neck);
```

``` vex
// wrangle_middle
vector pos_base = point(1, "P", 0);
vector pos_neck = point(2, "P", 0);

float A = chf("A");                                // length from base to bending
float B = chf("B");                                // length from neck to bending
float C = distance(pos_base, pos_neck);            // length from base to neck
float X = ((A * A) - (B * B) + (C * C)) / (C * 2); // length from base to middle
float Y = sqrt((A * A) - (X * X));                 // length from middle to bending

vector dir = normalize(pos_neck - pos_base);
vector pos_middle = pos_base + (X * dir);

addpoint(0, pos_middle);

f@radius = Y;
v@N = dir;
```

``` vex
// add line attr

int pt_base    = findattribval(0, "point", "debug", "base");
int pt_neck    = findattribval(0, "point", "debug", "neck");
int pt_target  = findattribval(0, "point", "debug", "target");
int pt_middle  = findattribval(0, "point", "debug", "middle");
int pt_bending = findattribval(0, "point", "debug", "bending");

//int prim0 = addprim(0, "polyline", pt_base, pt_neck);
//int prim1 = addprim(0, "polyline", pt_base, pt_target);
int prim2 = addprim(0, "polyline", pt_base, pt_middle);
int prim3 = addprim(0, "polyline", pt_base, pt_bending);

int prim4 = addprim(0, "polyline", pt_bending, pt_middle);
int prim5 = addprim(0, "polyline", pt_bending, pt_neck);

// setprimattrib(0, "edge", prim0, "C");
setprimattrib(0, "edge", prim2, "X");
setprimattrib(0, "edge", prim3, "A");
setprimattrib(0, "edge", prim4, "Radius");
setprimattrib(0, "edge", prim5, "B");
```


### 3_8_2

sensitivity를 활용한 민감도 조절

### 3_8_3

head 추가

``` vex
//GET&SET VARIABLE
vector base        = chv("base");
vector target      = chv("target");
vector nointenNeck = chv("nointenNeck");

float limit        = chf("limit");
float sensitivity  = chf("sensitivity");
float under        = chf("under");

vector dir_BtoT = normalize(target - base);
float dist_BtoT = distance(base,target);
    
vector tempNeck;
if (dist_BtoT > limit)
{
    tempNeck = base + dir_BtoT * limit;
}
else
{
    tempNeck = target;
}

float intensity;
if (dist_BtoT > limit)
{
    intensity = ((limit + sensitivity) - dist_BtoT) / sensitivity;
    intensity = clamp(intensity, under,1);
}
else
{
    intensity = dist_BtoT / limit;
}

vector neck = tempNeck * intensity + nointenNeck * (1 - intensity);

addpoint(0, base);
addpoint(0, target);
addpoint(0, nointenNeck);
addpoint(0, neck);

f@inten = intensity;
```


vector dir = normalize(target - neck); 
vector head = neck + chf("headlen") * dir;
addpoint(0, head);

### 3_8_4

앞서구한 포인트를 가지고 모델링


---

- [독학러가 만드는 수레프랍 제작 과정](https://www.youtube.com/watch?v=VaQ1_2lPIXw)

모델 자체 쉐입
스케일링 메커니즘
셋팅 및 주위환경 그리고 히스토리
메테리얼
프랍의 사용감, 상태 마모된 정도 손상감
비하인드 스토리

- 모델의 스케일링 파악
  - 비율파악용 실사이즈 인간모델
  - 큰 쉐입부터

모델링
https://www.youtube.com/@AlexUdilov
[Houdini Procedural Modeling | Stylized SuitCase Timelapse](https://www.youtube.com/watch?v=2YmJQa3BTFA)
