# VAT



|     |                                 |
| --- | ------------------------------- |
| VAT | Vertex Animation Texture        |
| ROP | Render OPerator(for a Houdini ) |

C:/Program Files/Side Effects Software/sidefx_packages/SideFXLabs19.5/otls/SideFX_Labs.hda

| unity .meta                              | guid                             |
| ---------------------------------------- | -------------------------------- |
| VAT_RigidBodyDynamics.shadergraph.meta   | 085ef3ec3a5a70d4790c0957d30c9f63 |
| VAT_ParticleSprites.shadergraph.meta     | 8bf13a6837d559049924774e12033384 |
| VAT_DynamicRemeshing.shadergraph.meta    | 19b419010e1004644affea18d0fc8dff |
| VAT_SoftBodyDeformation.shadergraph.meta | 987a09a96b5f17d46a88a7c429d130d2 |

``` txt
// SideFX_Labs.hda

parm {
    name    "mat_unity_soft"
    label   "Unity Soft Material"
    type    string
    invisible
    default {}
}
parm {
    name    "mat_unity_rigid"
    label   "Unity Rigid Material"
    type    string
    invisible
    default { }
}
parm {
    name    "mat_unity_fluid"
    label   "Unity Fluid Material"
    type    string
    invisible
    default { }
}
parm {
    name    "mat_unity_sprite"
    label   "Unity Sprite Material"
    type    string
    invisible
    default { }
}
```

``` json
// https://github.com/sideeffects/SideFXLabs/blob/Development/unity/shaders/URP_VAT3/package.json

"com.sidefx.vat": "https://github.com/sideeffects/SideFXLabs.git?path=unity/shaders/URP_VAT3#Development"
```

|        |                     | 그대로    | 변함                 | ex                |
| ------ | ------------------- | --------- | -------------------- | ----------------- |
| Soft   | Constant Topology   | 정점 갯수 | 위치                 | 캐릭터 애니메이션 |
| Rigid  | Rigid Body Topology | 메쉬 형태 | 메쉬 위치            | 파괴              |
| Fluid  | Changing Topology   |           | 정점 위치, 정점 갯수 | 유체              |
| Sprite | Camera Facing Cards |           |                      | 파티클            |


|                                           |          |
| ----------------------------------------- | -------- |
| [Project]/meshes/[Component]_mesh.fbx     | mesh     |
| [Project]/textures/[Component]_pos.exr    | position |
| [Project]/textures/[Component]_norm.exr   | normal   |
| [Project]/textures/[Component]_rot.exr    | rotation |
| [Project]/textures/[Component]_col.exr    | color    |
| [Project]/materials/[Component]_data.json |          |


| Mesh Settings          | Turn every toggle off.                           |
| ---------------------- | ------------------------------------------------ |
| Preserve Hierarchy     | On                                               |
| Sort Hierarchy By Name | On                                               |
| Mesh Compression       | Off                                              |
| Optimize Mesh          | Nothing                                          |
| Index Format           | Auto                                             |
| Normals                | Import                                           |
| Normals Mode           | Area And Angle Weighted                          |
| Smoothness Source      | Prefer Smoothing Groups (or whatever you prefer) |
| Smoothing Angle        | 60 (or whatever you prefer)                      |
| Tangents               | Import                                           |

| Texture Settings | Turn every toggle off. |
| ---------------- | ---------------------- |
| Texture Type     | Default.               |
| Texture Shape    | 2D.                    |
| Alpha Source     | Input Texture Alpha.   |
| Non-Power of 2   | None.                  |
| Wrap Mode        | Repeat.                |
| Filter Mode      | Point (no filter).     |


| Override         | For Windows, Mac, Linux: On.                        |
| ---------------- | --------------------------------------------------- |
| Max Size         | 8192                                                |
| Resize Algorithm | Mitchell.                                           |
| Format           | RGBA Half (16 bit per channel; HDR or even Non-HDR) |
|                  | RGBA 32 bit (8 bit per channel; Non-HDR).           |

## Rigidbody

``` node
Geo
    Sphere
    RDB Material Fracture
    UV Unwrap
    Assemble
    RBD Bullet Solver
    - Transfer Attributes: orient pivot P
    - Transfer to Geometry: checked ???
    - Transfer to Proxy Geometry: unchecked ???

Out
Mode/Target Engine: Rigid-Body Dynamics(Rigid) / Unity
Settings
    Edge Case Handling
        Input Geometry Is Cached to Integer Frames: checked
        Texture Format: HDR(EXR/TIFF as RGBA 16/32 in Engine)
```



## REF

- <https://qiita.com/yasuhiro0122/items/1222b61549891af6c2f4>
- <https://medium.com/tech-at-wildlife-studios/texture-animation-techniques-1daecb316657>