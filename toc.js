// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="Index.html">들어가며</a></li><li class="chapter-item expanded affix "><li class="part-title">제어</li><li class="chapter-item expanded "><a href="control/key.html">조작키</a></li><li class="chapter-item expanded "><a href="control/config.html">설정</a></li><li class="chapter-item expanded affix "><li class="part-title">File</li><li class="chapter-item expanded "><a href="file/file.html">파일</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="file/hda.html">hda</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">노드</li><li class="chapter-item expanded "><a href="node/geometry/geo_node.html">Geometry</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="node/geometry/uv.html">uv</a></li><li class="chapter-item expanded "><a href="node/geometry/geo_step.html">step</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">스크립트</li><li class="chapter-item expanded "><a href="script/script.html">스크립트</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="script/vex.html">VEX</a></li><li class="chapter-item expanded "><a href="script/python.html">Python</a></li><li class="chapter-item expanded "><a href="script/hscript-expression.html">hscript expression</a></li><li class="chapter-item expanded "><a href="script/opencl.html">OpenCL</a></li><li class="chapter-item expanded "><a href="script/glsl.html">GLSL</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">테크닉</li><li class="chapter-item expanded "><a href="technic/VAT.html">VAT</a></li><li class="chapter-item expanded "><a href="technic/landscape.html">landscape</a></li><li class="chapter-item expanded affix "><li class="part-title">게임엔진</li><li class="chapter-item expanded "><a href="game-engine/unity.html">유니티</a></li><li class="chapter-item expanded "><a href="game-engine/unreal.html">언리얼</a></li><li class="chapter-item expanded affix "><li class="part-title">튜토리얼</li><li class="chapter-item expanded "><a href="tutorial/joy_of_vex.html">joy of vex</a></li><li class="chapter-item expanded "><a href="tutorial/project_titan.html">project titan</a></li><li class="chapter-item expanded affix "><li class="part-title">Learn</li><li class="chapter-item expanded "><a href="learn/sidefx-learn/sidefx-learn.html">sidefx-learn</a></li><li class="chapter-item expanded affix "><li class="part-title">기타</li><li class="chapter-item expanded "><a href="etc/reference.html">참고</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="etc/ta.html">TA</a></li></ol></li><li class="chapter-item expanded "><a href="etc/snippet.html">Snippet</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="etc/snippet-node.html">Snippet Node</a></li><li class="chapter-item expanded "><a href="etc/snippet-vex.html">Snippet Vex</a></li></ol></li><li class="chapter-item expanded "><a href="etc/plugin.html">플러그인</a></li><li class="chapter-item expanded "><a href="etc/recipe.html">recipe</a></li><li class="chapter-item expanded "><a href="etc/english_word.html">영단어</a></li><li class="chapter-item expanded "><a href="etc/license.html">라이센스</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
