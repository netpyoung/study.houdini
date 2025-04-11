# HeightField

|                        |                                                                                |
| ---------------------- | ------------------------------------------------------------------------------ |
| HeightField            | 지형에 쓸 기본 높이맵                                                          |
| HeightField Noise      | noise type                                                                     |
| HeightField Distort    | noise type                                                                     |
| HeightField Resample   | resolution scale을 지정해줄 수 있어 terrain 의 디테일을 올리거나 내릴 수 있다. |
| HeightField Blur       |                                                                                |
| HeightField Project    | HeightField랑 Polygon을 Blend                                                  |
| Convert HeightField    | heightfield를 polygon/VDB로                                                    |
| HeightField Remap      |                                                                                |
| HeightField Draw Mask  | 카메라 셋팅하고 일부영역만 잘라낼때                                            |
| HeightField Erode      | 애니메이션 프레임을 반복하면서 침식을 시뮬레이션                               |
| HeightField Slump      | 노드는 모든 침식 효과를 한 번에 계산하여 적용합니다.(마스크영역이 흘러내린다)  |
| HeightField Tile Split |                                                                                |

HeightField File - Imports a 2D image map from a file or compositing node into a height field or mask.
HeightField Layer
HeightField Terrace 계단

|                             |     |
| --------------------------- | --- |
| HeightField Mask Invert     |     |
| HeightField Mask by Feature |     |
| HeightField Mask Clear      |     |
| HeightField Paint           |     |


- <https://www.sidefx.com/tutorials/foundations-terrain/>
- <https://www.sidefx.com/community-main-menu/complete-a-z-terrain-handbook/>



- 오브젝트로 실루엣 잡고
  - Project랑 Mask by Object / Mask Invert 이용해서 영역 구하기


Erode후 비탈면이 너무 미끈해지니 distort by Noise로 노이즈를 줘서 자연스럽게 하자

## ref

- [Building Worlds with Houdini | Benoit Martinez | Houdini HIVE Paris](https://www.youtube.com/watch?v=bQ_U1_MVKJQ)
