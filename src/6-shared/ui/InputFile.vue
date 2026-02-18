<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        id?: string
        label?: string
        placeholder?: string
        multiple?: boolean
        size?: 'sm' | 'md' | 'lg'
    }>(),
    { placeholder: 'Choose file', multiple: false, size: 'md' }
)

const emit = defineEmits<{
    'update:files': [files: FileList | null]
}>()

const inputId = computed(() => props.id ?? `file-input-${Math.random().toString(36).slice(2, 9)}`)
const displayText = ref('')

function onChange(e: Event) {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (files?.length) {
        displayText.value = Array.from(files)
            .map((f) => f.name)
            .join(', ')
    } else {
        displayText.value = ''
    }
    emit('update:files', files ?? null)
}

</script>

<template>
    <div class="input-file-root">
        <label
            v-if="label"
            class="input-file-label"
        >
            {{ label }}
        </label>
        <div class="input-file-wrap">
            <label class="input-file-bar" :class="[`input-file-bar--${size}`]" :for="inputId">
                <input
                    :id="inputId"
                    type="file"
                    class="input-file-input"
                    :multiple="multiple"
                    @change="onChange"
                >
                <span class="input-file-text" :class="{ 'input-file-text--has-value': displayText }">{{ displayText || placeholder }}</span>
                <span class="input-file-btn">Browse</span>
            </label>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.input-file-root {
    width: 100%;
    min-width: 0;
    margin-bottom: 1rem;
}

.input-file-label {
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    text-align: left;
}

.input-file-wrap {
    display: block;
}

.input-file-bar {
    display: flex;
    align-items: stretch;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;

    &--sm {
        min-height: 32px;

        .input-file-text,
        .input-file-btn {
            padding: 6px 10px;
            font-size: 13px;
        }
    }

    &--md {
        min-height: 40px;

        .input-file-text,
        .input-file-btn {
            padding: 8px 12px;
            font-size: 14px;
        }
    }

    &--lg {
        min-height: 48px;

        .input-file-text,
        .input-file-btn {
            padding: 12px 14px;
            font-size: 16px;
        }
    }

    &:focus-within {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        outline: none;
    }
}

.input-file-input {
    position: absolute;
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    z-index: -1;
}

.input-file-text {
    flex: 1;
    line-height: 1.5;
    color: #9ca3af;
    min-width: 0;

    &.input-file-text--has-value {
        color: #1f2937;
    }
}

.input-file-btn {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    font-weight: 500;
    color: #374151;
    background-color: #e9ecef;
    border-left: 1px solid #e5e7eb;
    cursor: pointer;
    pointer-events: none;
    transition: background-color 0.15s ease;
}

.input-file-bar:hover .input-file-btn {
    background-color: #dee2e6;
}
</style>
