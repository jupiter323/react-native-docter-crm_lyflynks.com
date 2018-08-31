export const SHOW_MENU = 'SHOW_MENU';
export const HIDE_MENU = 'HIDE_MENU';
export const TOOGLE_MENU = 'TOOGLE_MENU'

export function showMenu () {
  return { type: SHOW_MENU }
}
export function hideMenu () {
  return { type: HIDE_MENU }
}

export function toogleMenu () {
  return { type: TOOGLE_MENU }
}