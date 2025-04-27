
## PROJECT GROT | PROCEDURAL RUINS

- [Project GROT | Procedural Ruins](https://www.youtube.com/playlist?list=PLXNFA1EysfYkt23cgF7dKysTu7lLyNZBe)
  - <https://www.artstation.com/julianbragagna>
  - <https://www.artstation.com/blogs/julianbragagna/y1rA9/procedural-flesh-and-ruins-in-sidefxs-project-grot>

마스크 생성

- 모양을 잡고
- Remesh후
- Attribute Paint
  - Attribute:  Cd - Color
- Point Wrangle
  - @mask = 1 - @Cd

 내부 둥굴한 깨짐

- scatter에서 density는 mask로
- blast - @mask<0.3
- sphere로해서 copy to point 후
- Mountain
- remeshgrid
- Boolean (subtract)


 외부 깨짐부분

- Boolean (intersect)
- 후에 voronoifracture을 할껀데 그냥하면 파편이 작아보임
- 그래서 Transform
  - scale.y : 3배
- isooffset
- scatter
- voronoifracture
- Transform
  - scale.y : 1/3배
- rbdcluster로 적당히 조각내고
  - [Learn the Basics of RBD Clusters in Houdini!](https://www.youtube.com/watch?v=3ld1RK5DEo8)
- 마스크 조정하고
- 동영상에는 Edge Damage노드로 둥글게 마감했음
- 근데 첨부파일에서는 rbdinteriordetail로 폴리곤이 이빨빠진거 있으면 보간으로 마무리
  - [Interior Detail & Noise Displacement using RBD Tools in Houdini](https://www.youtube.com/watch?v=FOGrNuBGnz8)

flesh 부분은 패스 flesh - 피와 살이 엉켜 붙은 듯한 유기적인 재질.
 
