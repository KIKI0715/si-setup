// 모든 실습 페이지 맨 아래에 이 한 줄을 넣습니다.
// <script src="../../../assets/bar.js" data-no="23" data-kind="follow"></script>
// 오른쪽 아래에 작은 표시(← 아카이브 · 번호)를 띄웁니다. 누르면 원본 이름과 바꾼 점이 펼쳐지고, × 로 숨길 수 있습니다.
(function () {
  var me = document.currentScript;
  var no = Number(me.dataset.no);
  var kind = me.dataset.kind === "mine" ? "mine" : "follow";
  var base = me.src.replace(/assets\/bar\.js.*$/, "");
  var pad = function (n) { return String(n).padStart(2, "0"); };
  var esc = function (s) { return String(s || "").replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  function draw() {
    var item = (window.WORKS && window.WORKS.items || []).find(function (i) { return i.no === no; }) || { title: "", mine: {} };
    var label = kind === "follow" ? "따라 하기" : "내 응용";
    var box = document.createElement("div");
    box.setAttribute("role", "note");
    box.style.cssText = "position:fixed;right:10px;bottom:10px;z-index:2147483647;max-width:min(300px,calc(100vw - 20px));" +
      "background:rgba(20,20,18,.82);color:#fff;font:12px/1.5 -apple-system,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;" +
      "padding:6px 10px;border-radius:999px;word-break:keep-all;display:flex;gap:8px;align-items:center";
    var link = '<a href="' + base + 'index.html" style="color:#a9b8ff;text-decoration:none">← 아카이브</a>';
    var more = '<button type="button" style="all:unset;cursor:pointer">' + pad(no) + " " + label + "</button>";
    var close = '<button type="button" aria-label="표시 숨기기" style="all:unset;cursor:pointer;opacity:.7;padding:0 2px">×</button>';
    box.innerHTML = link + more + close;
    var detail = null;
    box.children[1].onclick = function () {
      if (detail) { detail.remove(); detail = null; box.style.borderRadius = "999px"; return; }
      detail = document.createElement("div");
      detail.style.cssText = "flex-basis:100%;padding:4px 2px 2px";
      detail.innerHTML = "원본: " + pad(no) + " " + esc(item.title) +
        (kind === "mine" && item.mine && item.mine.title ? "<br>이름: " + esc(item.mine.title) : "") +
        (kind === "mine" && item.mine && item.mine.changed ? "<br>바꾼 점: " + esc(item.mine.changed) : "");
      box.style.flexWrap = "wrap"; box.style.borderRadius = "12px";
      box.appendChild(detail);
    };
    box.children[2].onclick = function () { box.remove(); };
    document.body.appendChild(box);
  }

  if (window.WORKS) { draw(); return; }
  var s = document.createElement("script");
  s.src = base + "data/works.js";
  s.onload = draw;
  s.onerror = draw;
  document.head.appendChild(s);
})();
