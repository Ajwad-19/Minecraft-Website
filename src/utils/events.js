// Tiny app-wide event so distant components (e.g. the footer) can open a section's modal.

const OPEN_MODAL = 'examplecraft:open-modal';

export const openModal = (name) => window.dispatchEvent(new CustomEvent(OPEN_MODAL, { detail: name }));

export const onOpenModal = (fn) => {
  const handler = (e) => fn(e.detail);
  window.addEventListener(OPEN_MODAL, handler);
  return () => window.removeEventListener(OPEN_MODAL, handler);
};
