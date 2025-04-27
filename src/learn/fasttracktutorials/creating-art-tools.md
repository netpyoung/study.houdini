
https://fasttracktutorials.com/tutorial_single/1909

Creating Art Tools Using Houdini & Unreal Engine 5
By Hicham Ouchan


### 스케이트 하프파이프(또는 버트)와 비슷한 구조물을 만든다.

- 아치형
  - 박스로 윤곽을 잡고
  - 박스하단 가로줄을 기준으로 역 아치를 만든다.
    - Carve로 양끝 평평한 부분이랑 아치 구역을 나누고. 아치 부분은 resample 후 wrangle로 ramp를 섞어 아치를 만듬
  - Poly Path로 둘러싼 부분에 면을 만들어주고 박스 영역만큼 양옆에 맞춰 서로 이어줘서(skin) 덩어리로 만듬.
- 상단 부분에 난간을 만듬
  - 상단 면에 Poly Frame (tangent : N)으로 Peak하여 안으로 들어가게 하여 난간 영역을 구함
  - 난간 둘래의 선과 양끝 난간 지지대를 Poly Bevel (Point)하여 부드럽게 이어주고 Sweep (Round Tube)로 파이프 모양을 만듬.



### 

- Group
  - Group Name : gr_top  // 상단면
  - Keep by Normals
    - Direction: 0/1/0
    - Spread Angle : 45

- Boolean으로 교차하는 부분 제거
  - 상단 패널 A // 삭제 오브젝트 B
  - Set A
    - Treat As : Surface
  - Set B
    - Treat As : Solid
  - Operation : Subtract
  - A-B Seams : abseams
  - Boolean에서 Surface - Solid로 하면 선이 자르는 효과
    - <https://www.sidefx.com/docs/houdini/nodes/sop/boolean.html#schematic-views>
- Group
  - Group Name : gr_bounds
  - Group Type: Edge
  - Include by Edges
    - Unshared Edges : 체크
- Group Combine
  - Group Name : gr_bounds Equals gr_bounds
  - Subtraction With abseams
- Resample을 이용해서 포인터 정렬
  - Resample By Polygon Edge
- Wrangle(primitives)로 닫혔는지 아닌지 확인
  - i@its_closed = primintrinsic(0, "closed", @primnum);
  - intrinsic: 내장 데이터
- switch-if로 close 여부에만
  - 끝점만 잡아서 바닥 점을 만들어주고 id를 -1과 1000으로 해서 sort로 정렬
  - Add로 라인을 다시 그려주고

- Poly Bevel하면 연결부위에 포인트가 추가되어 포인트 번호의 정렬이 필요한데
  - Distance Among Geometry
    - Start Points : 0
    - Output Attribute : dist
  - Sort
    - Point Sort : By Attribute
    - Attribute : dist

- Sweep으로 파이프 라인 만들기 전 N/up 셋팅
  - Orient Among Curve
    - Target Up Vector : Y Axis
- Sweep으로 UVs and Attribute - Compute UVs를 만들어 주면 uv가 세로로 되는데
- UV Transform으로 가로로 정렬
  - Translate.x: 1
  - Rotate.z: 90


- switch-if
  - 첫번째 입력은 사용자 입력, 두번째는 테스트
  - Test Type : Element Count
  - Is : Less than
  - Value : 1