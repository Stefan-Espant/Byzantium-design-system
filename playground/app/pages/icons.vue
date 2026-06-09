<script setup lang="ts">
import {
  ByzBadge,
  byzCoreIconGroups,
  byzCoreIconNames,
  ByzIcon,
  ByzIconSprite,
  ByzInput,
  ByzToastContainer,
  byzIconNames,
  useClipboard,
  useToast,
  useTheme,
} from '@byzantium/core'

const { theme, toggle } = useTheme()
const query = ref('')
const menuOpen = ref(false)
const selectedSize = ref<'sm' | 'md' | 'lg'>('md')
const { add: addToast } = useToast()
const { copy } = useClipboard()

const quietHeritageSpec = [
  {
    label: 'Stroke',
    value: '1.75px standaard',
    note: 'Licht verfijnd, net onder product-utility gewicht zodat het klassiek en luchtig blijft.',
  },
  {
    label: 'Vormtaal',
    value: 'Ronde uiteinden, zachte binnenhoeken',
    note: 'Geen agressieve technische hoeken; wel helder, ceremonieel en leesbaar.',
  },
  {
    label: 'Fill Gebruik',
    value: '10-28% wash voor massa',
    note: 'Gebruik subtiele vlakken alleen om volume en erfgoedgevoel toe te voegen, nooit als platte blob.',
  },
  {
    label: 'Accent',
    value: 'Bordeaux alleen als nuance',
    note: 'Accent leeft in gloed, focus en nadruk; iconen blijven primair rustig en niet schreeuwerig.',
  },
  {
    label: 'Light Theme',
    value: 'Blush surface + warme inkt',
    note: 'Vriendelijke papieren ondertoon met merkverwantschap via rand en zachte accentmix.',
  },
  {
    label: 'Dark Theme',
    value: 'Wine surface + porselein lijnwerk',
    note: 'In dark mode blijft het klassiek, niet neon: rijk contrast zonder cyber-esthetiek.',
  },
] as const

const quietHeritageDo = [
  'Gebruik serif-achtige ritmes: rustige verhoudingen, brede counters en duidelijke verticale as.',
  'Laat fills alleen helpen met statigheid en hiërarchie, niet met decoratie om de decoratie.',
  'Gebruik het accent spaarzaam bij actieve of hero-achtige momenten.',
] as const

const quietHeritageDont = [
  'Geen zware 2.5px utility-strokes als standaard.',
  'Geen harde solid red glyphs voor reguliere navigatie-iconen.',
  'Geen futuristische highlights, glasranden of extreme glow in de basisset.',
] as const

const normalizedQuery = computed(() => query.value.trim().toLowerCase())
const filteredIconNames = computed(() => {
  if (!normalizedQuery.value) return byzIconNames
  return byzIconNames.filter((iconName) => iconName.includes(normalizedQuery.value))
})

const visibleIconNames = computed(() => {
  if (normalizedQuery.value) return filteredIconNames.value
  return filteredIconNames.value.slice(0, 500)
})

const hiddenCount = computed(() => {
  if (normalizedQuery.value) return 0
  return Math.max(0, filteredIconNames.value.length - visibleIconNames.value.length)
})

async function copyIconName(iconName: string) {
  const success = await copy(iconName)
  if (success) {
    addToast({
      type: 'success',
      title: 'Icoonnaam gekopieerd',
      message: iconName,
      duration: 2200,
    })
  }
}
</script>

