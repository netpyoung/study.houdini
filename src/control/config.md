# 설정

## houdini.env

``` txt
C:\Users\pyoung\Documents\houdini19.5\houdini.env
```

``` ini
# houdini.env
# https://www.sidefx.com/docs/houdini/basics/config_env.html
## Windows | %HOME%/houdiniX.Y/houdini.env
## Mac     | ~/Library/Preferences/houdini/X.Y/houdini.env
## Linux   | ~/houdiniX.Y/houdini.env

# EDITOR = "C:/Program Files/Microsoft VS Code/Code.exe -w"
```


## 환경변수

- 환경변수 확인
  - Help > About Houdini > Show Details

- <https://www.sidefx.com/docs/houdini/ref/env.html>

| Env      |                                                                                                                                                        |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| $HIPFILE | hip 파일                                                                                                                                               |
| $HIPNAME | hip파일의 확장명을 제외한 파일명 hello.hip => hello                                                                                                    |
| $HIP     | hip 파일이 저장된 절대경로                                                                                                                             |
| $JOB     | project 절대경로 ( File > New Project )                                                                                                                |
| $HFS     | `H`oudini `F`ile `S`ystem. The path where Houdini is installed. Houdini reads the configuration information from $HFS/houdini.                         |
| $HH      | The path to Houdini supporting scripts and files inside $HFS. Usually $HFS/houdini                                                                     |
| $HHP     | The path to Houdini’s python libraries. This will differ depending on the version of python that Houdini is built with. For example $HH/python3.7libs. |

HOUDINI_OTLSCAN_PATH

|                          |             |
| ------------------------ | ----------- |
| Aliases and Variables... | Alt+Shift+V |


## Job

- <https://www.sidefx.com/docs/houdini/basics/project.html>

## 단축키

| Edit > Hotkeys             |                                            |              |
| -------------------------- | ------------------------------------------ | ------------ |
| Copy Parameter             | /Houdini/Panes/Parameter Fields and Labels | Ctrl+Shift+C |
| Copy Parameters            | /Houdini/Panes/Parameter Spreadsheet       | Ctrl+Shift+C |
| Paste Copied Relative Refs |                                            | Ctrl+Shift+V |


## 색상 조정

- 후디니> Edit > Color Setting > Color collection 확인

## 유닛 단위 조정

Edit > Preference > Hip File Options > Unit Length(m)

|         | 1 unit  |
| ------- | ------- |
| houdini | 1 meter |
| unity   | 1 meter |
| unreal  | 1 cm    |