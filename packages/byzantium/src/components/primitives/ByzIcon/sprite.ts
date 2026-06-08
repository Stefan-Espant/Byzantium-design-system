import spriteMarkup from './byz-icons-sprite.svg?raw'

const SPRITE_CONTAINER_ID = 'byz-icon-sprite-root'

export function ensureByzIconSprite() {
  if (typeof document === 'undefined') return
  if (document.getElementById(SPRITE_CONTAINER_ID)) return

  const container = document.createElement('div')
  container.id = SPRITE_CONTAINER_ID
  container.setAttribute('aria-hidden', 'true')
  container.style.position = 'absolute'
  container.style.width = '0'
  container.style.height = '0'
  container.style.overflow = 'hidden'
  container.innerHTML = spriteMarkup

  document.body.prepend(container)
}