<template>
  <div class="ip-page">
    <ByzIconSprite />
    <ByzToastContainer />
    <header class="ip-header">
      <nav class="ip-header__inner">
        <a href="/" class="ip-header__brand">Byzantium</a>
        <div class="ip-header__links">
          <a href="/components">Componenten</a>
          <a href="/icons" aria-current="page">Icons</a>
        </div>
        <div class="ip-header__controls">
          <button class="ip-header__toggle" aria-label="Thema wisselen" @click="toggle">
            {{ theme === 'dark' ? '☀' : '☾' }}
          </button>
          <a href="/components" class="ip-header__back">← Terug</a>
        </div>
        <button class="ip-header__hamburger" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
          <span></span><span></span><span></span>
        </button>
      </nav>
    </header>

    <div v-if="menuOpen" class="ip-mobile-menu">
      <a href="/" @click="menuOpen = false">Home</a>
      <a href="/components" @click="menuOpen = false">Componenten</a>
      <a href="/icons" @click="menuOpen = false">Icons</a>
    </div>

    <main class="ip-main">
      <section class="ip-hero">
        <div class="ip-hero__eyebrow">Iconbibliotheek</div>
        <h1 class="ip-hero__title">Meer dan 500 direct bruikbare iconen.</h1>
        <p class="ip-hero__subtitle">
          Byzantium ondersteunt nu een grote iconset via <code>&lt;ByzIcon /&gt;</code>.
          Gebruik namen in kebab-case zoals <code>arrow-right</code>, <code>calendar-days</code> of <code>user-round</code>.
        </p>
        <div class="ip-hero__meta">
          <ByzBadge variant="success">{{ byzIconNames.length }} iconen beschikbaar</ByzBadge>
          <ByzBadge>500 zichtbaar zonder zoeken</ByzBadge>
          <ByzBadge variant="info">Zoek op naam</ByzBadge>
        </div>
      </section>

      <section class="ip-spec">
        <div class="ip-section-head">
          <div>
            <div class="ip-section-head__eyebrow">Definitieve Richting</div>
            <h2 class="ip-section-head__title">Quiet heritage als Byzantium icon spec.</h2>
          </div>
          <p class="ip-section-head__copy">
            Dit is de richting om door te vertalen naar een echte family: klassiek, royaal en duidelijk ingebed in het wijnrode Byzantium-palet.
          </p>
        </div>

        <div class="ip-spec__grid">
          <article class="ip-spec-card ip-spec-card--hero">
            <div class="ip-spec-card__label">Gekozen karakter</div>
            <h3>Calm luxury over technical sharpness.</h3>
            <p>
              Byzantium icons moeten aanvoelen als premium typografische ornamenten voor interface-architectuur:
              beheerst, verfijnd en merkgebonden. Niet minimalistisch kil, niet decoratief luid.
            </p>
          </article>

          <article
            v-for="rule in quietHeritageSpec"
            :key="rule.label"
            class="ip-spec-card"
          >
            <div class="ip-spec-card__label">{{ rule.label }}</div>
            <h3>{{ rule.value }}</h3>
            <p>{{ rule.note }}</p>
          </article>
        </div>

        <div class="ip-guides">
          <article class="ip-guide-card">
            <div class="ip-guide-card__label">Do</div>
            <ul>
              <li v-for="item in quietHeritageDo" :key="item">{{ item }}</li>
            </ul>
          </article>

          <article class="ip-guide-card ip-guide-card--dont">
            <div class="ip-guide-card__label">Don't</div>
            <ul>
              <li v-for="item in quietHeritageDont" :key="item">{{ item }}</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="ip-core">
        <div class="ip-section-head">
          <div>
            <div class="ip-section-head__eyebrow">Aanbevolen Set</div>
            <h2 class="ip-section-head__title">De basisiconen voor dagelijks gebruik.</h2>
          </div>
          <p class="ip-section-head__copy">
            Een compacte selectie voor navigatie, acties, feedback en contact.
          </p>
        </div>

        <div class="ip-core__meta">
          <ByzBadge variant="success">{{ byzCoreIconNames.length }} iconen</ByzBadge>
          <ByzBadge>Standaard selectie</ByzBadge>
        </div>

        <div class="ip-core__groups">
          <article
            v-for="group in byzCoreIconGroups"
            :key="group.id"
            class="ip-core-group"
          >
            <div class="ip-core-group__head">
              <div>
                <div class="ip-core-group__label">{{ group.title }}</div>
                <h3>{{ group.purpose }}</h3>
              </div>
            </div>

            <div class="ip-core-group__grid">
              <div
                v-for="iconName in group.icons"
                :key="iconName"
                class="ip-core-group__item"
              >
                <ByzIcon :name="iconName" size="lg" :stroke-width="1.9" :aria-label="iconName" />
                <span>{{ iconName }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="ip-toolbar">
        <div class="ip-toolbar__search">
          <ByzInput
            v-model="query"
            label="Zoek iconen"
            placeholder="bijv. search, arrow, user, calendar"
            hint="Zoek op kebab-case naam"
          />
        </div>

        <div class="ip-toolbar__sizes">
          <button
            v-for="sizeOption in ['sm', 'md', 'lg']"
            :key="sizeOption"
            type="button"
            class="ip-size-chip"
            :class="{ 'is-active': selectedSize === sizeOption }"
            @click="selectedSize = sizeOption as 'sm' | 'md' | 'lg'"
          >
            {{ sizeOption }}
          </button>
        </div>
      </section>

      <section class="ip-usage">
        <div class="ip-usage__card">
          <div class="ip-usage__label">Gebruik</div>
          <pre><code>&lt;ByzIcon name="search" /&gt;
&lt;ByzIcon name="arrow-right" /&gt;
&lt;ByzIcon name="circle-alert" aria-label="Waarschuwing" /&gt;</code></pre>
        </div>
        <div class="ip-usage__card">
          <div class="ip-usage__label">Resultaten</div>
          <p>{{ filteredIconNames.length }} iconen gevonden.</p>
          <p v-if="hiddenCount > 0">{{ hiddenCount }} extra iconen blijven beschikbaar via zoeken.</p>
        </div>
      </section>

      <section class="ip-grid">
        <button
          v-for="iconName in visibleIconNames"
          :key="iconName"
          type="button"
          class="ip-card"
          @click="copyIconName(iconName)"
        >
          <ByzIcon :name="iconName" :size="selectedSize" :aria-label="iconName" />
          <span class="ip-card__name">{{ iconName }}</span>
          <span class="ip-card__meta">Klik om te kopiëren</span>
        </button>
      </section>

      <section v-if="filteredIconNames.length === 0" class="ip-empty">
        <div class="ip-empty__icon">
          <ByzIcon name="search-x" size="lg" aria-label="Geen resultaten" />
        </div>
        <h2>Geen iconen gevonden</h2>
        <p>Probeer een bredere zoekterm zoals <code>arrow</code>, <code>chart</code> of <code>user</code>.</p>
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.ip-page {
  min-height: 100vh;
}

.ip-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: color-mix(in srgb, var(--byz-color-nav-bg) 88%, transparent);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--byz-color-border);

  &__inner {
    max-width: 76rem;
    margin: 0 auto;
    min-height: 60px;
    padding: 0 var(--byz-space-8);
    display: flex;
    align-items: center;
    gap: var(--byz-space-6);
  }

  &__brand {
    color: var(--byz-color-text-primary);
    text-decoration: none;
    font-family: var(--byz-font-serif);
    font-size: var(--byz-text-xl);
    font-weight: var(--byz-font-bold);

    &:hover {
      color: var(--byz-color-accent);
    }

    &:focus-visible {
      outline: 2px solid var(--byz-color-accent);
      outline-offset: 3px;
      border-radius: 4px;
    }
  }

  &__links {
    display: flex;
    gap: var(--byz-space-5);

    a {
      color: var(--byz-color-text-muted);
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-size: var(--byz-text-xs);
      font-weight: var(--byz-font-semibold);
    }

    a[aria-current="page"],
    a:hover {
      color: var(--byz-color-accent);
    }

    a:focus-visible {
      outline: 2px solid var(--byz-color-accent);
      outline-offset: 3px;
      border-radius: 4px;
      color: var(--byz-color-accent);
    }
  }

  &__controls {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: var(--byz-space-3);
  }

  &__toggle,
  &__back {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--byz-color-border);
    border-radius: 999px;
    color: var(--byz-color-text-muted);
    background: transparent;
    text-decoration: none;
    padding: 0 0.875rem;
    transition: border-color var(--byz-duration-fast) var(--byz-ease-default), color var(--byz-duration-fast) var(--byz-ease-default);

    &:hover {
      border-color: var(--byz-color-accent);
      color: var(--byz-color-accent);
    }

    &:focus-visible {
      outline: 2px solid var(--byz-color-accent);
      outline-offset: 2px;
      border-color: var(--byz-color-accent);
      color: var(--byz-color-accent);
    }
  }

  &__toggle {
    width: 44px;
    padding: 0;
    cursor: pointer;
  }

  &__hamburger {
    display: none;
    margin-left: auto;
    width: 40px;
    height: 40px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;

    span {
      display: block;
      width: 22px;
      height: 2px;
      margin: 4px auto;
      background: var(--byz-color-text-muted);
    }
  }
}

