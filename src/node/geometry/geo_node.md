# Geometry Node

SOP

- attr
  - <https://www.sidefx.com/docs/houdini/model/attributes.html>


- 기본
  - sphere
  - box
  - grid
  - tube // cone을 만들때도 사용
  - rubbertoy
  - tommy
  - platonic(tetrahedron/cube/octahedron/icosahedron/dodecahedron/soccerball/utahteapot)


| 노드                      |                                                                                                                                          |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Add                       | 점 추가 // 모델에서 점만 남기기, 점으로 선만들기                                                                                         |
| Ends                      | Face/Hull 탭과 같은 기능입니다                                                                                                           |
| Peak                      | Peak 노드는 프리미티브/포인트/에지/브레이크 포인트를 법선 방향으로 이동합니다                                                            |
| Transform                 | 트랜스폼 - 전체/그룹 // Move Centeroid To Origin도 유용                                                                                  |
| Edit                      | 트렌스폼 -  컴포넌트 단위                                                                                                                |
| Delete                    | 지우기 - 기능 더 많음    // 패턴 및 start/end // 중간에 있는 점의 노말을 살려야할시 v@N = cross(v@up, v@side)                            |
| Blast                     | 지우기 - 간단한                                                                                                                          |
| Poly Extrude              | 밀어내기(extrude), 그룹핑 가능                                                                                                           |
| Poly Bevel                | 비스듬한면(bevel), 선에 점을 추가하여 아치형으로 변경                                                                                    |
| Poly Path                 | 이어진 여러 라인을 하나의 라인으로 만듬. // 둘러싸여진 라인에서 면을 만듬                                                                |
| Poly Frame                | TangentName에 N을 넣는. TBN 구하기 // 선의 Tangent를 노말을 할당해서 노말이 선따라 가게                                                  |
| Poly Fill                 | 채우기                                                                                                                                   |
| Poly Split                | 자르기 - Edge Percentage가 유용 // 면을 자를때 좋음                                                                                      |
| Poly Cut                  | 면없에기 // 선따기 좋음                                                                                                                  |
| Poly Doctor               |                                                                                                                                          |
| Group                     | 그룹핑 - 추가  // 바운딩박스로도 그룹핑 가능(ex 가운데 점만 얻기)  // 노말로 그룹핑(ex 상단 점들만)                                      |
| Group Expression          | 그룹핑 - 표현식으로 // Union with Existing                                                                                               |
| Group Delete              | 그룹핑 - 삭제                                                                                                                            |
| Group by Range            | 그룹핑 - 범위 // Invert Range                                                                                                            |
| Group Combine             | 그루핑 - boolean연산                                                                                                                     |
| Group Transfer            | 그루핑 - override / distance threshold 유용                                                                                              |
| Reverse                   | 노말 - 반대로                                                                                                                            |
| Normal                    | 노말 - 스무스 효과 가능 Cusp Angle이 작을수록 하드, 클수록 소프트                                                                        |
| Boolean                   | 교집 - 교집합/합집합                                                                                                                     |
| Clip                      | clipping - 반으로 자르는거                                                                                                               |
| ROP Geometry Ouput        | 캐쉬 - 생성 $HIP/geo/$OS.bgeo.sc // $OS. Operator String 노드이름                                                                        |
| File                      | 캐쉬 - 불러오기                                                                                                                          |
| File Cache                | 캐쉬 - 생성 / 불러오기 - 기능이 2개라 햇갈려서 잘 쓰지 않음                                                                              |
| Attribute Create          | Attribute - 생성 // 그룹에 대한 attribute 생성도 가능  // $PR 할당할때                                                                   |
| Attribute from Map        | Attribute - 이미지로부터 attribute를 가져옴                                                                                              |
| Attribute Promote         | Attribute - 포인트 어트리뷰트를 프리미티브 어트리뷰트로 변환하는것 처럼 서로 다른 클래스로 어트리뷰트 전환이 가능                        |
| Attribute Transfer        | Attribute - 이전. // condition을 이용해서 거리에 따른 Attribute를 가져올 수 도 있다.                                                     |
| Attribute Randomize       | Attribute - 랜덤화                                                                                                                       |
| Attribute VOP             | Attribute - VOP 노드에는 자체는 키를 줄 수 없다 / VOP 노드 선택> VEX/VOP Options> Create Input Parameters                                |
| Scatter                   | 면에다 점찍기                                                                                                                            |
| Triangulate               | 포인트를 잘 연결해 트라이엥글로 만들어줌                                                                                                 |
| Triangulate 2D            | 포인트를 잘 연결해 트라이엥글로 만들어줌                                                                                                 |
| Resample                  | 다시 표본화. 선에 점찍는 용도. Treat Polygons As - Subdivision Curves로 휘어짐을 표현할 수 도 있다                                       |
| Polywire                  | 와이어프레임                                                                                                                             |
| Curve                     | 간단한, 베이지어 커브      // transform에서 bbox를 이용 살짝 올리고 height field에 ray랑 같이 써도 좋음                                  |
| Draw Curve                | 그릴 수 있지만, 거칠기에 Smooth를 같이 써주는게 좋다.                                                                                    |
| Smooth                    | 완만하게 해주는거 커브, 리셈플이랑 주로 같이 쓰임                                                                                        |
| Carve                     | 깍아내기 // uv로 선을 자름                                                                                                               |
| Sweep                     | 선따라 길만들기  // UVs and Attribute - Compute UVs 도 있으니 참고.                                                                      |
| Copy To Point             | 포인트들 위치로 복사  // attribute 삭제되는거 주의 // Pack and Instance 로 입력 Geometry단위로 Primitive로 묶을 수 있음                  |
| Copy And Transform        | 갯수만큼 복사 // 테두리같이 뭔가 둘러싸는 걸 만들 때도 유용 / Match Size로 위치조정                                                      |
| Foreach                   | <https://www.youtube.com/watch?v=xs5WezgOZlo>                                                                                            |
| Platonic Solids           | Tetrahedron(4)/Cube(6)/Octahedron(8)/Icosahedron(20)/Dodecahedron(12)/Soccer ball(pentagonal b12 + w20)/Utah teapot                      |
| Iso Offset                | Builds an offset surface from geometry. // 볼륨변환  // Scatter랑 같이 쓰이기도함                                                        |
| Convert                   | 지오메트리 -  기하학을 변환(ex 폴리곤화) // 라인을 커브로 // LOD                                                                         |
| Remesh                    | 지오메트리 - 메쉬 늘리기/줄이기                                                                                                          |
| Remesh to Grid            | merge같이 합친후 하나의 메쉬 처럼 보이도록 할때                                                                                          |
| Facet                     | 지오메트리 - 점 또는 표면 법선을 통합 // remove inline points로 resample한걸 합칠 수 있다. // post-compute normal로 노말만들때도 사용    |
| Fuse                      | 각 포인트들을 거리나 Snap에 따라 **합치기**. 프리미티브 가운데 찾기. Normal 다시 계산하는게 기본이므로 Remove Affected Normals 확인 하자 |
| Clean                     | 겹쳐진 primitive 삭제가능                                                                                                                |
| Divide                    | Don't Generate Slivers/Avoid Small Angles 동시 체크 추천. // Remove Shared Edge 엣지 지우면서 합치기                                     |
| linear taper              | 오므라들게                                                                                                                               |
| Match Size                | Resizes and recenters the input geometry to match a reference bounding box. // Scale To Fit 유용                                         |
| Skin                      | 두 표면사이에 스킨을 씌워준다. // Keep primitives 로 원래 모양도 유지가능                                                                |
| Sort                      | Point 나 Primitive를 정렬 혹은 랜덤 /. Shaft/Offset을 이용 오프셋 작업 가능Ï                                                             |
| Convert Line              | 포인트끼리 연결한 라인  // Join 반대라고 생각하면 됨.                                                                                    |
| Object Merge              | 외부 노드 불러오기                                                                                                                       |
| Visualize Attribute       | Attribute 기반 시각화 / TBN(rgb)을 시각화 시키면 좋다 / Type : Marker - Style : Vector                                                   |
| Pack                      | Pack하면 Point 1개와 Primitive 1개로 처리(foreach돌때 좋을듯) / 게임엔진에서 별도의 메쉬로 취급                                          |
| Unique Points/Point Split | Splits points shared by multiple vertices, optionally only if the vertices differ in attribute value. / PolyWire랑 쓰면 좋음             |
| Paint                     | 페인팅                                                                                                                                   |
| Point                     | 어트리뷰트 생성 ( point )   // 포인트에 Cd어트리 뷰트 생성시 유용                                                                        |
| Point Jitter              |                                                                                                                                          |
| Measure                   | area 계산                                                                                                                                |
| Lattice                   | 공간 왜곡                                                                                                                                |
| Dissolve                  | https://www.sidefx.com/docs/houdini/nodes/sop/dissolve                                                                                   |
| PolyExpand2D              | 밖 혹은 안으로 (ex quad 확장/축소)                                                                                                       |
| PolyReduce                | LOD                                                                                                                                      |
| PolyBridge                | 떨어진걸 이어줌 // 이상하게 이어져 있으면 Paring - Interpolation : Linear 확인                                                           |
| Bound                     | box/sphere/rectangle의 바운딩 박스를 만듬                                                                                                |
| Extract Centroid          | 센터 구하기                                                                                                                              |
| exploded view             | 쪼개서 넓히기                                                                                                                            |
| subdivide                 | 나누기. // 선의 중앙점도 쉽게 구할 수 있다                                                                                               |
| font                      | 텍스트 쓰기 text                                                                                                                         |
| Intersection Stitch       | ex 선 겹칠때 접점을 기준으로 나누기. 교차로                                                                                              |
| Primitive Properties      | Primitive의 수치 조정. 각 프리미티브 회전 등등                                                                                           |
| Distance along Geometry   | https://www.sidefx.com/docs/houdini/nodes/sop/distancealonggeometry.html                                                                 |
| Orientation Along Curve   | 선따라 N 셋팅                                                                                                                            |
| Labs Edge Group To Curve  | 태두리 구하기                                                                                                                            |
| Labs Dissolve Flat Edges  |                                                                                                                                          |
| Switch / Switch-If        |                                                                                                                                          |

