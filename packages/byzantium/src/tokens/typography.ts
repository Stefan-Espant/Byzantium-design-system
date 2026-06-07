export const typography = {
  'font-sans':     '"Inter", system-ui, sans-serif',
  'font-serif':    '"Lora", Georgia, serif',
  'font-mono':     '"Fira Code", monospace',
  'text-xs':       'clamp(0.75rem,  0.7rem   + 0.25vw, 0.875rem)',
  'text-sm':       'clamp(0.875rem, 0.825rem + 0.25vw, 1rem)',
  'text-base':     'clamp(1rem,     0.95rem  + 0.25vw, 1.125rem)',
  'text-lg':       'clamp(1.125rem, 1rem     + 0.5vw,  1.25rem)',
  'text-xl':       'clamp(1.25rem,  1.1rem   + 0.75vw, 1.5rem)',
  'text-2xl':      'clamp(1.5rem,   1.25rem  + 1vw,    2rem)',
  'text-3xl':      'clamp(1.875rem, 1.5rem   + 1.5vw,  2.5rem)',
  'text-4xl':      'clamp(2.25rem,  1.75rem  + 2vw,    3rem)',
  'leading-tight':   '1.25',
  'leading-normal':  '1.5',
  'leading-relaxed': '1.625',
  'font-normal':   '400',
  'font-medium':   '500',
  'font-semibold': '600',
  'font-bold':     '700',
} as const

export type TypographyToken = keyof typeof typography
