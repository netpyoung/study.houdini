

- 점을 선으로 잇기: add> polygons> by group
- 선을 나누기 : resample
- 내부 선 지우기: add> points> Delete Geometry But Keep the Points
- Rigid body dynamics : RBD to FBX
- 감마: Edit> Color Settings> Color correction> Gamma> 1
  - <https://www.sidefx.com/docs/houdini/render/linear.html>
- 각도설정
  - copytopoint로 circle을 점에 붙인다
  - carve의 U를 이용 각도를 가진 점을 얻고 - 포인트가 0부터 시작하는걸 변하게 하는게 좋을듯
  - 점과 점을 merge
  - add로 선을 이어주자 - polygons > By Group
- 어트리뷰트 비쥬얼라이제이션
  - 포인트 번호 표시해주는 툴바에 visualization 우클릭
- 디버그용 선을 이어보기
  - 어트리뷰트를 이용하여 정보용 점을 추가로 만들고
  - merge
  - Add> By Group> Add> By Attribute> Attribute Name 설정
- grid를 텍스쳐로 굽기
  - <https://blog.naver.com/checkjei/222622327344>
  - geo > grid / uvtexture / attribvop
  - Material Palette
    - Principled Shader 드래그
    - 드래그된것 우클릭 파라미터 편집 색 조정및 기타 러프니스등 조정
  - Network view 탭에서 out
    - baketexture 노드 생성
    - UV Object1에 geo노드 등록
    - Surface Unlit Base Color (basecolor) 선택
  -  Render to Disk 버튼 클릭
- https://www.sidefx.com/docs/houdini/unity/sourcecontrol.html
  - <UnityProject>/heu_session.txt : 현재 세션 정보를 저장하는 데 사용하는 임시 파일
    - .gitignore 할것
  - <UnityProject>/heu_settings.ini
    - 이 파일에는 플러그인의 설정이 들어 있습니다
  - 폴더
    - Assets/Plugins/HoudiniEngineUnity/ : 플러그인 
    - Assets/HoudiniEngineAssetCache/Working/
      - 캐쉬폴더라서 사용자간 작업공유 안할꺼면 버전관리 안해도됨.
      - 캐쉬라서 베이크안하면 날라감.
      - HoudiniEngine ▸ Plugin Settings ▸ GENERAL ▸ Houdini Asset Cache Path 해서 사용자별 버전관리해도 좋을듯
    - Assets/HoudiniEngineAssetCacheBaked/
      - 여기는 HDA에서 베이크된 에셋 파일이 생성되는 곳. 버전관리 해야함.
- 두 점 사이의 점
  - subdivide로 가운데 점 찍고
  - delete
    - Operation: Non-selected
    - Entity: Point
    - Number
      - Operation : Delete by Range
      - Start/End : 1
      - Select _ of _ : 1 / 3


>>>>>>>>>>>>>>


ledge - (벽에서 튀어나온) 선반, 돌출부.
beam - 기둥
truss - 트러스(지붕·교량 따위를 버티기 위해 떠받치는 구조물)
pillar - (다리·건물 지붕 등을 받치는, 특히 장식 겸용의 둥근) 기둥




---
- line
  - origin: -ch("dist") / 2
- box
  - center.y = ch("sizey")/2