advection: 물리학에서 이류(移流)는 온도나 농도 등의 물리량의 차이로 인해 유체가 이동하는 것을 의미한다

``` txt
torus > ISO Offset          > Convert VDB                     > VDB Advect
        Volume > Volume VOP > Convert VDB > VDB Vector Merge  >
```

복셀에 대한 거리값 ISO Offset - SDF Volume

연기 모양 Curvature/Gradient

DOP network
        Smoke Solver


Sphere (Polygon) > VDB From Polygon
Gas Resize Fluid Dynamic

density 밀도/temperature 온도/v 벡터필드

Light 배치하고, DOP Import Field 노드로 density 필드를 임포트시킨다. > Volume Visualization

- gas
  - Gas Dissiplate
  - Gas Turbulance
  - Gas Hred
  - Gas Disturb

## Pyro Solver
- Pyro : refers to Houdini’s volumetric fluid simulation package

Pyro Configure GPU Ground Explosion > Pyro Bake Volume




## ==========

- Fracture
  - Shape
    - Remsh + Poly Reduce
  - Vornoi Fracture (Scatter > Point Jitter)
    - 포인트 중심으로 가르기
  - RBD Material Fracture
    - density기반
  - Exploded View
  - UV Unwrap
  - RBD Constraint Properties ( Hard )
  - Assemble



|     |                          |
| --- | ------------------------ |
| FBX | Labs RBD to FBX          |
| ABC | ROP Alembic Output       |
| VAT | Vertex Animation Texture |