Edge Straighten

Refine

|                |                                                                                                          |
| -------------- | -------------------------------------------------------------------------------------------------------- |
| Merge          | 합치기. 필요에 따라 Fuse를 뒤에 붙여 중복 제거                                                           |
| Soft Transform | 부드러운 곡선                                                                                            |
| Join           | 선들 머지해서 연결작업(후처리)/선 끝을 서로 연결 // 떨어져있는 선 각각 프리미티브 합치기(Only Connected) |
| Mirror         | 좌우 대칭                                                                                                |
| Revolve        | 중심 축을 중심으로 곡선을 회전하여 표면을 만듬. (ex 유리잔)                                              |

- NURBS(Non-uniform rational basis spline)


| foreach       |                               |
| ------------- | ----------------------------- |
| iteration     | 0, 1, 2 ...                   |
| numiterations | 1, 2, 3 ...                   |
| ivalue        | start + increment * iteration |
| value         | start + increment * iteration |


- <https://www.sidefx.com/docs/houdini/copy/tutorial_stamping.html>


| Primitive Type |        |
| -------------- | ------ |
| Primitive      |        |
| Polygon        | 삼각형 |
| Polygon Mesh   | 사각형 |
| Mesh           |        |
| NURBS          |        |
| Beizer         |        |
| Polygon Soup   |        |