.ip-mobile-menu {
  display: none;
}

.ip-main {
  max-width: 76rem;
  margin: 0 auto;
  padding: var(--byz-space-12) var(--byz-space-8) var(--byz-space-20);
}

.ip-hero {
  padding: var(--byz-space-10);
  border: 1px solid var(--byz-color-border);
  border-radius: 1.5rem;
  background:
    radial-gradient(circle at top right, rgb(232 64 80 / 0.16), transparent 30%),
    linear-gradient(180deg, rgb(255 255 255 / 0.02), transparent);
  margin-bottom: var(--byz-space-10);

  &__eyebrow {
    color: var(--byz-color-accent);
    text-transform: uppercase;
    letter-spacing: 0.18em;
    font-size: var(--byz-text-xs);
    font-weight: var(--byz-font-semibold);
    margin-bottom: var(--byz-space-3);
  }

  &__title {
    font-size: clamp(2.5rem, 6vw, 4.75rem);
    line-height: 0.96;
    margin: 0 0 var(--byz-space-4);
    color: var(--byz-color-text-primary);
  }

  &__subtitle {
    max-width: 46rem;
    font-size: var(--byz-text-lg);
    line-height: 1.7;
    color: var(--byz-color-text-secondary);
    margin: 0 0 var(--byz-space-6);
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--byz-space-3);
  }
}

