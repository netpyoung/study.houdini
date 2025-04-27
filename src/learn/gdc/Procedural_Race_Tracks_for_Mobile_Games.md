
- [Procedural Race Tracks for Mobile Games | Stoyan Dimitrov | GDC 2019](https://www.youtube.com/watch?v=1qjRWmqbzp8)

- Spline Point View
  - ID
  - Intervals
  - Next Main
  - Bezier Forward
  - Bezier Backward
  - Track Prefab Setting
  - Fall Off Right
  - Fall Off left
  - Fall Off On Track
  - Fall Off Recover Behavior : Spawn Here
  - Road Left
  - Road Right
  - Kerb Left
  - Kerb Right
  - Kerb Apex In
  - Kerb Apex Out
  - Offroad Left
  - Offroad Right
  - Wall Left
  - Wall Right
  - Road Index
  - Kerb Left Index
  - Kerb Right Index
  - Offroad Left Index
  - Offroad Right Index
  - Wall Left Index
  - Wall Right Index
  - Perilin Noise
  - Road Crown
  - Distance Around Spline
  - Delete 버튼
  - Break 버튼
  - Insert 버튼
  - Auto - mid Rotation
  - Auto - Distance Rotation
  - Auto - Angle Rotation
- Spline Point Side Dressing
  - Dressing
  - Duplicate On Next Node
  - Lock Random Seed


스플라인 포인트 이동
로드 양옆
오프로드 양옆
연석


벽의 서브디바이드 잘 안된점
트랙의 두점이 가까이 있을시 squashing 이슈 mesh/uv 절차적 생성


``` vex
// Middle                 Road                    Off-Road
//   |                     |                         |
//   * <- road distance -> * <- off-road distance -> *


for (int i = 0; i <= npoints(0; ++i)
{
    vector pos_curr = attrib(0, "point", "P", i);
    vector pos_road = attrib(1, "point", "P", i);
    vector pos_offr = attrib(2, "point", "P", i);

    float dist_road = length(pos_curr - pos_road);
    float dist_offr = length(pos_road - pos_offr);

    setattrib(0, "point", "road_left", i, 0, dist_road, "set");
    setattrib(0, "point", "offr_left", i, 0, dist_offr, "set");

    float fall = attrib(2, "point", "falloff_middle", i);
    setattrib(0, "point", "falloff_left", i, 0, fall, "set");
}
```


- TrackHoudiniConverter.cs
  - SplineMap
  - Material: Track
  - Material: Offroad
  - Material: Sharp Corner
  - Material: Decal
  - Cap: Wall-Default
  - Cap: Wall-Corner
  - Cap: Sharp-Corner
  - Cap: Road
  - Bake Prefab 버튼
  - Recook Track 버튼
  - 머티리얼을 슬롯에 넣으면 머티리얼 경로가 후디니로 전달
  - 프리팹을 슬롯에 넣으면 후디니 설정


Material mat;
string parameter;
string materialAssetPath = AssetDatabase.GetAssetPath(mat);
HEU_ParameterUtility.SetString(houdiniAsset, parameter, materialAssetPath);

GameObject goTrackMiddle = GeneratePointCloudMesh("TrackMiddle", vertices, colors);
SetHoudiniInputNode(houdiniAsset, "param_road_middle", goTrackMiddle);


---

check - Generate Offroad
check - Generate Middle Marking
check - Generate Lightmap UVs
check - Generate Collider
check - Optimize Curve
Road Subdivision Length
Marking Vertical Offset
Angle Tolerance
Road Tiling
Size Adjustment
 - Middle Marking Width
 - Side Marking Width
 - Side Marking Offset
 - Apex Width

---

벽만들때 양끝과 중간을 만들고 교환만으로 바리에이션


트랙일부 제거(점프를 위해) Drop off라 불렀음. 제거면 다듬기

The apex is the innermost point of the line taken through a curve
apex :  정점, 꼭대기. 최고조, 절정, 극치.

여기서는 apex는 연석비슷한 색깔을 지닌 안쪽코스

---

- SplineMapView
  - SplinePointView ...
- TrackView
  - Start Node
  - End Node
  - SplineMap
  - Track Graphic Root
  - Props Graphic Root - HandPlaced-prefab
  - Track Interval
  - Use Track Piece Length
  - Generate Lightmap UVs
  - Generate Light Probes
  - Combine Mesh
  - Combine Chunks
  - Track Piece Fwd Intervals
  - Track Piece Side Intervals
  - Track Prefab Settings
  - Grow Size
  - Bank Angle
  - Bank Min Limit
  - Bank Max Limit


후디니를 잘 몰라서 두달정도 걸렸다고하네

``` vex
int taperAmount = 3;
int pts[] = primpoints(0, @primnum);
int fstpts[] = pts[0:taperAmount];
int lstpts[] = pts[-taperAmount:];

foreach (int pt; pts)
{
    setattrib(0, "point", "pscale", pt, 0, 0.9, "set");
}

float scaleAmount = 0.01;
foreach (int pt; pts)
{
    setattrib(0, "point", "pscale", pt, 0, scaleAmount, "set");
    scaleAmount += 1 / (float)taperAmount;
}

scaleAmount = 1 - (1 / (float)taperAmount);
foreach (int pt; pts)
{
    setattrib(0, "point", "pscale", pt, 0, scaleAmount, "set");
    scaleAmount -= 1 / (float)taperAmount;
}
```


데칼
- Boolean
  - A Solid - box
  - B Surface - 데칼이 접할 표면
  - Operation : Union
- Peak
- UV Project


Road UVs
Line - Convert To Nurb - UV Texture - arc length  - Convert Polygon - Sweep


Lightmap UVs
3미터씩 자르고
Group By Range
Poly Cut
UV 는 UV Flatten


Turn Detection
곡률에 따라 연석, 전광판

- <https://80.lv/articles/using-houdini-for-large-terrains-006sdf/>
  - 여기서는 안쪽에서 바깥쪽으로 레이를 쏘면서 매쉬컬라이더 생성하는 부분이 흥미로움
