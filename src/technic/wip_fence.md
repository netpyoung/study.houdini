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


