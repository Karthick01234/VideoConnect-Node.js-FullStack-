let isDragging = false;
let isTouchDragging = false;
let offsetX, offsetY, touchX, touchY;

export function startDrag(event, localVideo) {
  isDragging = true;
  offsetX = event.clientX - parseFloat(getComputedStyle(localVideo).left);
  offsetY = event.clientY - parseFloat(getComputedStyle(localVideo).top);
}

export function stopDrag() {
  isDragging = false;
}

export function performDrag(event, localVideo, dropdown) {
  if (isDragging) {
    localVideo.style.left = event.clientX - offsetX + "px";
    localVideo.style.top = event.clientY - offsetY + "px";
    dropdown.style.left = event.clientX - offsetX - 15 + "px";
    dropdown.style.top = event.clientY - offsetY - 15 + "px";
  }
}

export function startTouchDrag(event, localVideo) {
  isTouchDragging = true;
  const touch = event.touches[0];
  touchX = touch.clientX - parseFloat(getComputedStyle(localVideo).left);
  touchY = touch.clientY - parseFloat(getComputedStyle(localVideo).top);
}

export function stopTouchDrag() {
  isTouchDragging = false;
}

export function performTouchDrag(event, localVideo, dropdown) {
  if (isTouchDragging) {
    const touch = event.touches[0];
    localVideo.style.left = touch.clientX - touchX + "px";
    localVideo.style.top = touch.clientY - touchY + "px";
    dropdown.style.left = touch.clientX - touchX - 15 + "px";
    dropdown.style.top = touch.clientY - touchY - 15 + "px";
  }
}
