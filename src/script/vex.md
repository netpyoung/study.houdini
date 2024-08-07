# VEX

- VEX(`V`ector `EX`pressions)
  - <https://www.sidefx.com/docs/houdini/ref/expression_cookbook.html>

- jtomori/vex_tutorial
  - <https://github.com/jtomori/vex_tutorial>
  - <https://jtomori.github.io/vex_tutorial/>

- 에디터 설정
  - Edit > Preference > Set External Text Editor
  - VEXpression > 우클릭 > Expression > Edit in External Editor
  - Visual Studio Code에 VEX 플러그인

``` ini
// C:\Users\ (UserName) \Documents\houdini19.0\houdini.env
EDITOR = "C:\Users\(UserName)\AppData\Local\Programs\Microsoft VS Code\Code.exe"
```

- 절대로 point() 또는 prim() 표현식을 사용하지 마십시오(expressions). VEX 대응만 사용하십시오.

- <https://www.tokeru.com/cgwiki/?title=HoudiniVex>
- <https://www.sidefx.com/learn/vex/>


- Attribute VOP
  - Vex 시각화 그래프
- Attribute Wrangle
  - Vex 코딩
  - Wrangle
    - This is a very powerful, low-level node that lets experts who are familiar with VEX tweak attributes using code.
    - https://english.stackexchange.com/questions/263712/what-does-come-on-lets-wrangle-up-the-cattle-mean
    - 소나 말들 관리


## type@attribute

- geometry sheet에서 확인 가능

``` vex
i@myint         = 5;                                        // i | int

f@myfloat       = 12.234;                                   // f | float
u@myvector2     = {0.6, 0.5};                               // u | float2
v@myvector      = {1,2,3};                                  // v | float3
p@myquat        = {0,0,0,1};                                // p | float4

2@mymatrix2     = {1,2,3,4};                                // 2 | float2x2
3@mymatrix3     = {1,2,3,4,5,6,7,8,9};                      // 3 | float3x3
4@mymatrix4     = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16}; // 4 | float4x4

s@mystring      = 'a string';                               // s | string

d@mydict        = {};                                       // d | dict
d@mydict['key'] = 'value';

i[]@connected_pts = neighbours(0, @ptnum);                  // i[] | int[] array

// 정의 후 @attribute 형태로 쓸 수 있다.
// { ... } 과 set( ... ) 는 동일.
```

<https://sites.google.com/site/fujitarium/Houdini/sop/copy-sop>



``` vex
// https://www.sidefx.com/docs/houdini/vex/snippets.html
vector x0 = point(0, "P", @ptnum);
vector x1 = point(1, "P", @ptnum);


float dist = distance(x0, x1);
vector dir = normalize(x1 - x0);
vector next = x0 + dir * (dist / 2.0f);

@P = next;
```

## @

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

|           | @       |         |                                                                                          |
| --------- | ------- | ------- | ---------------------------------------------------------------------------------------- |
| Geometry  | id      | int     | A unique element ID                                                                      |
|           | name    | string  | 이름                                                                                     |
|           | P       | vector  | 포지션                                                                                   |
|           | N       | vector  | 노말                                                                                     |
|           | v       | vector  | 속도 Velocity                                                                            |
|           | piece   | int     | 조각                                                                                     |
|           | pscale  | float   | Uniform scaling factor                                                                   |
|           | scale   | vector  | Whereas pscale is a single uniform scaling factor in all axes                            |
| Rendering | uv      | vector  | UV                                                                                       |
| Shader    | Cd      | vector  | diffuse 색깔                                                                             |
|           | Cs      | vector  | specular 색깔                                                                            |
|           | Cr      | vector  | reflect 색깔                                                                             |
|           | Ce      | vector  | emission 색깔                                                                            |
|           | Ct      | vector  | transmit 색깔                                                                            |
|           | Alpha   | float   | Alpha transparency override. The viewport uses this to set the alpha of OpenGL geometry. |
|           | rough   | float   | Roughness override.                                                                      |
|           | fresnel | float   | Fresnel coefficient override.                                                            |
|           | shadow  | float   | Shadow intensity override.                                                               |
|           | sbias   | float   | Shadow bias override.                                                                    |
| Particle  | orient  | vector4 | Quaternion orientation of a particle                                                     |
|           | up      | vector  | Represents the up vector of a particle’s local space                                     |
|           | rot     | vector4 | An additional offset-quaternion applied after all other attributes                       |

## Expression

``` vex
$BBX = relbbox(@P).x
$BBY = relbbox(@P).y
$BBZ = relbbox(@P).z
```

| Expression Local Variables          |                                  |
| ----------------------------------- | -------------------------------- |
| $PT                                 | 포인트 번호                      |
| $PR                                 | 프리미티브 번호                  |
| $CY                                 | 현재 사본 번호                   |
| $TX,$TY,$TZ                         | 트랜스폼                         |
| $TX2,$TY2,$TZ2                      | 두번째 입력에서 오는 포인트 위치 |
| $NX,$NY,$NZ                         | 노말                             |
| $CR,$CG,$CB,$CA                     | 칼라                             |
| $VX,$VY,$VZ                         | 벨로시티                         |
| $BBX,$BBY,$BBZ                      | 바운딩 박스 내 점 위치（0 ~ 1）  |
| $CEX,$CEY,$CEZ                      | 기하학의 중심                    |
| $AGE                                | 파티클 수명(초)                  |
| $LIFE                               | 파티클 수명(0 ~ 1)               |
| $XMIN,$XMAX,$YMIN,$YMAX,$ZMIN,$ZMAX | 경계 범위                        |
| $SIZEX,$SIZEY,$SIZEZ                | 경계 크기                        |

## ch

- https://www.sidefx.com/docs/houdini/vex/functions/ch.html

파라미터 삭제시: More > Delete Spare Parameter

chf
chi
chv

|                               |                                        |
| ----------------------------- | -------------------------------------- |
| chramp(channel,ramppos, time) | 조절 가능한 2차원 그래프 채널이 생긴다 |

## Function

|                                              |                                                                 |
| -------------------------------------------- | --------------------------------------------------------------- |
| clamp(value, min, max)                       |                                                                 |
| fit(value, fromMin, fromMax, toMin, toMax)   |                                                                 |
| point(geometry, attribute_name, pointnumber) | geometry는 입력 순서(0부터)                                     |
| 포지션 - minpos(geometry, point)             | point에서 geometry에 레이를 쐈을시 가장 먼저 닿는 부분의 포지션 |
| 포인트 - nearpoint(geometry, pt)             | geometry에 있는 모든 point 중에서 pt와 가장 가까운 point의 번호 |
| Vector getbbox_size(geometry)                | Computes the size of the bounding box for the geometry.         |



``` vex
vector currP = @P;

// 현재 위치에서 1번 지오메트리와 맨 처음으로 마주치게될 포지션.
vector hittedP = minpos(1, currP);

// 현재 위치에서 1번 지오메트리에 있는 모든 포인트 중 가장 가까운 포인트번호.
int nearPointNumber = nearpoint(1, currP);

// 1번 지오메트리의 nearpointNumber의 _id값.
int id = point(1, "_id", nearPointNumber);
```

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

| Constant name | Rotation Order       |
| ------------- | -------------------- |
| XFORM_XYZ     | Rotate order X, Y, Z |
| XFORM_XZY     | Rotate order X, Z, Y |
| XFORM_YXZ     | Rotate order Y, X, Z |
| XFORM_YZX     | Rotate order Y, Z, X |
| XFORM_ZXY     | Rotate order Z, X, Y |
| XFORM_ZYX     | Rotate order Z, Y, X |
