# Vex

### 자잘한 팁

- switch같은곳은 작아서 Ctrl+E로 확대해서 편집하자
- if(a==b, 1, 2) 같은 식으로 넣을 수 도 있음.


### 현재 노드 이름

``` vex
string current_node_name = split(opfullpath("."), "/")[-1]; // $OS
```

### 라인에서 사이 각 구하기

``` vex
int ptnum_prev;
int ptnum_next;

int ptnum_last = npoints(0) - 1;
if (@ptnum  == 0)
{
    ptnum_prev = ptnum_last;
    ptnum_next = 1;
}
else if (@ptnum == ptnum_last)
{
    ptnum_prev = ptnum_last - 1;
    ptnum_next = 0;
}
else
{
    ptnum_prev = @ptnum - 1;
    ptnum_next = @ptnum + 1;
}


vector pos_prev = point(0, "P", ptnum_prev);
vector pos_next = point(0, "P", ptnum_next);

vector dir_prev = normalize(@P - pos_prev);
vector dir_next = normalize(@P - pos_next);

float angle = degrees(acros(dot(dir_prev, dir_next)));
```

### 라인 방향 설정

``` vex
// 일단 PolyFrame사용해서 Tangent:N 설정해주고,
// Wrangle(poitn)후 Visualize의 Marker&Vector로 right은 빨강, up은 초록

vector dir = @N;
dir.y = 0;
dir = normalize(dir);
v@right = cross(dir, {0, 1, 0});
v@up = cross(v@right, @N);
```