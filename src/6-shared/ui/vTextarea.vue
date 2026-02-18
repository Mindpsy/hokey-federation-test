<script lang="ts" setup>
withDefaults(
    defineProps<{
        id?: string
        label?: string
        placeholder?: string
        modelValue?: string
        rows?: number
        size?: 'sm' | 'md' | 'lg'
    }>(),
    { rows: 4, size: 'md' }
)

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

function onInput(e: Event) {
    const target = e.target as HTMLTextAreaElement
    emit('update:modelValue', target?.value ?? '')
}
</script>

<template>
    <div class="v-textarea">
        <label
            v-if="label"
            :for="id"
            class="v-textarea-label"
        >
            {{ label }}
        </label>
        <div class="v-textarea-wrap">
            <textarea
                :id="id"
                class="v-textarea-field"
                :class="[`v-textarea-field--${size}`]"
                :placeholder="placeholder"
                :rows="rows"
                :value="modelValue"
                @input="onInput"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.v-textarea {
    margin-bottom: 1rem;
}

.v-textarea-label {
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    text-align: left;
}

.v-textarea-wrap {
    display: block;
}

.v-textarea-field {
    width: 100%;
    box-sizing: border-box;
    line-height: 1.5;
    color: #1f2937;
    background-color: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    outline: none;
    resize: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
    font-family: inherit;

    &--sm {
        padding: 6px 10px;
        font-size: 13px;
    }

    &--md {
        padding: 8px 12px;
        font-size: 14px;
    }

    &--lg {
        padding: 12px 14px;
        font-size: 16px;
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