## Attribute VOP

- Bind 노드로 attribute 노출 가능.
- Constant로 연산시 캐스팅 주의 ( int 1.0 + float 0.5 = int 1로 되어버리는 경우가 있음 )

## 

Point From Volume 액체 제작할때 많이 사용. 단독=> Geo, VDB from Polygon => SDF, Iso Offset => Fog
Iso Offset 연기

Particle Fluid Surface

DOP Network
VDB


smoke / fire / pyro
## Pop Network 시뮬레이션
POP Object POP환경에 맞게 일반 파티클 시스템을 동적 오브젝트로 변환.
POP Solver 타임스탭에 맞게 파티클을 업데이트
POP Source generates particles from geometry.



## etc

후면 틴트: Display Options: Markers / Primitives / Tint Backfaces
Display Options : Guids / Origin gnomon


## foreach

https://www.sidefx.com/docs/houdini/nodes/sop/block_begin.html
https://www.sidefx.com/docs/houdini/nodes/sop/block_end.html

| Begin - Method         |               |
| ---------------------- | ------------- |
| Fetch Feedback         |               |
| Extract Piece or Point |               |
| Fetch Metadata         | 빈 지오메트리 |
| Fetch Input            |               |

| End - Iteration Method |                |
| ---------------------- | -------------- |
| By Piece or Points     |                |
| By Count               | 반복 횟수 지정 |

| End - Gather Method     |     |
| ----------------------- | --- |
| Feadback Each Iteration |     |
| Merge Each Iteration    |     |