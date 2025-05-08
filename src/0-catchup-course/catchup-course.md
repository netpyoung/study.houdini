Curve


Poly Extrude
Poly Split

Poly Bevel


- 이미지
  - Shift + I 이미지 추가
  - Ctrl + I 이미지 편집


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


Box - Remesh - Linear Taper
Boolean

Copy To Point

Subdivide

Group

HDA 조금

Null 노드

ROP Geometry Output
ROP Alembic Output
https://www.sidefx.com/docs/houdini/io/alembic.html
https://en.wikipedia.org/wiki/Alembic_(computer_graphics)


HDA 심화 - python
- 이벤트 핸들
  - 마우스/키보드
  - 컨텍스트 메뉴
  - 메뉴 - 파라미터

Isotropix  Clarisse iFX


https://www.sidefx.com/docs/houdini/nodes/sop/connectivity.html
Connectivity geometry node
Creates an attribute with a unique value for each set of connected primitives or points.

====

---


Vex

point pointattrib setpointattrib // sweep보여주면서 끝노말 어긋난거 시뮬 ends:unrollwithnew points / polyframe / detail wrangle해서 끝노말 합치기
npoints // switch
detail

---

Recipe
https://www.sidefx.com/docs/houdini/network/recipes.html

HeightField
 - Layer 관리

TOPs

Unity

----

solaris
https://www.sidefx.com/docs/houdini/solaris/index.html
    Solaris is the umbrella name for Houdini’s scene building, look development, and Karma rendering tools based on the Universal Scene Description (USD) framework.

---

road
- Technical Manual for Design and Construction of Road Tunnels — Civil Elements

---
normal
average normal - 면의 방향의 평균값
weighted normal - 면의 방향의 가중치

- Add Normal To
  - Points
    - Normals will be computed for each point. This will be the average of the vertex normals around the point, weighted by the vertex angle for each polygon incident to the points, so that, for example, triangulating the surface won’t change the result.
  - Vertices
    - Normals will be computed for each vertex. If normals of vertices around a single point are less than Cusp Angle apart from each other, they will be averaged together, weighted by the vertex angle in each polygon.
  - Primitives
    - Normals will be computed for each primitive.
  - Detail
    - A single normal will be computed for the detail, being the average of the primitive normals, weighted by the primitive area.
- cusp angle
- weighted method
  - each vertex equality
  - by vertex angle
  - by Face Area
    - 면적이 더 큰 면의 정점은 점 법선을 계산할 때 더 많은 가중치를 받습니다.