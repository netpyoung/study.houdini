# VEX

- VEX(`V`ector `EX`pressions)

| Vex    |                                                                         |
| ------ | ----------------------------------------------------------------------- |
| vex    |                                                                         |
| h      | #include<> 용                                                           |
| vfl    | Vex Function Library                                                    |
| pragma | vex 전용 [pragma](https://www.sidefx.com/docs/houdini/vex/pragmas.html) |
| ds     | Dialog Script                                                           |
houdini.env

int  assert_enabled()
Returns 1 if the environment variable HOUDINI_VEX_ASSERT is set or 0 if the variable isn’t set.
https://www.sidefx.com/docs/houdini/vex/assertions.html
    assert(1 == 2);
    assert(0 == 0);

## 에디터 설정
  - Edit > Preference > Set External Text Editor
  - VEXpression > 우클릭 > Expression > Edit in External Editor
  - Visual Studio Code에 VEX 플러그인

``` ini
// C:\Users\ (UserName) \Documents\houdini19.0\houdini.env

EDITOR = "C:\Users\(UserName)\AppData\Local\Programs\Microsoft VS Code\Code.exe"
```

## 노드

- Attribute VOP
  - Vex 시각화 그래프
- Attribute Wrangle
  - Vex 코딩
  - Wrangle뜻
    - 다루다. 소나 말들 관리
    - <https://english.stackexchange.com/questions/263712/what-does-come-on-lets-wrangle-up-the-cattle-mean>


- 세미콜론(;) 붙여야함
- 주석
  - // 
  - /* ... */



## type@attribute


- geometry sheet에서 확인 가능

``` vex
i@myint         = 5;                                        // i | int

f@myfloat       = 12.234;                                   // f | float
u@myvector2     = {0.6, 0.5};                               // u | vector2
v@myvector      = {1,2,3};                                  // v | vector
p@myquat        = {0,0,0,1};                                // p | vector4

2@mymatrix2     = {1,2,3,4};                                // 2 | matrix2
3@mymatrix3     = {1,2,3,4,5,6,7,8,9};                      // 3 | matrix3
4@mymatrix4     = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16}; // 4 | matrix

s@mystring      = 'a string';                               // s | string

d@mydict        = {};                                       // d | dict
d@mydict['key'] = 'value';

dict s = {};

i[]@connected_pts = neighbours(0, @ptnum);                  // i[] | int[] array

// 정의 후 @attribute 형태로 쓸 수 있다.
// { ... } 과 set( ... ) 는 동일.



// 배열이 좀 특이함
function int[] HelloWorld(int a[])
{
  int ret[];
  return ret;
}

// boolean형이 없네
```


``` vex
vector x0 = point(0, "P", @ptnum);
vector x1 = point(1, "P", @ptnum);


float dist = distance(x0, x1);
vector dir = normalize(x1 - x0);
vector next = x0 + dir * (dist / 2.0f);

@P = next;
```

## @

## xx

``` vex

@P                     => points
@N                     => normals
@Cd                    => primvars:displayColor
@id                    => ids
@width,@widths,@pscale => widths
@v                     => velocities
@w                     => angularVelocities
@accel                 => accelerations
@uv                    => primvars:st
@Alpha                 => primvars:displayOpacity


v@N; // the normal. If this hasn't been set, vex will calculate it for you just by calling it without initialised values
v@up; // a vector to control the spin around the normal when using instancing/copytopoints/etc
p@orient; // vector4 used as explicit rotation for instances
3@transform; // matrix3 used to control rotation and scale for instances
4@localtransform; // matrix (4x4) used for kinefx joints
f@pscale; // uniform scale for instances
v@scale; // XYZ scale control for instances

v@P; // current elements position. can be set for points, can be read for vertices and prims. Prims will guess the midpoint, not always reliable!
v@Cd; // diffuse colour
```
|          |                      |                              |
| -------- | -------------------- | ---------------------------- |
| @elemnum | 현재 element         | @id                          |
| @vtxnum  | 현재 vertex (linear) | 흔히 말하는 버텍스           |
| @ptnum   | 현재 point           | 포인트(중복된 포지션이 없다) |
| @primnum | 현재 primitive       | 단일 엔티티(면 or 구 ...)    |
| @numelem | 총 element 갯수      |                              |
| @numvtx  | 총 vertex 갯수       |                              |
| @numpt   | 총 point 갯수        |                              |
| @numprim | 총 primitive 갯수    |                              |

|           |                                                             |
| --------- | ----------------------------------------------------------- |
| @Time     | Float time ($T)                                             |
| @Frame    | Float frame ($FF)   // $F는 int frame                       |
| @SimTime  | Float simulation time ($ST), only present in DOP contexts.  |
| @SimFrame | Float simulation frame ($SF), only present in DOP contexts. |
| @TimeInc  | Float time step (1/$FPS)                                    |

|      |                              |
| ---- | ---------------------------- |
| $VTX | vertexprimindex(0, @vtxnum); |


## geometry attribute

- <https://www.sidefx.com/docs/houdini/model/attributes.html>

| Geometry |        |                                                               |
| -------- | ------ | ------------------------------------------------------------- |
| @id      | int    | A unique element ID                                           |
| @name    | string | 이름                                                          |
| @P       | vector | 포지션                                                        |
| @N       | vector | 노말                                                          |
| @v       | vector | 속도 Velocity                                                 |
| @piece   | int    | 조각                                                          |
| @pscale  | float  | Uniform scaling factor                                        |
| @scale   | vector | Whereas pscale is a single uniform scaling factor in all axes |

| Rendering |        |     |
| --------- | ------ | --- |
| @uv       | vector | UV  |

| Shader   |        |                                                                                          |
| -------- | ------ | ---------------------------------------------------------------------------------------- |
| @Cd      | vector | diffuse 색깔                                                                             |
| @Cs      | vector | specular 색깔                                                                            |
| @Cr      | vector | reflect 색깔                                                                             |
| @Ce      | vector | emission 색깔                                                                            |
| @Ct      | vector | transmit 색깔                                                                            |
| @Alpha   | float  | Alpha transparency override. The viewport uses this to set the alpha of OpenGL geometry. |
| @rough   | float  | Roughness override.                                                                      |
| @fresnel | float  | Fresnel coefficient override.                                                            |
| @shadow  | float  | Shadow intensity override.                                                               |
| @sbias   | float  | Shadow bias override.                                                                    |

| Particle |         |                                                                    |
| -------- | ------- | ------------------------------------------------------------------ |
| @orient  | vector4 | Quaternion orientation of a particle                               |
| @up      | vector  | Represents the up vector of a particle’s local space               |
| @rot     | vector4 | An additional offset-quaternion applied after all other attributes |


## ch

- 파라미터 삭제시: More > Delete Spare Parameter

- <https://www.sidefx.com/docs/houdini/vex/functions/ch.html>

| ch                            |                                        |
| ----------------------------- | -------------------------------------- |
| chf                           | float                                  |
| chi                           | int                                    |
| chv                           | vector                                 |
| chramp(channel,ramppos, time) | 조절 가능한 2차원 그래프 채널이 생긴다 |

## quaternion

- Quaternions
  - [Math in Game Development Summit: A Visual Guide to Quaternions and Dual Quaternions](https://youtu.be/en2QcehKJd8?si=Fgbr6dk2GIrzgmP_)

``` vex
vector4 orient = quaternion(maketransform(@N, @up));
vector euler  = quaterniontoeuler(orient,XFORM_XYZ);
v@rot = degrees(euler);
```

``` vex
// maketransform: https://www.sidefx.com/docs/houdini/vex/functions/maketransform.html

vector4  quaternion(matrix3 rotations)
vector4  quaternion(float angle, vector axis)
vector4  quaternion(vector angleaxis)

vector  qrotate(vector4 quaternion, vector v)
vector  degrees(vector nums_in_rads)
vector  quaterniontoeuler(vector4 orient, int order)

vector4  slerp(vector4 q1, vector4 q2, float bias)

vector4  qmultiply(vector4 q1, vector4 q2)
```

| Constant name | Rotation Order           |
| ------------- | ------------------------ |
| XFORM_XYZ     | Rotate order X, Y, Z     |
| XFORM_XZY     | Rotate order X, Z, Y     |
| XFORM_YXZ     | Rotate order Y, X, Z     |
| XFORM_YZX     | Rotate order Y, Z, X     |
| XFORM_ZXY     | Rotate order Z, X, Y     |
| XFORM_ZYX     | Rotate order Z, Y, X     |
| XFORM_TRS     | Translate, Rotate, Scale |


## Etc

``` vex
point("../OUT_P", 0, "P", 1)  // OUT_P  노드의 0번째의 point P의 Y좌표(xyz / 012)
npoints(0) // 0번입력의 포인트 갯수
addpoint // removepoint
setpointattrib
setpointgroup

opdigits(".")                 // 현재 노드(".")의 이름의 숫자만 가져옴
rand(x)                       // 랜덤. 분포가 일정하게 되는데 그럴때 사칙연산을 내부적으로 넣어주기도 함

chramp("radious_ramp", @curveu)    // 기어버튼으로 추가된 radious_ramp curveu의 위치 값을 가져온다
detail("../META/", "iteration", 0) // META에 있는 iteration의 0번째 값





prim("../OUT_Cd", 2, "Cd", 0) // OUT_Cd 노드의 2번째의 primitive Cd의 Red채널값(rgb / 012)
nprims(0) // 0번입력의 프라임 갯수
addprim  // removeprim
setprimattrib
setprimgroup


addvertex




getpointbbox_center(input)
```

|                                              |                                                                 |
| -------------------------------------------- | --------------------------------------------------------------- |
| clamp(value, min, max)                       |                                                                 |
| fit(value, fromMin, fromMax, toMin, toMax)   |                                                                 |
| point(geometry, attribute_name, pointnumber) | geometry는 입력 순서(0부터)                                     |
| 포지션 - minpos(geometry, point)             | point에서 geometry에 레이를 쐈을시 가장 먼저 닿는 부분의 포지션 |
| 포인트 - nearpoint(geometry, pt)             | geometry에 있는 모든 point 중에서 pt와 가장 가까운 point의 번호 |
| Vector getbbox_size(geometry)                | Computes the size of the bounding box for the geometry.         |

getbbox_max


``` vex
vector currP = @P;

// 현재 위치에서 1번 지오메트리와 맨 처음으로 마주치게될 포지션.
vector hittedP = minpos(1, currP);

// 현재 위치에서 1번 지오메트리에 있는 모든 포인트 중 가장 가까운 포인트번호.
int nearPointNumber = nearpoint(1, currP);

// 1번 지오메트리의 nearpointNumber의 _id값.
int id = point(1, "_id", nearPointNumber);
```


float xyzdist(geometry, originVector)



expression - opinputpath(name, index) : input에 연결된 노드의 경로 값을 가져옴
opinputpath(".", 0) 현재노드의 0번째(첫번째) 입력

@opinput‹n›_‹name›
@opinput1_P // 입력 1의 P.

v@P = lerp(v@P, @opinput1_P, chf('blend'));

i@id = @ptnum // 현재 point
v@P = lerp(v@P, point(1, 'P', findattribval(1, 'point', 'id', i@id)), chf('blend'));
v@P = lerp(v@P, point(1, 'P', idtopoint(1, i@id)), chf('blend'));

v@pos = uvsample(0, 'P', 'uv', chv('uv'));

setdetailattrib(0, 'foo', @ptnum, 'set');



relpointbbox(2, pos);
addpoint(geoself(), pos);

pointprims   => point to prim

primpoints   => prim to point
primvertices

neighbours

pcfind  범위(radius)에서 포인트를 찾음
nearpoints // pcfind를 편히 쓸 수 있는 버전


pritnf/ sprintf

## 배열

insert / append
removeindex
removevalue
push / pop
resize
len
argsort
reverse
reorder
find


## Point Cloud

- <https://www.sidefx.com/docs/houdini/vex/functions/pcopen.html>
- point cloud에서는 원하는 정보만 가져올 수 있다.
  - 반면, nearpoint는 포인트만.

``` vex
// pcopen: int  pcopen(int opinput, string Pchannel, vector P, float radius, int maxpoints)

int pc_handle = pcopen(0, "P", @P, 1, 10);

if (pcnumfound(pc_handle) < 3)
{
    removepoint(0, @ptnum);
}

pcclose(pc_handle);
```

``` vex
int pts[] = nearpoints(0, @P, 1, 10);

if (len(pts) < 3)
{
    removepoint(0, @ptnum);
}
```

pcimportbyidxf
pcfilter
pciterate

## 제어

- https://www.sidefx.com/docs/houdini/vex/statement.html
- 없는거 : switch

if / for / while / break / continue / do while


``` vex
foreach ([element_type] value; array) {

}

foreach (index, value; array) statement;
foreach (int index; element_type value; array) statement;

```

## 함수

``` vex

int test(int a; int b; string c)
{
    return 1;
}
```

## 구조체

```
struct SHello
{
    int a = 1;
    int b;

    int Func()
    {
      return a;
    }
}

SHello x = SHello(1, 2);
```


## 문자열

startswith
endswith
find
match
concat
join
split
lstrip / rstrip
splitpath
isdigit
opdigits // Returns the integer value of the last sequence of digits of a string https://www.sidefx.com/docs/houdini/vex/functions/opdigits.html
atoi / atof
itoa

## 정규표현식

- <https://regex101.com>

string regex = r'';
i@match = re_match(regex, teststring);
re_match
re_find
re_findall
re_replace
re_split

## Random

https://www.sidefx.com/docs/houdini/vex/random.html

| Noise                             | Relative cost |
| --------------------------------- | ------------- |
| Perlin noise (noise)              | 1.0           |
| Original perlin noise (onoise)    | 1.1           |
| Worley noise (wnoise)             | 1.8           |
| Sparse Convolution noise (snoise) | 2.1           |
| Alligator noise (anoise)          | 2.3           |

curlnoise
flownoise

## 수학

fit
lerp
distance

|              |     |
| ------------ | --- |
| normalize    |     |
| cross        |     |
| abs          |     |
| dot          |     |
| length       |     |
| degree       |     |
| min / max    |     |
| sin/cos/acos |     |

|       |               |
| ----- | ------------- |
| ceil  | 올림          |
| floor | 내림          |
| rint  | 반올림        |
| trunc | 버림          |
| frac  | 소수점 부분만 |


## Ref

- sidefx
  - <https://www.sidefx.com/docs/houdini/vex/index.html>
  - <https://www.sidefx.com/docs/houdini/vex/snippets.html>
  - <https://www.sidefx.com/learn/vex/>
  - <https://www.sidefx.com/docs/houdini/ref/expression_cookbook.html>
  - <https://www.sidefx.com/docs/houdini/vex/lang.html>
  - <https://www.sidefx.com/docs/houdini/vex/functions/index.html>

- tokeru
  - <https://www.tokeru.com/cgwiki/?title=HoudiniVex>

- jtomori/vex_tutorial
  - <https://github.com/jtomori/vex_tutorial>
  - <https://jtomori.github.io/vex_tutorial/>



<https://sites.google.com/site/fujitarium/Houdini/sop/copy-sop>

https://www.sidefx.com/docs/houdini/copy/instanceattrs.html

