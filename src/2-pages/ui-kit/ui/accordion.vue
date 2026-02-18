<script lang="ts" setup>
import { vAccordion } from '~shared/ui'

definePage({
    meta: {
        layout: 'home',
    },
})

const lorem = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>'

const accordionItems = [
    { title: 'What is Dashlite?', content: lorem },
    { title: 'What are some of the benefits of receiving my bill electronically?', content: lorem },
    { title: 'What is the relationship between Dashlite and payment?', content: lorem },
    { title: 'What are the benefits of using Dashlite?', content: lorem },
]
</script>

<template>
    <div class="accordion-page">
        <header class="accordion-header">
            <h1 class="accordion-title">Default Style</h1>
            <p class="accordion-desc">
                Using default collapse behavior to create an accordion. To properly achieve the accordion style, be sure to use
                <code class="accordion-code">.accordion</code>
                as a wrapper.
            </p>
        </header>

        <div class="accordion-card">
            <vAccordion :items="accordionItems" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.accordion-page {
    padding: 1.5rem 0;
}

.accordion-header {
    margin-bottom: 1.25rem;
}

.accordion-title {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    line-height: 1.3;
}

.accordion-desc {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 400;
    color: #6b7280;
    line-height: 1.5;
}

.accordion-code {
    padding: 0.15em 0.4em;
    font-size: 0.9em;
    color: #b4536b;
    background: #fef2f2;
    border-radius: 4px;
}   

.accordion-card {
    padding: 20px;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    overflow: hidden;
}
</style>
