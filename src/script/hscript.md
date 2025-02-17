
|     |               |
| --- | ------------- |
| $N  | 'npoints(0)-1 |


$HIP
$JOB
$HIPNAME
$HH

$F
$SF
$FF
$FPS
$T

## Expression

``` vex
$BBX = relbbox(@P).x
$BBY = relbbox(@P).y
$BBZ = relbbox(@P).z
```

| Expression Local Variables                 |                                  |
| ------------------------------------------ | -------------------------------- |
| $PT                                        | 포인트 번호                      |
| $PR                                        | 프리미티브 번호                  |
| $CY                                        | 현재 사본 번호                   |
| $TX   , $TY   , $TZ                        | 트랜스폼                         |
| $TX2  , $TY2  , $TZ2                       | 두번째 입력에서 오는 포인트 위치 |
| $NX   , $NY   , $NZ                        | 노말                             |
| $CR   , $CG   , $CB   , $CA                | 칼라                             |
| $VX   , $VY   , $VZ                        | 벨로시티                         |
| $BBX  , $BBY  , $BBZ                       | 바운딩 박스 내 점 위치（0 ~ 1）  |
| $CEX  , $CEY  , $CEZ                       | 기하학의 중심                    |
| $AGE                                       | 파티클 수명(초)                  |
| $LIFE                                      | 파티클 수명(0 ~ 1)               |
| $XMIN , $XMAX , $YMIN  , $YMAX,$ZMIN,$ZMAX | 경계 범위                        |
| $SIZEX, $SIZEY, $SIZEZ                     | 경계 크기                        |


- box 바닦붙이기
  - box의 translate.y = $SIZEY/2
  - 혹은 center.y = ch("sizey")/2