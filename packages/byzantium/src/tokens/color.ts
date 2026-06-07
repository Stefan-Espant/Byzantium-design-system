export const color = {
  'brand-50':  '#fff0f0',
  'brand-100': '#ffd6d6',
  'brand-200': '#ffaaaa',
  'brand-300': '#ff7070',
  'brand-400': '#e84050',
  'brand-500': '#c01030',
  'brand-600': '#9a0020',
  'brand-700': '#720018',
  'brand-800': '#480010',
  'brand-900': '#1a0508',
  'color-success': '#16a34a',
  'color-warning': '#d97706',
  'color-error':   '#dc2626',
  'color-info':    '#2563eb',
} as const

export type ColorToken = keyof typeof color
