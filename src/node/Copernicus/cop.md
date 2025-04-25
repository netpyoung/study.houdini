# COPERNICUS

- COP
  - old = Composite
  - new = Copenicus

|                  |                                                  |
| ---------------- | ------------------------------------------------ |
| Preview Material | Geometry 변경 가능                               |
| SOP Input        | Preview Material에 연결 가능                     |
| ROP Image Output | COP Path에 노드를 끌어다 놔서 Render To Disk버튼 |


니콜라우스 코페르니쿠스
 - 폴란드 출신의 천문학자. 지동설 주장

https://www.sidefx.com/docs/houdini/copernicus/index.html
    Houdini’s 2D and 3D GPU image processing framework.
[Houdini - The Ultimate Copernicus Guide | Every COP Node Explained](https://www.youtube.com/watch?v=ZPL215vfNwg)
- [Exploring Copernicus for Real-time Usage](https://www.youtube.com/watch?v=Vn6SNJjXC8c)
  - normal/ao/culvature/gradient

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


---

- [Bringing SOPs into COPs | Intro to COPs | Houdini 20.5](https://www.youtube.com/watch?v=NgeQ72PLHQs)

SOP Import > Rasterize Setup > Rasterize Geo 에서 Quick Setup에 Add Position

---

SizeRef
Constant
Blend
File

Ramp
Quantize 양자화 - 연속적인 값을 이산적인 값으로 바꾸는 과정

Compare

---


[Voxyde VFX - Houdini 20.5 Copernicus Tutorial - Creating a Sharp Rock Material](https://www.youtube.com/watch?v=lAkKisYM9Xo)
[Inside The Mind - Exporting Textures from COPs | Intro to COPs | Houdini 20.5](https://www.youtube.com/watch?v=iGkl5VV3m8M)
[How to Create Complex Patterns with Custom UVs](https://www.youtube.com/watch?v=GQY1nF_0ZCA)


[old => new](https://www.sidefx.com/docs/houdini/copernicus/transition.html)
