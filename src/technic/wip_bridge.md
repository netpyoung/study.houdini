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

