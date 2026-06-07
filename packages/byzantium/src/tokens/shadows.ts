export const shadows = {
  'shadow-sm': '0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
  'shadow-md': '0 4px 6px -1px rgba(0,0,0,0.4), 0 2px 4px -1px rgba(0,0,0,0.2)',
  'shadow-lg': '0 10px 25px -3px rgba(0,0,0,0.5), 0 4px 6px -2px rgba(0,0,0,0.3)',
  'shadow-xl': '0 20px 40px -4px rgba(0,0,0,0.6)',
  'shadow-glow': '0 0 20px rgba(192,16,48,0.4)',
} as const
export type ShadowToken = keyof typeof shadows
