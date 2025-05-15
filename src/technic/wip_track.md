[Procedural Modelling | Houdini Tutorial](https://youtu.be/fdG0ZD8lDS4)

- 파라미터로 뺄 노드들은 따로 색칠해두었다.
- Null노드
  - In은 초록
  - Out은 빨강

- 외곽선
  - line -> point wrangle (i@id = i@ptnum;)으로 id를 할당하고
  - 추후 Add - Polygon - By Group > By Attribute > id로 외곽선을 딸 준비
  - Ends - Close U (Unroll with New Points)로 외곽선을 딴다
  - Fuse로 혹시나 겹치는 포인트 방지
  - assemble로 curve 그룹 생성
    - 0은 외곽, 1은 안쪽

Shift + L로 노드 레이아웃





---

- 간단한 레이아웃
  - curve
  - intersectionstitch
  - polyexpand2d
  - hole
  - polybevel

- 경사연석
  - poly extrude 2번째 인자에 경사 line넣어서.


---

- Heightfield 조절하기
  - ref: [Integrating a Road into a Heightfield – Houdini Tutorial](https://www.youtube.com/watch?v=hWGCs4MLGqQ)
    - [Projecting a Road Curve onto a Heightfield](https://procegen.konstantinmagnus.de/projecting-a-road-curve-onto-a-heightfield)

``` vex
// point wrangle

float lift = chf('lift');

f@height = volumesample(1, 'height', v@P) + lift;
```

- Attr Blur
  - height

``` vex
// volume wrangle

float width_min = chf('min_width');
float width_max = chf('max_width');
float ease = chf('roll_off');

int prim;
vector uvw;
float dist_crv = xyzdist(1, v@P, prim, uvw);
float height_crv = primuv(1, 'height', prim, uvw);
float mask = 1.0 - smooth(width_min, width_max, dist_crv, ease);

f@height = lerp(f@height, height_crv, mask);
f@mask = mask;
```



```