.ip-toolbar {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--byz-space-6);
  align-items: end;
  margin-bottom: var(--byz-space-8);

  &__search {
    min-width: 0;
  }

  &__sizes {
    display: flex;
    gap: var(--byz-space-2);
  }
}

.ip-section-head {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(18rem, 0.85fr);
  gap: var(--byz-space-6);
  align-items: end;
  margin-bottom: var(--byz-space-6);

  &__eyebrow {
    color: var(--byz-color-accent);
    text-transform: uppercase;
    letter-spacing: 0.16em;
    font-size: var(--byz-text-xs);
    font-weight: var(--byz-font-semibold);
    margin-bottom: var(--byz-space-3);
  }

  &__title {
    margin: 0;
    font-size: clamp(1.9rem, 4vw, 3rem);
    line-height: 0.98;
  }

  &__copy {
    margin: 0;
    color: var(--byz-color-text-secondary);
    line-height: 1.7;
  }
}

.ip-directions {
  margin-bottom: var(--byz-space-10);

  &__grid {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: var(--byz-space-4);
  }

  &__grid--triple {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.ip-direction-card {
  position: relative;
  overflow: hidden;
  min-height: 22rem;
  padding: var(--byz-space-5);
  border-radius: 1.5rem;
  border: 1px solid var(--byz-color-border);
  background: var(--byz-color-surface);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--byz-space-6);

  h3 {
    margin: var(--byz-space-4) 0 var(--byz-space-3);
    font-size: 1.35rem;
  }

  p {
    margin: 0;
    color: var(--byz-color-text-secondary);
    line-height: 1.65;
  }

  &__icons {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--byz-space-4);
  }

  &__orb {
    min-height: 92px;
    border-radius: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__orb :deep(svg),
  &__orb :deep(svg *) {
    transition:
      fill var(--byz-duration-fast) var(--byz-ease-default),
      stroke-width var(--byz-duration-fast) var(--byz-ease-default),
      filter var(--byz-duration-fast) var(--byz-ease-default),
      transform var(--byz-duration-fast) var(--byz-ease-default);
  }

  &__orb :deep(svg) {
    width: 2.5rem;
    height: 2.5rem;
    overflow: visible;
    color: currentColor;
  }

  &.is-wire {
    background:
      linear-gradient(180deg, rgb(255 255 255 / 0.03), transparent),
      radial-gradient(circle at top, rgb(255 255 255 / 0.08), transparent 42%),
      #120d10;

    .ip-direction-card__orb {
      border: 1px solid rgb(255 255 255 / 0.12);
      background: rgb(255 255 255 / 0.02);
    }

    .ip-direction-card__orb :deep(svg) {
      color: #f5e8ea;
    }
  }

  &.is-glow {
    background:
      radial-gradient(circle at top left, rgb(255 108 140 / 0.3), transparent 32%),
      radial-gradient(circle at bottom right, rgb(91 230 255 / 0.2), transparent 28%),
      #120915;

    .ip-direction-card__orb {
      background: linear-gradient(180deg, rgb(255 255 255 / 0.1), rgb(255 255 255 / 0.04));
      box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.08), 0 0 24px rgb(255 79 122 / 0.16);
    }

    .ip-direction-card__orb :deep(svg) {
      color: #ff6d8c;
      filter: drop-shadow(0 0 14px rgb(255 86 119 / 0.55));
    }
  }

  &.is-badge {
    background:
      linear-gradient(180deg, rgb(254 106 82 / 0.08), transparent 40%),
      #171013;

    .ip-direction-card__orb {
      background: linear-gradient(180deg, #ff684d, #d93b3b);
      box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.2);
    }

    .ip-direction-card__orb :deep(svg) {
      color: #fff6f0;
      transform: scale(1.08);
    }
  }

  &.is-mono {
    background:
      linear-gradient(180deg, rgb(255 248 236 / 0.95), rgb(229 217 201 / 0.94));
    border-color: rgb(95 71 51 / 0.18);
    color: #2d2118;

    p {
      color: rgb(72 54 40 / 0.82);
    }

    .ip-direction-card__orb {
      background: rgb(255 255 255 / 0.44);
      border: 1px solid rgb(95 71 51 / 0.16);
    }

    .ip-direction-card__orb :deep(svg) {
      color: #2d2118;
    }
  }

  &.is-3d {
    background:
      radial-gradient(circle at top left, rgb(138 229 255 / 0.24), transparent 32%),
      radial-gradient(circle at bottom right, rgb(255 111 145 / 0.18), transparent 34%),
      linear-gradient(180deg, #101522, #0c1019 52%, #151b28);

    .ip-direction-card__orb {
      background:
        linear-gradient(180deg, rgb(255 255 255 / 0.34), rgb(255 255 255 / 0.06)),
        linear-gradient(135deg, rgb(112 214 255 / 0.3), rgb(255 119 162 / 0.12));
      border: 1px solid rgb(255 255 255 / 0.1);
      box-shadow:
        inset 0 1px 0 rgb(255 255 255 / 0.28),
        inset 0 -10px 24px rgb(0 0 0 / 0.22),
        0 16px 30px rgb(0 0 0 / 0.28);
      transform: perspective(900px) rotateX(18deg);
    }

    .ip-direction-card__orb :deep(svg) {
      color: #f5fbff;
      filter:
        drop-shadow(0 2px 0 rgb(101 170 200 / 0.9))
        drop-shadow(0 10px 18px rgb(0 0 0 / 0.45));
      transform: translateY(-2px) scale(1.1);
    }
  }

  &.is-mono-classic {
    background:
      radial-gradient(
        circle at top left,
        color-mix(in srgb, var(--byz-color-accent) 14%, transparent),
        transparent 34%
      ),
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--byz-color-background) 86%, white 14%),
        color-mix(in srgb, var(--byz-color-surface) 78%, var(--byz-color-background) 22%)
      );
    border-color: color-mix(in srgb, var(--byz-color-border) 92%, transparent);
    color: var(--byz-color-text-primary);

    p {
      color: var(--byz-color-text-secondary);
    }

    .ip-direction-card__top h3 {
      font-family: var(--byz-font-serif);
    }

    .ip-direction-card__orb {
      background:
        linear-gradient(
          180deg,
          color-mix(in srgb, var(--byz-color-surface) 68%, white 32%),
          color-mix(in srgb, var(--byz-color-background) 86%, white 14%)
        );
      border: 1px solid color-mix(in srgb, var(--byz-color-border) 88%, transparent);
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, white 22%, transparent),
        0 10px 24px color-mix(in srgb, var(--byz-color-accent) 8%, transparent);
    }

    .ip-direction-card__orb :deep(svg) {
      color: color-mix(in srgb, var(--byz-color-text-primary) 84%, var(--byz-color-accent) 16%);
    }
  }

  &.is-mono-luxe {
    background:
      radial-gradient(circle at top left, rgb(221 177 117 / 0.18), transparent 30%),
      linear-gradient(180deg, #1a1411, #221813);
    border-color: rgb(205 159 96 / 0.24);
    color: #d7b48a;

    h3,
    p {
      color: #ecd7bc;
    }

    .ip-direction-card__orb {
      background: linear-gradient(180deg, rgb(255 236 214 / 0.08), rgb(255 236 214 / 0.03));
      border: 1px solid rgb(215 180 138 / 0.16);
      box-shadow: inset 0 1px 0 rgb(255 248 240 / 0.08);
    }
  }

  &.is-mono-serif {
    background: linear-gradient(180deg, #f6f1ea, #e7ddd2);
    border-color: rgb(91 74 58 / 0.13);
    color: #2f241c;

    p {
      color: rgb(70 56 44 / 0.84);
    }

    .ip-direction-card__top h3 {
      font-family: var(--byz-font-serif);
      letter-spacing: 0.01em;
    }

    .ip-direction-card__orb {
      background:
        linear-gradient(180deg, rgb(255 255 255 / 0.42), rgb(255 255 255 / 0.2)),
        repeating-linear-gradient(
          135deg,
          transparent,
          transparent 10px,
          rgb(77 60 45 / 0.035) 10px,
          rgb(77 60 45 / 0.035) 20px
        );
      border: 1px solid rgb(91 74 58 / 0.1);
    }
  }
}

.ip-size-chip {
  min-height: 44px;
  padding: 0.625rem 0.875rem;
  border-radius: 999px;
  border: 1px solid var(--byz-color-border);
  background: transparent;
  color: var(--byz-color-text-muted);
  cursor: pointer;
  transition: border-color var(--byz-duration-fast) var(--byz-ease-default), color var(--byz-duration-fast) var(--byz-ease-default);

  &:hover {
    border-color: color-mix(in srgb, var(--byz-color-accent) 60%, var(--byz-color-border));
    color: var(--byz-color-text-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--byz-color-accent);
    outline-offset: 2px;
    border-color: var(--byz-color-accent);
  }

  &.is-active {
    border-color: var(--byz-color-accent);
    color: var(--byz-color-accent);
  }
}

.ip-spec {
  margin-bottom: var(--byz-space-10);

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--byz-space-4);
    margin-bottom: var(--byz-space-4);
  }
}

