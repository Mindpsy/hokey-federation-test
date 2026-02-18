<script lang="ts" setup>
export type InputSize = 'sm' | 'md' | 'lg'

withDefaults(
    defineProps<{
        id?: string
        label?: string
        placeholder?: string
        modelValue?: string
        size?: InputSize
    }>(),
    { size: 'md' }
)

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

function onInput(e: Event) {
    const target = e.target as HTMLInputElement
    emit('update:modelValue', target?.value ?? '')
}
</script>

<template>
    <div class="input-text-root">
        <div class="mb-4">
            <label
                v-if="label"
                :for="id"
                class="input-text-label"
            >
                {{ label }}
            </label>
            <div class="input-text-wrap">
                <input
                    :id="id"
                    type="text"
                    class="input-text-field"
                    :class="[`input-text-field--${size}`]"
                    :placeholder="placeholder"
                    :value="modelValue"
                    @input="onInput"
                >
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.input-text-root {
    width: 100%;
    min-width: 0;
}

.input-text-label {
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    text-align: left;
}

.input-text-wrap {
    display: block;
}

.input-text-field {
    width: 100%;
    box-sizing: border-box;
    line-height: 1;
    color: #1f2937;
    background-color: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;

    &--sm {
        padding: 6px 10px;
        font-size: 13px;
        min-height: 32px;
    }

    &--md {
        padding: 8px 12px;
        font-size: 14px;
        min-height: 36px;
    }

    &--lg {
        padding: 12px 14px;
        font-size: 16px;
        min-height: 42px;
    }

    &::placeholder {
        color: #9ca3af;
    }

    &:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }
}
</style>
