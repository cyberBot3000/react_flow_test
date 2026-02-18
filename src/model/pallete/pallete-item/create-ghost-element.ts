import type { ComponentDTO } from '../../types';

export const createGhostElement = (item: ComponentDTO): HTMLElement => {
  const ghost = document.createElement('div');
  Object.assign(ghost.style, {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    width: '220px',
    border: '1px solid #D9D9D9',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    opacity: '0.9',
  });

  const cellTop = document.createElement('div');
  Object.assign(cellTop.style, {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 10px',
    alignItems: 'center',
    height: '40px',
  });

  const titleContent = document.createElement('div');
  Object.assign(titleContent.style, {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: '8px',
  });

  const title = document.createElement('p');
  title.textContent = item.name;
  Object.assign(title.style, {
    fontWeight: '500',
  });
  title.style.fontFamily = 'sans-serif';
  titleContent.appendChild(title);

  cellTop.appendChild(titleContent);

  ghost.appendChild(cellTop);

  return ghost;
};