.ip-core {
  margin-bottom: var(--byz-space-10);

  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--byz-space-3);
    margin-bottom: var(--byz-space-4);
  }

  &__groups {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--byz-space-4);
  }
}

.ip-core-group {
  border: 1px solid var(--byz-color-border);
  border-radius: 0.875rem;
  padding: var(--byz-space-4);
  background: var(--byz-color-surface);

  &__head {
    margin-bottom: var(--byz-space-3);
  }

  &__label {
    color: var(--byz-color-text-primary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: var(--byz-text-xs);
    font-weight: var(--byz-font-semibold);
    margin-bottom: var(--byz-space-1);
  }

  h3 {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--byz-color-text-muted);
    font-weight: var(--byz-font-regular);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--byz-space-3);
  }

  &__item {
    border: 1px solid color-mix(in srgb, var(--byz-color-border) 92%, transparent);
    border-radius: 0.75rem;
    min-height: 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--byz-space-2);
    background: color-mix(in srgb, var(--byz-color-surface) 92%, var(--byz-color-background) 8%);
    color: var(--byz-color-text-primary);

    .byz-icon {
      color: var(--byz-color-text-primary);
    }

    span {
      font-size: 0.7rem;
      text-align: center;
      color: var(--byz-color-text-muted);
      line-height: 1.35;
      word-break: break-word;
      padding: 0 0.25rem;
    }
  }
}

