# RBD

- `R`igid `B`ody `D`ynamics
  - <https://www.sidefx.com/docs/houdini/dyno/rbd.html>
- [houdinist - rbd추천 강좌 목록](https://cafe.naver.com/sidefx/11881)


- 간단
  - 상단 툴박스에서 Rigid Body > RBD Fractured Object
  - 상단 툴박스에서 Collision > Ground Plane

- Voronoi Fracturing
  - 수학자 **게오르기 보로노이(Georgy Voronoi)**의 이름에서 나온 말입니다. 그는 19세기 후반~20세기 초반의 러시아 출신 수학자로, 공간을 어떤 기준점들(시드 포인트)으로 나누는 **보로노이 다이어그램(Voronoi diagram)**에 대한 이론을 정립.


- Sphere - Voronoi Fracture로 가는데 두번째 입력으로 포인터가 필요해서 Sphere - Scatter를 시키면 표면에만 포인트가 생성됨.
  - Sphere - IsoOffset - Scatter로 volume으로 만들어서 뿌리면 안쪽도 포인트가 생김
  - Points From Volume은 정렬된 느낌의 포인트생성


- Voronoi Fracture로 잘게 쪼갰다면
- rbdcluster로 연결하여 쪼개짐 정도를 조절해줌
  - 두번째 입력에서 point wrangle로 포인트영역을 선택하여 i@cluster = 1;로 하면 영역이 쪼개지지 않고 묶이게됨.
- rbdinteriordetail1로 연결하면
  - Voronoi Fracture로 쪼갠 단면에 엣지를 그어줌
  - 단면에 노이즈를 줄 수 도 있음.


- 나무 갈라짐은 세로가 긴 경우 Transform을 이용해 세로를 줄이고
  - Grid - Scatter - Point Jitter랑 voronoifracture로 나눈다음
  - Transform 복사해서 Invert Transform으로 줄인만큼 다시 늘려주면 나무가 부셔진 효과


- Box를 Grid 2개로 Mountain달리해서 Merge후 Boolean(Shatter)으로 절단
  - binsidea 는 내부
- Box를 자를때 isooffset / scatter / Attribute Randomize (N) / Copy to Point로 절단면을 랜덤한 위치로 뿌릴 수 도 있음.




  - rbdmaterialfracture
    - Material Type:
      - Concrete
      - Glass
      - Wood
      - Custom
- RBD Exploded View
  - 디버그용

RBD Bullet Solver
RBD Disconnected Faces

건물 > VDB From Polygon > Scatter로 점 만듬

- rbdmaterialfracture
  - chipping
    - 메인조각에서 떨어진 작은 조각도 생성가능
  - Detail
    - Edge Detail - 절단면


- 유리
  - Box
  - rbdmaterialfracture
    - Material Type : Glass
    - Impact Points : Input Point활성화. (4번째 입력으로 들어오는 포인트들이 파괴의 중심부가 됨)