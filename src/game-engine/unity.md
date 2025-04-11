# Unity

- sidefx
  - https://github.com/sideeffects/HoudiniEngineForUnity
    - https://www.sidefx.com/docs/houdini/unity/pluginapi.html
    - https://github.com/sideeffects/HoudiniEngineForUnity/tree/Houdini20.5/Plugins/HoudiniEngineUnity/Scripts/Examples
    - [Procedural Race Tracks for Mobile Games | Stoyan Dimitrov | GDC 2019](https://youtu.be/1qjRWmqbzp8&t=578)
  - <https://www.sidefx.com/tutorials/unity-starter-kit/>
    - <https://www.sidefx.com/contentlibrary/unity-starter-kit/>
  - <https://www.sidefx.com/learn/unity/>
    - <https://www.sidefx.com/docs/unity/>


- 유니티 엔진에서 후디니 엔진과 통신하는 것이므로 에디트모드일때만 동작한다.




- https://www.sidefx.com/docs/houdini/unity/attributes.html
- https://www.sidefx.com/docs/houdini/unity/meshes.html
- https://www.sidefx.com/docs/houdini/unity/instancing.html


## 

| attr           |                                                       |
| -------------- | ----------------------------------------------------- |
| unity_instance | point찍고 attr에 프리팝 경로 입력하면 알아서 생성해줌 |
unity_material

collision_geo Adds a non-convex, non-rendered mesh collider
rendered_collision_geo Adds a non-convex, rendered mesh collider


lod
- https://www.sidefx.com/docs/houdini/unity/meshes/lod.html

lod_screensize


https://www.sidefx.com/docs/houdini/unity/terrain/scattering.html

https://docs.unity3d.com/ScriptReference/TerrainData.html
  The TerrainData class stores heightmaps, detail mesh positions, tree instances, and terrain texture alpha maps.
  The Terrain component links to the terrain data and renders it.
- treeInstances
- treePrototypes

https://docs.unity3d.com/ScriptReference/TreeInstance.html
  Contains information about a tree placed in the Terrain game object.
  This struct can be accessed from the TerrainData Object.
	Description
- color
- heightScale
- lightmapColor
- position
- prototypeIndex
- rotation
- widthScale

https://docs.unity3d.com/ScriptReference/TreePrototype.html
  Simple class that contains a pointer to a tree prototype.
  This class is used by the TerrainData gameObject.
- bendFactor
- navMeshLod
- prefab

s@unity_hf_tree_prototype0
s@unity_hf_tree_prototype1
s@unity_hf_tree_prototype2

s@unity_hf_layer_type = "detail";

s@unity_hf_detail_prototype_texture = "Assets/Race_Track_Tools/Art/Textures/Grass/grass_clump_001.png";
f@unity_hf_detail_prototype_maxheight = 3;
f@unity_hf_detail_prototype_maxwidth = 3;
f@unity_hf_detail_prototype_minheight = 1;
f@unity_hf_detail_prototype_minwidth = 1;

f@unity_hf_detail_prototype_bendfactor = 50;
i@unity_hf_detail_prototype_rendermode = 0;


i@unity_hf_detail_distance = 200;
f@unity_hf_detail_density = 1;
i@unity_hf_detail_resolution_patch = 128;

## 체크리스트

- 인스턴스
  - unity_instance
- 머티리얼
  - unity_material
- 컬리전
  - collision_geo
  - rendered_collision_geo
- LOD
  - lod_0
  - lod_screensize
- 식생같은 경우
  - unity_hf_tree_prototype1