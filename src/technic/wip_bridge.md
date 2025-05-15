``` vex
// 대각선 선귿기
// 다리 받치는 기둥 좌우 각각 loop

int numpt_curr = npoints(1); // 현재 기둥
int numpt_next = npoints(2); // 다음 기둥

int numpt_loop;
int shift_curr;
int shift_next;

if (numpt_curr < numpt_next)
{
    numpt_loop = numpt_curr;
    shift_curr = 0;
    shift_next = 1;
}
else if (numpt_curr == numpt_next)
{
    numpt_loop = numpt_curr - 1;
    shift_curr = 1;
    shift_next = 0;    
}
else
{
    numpt_loop = numpt_next;
    shift_curr = 1;
    shift_next = 0;    
}

for (int i = 0; i < numpt_loop; ++i)
{
    vector p_curr = point(1, "P", i + shift_curr);
    vector p_next = point(2, "P", i + shift_next);

    vector n_curr = point(1, "N", i + shift_curr);
    vector n_next = point(2, "N", i + shift_next);
    
    int ptnum_curr = addpoint(0, p_curr);
    int ptnum_next = addpoint(0, p_next);
    
    setpointattrib(0, "N", ptnum_curr, n_curr, "set");
    setpointattrib(0, "N", ptnum_next, n_next, "set");

    addprim(0, "polyline", ptnum_curr, ptnum_next);
}
```

y축으로 정렬하고 아래부분인 0의 노말을 위로 향하게해서, horiz beam의 thickness만큼 이동.


그리드에 노말(포인트)주고 copy to point에서 볼트 체결




- diff 색칠하기
  - 0: origin
  - 1: ray

```
vector p0 = point(0, "P", @ptnum);
vector p1 = point(1, "P", @ptnum);

float diff = p0.y - p1.y;

@diff = diff;

vector c = set(diff, -diff, 0);

setpointattrib(0, "Cd", @ptnum, c);
```


- 연결선

``` vex
// ref: 3dbuzz - Houdini bridge contest - Houdini Bridge lesson09 cables 3 (10/13)
//     - https://www.youtube.com/watch?v=qIow2RgooII
// 현수교 같은곳에서 쓰면 됨.(양 끝점을 제어할 수 있음.)
// - line을 길게해서 놔두고 resample해서 사용.

float height = chf("height");
float valA = chf("valA");
float valB = chf("valB");
float arcVal = chf("arcVal");

float perc = @ptnum / (@numpt - 1.0f);

float x = valA * (1 - perc);
float y = valB * perc;
float z = -arcVal * (1 - perc) * perc;
float offsetPerc = x + y + z;

vector p = @P;
p.y = offsetPerc  * height;
@P = p;
```

``` vex
// 전기선처럼 간편하게 사용할때.
// - 점 0 1 2로 이루어진 선에서 Group 1로 해서 1번 점만 내린다
// - 후에 Resample - Subdivision Curves로하면 글럴싸해짐

float seed1 = chf("seed");
float seed2 = chf("seed"); // detail(1, "iteration",0);
float min = chf("min");
float max = chf("max");
float amount = chf("amount");

float rand = rand(seed1, seed2);
float fit = fit01(rand, min, max);

@P.y -= (amount + fit);
```