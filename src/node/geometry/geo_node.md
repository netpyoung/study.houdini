# Geometry Node

- attr
  - <https://www.sidefx.com/docs/houdini/model/attributes.html>


- 기본
  - box
  - grid
  - tube
  - rubbertoy
  - tommy
  - platonic(tetrahedron/cube/octahedron/icosahedron/dodecahedron/soccerball/utahteapot)


| 노드                |                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| PolyExtrude         | 밀어내기(extrude), 그룹핑 가능                                                                                      |
| PolyBevel           | 비스듬한면(bevel), 선에 점을 추가하여 아치형으로 변경                                                               |
| PolyPath            | 이어진 여러 라인을 하나의 라인으로 만듬                                                                             |
| PolyFrame           | TangentName에 N을 넣는                                                                                              |
| Group               | 그룹핑 - 추가                                                                                                       |
| Group Expression    | 그룹핑 - 표현식으로 // Union with Existing                                                                          |
| Group Delete        | 그룹핑 - 삭제                                                                                                       |
| Group by Range      | 그룹핑 - 범위 // Invert Range                                                                                       |
| Group Combine       | 그루핑 - boolean연산                                                                                                |
| Reverse             | 노말 - 반대로                                                                                                       |
| Normal              | 노말 - 스무스 효과 가능                                                                                             |
| Boolean             | 교집 - 교집합/합집합                                                                                                |
| Clip                | clipping - 자르는거                                                                                                 |
| Transform           | 트랜스폼 - 전체/그룹                                                                                                |
| Edit                | 트렌스폼 -  컴포넌트 단위                                                                                           |
| Delete              | 지우기 - 기능 더 많음                                                                                               |
| Blast               | 지우기 - 간단한                                                                                                     |
| ROP Geometry Ouput  | 캐쉬 - 생성 $HIP/geo/$OS.bgeo.sc // $OS. Operator String 노드이름                                                   |
| File                | 캐쉬 - 불러오기                                                                                                     |
| File Cache          | 캐쉬 - 생성 / 불러오기 - 기능이 2개라 햇갈려서 잘 쓰지 않음                                                         |
| Attribute Create    | Attribute - 생성 // 그룹에 대한 attribute 생성도 가능                                                               |
| Attribute from Map  | Attribute - 이미지로부터 attribute를 가져옴                                                                         |
| Attribute Promote   | Attribute - 포인트 어트리뷰트를 프리미티브 어트리뷰트로 변환하는것 처럼 서로 다른 클래스로 어트리뷰트 전환이 가능   |
| Attribute Transfer  | Attribute - 이전. 가까이 있는 Attribute를 가져온다                                                                  |
| Attribute Randomize | Attribute - 랜덤화                                                                                                  |
| Attribute VOP       | Attribute - VOP 노드에는 자체는 키를 줄 수 없다 / VOP 노드 선택> VEX/VOP Options> Create Input Parameters           |
| Scatter             | 면에다 점찍기                                                                                                       |
| Triangulate 2D      | 포인트를 잘 연결해 트라이엥글로 만들어줌                                                                            |
| Resample            | 다시 표본화. 선에 점찍는 용도                                                                                       |
| Polywire            | 와이어프레임                                                                                                        |
| Curve               | 간단한, 베이지어 커브                                                                                               |
| Smooth              | 완만하게 해주는거 커브, 리셈플이랑 주로 같이 쓰임                                                                   |
| Carve               | 깍아내기 // uv로 선을 자름                                                                                          |
| Sweep               | 선따라 길만들기                                                                                                     |
| Copy To Point       | 포인트들 위치로 복사                                                                                                |
| Mirror              | 좌우 대칭                                                                                                           |
| Foreach             | <https://www.youtube.com/watch?v=xs5WezgOZlo>                                                                       |
| Platonic Solids     | Tetrahedron(4)/Cube(6)/Octahedron(8)/Icosahedron(20)/Dodecahedron(12)/Soccer ball(pentagonal b12 + w20)/Utah teapot |
| Iso Offset          | Builds an offset surface from geometry. // 볼륨변환  // Scatter랑 같이 쓰이기도함                                   |
| Convert             | 지오메트리 -  기하학을 변환(ex 폴리곤화) // LOD                                                                     |
| Remesh              | 지오메트리 - 메쉬 늘리기/줄이기                                                                                     |
| Facet               | 지오메트리 - 점 또는 표면 법선을 통합                                                                               |
| Add                 | 점 추가 // 모델에서 점만 남기기, 점으로 선만들기                                                                    |
| Fuse                | 각 포인트들을 거리나 Snap에 따라 합쳐주는 역활을 한다.                                                              |
| linear taper        | 오므라들게                                                                                                          |
| Match Size          | Resizes and recenters the input geometry to match a reference bounding box.                                         |
| Skin                | 두 표면사이에 스킨을 씌워준다. // Keep primitives 로 원래 모양도 유지가능                                           |
| Sort                | Point 나 Primitive를 정렬                                                                                           |
| Convert Line        |                                                                                                                     |
| Revolve             | 중심 축을 중심으로 곡선을 회전하여 표면을 만듬                                                                      |

- NURBS(Non-uniform rational basis spline)

- uv ref
  - <https://qiita.com/jyouryuusui/items/e15d53e88e9cc018d18f>
  - <https://www.technical-artist.net/?p=111>

| UV                |                                                          |
| ----------------- | -------------------------------------------------------- |
| UV QuickShade     | 평면 // grid 한장                                        |
| UV Project        | 프로젝션 기법을 이용하여 UV 전개                         |
| UV Unwrap         | 자동 uv 평탄화 및 구릅핑                                 |
| UV Texture        | 평면은 물론, 구형이나 원통형을 UV 전개                   |
| UV Flatten        | flattening constraints// Seam(이음매), Rectify(바로잡다) |
| UV Layout         | uv 그룹 배치                                             |
| AutoUV            | SideFXLab 에 통합됨                                      |
| Labs UV Visualize | UV 시각화                                                |

| foreach       |                               |
| ------------- | ----------------------------- |
| iteration     | 0, 1, 2 ...                   |
| numiterations | 1, 2, 3 ...                   |
| ivalue        | start + increment * iteration |
| value         | start + increment * iteration |



``` txt
point("../OUT_P", 0, "P", 1)  // OUT_P노드의 0번째의 point P의 Y좌표(xyz / 012)
prim("../OUT_Cd", 2, "Cd", 0) // OUT_Cd노드의 2번째의 primitive Cd의 Red채널값(rgb / 012)
opdigits(".") // 현재 노드의 이름의 숫자만 가져옴
rand(x) // 랜덤. 분포가 일정하게 되는데 그럴때 사칙연산을 내부적으로 넣어주기도 함

chramp("radious_ramp", @curveu) // 기어버튼으로 추가된 radious_ramp curveu의 위치 값을 가져온다
detail("../META/", "iteration", 0) // META에 있는 iteration의 0번째 값
```


- <https://www.sidefx.com/docs/houdini/copy/tutorial_stamping.html>
