let localHide = false;
let sliding = true;

export function hide(localVideo) {
  localVideo.style.display = localHide ? "block" : "none";
  localHide = !localHide;
}
export function toggleSlide(slide, slideSpace) {
  slide.style.bottom = sliding ? "140px" : "0px";
  slideSpace.style.bottom = sliding ? "0px" : "-140px";
  sliding = !sliding;
}
