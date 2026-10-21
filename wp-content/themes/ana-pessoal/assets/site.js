(() => {
  if (!('HTMLDialogElement' in window)) return;
  const dialog = document.createElement('dialog');
  dialog.setAttribute('aria-label', 'Fotografia ampliada');
  const close = document.createElement('button'); close.textContent = 'Fechar ×';
  const photo = document.createElement('img'); const caption = document.createElement('p');
  dialog.append(close, photo, caption); document.body.append(dialog);
  let origin;
  document.addEventListener('click', event => {
    const link = event.target.closest('.wp-block-image a');
    if (!link || !link.querySelector('img') || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); origin = link;
    photo.src = link.href; photo.alt = link.querySelector('img').alt;
    caption.textContent = link.closest('figure').querySelector('figcaption')?.textContent || photo.alt;
    dialog.showModal(); close.focus();
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { photo.removeAttribute('src'); origin?.focus(); });
  dialog.addEventListener('keydown', e => {
    if (e.key === 'Tab') { e.preventDefault(); close.focus(); }
  });
})();