.ip-spec-card {
  border: 1px solid var(--byz-color-border);
  border-radius: 1.25rem;
  padding: var(--byz-space-5);
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--byz-color-surface) 82%, white 18%),
      color-mix(in srgb, var(--byz-color-background) 90%, white 10%)
    );
  min-height: 12.5rem;

  &--hero {
    grid-column: span 3;
    background:
      radial-gradient(circle at top right, color-mix(in srgb, var(--byz-color-accent) 14%, transparent), transparent 32%),
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--byz-color-surface) 80%, white 20%),
        color-mix(in srgb, var(--byz-color-background) 90%, white 10%)
      );
  }

  &__label {
    margin-bottom: var(--byz-space-3);
    color: var(--byz-color-accent);
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-size: var(--byz-text-xs);
    font-weight: var(--byz-font-semibold);
  }

  h3 {
    margin: 0 0 var(--byz-space-3);
    font-family: var(--byz-font-serif);
    font-size: 1.4rem;
    color: var(--byz-color-text-primary);
  }

  p {
    margin: 0;
    color: var(--byz-color-text-secondary);
    line-height: 1.7;
  }
}

.ip-guides {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--byz-space-4);
}

.ip-guide-card {
  border: 1px solid var(--byz-color-border);
  border-radius: 1.25rem;
  padding: var(--byz-space-5);
  background: var(--byz-color-surface);

  &--dont {
    background:
      linear-gradient(180deg, color-mix(in srgb, var(--byz-color-accent) 6%, transparent), transparent 40%),
      var(--byz-color-surface);
  }

  &__label {
    margin-bottom: var(--byz-space-3);
    color: var(--byz-color-accent);
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-size: var(--byz-text-xs);
    font-weight: var(--byz-font-semibold);
  }

  ul {
    margin: 0;
    padding-left: 1.1rem;
    color: var(--byz-color-text-secondary);
  }

  li + li {
    margin-top: var(--byz-space-3);
  }
}

