<script lang="ts" setup>
// import { computed } from 'vue'
import { ROUTE } from '~shared/lib'

export interface NavLink {
  text: string
  href: string
  isNative?: boolean
}

const props = defineProps<{
  text?: string
  navLinks?: NavLink[]
}>()

const links = computed(() => props.navLinks || [])
</script>

<template>
  <header class="header">
    <div class="header__logo">
      <RouterLink :to="{ ...ROUTE.home }" class="logo-link">
        {{ text || 'SiteName' }}
      </RouterLink>
    </div>

    <nav class="header__nav" v-if="links.length">
      <ul class="nav__list">
        <li v-for="link in links" :key="link.text" class="nav__item">
          <RouterLink
            :to="{ path: link.href }"
            class="nav__link"
            active-class="nav__link--active"
            v-if="!link.isNative"
          >
            {{ link.text }}
          </RouterLink>
            <a
                :href="link.href"
                class="nav__link"
                v-else
            >{{ link.text }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
:root {
  --header-bg: #ffffff;
  --header-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  --logo-color: #2d3748;
  --link-color: #4a5568;
  --link-hover-color: #3b82f6;
  --link-active-color: #3b82f6;
  --underline-color: #3b82f6;
  --mobile-menu-bg: #f7fafc;
}

.header {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 2rem;

  height: 80px;
  padding: 0 40px;
  background-color: var(--header-bg);
  box-shadow: var(--header-shadow);
  position: sticky;
  top: 0;
  z-index: 100;

  &__logo {
    .logo-link {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--logo-color);
      text-decoration: none;
      letter-spacing: -0.02em;
      transition: color 0.2s;

      &:hover {
        color: var(--link-hover-color);
      }
    }
  }

  &__nav {
    justify-self: end; 
  }

  .nav__list {
    display: flex;
    gap: 2rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .nav__item {
    margin: 0;
    padding: 0;
  }

  .nav__link {
    position: relative;
    font-size: 1rem;
    font-weight: 500;
    color: var(--link-color);
    text-decoration: none;
    padding: 0.5rem 0;
    transition: color 0.2s;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--underline-color);
      transform: scaleX(0);
      transition: transform 0.2s ease-in-out;
    }

    &:hover {
      color: var(--link-hover-color);

      &::after {
        transform: scaleX(1);
      }
    }

    &--active {
      color: var(--link-active-color);
      font-weight: 800;

      &::after {
        transform: scaleX(1);
        background-color: var(--link-active-color);
      }
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; 
    height: auto;
    padding: 1rem 20px;
    gap: 1rem;

    &__nav {
      justify-self: stretch; 
    }

    .nav__list {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0;
      background-color: var(--mobile-menu-bg);
      border-radius: 12px;
    }

    .nav__link {
      display: inline-block;
      padding: 0.5rem 1rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.75rem 15px;

    .logo-link {
      font-size: 1.3rem;
    }

    .nav__link {
      font-size: 0.95rem;
    }
  }
}
</style>