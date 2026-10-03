// ใส่วันครบรอบเป็น วันเดือนปี (ค.ศ.) ไม่ต้องมีเครื่องหมาย เช่น 14 ก.พ. 2023
const SECRET = "18102022";

const lock = document.getElementById("lock");
const bookWrap = document.getElementById("bookWrap");
const form = document.getElementById("lockForm");
const input = document.getElementById("dateInput");
const error = document.getElementById("error");

function openBook() {
  lock.hidden = true;
  bookWrap.hidden = false;
  render();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const typed = input.value.replace(/\D/g, "");
  if (typed === SECRET) {
    openBook();
  } else {
    error.hidden = false;
  }
});

// พลิกหน้า
const pages = Array.from(document.querySelectorAll(".page"));
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const ind = document.getElementById("ind");
let cur = 0;

pages.forEach(function (p, i) {
  p.style.zIndex = pages.length - i;
  p.addEventListener("click", function () { go(1); });
});

function go(d) {
  const n = cur + d;
  if (n < 0 || n > pages.length - 1) return;
  cur = n;
  render();
}

function render() {
  pages.forEach(function (p, i) {
    p.classList.toggle("gone", i < cur);
  });
  prev.disabled = cur === 0;
  next.disabled = cur === pages.length - 1;
  ind.textContent = cur === 0 ? "ปก" : cur + " / " + (pages.length - 1);

  // หยุดวิดีโอถ้าพลิกออกจากหน้าสุดท้าย
  document.querySelectorAll("video").forEach(function (v) {
    if (cur !== pages.length - 1) v.pause();
  });
}

prev.onclick = function () { go(-1); };
next.onclick = function () { go(1); };

// ทางลัดตอนแก้งาน: เปิดด้วย index.html#dev หรือ #dev3 เพื่อข้ามไปหน้า 3
const dev = location.hash.match(/^#dev(\d*)$/);
if (dev) {
  cur = Math.min(Number(dev[1] || 0), pages.length - 1);
  openBook();
}