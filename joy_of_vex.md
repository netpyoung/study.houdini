
https://www.tokeru.com/cgwiki/JoyOfVex.html




[Houdini Hangout - The Joy of VEX](https://www.youtube.com/playlist?list=PLTXmnikJEYnBtSfn4LwKx5vpopwrInp18)
[TWA 후디니의 정석 - JOY_OF_VEX(한국어.ver)](https://www.youtube.com/playlist?list=PLcg9CGPYCmygYPz1dYyyShhoUYRLz_MIz)



- [JoyOfVex01](https://www.tokeru.com/cgwiki/JoyOfVex01.html) basic assignment, component assignment, arithmetic manipulation
- [JoyOfVex02](https://www.tokeru.com/cgwiki/JoyOfVex02.html) length and distance functions, animate with @Time
- [JoyOfVex03](https://www.tokeru.com/cgwiki/JoyOfVex03.html) clamp and fit, waves
- [JoyOfVex04](https://www.tokeru.com/cgwiki/JoyOfVex04.html) chramp, using on attrib components, on time, on reranging outputs
- [JoyOfVex05](https://www.tokeru.com/cgwiki/JoyOfVex05.html) modulo, more arithmetic tricks (quantising), but show that often a chramp is easier (eg stepped chramp);
- [JoyOfVex06](https://www.tokeru.com/cgwiki/JoyOfVex06.html) point wrangle vs prim wrangle vs detail wrangle, user defined attributes
- [JoyOfVex07](https://www.tokeru.com/cgwiki/JoyOfVex07.html) using the other inputs on wrangles, do things to geometry based on other geometry
- [JoyOfVex08](https://www.tokeru.com/cgwiki/JoyOfVex08.html) noise, various types, how it can be scaled, vector vs scalar noise, why you might use vops here instead
- [JoyOfVex09](https://www.tokeru.com/cgwiki/JoyOfVex09.html) dot and cross product, fake lighting combing normals to a surface, vector maths primer
- [JoyOfVex10](https://www.tokeru.com/cgwiki/JoyOfVex10.html) relpointbbox
- [JoyOfVex11](https://www.tokeru.com/cgwiki/JoyOfVex11.html) if statements
- [JoyOfVex12](https://www.tokeru.com/cgwiki/JoyOfVex12.html) nearpoints, arrays
- [JoyOfVex13](https://www.tokeru.com/cgwiki/JoyOfVex13.html) for loops (ties nicely into arrays)
- [JoyOfVex14](https://www.tokeru.com/cgwiki/JoyOfVex14.html) creating geometry, deleting geometry, debugging vex
- [JoyOfVex15](https://www.tokeru.com/cgwiki/JoyOfVex15.html) copy sop, simple instance attributes (pscale)
- [JoyOfVex16](https://www.tokeru.com/cgwiki/JoyOfVex16.html) copy sop, midweight instance attributes (scale, N)
- [JoyOfVex17](https://www.tokeru.com/cgwiki/JoyOfVex17.html) copy sop, orient, quaternions
- [JoyOfVex18](https://www.tokeru.com/cgwiki/JoyOfVex18.html) intrinsics
- [JoyOfVex19](https://www.tokeru.com/cgwiki/JoyOfVex19.html) primuv, xyzdist
- [JoyOfVex20](https://www.tokeru.com/cgwiki/JoyOfVex20.html) pointclouds, further learning



01

- Attribute Wrangle
  - Runs a VEX snippet to modify attribute values.
  - Wrangle : 다루다


- 색상
  - @Cd
- 노말
  - @N
- 해당 포인트 번호
  - @ptnum 
- 포인트 총 갯수
  - @numpt 
- 채널
  - ch('scale')
- 함수
  - 사인 : sin

@Cd = @N;
@Cd = @P;
@Cd = @ptnum/@numpt;
@Cd = float(@ptnum) / ch('scale');
@Cd = sin(@ptnum);

- 연습
  - Sin waves on z? on y?
  - cos waves? (wont look hugely different, cos is just sin shifted by 1/4 of a wave)
  - waves bases on @N components?
  - tight sine waves on red, medium cos on blue, a wide ramp on green, each driven by a different thing (position vs normal vs point number)


https://www.sidefx.com/docs/houdini/hom/hou/Geometry.html
https://www.sidefx.com/docs/houdini/hom/hou/Point.html
https://docs.python.org/3.13/library/math.html

https://www.sidefx.com/docs/houdini/hom/hou/index.html#parmtemplates_group


``` python

node = hou.pwd()
geo = node.geometry()

if not geo.findPointAttrib("Cd"):
    geo.addAttrib(hou.attribType.Point, "Cd", (1.0, 1.0, 1.0))
if not geo.findPointAttrib("N"):
    geo.addAttrib(hou.attribType.Point, "N", (0.0, 1.0, 0.0))

points = geo.points()

numpt = len(geo.points())                # @numpt
numpt = geo.intrinsicValue("pointcount") # @numpt

for point in points:
    P     = point.position()       # @P
    ptnum = point.number()         # @ptnum
    N     = point.attribValue("N") # @N

    point.setAttribValue("Cd", P)
```

``` python
import math

radian = 1.0
sin_value = math.sin(radian)
```

``` python
def AddParameters():
    parameters = [
        # hou.FloatParmTemplate(name, label, num_components, ...)
        hou.FloatParmTemplate("scale", "scale", 1, default_value=(1.0,), min=0.0, max=10.0),
    ]

    node = hou.pwd()
    parm_template_group = node.parmTemplateGroup()
    for param in parameters:
        param_name = param.name()
        if not node.parm(param_name):
            parm_template_group.append(param)
    node.setParmTemplateGroup(parm_template_group)
```

## 2

length(@P) == distance(@P, {0, 0, 0})

chf hou.FloatParmTemplate("scale", "scale", 1, default_value=(1.0,         ), min=0.0, max=10.0),
chv hou.FloatParmTemplate("scale", "scale", 3, default_value=(1.0, 1.0, 1.0), min=0.0, max=10.0),


fit(v, in_min, in_max, out_min, out_max);


@Time : Float time ($T)                                             |


- Exercises
  - Change the direction the waves move from towards the center to away from the center
  - Change the speed of the waves
  - Make the waves be blue on black, or yellow on green
  - Rather than affect colour, make them affect the y position of the points.


## 3

clamp(v, min, max);

- Exercises
  - Try and incorporate clamp into the above setup, see if you can make it do something interesting.
  - Set P based on waves generated from sin(d), but see what happens if you fit and clamp d before sin, after sine, or both before AND after sine.
  - waves that start from 2 points and mix with each other (remember the earlier lesson about code style, and += *= vs =, and how you can accumulate results over several lines)
  - try and build some of these examples with vops, see what feels faster.

## 4

chramp
