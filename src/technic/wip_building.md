건물 옥상에 구조물 넣을시

- lot subdivision 으로 영역을 나누고
  - cluster lots
- facet
  - Remove Inline Points
- Primitive Wrangle로 포인트 갯수가 4개인 것만 얻어오고
  ``` vex
  i[]@pts = primpoints(0, @primnum);
  if (len(@pts) != 4)
  {
      removeprim(0, @primnum, 1);
  }
  ```
- primitive wrangle 퍼센티지 만큼 살리고
  ``` vex
  float seed = chf("seed");
  float perc = chf("perc");
  float randval = rand(@primnum, seed);
  if (randval > perc)
  {
      removeprim(0, @primnum, 1);
  }
  ```
- primitive wrangle로
  ``` vex
  i[]@pts = sort(primpoints(0, @primnum));

  vector pos[];
  for (int i = 0; i < len(@pts); ++i)
  {
      pos[i] = point(0, "P", @pts[i]);
  }
  
  i[]@con_pts = sort(neighbours(0, @pts[0]));
  vector top_pt_pos = point(0, "P", @con_pts[1]);
  
  f@width = distance(pos[0], pos[1]);
  f@height = distance(pos[0], top_pt_pos);
  
  f@min_size = min(f@width, f@height);
  v@scale = set(f@min_size);
  
  int pt = addpoint(0, @P);
  removeprim(0, @primnum, 1);

  setpointattrib(0, "scale", pt, v@scale, "set");
  setpointattrib(0, "N", pt, v@N, "set");
  ```

방향은

- facet 으로 외각선을 따주고
- convert line
- measure 로 perimeter를 구하고
- sort
  - primitive sort: by attribute
  - Attribute: perimeter
  - Reverse Primitive Sort
- blast 로 0번만 남기면 가장 긴것
- Poly Frame
  - Tangent: N 으로 방향 설정

그 다음 Point wrangle로 넘겨주고 v@N = point(1, "N", 0); box랑 Copy to point