<script lang="ts" setup>
export interface SelectOption {
    value: string
    label: string
}

const props = withDefaults(
    defineProps<{
        id?: string
        label?: string
        placeholder?: string
        modelValue?: string
        options?: SelectOption[]
        size?: 'sm' | 'md' | 'lg'
    }>(),
    { placeholder: 'Select...', size: 'md' }
)

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

const isOpen = ref(false)
const triggerRef = ref<HTMLElement | null>(null)

const selectedOption = computed(() =>
    (props.options ?? []).find((o) => o.value === props.modelValue)
)
const displayLabel = computed(() => selectedOption.value?.label ?? props.placeholder)
const optionsList = computed(() => props.options ?? [])

function toggle() {
    isOpen.value = !isOpen.value
}

function select(option: SelectOption) {
    emit('update:modelValue', option.value)
    isOpen.value = false
}

function handleClickOutside(e: MouseEvent) {
    if (triggerRef.value && !triggerRef.value.contains(e.target as Node)) {
        isOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
    <div ref="triggerRef" class="input-select-root">
        <label
            v-if="label"
            class="input-select-label"
        >
            {{ label }}
        </label>
        <div class="input-select-wrap">
            <button
                :id="id"
                type="button"
                class="input-select-trigger"
                :class="[`input-select-trigger--${size}`, { 'input-select-trigger--open': isOpen }]"
                aria-haspopup="listbox"
                :aria-expanded="isOpen"
                @click.prevent="toggle"
            >
                <span
                class="input-select-value"
                :class="{ 'input-select-value--placeholder': !modelValue }"
            >{{ displayLabel }}</span>
                <span class="input-select-chevron" aria-hidden="true">▼</span>
            </button>
            <Transition name="input-select-drop">
                <ul
                    v-show="isOpen"
                    class="input-select-list"
                    role="listbox"
                    :aria-activedescendant="modelValue"
                >
                    <li
                        v-for="opt in optionsList"
                        :key="opt.value"
                        role="option"
                        class="input-select-option"
                        :class="{ 'input-select-option--selected': opt.value === modelValue }"
                        :aria-selected="opt.value === modelValue"
                        @click.prevent="select(opt)"
                    >
                        {{ opt.label }}
                    </li>
                </ul>
            </Transition>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.input-select-root {
    width: 100%;
    min-width: 0;
    margin-bottom: 1rem;
    position: relative;
}

.input-select-label {
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    text-align: left;
}

.input-select-wrap {
    position: relative;
}

.input-select-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    box-sizing: border-box;
    line-height: 1.5;
    color: #1f2937;
    text-align: left;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;

    &--sm {
        min-height: 32px;
        padding: 6px 10px;
        font-size: 13px;
    }

    &--md {
        min-height: 40px;
        padding: 8px 12px;
        font-size: 14px;
    }

    &--lg {
        min-height: 48px;
        padding: 12px 14px;
        font-size: 16px;
    }

    &:hover {
        border-color: #d1d5db;
    }

    &:focus,
    &.input-select-trigger--open {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }
}

.input-select-value {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.input-select-value--placeholder {
    color: #9ca3af;
}

.input-select-chevron {
    flex-shrink: 0;
    font-size: 10px;
    color: #6b7280;
    transition: transform 0.2s ease;
}

.input-select-trigger--open .input-select-chevron {
    transform: rotate(180deg);
}

.input-select-list {
    position: absolute;
    z-index: 10;
    top: calc(100% + 2px);
    left: 0;
    right: 0;
    margin: 0;
    // padding: 4px 0;
    list-style: none;
    background: #fff;
    border: 1px solid #d1d5db;
    // border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-height: 240px;
    overflow-y: auto;
}

.input-select-option {
    padding: 8px 12px;
    font-size: 14px;
    line-height: 1;
    color: #1f2937;
    cursor: pointer;
    transition: background-color 0.1s ease, color 0.1s ease;

    &:hover,
    &.input-select-option--selected {
        background-color: #3b82f6;
        color: #fff;
    }
}

.input-select-drop-enter-active,
.input-select-drop-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
}
.input-select-drop-enter-from,
.input-select-drop-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}
</style>
