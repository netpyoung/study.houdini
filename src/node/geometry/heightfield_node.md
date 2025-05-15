# HeightField

## 노드

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
| HeightField Tile Split |                                                                                |
| HeightField Clip       |                                                                                |
| HeightField Terrace    | 계단 - min/max height으로 범위 설정 cliffs 단면 mesa 층계참(평평한 면)         |
| HeightField Pattern    | 마스크에 패턴을 넣을 수 있음                                                   |

|                    |                                                                               |
| ------------------ | ----------------------------------------------------------------------------- |
| HeightField Erode  | 애니메이션 프레임을 반복하면서 침식을 시뮬레이션                              |
| HeightField Slump  | 노드는 모든 침식 효과를 한 번에 계산하여 적용합니다.(마스크영역이 흘러내린다) |
| HeightField Scater |                                                                               |

|                         |                                                                                     |
| ----------------------- | ----------------------------------------------------------------------------------- |
| HeightField File        | Imports a 2D image map from a file or compositing node into a height field or mask. |
| HeightField Output      | 레이어를 컬러 채널로                                                                |
| HeightField Visualize   |                                                                                     |
| HeightField Quick Shade | 마스크에 색깔 입히기                                                                |

|                              |                        |
| ---------------------------- | ---------------------- |
| HeightField Draw Mask        |                        |
| HeightField Layer            |                        |
| HeightField Combine Layers   |                        |
| HeightField Mask Invert      |                        |
| HeightField Mask by Feature  |                        |
| HeightField Mask Clear       |                        |
| Heightfield Mask by Geometry | HF project와 자주 이용 |
| HeightField Paint            |                        |
hf insert mask

## 팁

- 오브젝트로 실루엣 잡고
  - Project랑 Mask by Object / Mask Invert 이용해서 영역 구하기

- Erode후 비탈면이 너무 미끈해지니 distort by Noise로 노이즈를 줘서 자연스럽게 하자

- HF Resample
  - Specifiy Exact Resolution
  - Division Mode : By Axis
  - Grid Spacing
    - unreal: Overall size (vertices) - https://dev.epicgames.com/documentation/en-us/unreal-engine/landscape-technical-guide-in-unreal-engine
    - unity: Houdini Height Field Size - https://www.sidefx.com/docs/houdini/unity/terrain/basics.html

## OSM

- <https://www.sidefx.com/tutorials/city-building-with-osm-data/>
- <https://www.openstreetmap.org/>
  - 상단 Export
    - Manually select a different area
      - Export
  - Laps OSM Import
  - osm_filter
  - osm_buildings


## 시나리오

- 마스크
  - 파인면
  - 산맥
    - hf Nosie - Noise Type : Worley Cellular F1 로 모양을 잡아주자
    - 아니면 hf Mask by Geometry, hf project를 활용
      - Tube + Linear Taper사용하면 살짝 그럴듯함
        - Taper 0
        - Squish랑 옆에있는 Ramp사용
        - Capture Direction: 0/1/0
        - Capture Length == Tube's height
  - 작은 언덕
  - 풀/나무grass_tree
  - 땅 dirt
  - 플로우 필드
    - 침전물 debris
      - hf errode/slump
- 해수면 매쉬
  - 파인면 주변해서 커브로 두르고
  - Convert HeightField (Triangle)
  - Boolean으로 물/강/바다 메쉬
- 강
  - Curve beizier
  - 강물 주변 - curve에서
    - sweep (ramp) - circle 로 물길내고 주변을 terrace
  - 강 - curve에서
    - convert (polygon)
    - sweep
  - 주변 돌 - 강에서
    - attr randomize - scale
    - scatter and align - scale by attribute
    - copy to point해서 주변 돌 생성
- 도로
  - curve/resample/polywire/hf mask by geometry / hf project

## ref

- <https://www.sidefx.com/tutorials/foundations-terrain/>
- <https://www.sidefx.com/community-main-menu/complete-a-z-terrain-handbook/>
- [Building Worlds with Houdini | Benoit Martinez | Houdini HIVE Paris](https://www.youtube.com/watch?v=bQ_U1_MVKJQ)
- Post Apocalyptic Ruins in UE4
  - <https://www.sidefx.com/tutorials/post-apocalyptic-ruins-for-ue4/>
  - <https://www.youtube.com/playlist?list=PLXNFA1EysfYkqx3R-WyQHYEYR3c1odJPX>
  - Mountain으로 Boolean써서 빌딩의 상단을 날려버렸다. 그리고 절단면은 따로 처리


- <https://opentopography.org/>
- <https://environment.data.gov.uk/survey>
  - arcgis.com/apps/mapviewer
  - HF File 이미지 불러오기
