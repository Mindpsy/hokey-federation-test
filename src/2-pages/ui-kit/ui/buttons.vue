<script setup lang="ts">
import { vButton, ButtonVariants, ButtonTypes } from '~shared/ui'

definePage({
    meta: {
        layout: 'home',
    },
})

const variants = [
    { key: ButtonVariants.primary, label: 'Primary' },
    { key: ButtonVariants.secondary, label: 'Secondary' },
    { key: ButtonVariants.success, label: 'Success' },
    { key: ButtonVariants.danger, label: 'Danger' },
    { key: ButtonVariants.warning, label: 'Warning' },
    { key: ButtonVariants.info, label: 'Info' },
    { key: ButtonVariants.light, label: 'Light' },
    { key: ButtonVariants.dark, label: 'Dark' },
] as const
</script>

<template>
    <div class="buttons-page">
        <header class="buttons-header">
            <h1 class="buttons-title">Example with Variations</h1>
            <p class="buttons-desc">
                Bootstrap includes several predefined button styles, each serving its own semantic purpose, with a few extras thrown in for more control.
            </p>
        </header>

        <div class="buttons-card">
            <div class="buttons-grid">
                <div
                    v-for="item in variants"
                    :key="item.key"
                    class="buttons-cell"
                >
                    <span class="buttons-label">{{ item.label }}</span>
                    <vButton
                        :variant="item.key"
                        :text="item.label"
                        :type="ButtonTypes.button"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.buttons-page {
    padding: 1.5rem 0;
}

.buttons-header {
    margin-bottom: 1.25rem;
}

.buttons-title {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    line-height: 1.3;
}

.buttons-desc {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 400;
    color: #6b7280;
    line-height: 1.5;
}

.buttons-card {
    padding: 1.5rem;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.buttons-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem 1.25rem;
    align-items: start;
}

.buttons-cell {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.buttons-label {
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #4b5563;
}

@media (max-width: 899px) {
    .buttons-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 479px) {
    .buttons-grid {
        grid-template-columns: 1fr;
    }
}
</style>
