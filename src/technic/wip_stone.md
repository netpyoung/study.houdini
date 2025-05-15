# 돌만들기

### 바위 모양 잡기

- Box
- Subdivide
  - Depth : 5
- Point VOP
  - x = (worleynoise + const1) * const2 * N)  // 큰 모양 잡아주고
  - P = x + (turbnoise(x)  * N)               // 세부 모양 추가


### 뿌리기

- Grid
- Attrib Paint
  - Attributes
    - Attribute Name : density
- Scatter
  - Density Attribute: density

### 흑속돌

- [How to make a Minecraft Cube in 3D | Houdini Tutorial](https://www.youtube.com/watch?v=jX9RhR2MhvM)
- box
  - Axis Division - 100/100/100
- Attrib VOP
  - Turbulent Nosie / Displace Along Normal
  - 색은 Turbulent Nosie / ramp / colormix

### 돌

- 균열
  - 단순한건 Voronoi
  - 복잡한건 Voronoi를 VOP으로 aanoise해서 지글거리게
- 찍힘현상
  - bevel / Remesh / peak
  - VOP
    - voronoi
    - `(dist2 - dist1) < compare변수` 를 diplace along normal의 scale로 넣음
  - smooth
  - boolean intersact
  - smooth
- Mountain시 Worley Cellular F1
  - Worley noise, also called Voronoi noise and cellular noise
  - <https://en.wikipedia.org/wiki/Worley_noise>
- 절단시
  - Grid를 Mountain해서 Boolean - Shatter로 A-Only Pieces
- 바벨을 이용한
  - <https://youtube.com/shorts/ppPcGO3HPP4?si=Un4FfZ41Ok9-ebJy>
  - ignore flat edge & pscale
- [Modeling Stylized Procedural Rock Formation Structures - Houdini Tutorial](https://www.youtube.com/watch?v=uZVGHx8Avyo)
  - tube를 subdivide로 잘게 만들고
  - Point Vop으로 모양잡고
    - UnifiedNoise
      - Noise Type: Worley Cellualar F2+F1
      - Frequency: 0.3/0.5/0.3/1
    - Fit
    - Displace along normal
      - Scale : 0.3
  - Point Vop을 다시해서 디테일
    - UnifiedNoise
      - Noise Type: Worley Cellualar F1
    - Displace along normal
      - Scale : 0.3
  - Mountain
  - VDB From Polygon
  - Convert VDB
  - Poly Reduce

### 돌2

좀 먹는 느낌

- VDB From Polygon
  - Distance VDB : density
- Volume VOP
  ```
  (-> (UnifiednoiseStatic @P)
      (Fit)
      (+ @density (aaflownoise @P)))
  ```  
- convertvdb
- Mesh Sharpen