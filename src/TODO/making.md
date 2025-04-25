
- 프랍
  - 벽
    - 구멍뚤린부분은
      - isooffset/scatter로 voronoifraction을 구하고 group으로 지정해서 빼주면 됨.
    - 텍스쳐링
      - Base Mesh를 exterior로
      - Edge Damage를 수정하여 Boolean intersect하는 곳이 있는데 B side A를 corner로 설정
    - 철근 심어진
      - Divide / WireFrame사용
      - lattice사용시 그냥하면 끝부분이 조각난것처럼 보이니 미리 Convert로 V값 올리기
    - 데미지
      - VBD를 이용해서 하이폴리로 만들고 Smooth / Mountain 그리고 원본과 Boolean(intersect)
    - Realtime VFX for Games // Mike Lyndon // Houdini Illume Webinar
      - [pre damage with edge crumble](https://youtu.be/WbypqgFpD64?si=DZs_G7jVUE5MZYxz&t=2031)
        - 벽면 부셔짐 폴리곤 최적화
        - Voronoi 절단면 보간
  - 문
  - 상자
    - [Houdini | RBD Bullet Solver: Fill a Container](https://www.youtube.com/watch?v=iKJWPdXSTeM)
      - RBD Bullet Solver
        - 4번째 입력이 Collision
        - Collision Shape: Concave // 오목한
  - 벽에 붙어있는 간판 정면/사이드
    - 폰트 혹은 이미지
    - 테두리 - 원형/네모
  - 표지판

- 건축
  - 계단
  - 사다리
  - 컨테이너
  - 건물
  - 다리
    - 목재 - 흔들
    - 콘크리트
  - 파이프
  - 난간
  - 전봇대
  - 펜스
    - [Procedural Chain Link Fence](https://www.youtube.com/playlist?list=PL5V9qxkY_RnJK_xfZFs2ekVCijMp7NsBM)
    - ChainLink Fence Tutorial
      - [1](https://www.youtube.com/watch?v=KIkgIVjxdiI)
      - [2](https://www.youtube.com/watch?v=TTV9X5tTyf0)
      - [3](https://www.youtube.com/watch?v=NPP3VC88OpU)
  - 바리케이트
  - 뉴저지 배리어 (New Jersey Barrier) // 중앙 분리대 // 콘크리트 방호벽
    - Rebar (철근)
      - https://www.fhwa.dot.gov/publications/research/infrastructure/structures/05063/chapt9.cfm
      - https://www.youtube.com/watch?v=JG1XeSM5-NI
    - 배수용 구멍 (Drainage Holes): 도로에 물이 고이지 않도록 하단에 작은 배수 구멍이 뚫려 있음.
    - 리프팅 홀 (Lifting Holes): 설치나 이동을 쉽게 하기 위한 크레인 고리용 구멍도 있음.
    - 이름은 1950년대 고속도로 차선 분리용으로 처음 사용된 미국 뉴저지 주의 이름을 따서 지어졌습니다
    - K-rail  이는 1940년대 중반에 콘크리트 중앙분리대를 처음 사용하기 시작한 임시 콘크리트 교통 장벽에 대한 캘리포니아 교통부 사양 에 규정된 용어입니다
    - Ontario Tall Wall 온타리오 톨월
      - 높이 약 1.2~1.5m 이상으로 훨씬 크고 무거움.
      - 반영구적 설치를 목적으로 설계되어 구멍 없이 매끈한 벽 형태로 제작됨.
    - 데미지를 입히는데 Boolean(intersect) 사용
    - Peek해서 사이즈를 줄인 후 변화를 준것과 할 수 도 있음.
    - Labs Edge Damage노드 살펴보는것도 좋음
      - [Houdini Tutorial Edge Damage](https://www.youtube.com/watch?v=YMOGLxNs0Jk)
    - PDG이용
      - [Make More Assets | Rob Stauffer | GDC 2018](https://www.youtube.com/watch?v=DcOVmQYWSM8)
      - [PDG for Games | Simon Verstraete | EPC 2023](https://www.youtube.com/watch?v=hIBnwrNHsZo)
  - 도로
    - [Tencent Games | Procedural Generation of Urban Traffic System | Houdini HIVE SIGGRAPH Asia 2021](https://www.youtube.com/watch?v=OR4xG7-Od30)


- 자연
  - 돌
    - 균열
      - 단순한건 Voronoi
      - 복잡한건 Voronoi를 VOP으로 aanoise해서 지글거리게
  - 풀
  - 담쟁이 넝쿨
  - 나무
  - 절벽
  - 터레인


[CEDEC 2018 - プロシージャルゲームコンテンツ制作ブートキャンプ Part 2 実践](https://cedil.cesa.or.jp/cedil_sessions/view/1912)


- FX
  - 버텍스 애니메이션
    - 새/ 배경용 동물 / 배경용 군중

---


그리드를 1번째 물체를 3번째
포인트 그룹으로 pin
vellum cloth
    Pin Points에 pin추가(Match Animation도 있음. 에니메이션돌릴때 Blend Shape 노드도 유용)
vellum solver

---

[Unleashing Houdini for AAA Mobile Games Production - MIGS](https://www.youtube.com/watch?v=6MgUEbfrjXA)

- 최적화
  - VDB From Polygon
  - Convert VDB
  - Poly Reduce
  - 변형주려면
    - Group Expression으로 몇몇 부분을 선택하고
    - TriDivide
