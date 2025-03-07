
Curve


Poly Extrude
Poly Split

Poly Bevel


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

Copy To Point


Subdivide

Group


## HeightField

HeightField
HeightField Draw Mask // 카메라 셋팅하고 일부영역만 잘라낼때
HeightField Remap
HeightField Mask Clear
HeightField Noise

Convert HeightField

ROP Geometry Output
ROP Alembic Output
https://www.sidefx.com/docs/houdini/io/alembic.html
https://en.wikipedia.org/wiki/Alembic_(computer_graphics)



Isotropix  Clarisse iFX


https://www.sidefx.com/docs/houdini/nodes/sop/connectivity.html
Connectivity geometry node
Creates an attribute with a unique value for each set of connected primitives or points.

====

니콜라우스 코페르니쿠스
 - 폴란드 출신의 천문학자. 지동설 주장
COPERNICUS
https://www.sidefx.com/docs/houdini/copernicus/index.html
    Houdini’s 2D and 3D GPU image processing framework.
[Houdini - The Ultimate Copernicus Guide | Every COP Node Explained](https://www.youtube.com/watch?v=ZPL215vfNwg)

Stage에서
- COP Network
  - ROP Image Output 로 텍스쳐 내보내기 가능
    - COP Path
- Grid
  - UV Texture
- Quick Surface Material
  - Color Map
    - op:/stage/copnet1/kuwaharafilter1
    - 위 처럼 `op:`를 붙이면 컬러맵을 설정가능.
- Assign Material
  - Primitives : 앞서만든 그리드 이름
  - Material Path : 앞서 만든 머테리얼
- Karma Physical Sky

[Voxyde VFX - Houdini 20.5 Copernicus Tutorial - Creating a Sharp Rock Material](https://www.youtube.com/watch?v=lAkKisYM9Xo)
[Inside The Mind - Exporting Textures from COPs | Intro to COPs | Houdini 20.5](https://www.youtube.com/watch?v=iGkl5VV3m8M)




solaris
https://www.sidefx.com/docs/houdini/solaris/index.html
    Solaris is the umbrella name for Houdini’s scene building, look development, and Karma rendering tools based on the Universal Scene Description (USD) framework.
