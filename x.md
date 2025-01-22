- 후디니 게임이펙트 마스터가이드
  - 아키야마 타카히로 저/윤윤 역


아래가 잘린 구형 방벽
- Sphere (Polygons)
  - Radious : 1/1/1
  - Row : 24
  - Columns : 36 (1.5 of Row)
- Transform
  - Translate : 0/0.6/0
- Transform
  - Uniform Scale : 2
- Clip
  - Direction : 0/1/0
- UV Texture
  - Texture Type : Cylindical
  - Attribute Class : Vertex
  - Fix Boundary Seams : enable
- Point
  - Attribute : Color(Cd)
- Transform
  - Scale : 100/100/100

기둥
- Curve
  - NURBS Curve // - NURBS(Non-uniform rational basis spline)
  - // 경우에 따라 Reverse노드로
- Resample // NURBS가 폴리곤으로 변환되어버림
- Convert  // 폴리곤을 다시 NURBS커브로 변환
  - Convert To : NURBS Curve
- Transform
  - Scale : 1/3/1
- Point VOP
  - fit(ptnum, 0, numpt, 0, 1)
  - ramp parameter
    - Ramp Type : spline ramp(float)
  - Bind Export
    - Name : Alpha
- Circle
  - NURBS Curve // - NURBS(Non-uniform rational basis spline)
  - Orientation : ZX Plane
  - Reverse : uncheck
  - Order : 3
  - Division : 24
- Sweep
  - Curve쪽이랑 Circle쪽
  - Transform Using Attribute : uncheck
- Skin
  - V Warap : On
  - V Order : 2
- UV Texture
  - Texture Type : Uniform Spline




[@mrbennelson](https://www.youtube.com/channel/UClSAI_rF9o5QNo_dHltL2qg)
[@MarkFancherFX](Fancherhttps://www.youtube.com/@MarkFancherFX)
[@DavidKahlVFX](https://www.youtube.com/c/davidkahlvfx)
[@sergiocasilimas958](https://www.youtube.com/@sergiocasilimas958)
