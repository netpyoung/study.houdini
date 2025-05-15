# Vex

### 자잘한 팁

- switch같은곳은 작아서 Ctrl+E로 확대해서 편집하자
- if(a==b, 1, 2) 같은 식으로 넣을 수 도 있음.

### Ramp이용한 프로파일

1번 오리지날

```vex
int point_arr[];

float profile = chramp("profile", 1);
int pointCount = chi("./profile");

for (int i = 1; i <= pointCount; ++i)
{
    float p_pos = ch("./profile" + itoa(i) + "pos");
    float p_val = ch("./profile" + itoa(i) + "value");
    int new_point = addpoint(0, set(p_pos, p_val, 0));
    append(point_arr, new_point);
}

addprim(0, "polyline", point_arr);
```

2번 - 간편

``` vex
// 간편한 버전 Line - Resample 후
float perc = (float)@ptnum / (@numpt - 1);
float ramp = chramp("ramp", perc);
@P.y = y;
```

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


### find_reveresed_prims

``` vex
vector nrm = primuv(0, "N", @primnum, {0.5,0.5,0});
if(nrm.y < 0)
{
    i@group_reverse = 1;
}
```

### 0 ~ 1 구간 반복

``` vex
float y = abs((x % 2) - 1);
```

### 엇갈려서 선을 이을때

``` vex
//아니면 그냥 Connect Adjacent Pieces도 고려해볼것

vector p1_arr[];
for(int i = 0; i < npoints(0); i++)
{
    vector p1 = point(1, "P", i);
    append(p1_arr, p1);
}

for (int i = 0; i < npoints(0); ++i)
{
    int idx = i + 1;
    if (idx == npoints(0))
    {
        idx = 0;
    }

    vector p1 = p1_arr[idx];
    int newpt = addpoint(0, p1);
    addprim(0, "polyline", i, newpt);
}

return;

// 역방향일 경우
// - 위 vex에서 1번을 sort노드로 shift의 offset을 -1로
// - 아래 vex를 사용
for (int i = 0; i < npoints(0); ++i)
{
    int idx = i - 1;
    if (idx < -1)
    {
        idx = npoints(0) - 1;
    }

    vector p1 = p1_arr[idx];
    int newpt = addpoint(0, p1);
    addprim(0, "polyline", i, newpt);
}
```