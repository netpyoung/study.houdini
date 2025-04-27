# 파일


| 분류   | 확장자명 | 설명                                           | LICENSE                |
| ------ | -------- | ---------------------------------------------- | ---------------------- |
| 씬파일 | .hip     | `H`oudini `I`ndependent `P`ackage              |                        |
|        | .hiplc   | Houdini Independent Package Limited Commercial | INDIE                  |
|        | .hipnc   | Houdini Independent Package Non-Commercial     | EDUCATION / APPRENTICE |
| 에셋   | .hda     | `H`oudini `D`igital `A`ssets                   |                        |
|        | .hdalc   | Houdini Digital Assets Limited Commercial      | INDIE                  |
|        | .hipnc   | Houdini Digital Assets Non-Commercial          | EDUCATION / APPRENTICE |
| 세션   | .hess    | `H`oudini `E`ngine `S`ession`S`ync             |                        |



| storing Houdini geometry |                                                                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| .geo                     | ASCII                                                                                                                                                  |
| .bgeo                    | binary                                                                                                                                                 |
| .bgeo.sc                 | compressed .bgeo file (using BLO`SC` compression). These are often as fast (or faster) to read/write than plain .bgeo files, and take less disk space. |

- Blosc 압축
  - <https://www.blosc.org/pages/blosc-in-depth/>