[Model a Revolver](https://www.sidefx.com/tutorials/foundations-205-model-a-revolver/)
[H20.5 Foundations | Model a Revolver](https://www.youtube.com/playlist?list=PLXNFA1EysfYnd-qibah4jx_8GYxuY6CKr)


Scene View > V > Viewport Layout > Bottom Views

  Right
Pers | Front | Back


Scene View > D(Display Option)
Background 이미지 선택하고 Scale 및 Opacity 조절. Auto-Place Image는 체크해제(스크롤시 확대 축소에 영향)

Scene View 상단툴바쪽에, 레이아웃하는 버튼에서 Link Ortho Views누르면 스크롤 확대/축소시 동기화됨 


Boolean
Clip
PolyDraw == TopoBuild
  https://www.sidefx.com/docs/houdini/nodes/sop/topobuild.html
  Shift + Delete Remove Unused Point
PolySplit

Crease
    Shift +
    Shift -


Edit
 - Move
   - 선택후 : Shift E  - Even space Selection 포인트 균등하게 배치



---

Building Worlds in Unity | Elvar Örn Unnþórsson | GDC 2019
https://www.youtube.com/watch?v=Fz2rd9LR68g

지형
절벽&나무
다리
울타리
가설물
scaffolding 높은 곳에서 작업할 수 있게 가설(임시로 설치)한 플랫폼 혹은 구조물
overhangs ?


커브로 지형, Splat - A splat map is a texture which controls blending of multiple textures (or other values) across a model.


---

_high
_low
Substance Painter
로우 폴리 로드
TEXTURE SET LIST
DefaultMaterial > knife_mat

- TEXTURE SET SETTINGS > Bake Mesh Maps
  - High Definition Meshes에서 문서버튼 클릭 하이폴리 로드
  - ID baker parameters
    - Color Source: Vertex Color 확인
  - Bake버튼 클릭

LAYERS
Add mask with color selection
- PROPERTIES - COLOR SELECTION
  - Pick color 클릭
  - 색깔 선택하면 해당 ID만 레이어가 적용됨



베이킹 시, Substance Painter는 **로우폴리의 각 픽셀(=UV의 각 texel)**이 3D 공간의 어느 위치에 대응하는지를 계산합니다.

그 위치에서 하이폴리의 대응 지오메트리를 찾아냅니다 (레이캐스팅 방식).

이 과정에서 하이폴리의 material/vertex color 정보를 읽습니다.

1. 컬러 추출
하이폴리의 해당 위치에서 ID 컬러(예: material ID color, vertex color 등)를 가져옵니다.

1. 로우폴의 UV에 투사
위에서 가져온 색을 **로우폴리의 UV 좌표에 맞춰 2D 텍스처로 투사(bake)**합니다.

결과적으로 로우폴리 UV 기반의 ID Map이 생성되며, 하이폴리의 컬러 정보가 반영됨


[Paint Textures in COP's | Intro to COPs | Houdini 20.5](https://youtu.be/K3daEEJUnKI)

---

Group
Keep in Bouding Region
Size: bbox(0, D_XSIZE) / bbox(0, D_YSIZE) / bbox(0, D_ZSIZE)
Center: centroid(0, D_X) / centroid(0, D_Y) / centroid(0, D_Z)


---


[houdiniPill_03 Curve banking using VEX](https://www.youtube.com/watch?v=-EruZULtnqg)
[Houdini - Procedural Modeling Tips! - Curve Banking](https://www.youtube.com/watch?v=qJDMiDPGsMQ)


---

Copy To Points
https://www.sidefx.com/docs/houdini/copy/instanceattrs
Transform > Orient > N > Up



UNITY Starter Kit | Rock Tool
UNITY Starter Kit | Modular Wall Tool
UNITY Starter Kit | Edge Damage Tool

