# HDA

- HDA
  - `H`oudini `D`igital `A`ssets

- OTL
  - `O`perator `T`ype `L`ibrary
  - https://www.sidefx.com/docs/hdk/_h_d_k__h_d_a_intro.html
  - OTL은 여러 HDA를 포함할 수 있고, 스크립트 연산자와 같은 다른 연산자 정의도 저장할 수 있다
  - https://www.andynicholas.com/post/hdas-or-otls


|           |                                                                      |
| --------- | -------------------------------------------------------------------- |
| 저장      | 노드 우클릭 > Save Node Type 혹은 Assets > Save Asset > 해당 에셋    |
| 락 풀기   | Allow Editing of Contents                                            |
| 락 걸기   | Match Current Definition (주의 Revert와 같은거. Save Node Type 필수) |
| 속성 편집 | Type Properties                                                      |


File > Import > Houdini Digital Asset...

- Transform.scale을 드래그해서 Edit Parameter Interface에 넣기
  - Subnetnetwork는 추가 가능
  - Null CONTROL에 넣으려고 하면 Node is outside subnet 라고 창이 뜨면서 추가가 안됨.
    - 파라미터 추가 창에서 Forbid Linking Parameters from Outside this Subnet 을 체크 해제하면 추가 할 수 있음.
  - HDA는 에는 사용 가능한것처럼 보이나 Type Properties 수정시 날라감.


- 파라미터 필드 추가 단축키
  - alt + 마우스 중간 쿨릭

Type Property - Copy Default From Node 현재 노드에 셋팅된걸 디폴트로

- [Introduction to HDA (Houdini Digital Asset) in Unreal Engine UE4 & Houdini for Beginners](https://www.youtube.com/watch?v=eS1Zob0NWbY)
- [Foundation Module - All Lecture Series](https://www.youtube.com/playlist?list=PLd959VTYXCB551P4atiY52iA14JyLsaI7)
  - [HOUDINI 101 - 09 - Digital Assets & Unreal](https://www.youtube.com/watch?v=xz3Vvy5X58U)
  - <https://ehoudiniacademy.com/foundation/>