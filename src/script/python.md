# Python

- <https://jtomori.github.io/2022/2022-07-07.html>
- <https://www.sidefx.com/docs/houdini/hom/commandline.html#hython>

- 환경변수 확인
  - Help > About Houdini > Show Details

``` txt

Windows > Hscript Textport(Alt + Shift + T)

/ -> help otedit
otedit

    REPLACED BY
      - hou.ui.openTypePropertiesDialog()
```

``` txt
## hython path

Linux: /opt/hfs19.0.657/bin/hython
Windows: C:\Program Files\Side Effects Software\Houdini 19.0.657\bin\hython3.7.exe
```

``` json
// setting.json
"python.autoComplete.extraPaths" : [
  "C:/Program Files/Side Effects Software/Houdini 19.0.531/houdini/python3.7libs"
],

"python.autoComplete.preloadModules" : [
  "hou"
],

"python. analysis.extraPaths" : [
  "C:/Program Files/Side Effects Software/Houdini 19.0.531/houdini/python3.7libs"
]
```

- New Shelf...
  - New Tool...
    - Script

```python

import hou

obj = hou.node('/obj')
myGeo = obj.createNode('geo', 'myGeo')
box = myGeo.createNode('box', 'myBox')

# print(box.ascode())
 
box.parm('sizex').set(10)

selected = hou.selectedNodes() # tuple
selected[0].setInput(0, selected[1], 0)
```

``` python

import Pyside2 as ps

```




hou.playbar.play()
hou.playbar.stop()

hou.ui.displayMessage("HelloWorld")
hou.ui.displayMessage("HelloWorld", buttons=("OK", "NO"))
hou.ui.readInput("Read Input")

hou.frame()
hou.fps()

hou.selectedNodes()

hou.putenv("ENV_A", "VALUE_A")
hou.unsetenv('A')
hou.getenv("HIP")
hou.hda.reloadAllFiles()



hou.hscript("opparm /obj/geo1 scale 10")

n = hou.node("/obj/geo1")
sphere = n.node("sphere1")


node.parent()
node.children()
node.outputs()
node.inputs()
node.setInput(2, otherNode)
node.setInput(2, None)
node.color()
node.setColor(hou.Color(1, 0, 0))
node.setDisplayFlag(False)
node.isGenericFlagSet(hou.nodeFlag.Display)
node.setGenericFlagSet(hou.nodeFlag.Display, True)
// https://www.sidefx.com/docs/houdini/hom/hou/nodeFlag.html

node.type()
node.createNode('attribwrangle')

node.userDataDict()
node.clearUserDataDict()
node.setUserData('keyString', 'valueString')
node.userData('keyString')
node.destroyUserData('keyString')

https://www.sidefx.com/docs/houdini/hom/hou/OpNode.html#user-data
node.cachedUserDataDict()
node.setCachedUserData('keyString', 'valueString')
node.cachedUserData('keyString')
node.destroyCachedUserData('keyString')

node.asCode()

node.name()
node.setName('test')
node.commnet()
node.setComment('comment')
node.appendComment('append comment')
node.path()
node.position()
node.setPosition((0, 0)) // input : vector
node.move((-1, -1))
node.destroy()
node.evalParm('proj')


``` txt
// https://www.sidefx.com/docs/houdini/ref/env.html
// https://www.sidefx.com/docs/houdini/hom/locations.html#startup 

HH                    : The path to Houdini supporting scripts and files inside $HFS. Usually $HFS/houdini
HOUDINI_PATH          : The path of directories where Houdini looks for configuration files.
HOUDINI_USER_PREF_DIR : The directory to store user preference files. 

```




hou.parm     ("/obj/geo1/tx")
hou.parm     ("/obj/geo1/scale")
hou.parmTuple("/obj/geo1/t")
p = hou.parm     ("/obj/geo1/scale")
p.eval()
p.evalAsString()
p.isTimeDependent()
p.evalAtFrame(10)
p.set(5)
p.name()
p.node()
p.pressButton()
p.keyframes()
p.keyframesAfter(20)
p.deleteAllKeyframes()
p.revertToDefault()
p.expression()
p.expressionLanguage()
p.setExpression('print "Hello"', language=hou.exprLanguage.Python)


node = hou.pwd()
geo = node.geometry()
geo.points()
pt = geo.iterPoints()[0]
pt.prims()
pt.vertices()
geo.attribValue('foo')
geo.setGlobalAttribValue('foo', 5)
pt.attribValue('foo')
pt.setAttribValue('foo', 5)
geo.addAttrib(hou.attribType.Prim, 'myattrib', 0.0, create_local_variable=False)

pts = geo.createPoints([(0, 0, 0)])
geo.deletePoints(pts)

group = geo.findPointGroup('grp1')
group = geo.createPointGroup('grp1')
group.clear()
group.destroy()

p = geo.prim(0)
p.intrinsicValue('typename')




hou.ui.displayMessage("HelloWorld", serverity=hou.serverityType.ImportantMessage, help='help message', detail='detail','title='title')
hou.ui.readMultiInput('wtf', ('1', '2', '3'))
hou.ui.selectFile()
hou.ui.selectFromList(('1', '2', '3'))
hou.ui.selectFromTree(('a/1', 'a/2', '3'))
hou.ui.selectNode()
hou.ui.selectParm()
hou.ui.selectParmTuple()
hou.ui.selectAttrib()
hou.ui.selectColor()
hou.ui.setStatusMessage('hello world')



import hou
n = hou.node('/obj/hello')
t = n.type()
d = t.definition()
group = d.parmTemplateGroup()
group = hou.ParmTemplateGroup()
n.setParmTemplateGroup()
d.setParmTemplateGroup()



``` python
import hou
n = hou.node('/obj/geo1/transform1')

new_n = n.parent().createNode(n.type().name(), f"{n.name()}_refcopy")
new_n.setPosition(n.position())
new_n.move((0.5, -0.5))
new_n.setColor(hou.color((0.1, 0.1, 0.1)))

group = new_n.parmTemplateGroup()
source = hou.StringParmTemplate('ref_source', 'Reference Source', 1, string_type=hou.stringParmType.NodeRefernece, help='help text')
group.insertBefore((0, ), source)
new_n.setParmTemplateGroup(group)
new_n.parm('ref_source').set(n.path())

temp_list = [
  hou.parm('obj/geo1/transform1_refcopy/scale'),
  hou.parm('obj/geo1/transform1_refcopy/group'),
  hou.parm('obj/geo1/transform1_refcopy/shear')
]
for p in temp_list:
    if p.name() == 'ref_source':
        continue
    if p.parmTemplate().type() == hou.parmTemplateType.Folder:
        continue
    if p.parmTemplate().type() == hou.parmTemplateType.FolderSet:
        continue

    mode = kwargs['ctrlclick']

    if mode:
        expr = 'ch'
        if p.parmTemplate().type() == hou.parmTemplateType.String:
            expr = 'chs'
        p.setExpression(f"{expr}(chs('ref_resource') + '/{p.name()}')")
    else:
        p.setExpression(f"hou.node(hou.pwd().evalParm('ref_source')).evalParm('{p.name()}')", language=exprLangauge.Python)
```


PythonModule
  def onInputChanged
OnInputChanged
  kwargs['node'].hm().onInputChanged(kwargs) # hm - a shortcut for self.hdaModule(). - https://www.sidefx.com/docs/houdini/hom/hou/OpNode.html#hm


hou.phm().SomeFunction()                     # hou.phm() == hou.pwd().hdaModule()