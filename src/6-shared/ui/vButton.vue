<script setup lang="ts">
import {
    ButtonVariants,
    ButtonTypes,
    ButtonHeights,
    ButtonWidths,
} from '../config/vButton.types'

const props = withDefaults(
    defineProps<{
        text?: string,
        href?: string,
        variant?: ButtonVariants | keyof typeof ButtonVariants,
        disabled?: boolean,
        height?: string,
        width?: string,
        type?: ButtonTypes | keyof typeof ButtonTypes,
    }>(),
    {
        variant: ButtonVariants.primary,
        disabled: false,
        type: ButtonTypes.link,
    }
)

const currentVariant = computed(() => {
    return ButtonVariants[props.variant] ?? ButtonVariants.primary
})

const buttonSize = computed(() => {
    const height = ButtonHeights[currentVariant.value as keyof typeof ButtonHeights]
    const width =  ButtonWidths[currentVariant.value as keyof typeof ButtonWidths]
    return {
        height: `${height}px`,
        width: `${width}px`,
    }
})

const customButtonSize = computed(() => {
    return {
        height: props.height ? `${props.height}px` : buttonSize.value.height,
        width: props.width ? `${props.width}px` : buttonSize.value.width,
    }
})

/* не стал прокидывать события и реализовывать их, 
так как текущие возможности vue позволяют просто накинуть обработчики собитий поверх компонентов в родительском компоненте */
</script>

<template>
    <a 
        v-if="type === ButtonTypes.link"
        :href="href" 
        :class="{
            [`btn-${currentVariant}`]: true,
            btn: currentVariant
        }"
        :style="customButtonSize"
    >   
        {{ text }}
    </a>
    <button
        v-else
        :type="type"
        class="btn"
        :class="{
            [`btn-${currentVariant}`]: true,
        }"
        :disabled="disabled"
        :style="customButtonSize"
    >
        {{ text }}
    </button>
</template>

<style scoped lang="scss">
.btn {
    display: inline-flex;
    align-items: center;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    box-sizing: border-box;
    position: relative;
    font-size: 13px;
    letter-spacing: .02em;
    display: inline-flex;
    align-items: center;
    padding: 7px 18px;
    border-radius: 4px;
    border: none;
    user-select: none;

    &:hover {
        cursor: pointer;
    }
}

.btn-primary {
    color: #fff;
    background-color: #6576ff;
    border-color: #6576ff;

    &:hover {
        background-color: #5664d9;
        border-color: #515ecc;

        &:active {
            background-color: #4c59bf;
        }
    }
}

.btn-secondary {
    color: #fff;
    background-color: #364a63;
    border-color: #364a63;

    &:hover {
        color: #fff;
        background-color: #2e3f54;
        border-color: #2b3b4f;

        &:active {
            background-color: #2b3b4f;
            border-color: #29384a;
        }
    }
}

.btn-success {
    color: #fff;
    background-color: #1ee0ac;
    border-color: #1ee0ac;

    &:hover {
        background-color: #1abe92;
        border-color: #18b38a;

        &:active {
            background-color: #18b38a;
            border-color: #17a881;
        }
    }
}

.btn-danger {
    color: #fff;
    background-color: #e85347;
    border-color: #e85347;

    &:hover {
        background-color: #c5473c;
        border-color: #ba4239;

        &:active {
            background-color: #ba4239;
            border-color: #ae3e35;
        }
    }
}

.btn-warning {
    color: #1f2937;
    background-color: #f4bd0e;
    border-color: #f4bd0e;

    &:hover {
        background-color: #cfa10c;
        border-color: #c3970b;

        &:active {
            background-color: #c3970b;
            border-color: #b78e0b;
        }
    }
}

.btn-info {
    color: #fff;
    background-color: #09c2de;
    border-color: #09c2de;

    &:hover {
        background-color: #08a5bd;
        border-color: #079bb2;

        &:active {
            background-color: #079bb2;
            border-color:#0792a7;
        }
    }
}

.btn-light {
    color: #374151;
    background-color: #f3f4f6;
    border: 1px solid #f3f4f6;

    &:hover {
        background-color: #e5e7eb;
        border-color: #9ca3af;

        &:active {
            background-color: #d1d5db;
            border-color: #6b7280;
        }
    }
}

.btn-dark {
    color: #fff;
    background-color: #1f2b3a;
    border-color: #1f2b3a;

    &:hover {
        background-color: #414b58;
        border-color: #35404e;

        &:active {
            background-color: #35404e;
        }
    }
}
</style>