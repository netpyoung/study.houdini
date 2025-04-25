## 펜스

- Curve
- Transform
  - y: bbox("../IN_COLLISION/", D_YMAX)
- Resample
- Ray
  - 두번째 인풋 IN_COLLISION
- Resample
- Orientation along Curve
  - Computes orientations (frames) along curves.
  - https://www.sidefx.com/docs/houdini/nodes/sop/orientalongcurve.html
  - Tangent Type : Previous Edge
  - Target Up Vector : Y Axis
- Split
  - Group : 0
  - Group Type : Point
  - 0번 포인트를 잘라내서 잘나낸 부분은 기둥.
  - 나머지는 펜스부분으로 해둔다.
- 점을 얻었으니 Copy To Point로 설정 후 머지.



Labs Mesh Sharpen
Labs Edge Damage
Labs Edge Smooth
Labs Triplanar Displace

- 삐뚤삐뚤
  - Attribute Noise로 Cd를 확인하고 그다음 pscale로 변경
    - Poly Bevel시 Offsetting에서 Scale By Attribute로 pscale 사용.


- 나이태
  - Remesh Grid로 잘게 쪼개주고
  - Point VOP
    - Vein과 Displace Along Normal로 나이테에 따른 높이조절
    - 정사각형같은 건 Cylinder. 판자같은건 Linear로 함
