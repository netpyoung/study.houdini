# TODO

- [Robert Osborne | Building a City in the Matrix Awakens Experience | EPC2022](https://youtu.be/p570CXrCmDQ)
- [Advanced Road Generation | Erwin Heyms | Games Workshop](https://youtu.be/G5Iq-jxgZn0?si=-SBFTxNI0pASckCb)
  - [Create Cross Roads In Houdini](https://youtu.be/mRzGmaHEJiM)

[PDG for Indie Game Dev Tutorial Series](https://www.youtube.com/playlist?list=PLXNFA1EysfYnCqXOWZIiPNeukPT-thmGd)
[Houdini Connect | Flashbulb Games](https://youtu.be/31PhQng_WUE)

- 
- env: https://www.sidefx.com/docs/houdini/ref/env.html

- toolbar > View > Dependency Links > Show for All Nodes
- Scene View > Tool Options > Create in Context // 오브젝트 레벨이 아니라 현재 콘텍스트 레벨에서 물체 생성가능


- Houdini uses a Y-up right handed coordinate systems
  - https://www.sidefx.com/docs/houdini/unreal/coordinates.html



|           |                          |
| --------- | ------------------------ |
| Mantra    | old - CPU only           |
| Karma CPU | CPU only                 |
| Karma XPU | hybrid(CPU + GPU(Nvidia) |


F1 > Examples > SOP (Geometry) node examples

순서 : VOP > hscript > vex > python

| Operator | Network    |                                     |
| -------- | ---------- | ----------------------------------- |
| VOP      | Vex        |                                     |
| SOP      | Surface    | Geometry / prev frame을 가지고 있음 |
| DOP      | Dynamic    | 시뮬 / 힘                           |
| POP      | Particle   |                                     |
| ROP      | Render     |                                     |
| CHOP     | CHannel    |                                     |
| COP      | Copernicus |                                     |
| MATNET   | material   |                                     |
| LOP      | Lighting   |                                     |
| TOP      | dependency |                                     |
|          | Constraint |                                     |
| SHOP     | SHader     | SHOPs are obsolete as of Houdini 16 |

|     |                                            |     |
| --- | ------------------------------------------ | --- |
| PDG | Procedural Dependency Graph                |     |
| VOL | Volume                                     |     |
| VDB | 볼륨 데이터덩어리 - Volumetric Data Blocks |     |


// vex
float v = chf("fileName")

// python
v = hou.node('obj/alembic1/alembic1').parm('fileName').eval()

// vex
@P

// python






http://www.houdini.co.kr/index.php?option=com_kunena&view=topic&catid=180&id=4945&Itemid=1511
https://www.sidefx.com/docs/hdk/_h_d_k__s_o_p__h_o_m__c_p_p__v_e_x.html



https://www.sidefx.com/docs/houdini/io/formats/geo.html

Edit > Preferences > General user interface > Global UI Scale 조정 > 재시작

- 렌더링
  - ROP Network > Mantra
  - out > Mantra (추천)
- 색입히기
  - Material > Material > Shader 선택
  - 팔레트: Pane > Material Palette
  - 셰이더: Material Network > Principled Shader
- 라이트
  - Light 오브젝트
  - Environment Light 오브젝트 ( 환경맵도 가능 )
    - https://hdri-haven.com/
    - https://polyhaven.com/hdris

- 카메라 줌인시 크기가 변경여부: Display Options > Background > Auto-Place Image


[Houdini20] Quad Remesh Tool, TextureMaskPaint 사용해봄!
https://blog.naver.com/marnich/223290792347
[Houdini20] Ripple Solver 물결 이펙트 테스트
https://blog.naver.com/marnich/223273099181



- houdini
  - [후디니 기초] 04-3. OBJs (3)
  - https://www.youtube.com/watch?v=XplY8yuMvY4&list=PLKKk6KFwVl2NrMJkj06lQeTqQGIraeFVF&index=62
An introduction to Shader Art Coding
  https://www.youtube.com/watch?v=f4s1h2YETNY
- [만화 얼굴 그림자 매핑 생성 렌더링 원리](https://techartnomad.tistory.com/124)



----------------------------------

https://github.com/killop?tab=repositories
https://github.com/WondermSwift
https://github.com/CGRnDStudio/CGTDCourse
https://cg-td-course.readthedocs.io/zh-cn/latest/parts/Houdini.html


-----------------------------------------------------------

https://qiita.com/search?q=houdini
https://qiita.com/oudont3/items/213f605cbc9174ba990f
https://qiita.com/tags/houdini?page=5

https://www.zhihu.com/column/letshoudini
https://zhuanlan.zhihu.com/p/51286662
https://zhuanlan.zhihu.com/p/51180083
https://zhuanlan.zhihu.com/p/51960982
https://zhuanlan.zhihu.com/p/52376189



https://m.blog.naver.com/edgerider/221530848164

-----------------




## houdini

`@group_그룹명` : 그룹에 속하면 1, 아니면 0
ex) @group_top == 1

서브네트워크
프로그래밍함수와 같다고 생각하면됨.
서브네트워크생성 : shift + c
서브네트워크 생성후 디지털 에셋으로 만들면 재사용하기 유용하다



CEntroid(중심) : 오브젝트를 중점을 기준으로 옮기고자 할때 좋음
// expression
$CEX, $CEY, $CEZ : The centroid of the geometry.
// vex: cent.x, cent.y, cent.z
vector cent = getpointbbox_center(0);


s키 선택
m키 align 방식변경 // 핸들 선택후 우클릭 Align Handle로 변경 가능
press 2 for points
press 3 for edges
press 4 for faces

uv맵핑전에 겹쳐서 안보이는 face들은 blast로 날려주면 좋다.

game development toolset
https://www.sidefx.com/tutorials/game-development-toolset-overview/
https://github.com/sideeffects/GameDevelopmentToolset
GameDev AutoUV - GameDev UV Vizualize
divide
  Maximum Edges
  Don't Generate Slivers
  Avoid Small Angles
GameDev Simple Baker


https://www.fxphd.com/memberships/

79$ 표준      스트리밍
99$ 프리미엄  다운로드/프로젝트파일

hipflask
https://www.hipflask.how/courses



=====
Houdini Digital Asset
GunChunk              : polyextrude - polybevel(N) - switch - transform(x:-$CEX,y:0,z:0)
BoolBevel(모서리 경사): boolean(Subtract/Intersect)으로 자르고, polybevel로 부드럽게
BoolSeam(이음매)      : curve - transform - mirror - skin 으로 선으로 면을 만들고, boolean(Shatter)로 나누고, polybevel로 부드럽게

- Transform($CEX, $CEY, $CEZ)는 자주쓰기에 `기어모양>Save Preset`으로 프리셋 저장해두면 편함
- curve로 영역을 만들고, resample(사이즈 고정용), carve(Breakpoints-Cut At All Internal U Breakpoints)로 primitive를 나눌 수 있음, foreach(Primitive)



https://www.sidefx.com/tutorials/project-titan-fence-tool/
http://www.tharlevfx.com/


https://www.polyplant.co/tech-art-portfolio.html
https://seblagarde.wordpress.com/2012/12/27/water-drop-2a-dynamic-rain-and-its-effects/
https://mhousse1247.gumroad.com/
https://blog.csdn.net/zhangxiaofan666/article/details/82021685


풀 알파 짤라주기
    Procedural Geometry for Megascans Atlases in Houdini
    https://www.youtube.com/watch?v=Gqx7MmD7YiU


## etc - How to Create a LUT in Houdini

- https://www.youtube.com/watch?v=nO69nH7Ylvg
- https://www.sidefx.com/docs/hdk/_h_d_k__i_o__l_u_t.html
-  .lut (text) and .blut (binary)

=====


- 계단
- 전기선
- 출입문
- 도로
- 건물
- 돌다리

- https://www.sidefx.com/profile/Simon_V/
- https://www.indie-pixel.com/
- https://www.youtube.com/watch?v=vXgYsbK6Rkk&ab_channel=EHoudiniAcademy

후디니

- 건물
  - 뼈대(수치입력버전)
  - 뼈대(큐브 or 원기둥)
  - 창문
- 자동차 - 바퀴
- 차도
  - 교차로
  - 연석(코너)
- 터널
- 기어

=======================

- https://www.pureref.com/
  - 레퍼런스 이미지를 한곳에서
- https://www.kiosk-library.com/
  - 이미지 관리
  - [Kiosk Library - Once Set Up](https://www.youtube.com/watch?v=BWEA2V82CSs)


===========

- 후디니 어려운 이유
  - 많은 노드/파라미터
  - 영어단어
  - 프로그래밍(비개발자)