.ip-usage {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--byz-space-4);
  margin-bottom: var(--byz-space-8);

  &__card {
    border: 1px solid var(--byz-color-border);
    border-radius: 1rem;
    padding: var(--byz-space-5);
    background: var(--byz-color-surface);
  }

  &__label {
    margin-bottom: var(--byz-space-3);
    color: var(--byz-color-text-muted);
    font-size: var(--byz-text-xs);
    text-transform: uppercase;
    letter-spacing: 0.14em;
  }

  pre {
    margin: 0;
    overflow-x: auto;
  }

  code {
    font-family: var(--byz-font-mono);
    color: var(--byz-color-text-secondary);
  }
}

.ip-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--byz-space-4);
}

.ip-card {
  min-width: 0;
  min-height: 156px;
  border: 1px solid var(--byz-color-border);
  border-radius: 1rem;
  background: var(--byz-color-surface);
  color: var(--byz-color-text-primary);
  padding: var(--byz-space-5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--byz-space-3);
  cursor: pointer;
  transition: transform var(--byz-duration-fast) var(--byz-ease-default), border-color var(--byz-duration-fast) var(--byz-ease-default);

  &:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--byz-color-accent) 60%, var(--byz-color-border));
  }

  &:focus-visible {
    outline: 2px solid var(--byz-color-accent);
    outline-offset: 2px;
    border-color: var(--byz-color-accent);
  }

  &__name {
    font-family: var(--byz-font-mono);
    font-size: var(--byz-text-xs);
    text-align: center;
    word-break: break-word;
    color: var(--byz-color-text-secondary);
  }

  &__meta {
    font-size: 0.75rem;
    color: var(--byz-color-text-muted);
  }
}

.ip-empty {
  margin-top: var(--byz-space-8);
  padding: var(--byz-space-10);
  border: 1px dashed var(--byz-color-border);
  border-radius: 1rem;
  text-align: center;

  &__icon {
    display: inline-flex;
    margin-bottom: var(--byz-space-4);
    color: var(--byz-color-accent);
  }
}

@media (max-width: 1080px) {
  .ip-header {
    &__inner {
      padding: 0 var(--byz-space-4);
      gap: var(--byz-space-3);
    }

    &__links,
    &__controls {
      display: none;
    }

    &__hamburger {
      display: block;
    }
  }

  .ip-mobile-menu {
    display: flex;
    flex-direction: column;
    gap: var(--byz-space-2);
    padding: var(--byz-space-4);
    border-bottom: 1px solid var(--byz-color-border);

    a {
      color: var(--byz-color-text-muted);
      text-decoration: none;
      padding: var(--byz-space-3);
      border-radius: 0.75rem;
      transition: background-color var(--byz-duration-fast) var(--byz-ease-default), color var(--byz-duration-fast) var(--byz-ease-default);

      &:hover {
        background: color-mix(in srgb, var(--byz-color-accent) 10%, transparent);
        color: var(--byz-color-accent);
      }

      &:focus-visible {
        outline: 2px solid var(--byz-color-accent);
        outline-offset: 2px;
        color: var(--byz-color-accent);
      }
    }
  }

  .ip-main {
    padding: var(--byz-space-8) var(--byz-space-4) var(--byz-space-16);
  }

  .ip-section-head,
  .ip-core__groups,
  .ip-core-group__grid,
  .ip-spec__grid,
  .ip-guides,
  .ip-toolbar,
  .ip-usage {
    grid-template-columns: 1fr;
  }

  .ip-directions__grid,
  .ip-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 700px) and (max-width: 1080px) {
  .ip-directions__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .ip-directions__grid--triple {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .ip-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1081px) and (max-width: 1400px) {
  .ip-directions__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .ip-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
