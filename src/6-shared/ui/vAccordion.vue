<script lang="ts" setup>
export interface AccordionItem {
    id?: string
    title: string
    content: string
}

const props = withDefaults(
    defineProps<{
        items?: AccordionItem[]
        openFirst?: boolean
    }>(),
    { openFirst: true }
)

const itemsList = computed(() => props.items ?? [])
const openIndex = ref(props.openFirst ? 0 : -1)

function toggle(index: number) {
    openIndex.value = openIndex.value === index ? -1 : index
}

function isOpen(index: number) {
    return openIndex.value === index
}

const itemId = (index: number) => itemsList.value[index]?.id ?? `accordion-item-${index}`
</script>

<template>
    <div class="accordion" role="list">
        <div
            v-for="(item, index) in itemsList"
            :key="itemId(index)"
            class="accordion-item"
            role="listitem"
        >
            <button
                type="button"
                class="accordion-head"
                :class="{ collapsed: !isOpen(index) }"
                :aria-expanded="isOpen(index)"
                :aria-controls="itemId(index)"
                :id="`${itemId(index)}-head`"
                @click="toggle(index)"
            >
                <h6 class="accordion-title">{{ item.title }}</h6>
                <span class="accordion-icon" aria-hidden="true" />
            </button>
            <div
                :id="itemId(index)"
                class="accordion-body"
                :class="{ show: isOpen(index) }"
                role="region"
                :aria-labelledby="`${itemId(index)}-head`"
                :hidden="!isOpen(index)"
            >
                <div class="accordion-inner" v-html="item.content" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.accordion {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    overflow: hidden;
    background: #ffffff;
}

.accordion-item {
    border-bottom: 1px solid #e2e2e2;
    background: #ffffff;

    &:last-child {
        border-bottom: none;
    }
}

.accordion-head {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 16px 20px;
    font: inherit;
    font-weight: 600;
    color: #212529;
    text-align: left;
    background: #ffffff;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
        background: #ffffff;
    }
}

.accordion-title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.4;
    flex: 1;
    min-width: 0;
}

.accordion-icon {
    flex-shrink: 0;
    width: 0.5rem;
    height: 0.5rem;
    border-right: 1px solid #212529;
    border-bottom: 1px solid #212529;
    transform: rotate(45deg) scaleY(1);
    transition: none;
}

.accordion-head:not(.collapsed) .accordion-icon {
    transform: rotate(-45deg) scaleY(-1);
}

.accordion-body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s ease;

    &.show {
        grid-template-rows: 1fr;
    }
}

.accordion-inner {
    min-height: 0;
    overflow: hidden;
    padding: 16px 20px;
    font-size: 14px;
    line-height: 1.5;
    color: #6c757d;
    background: #ffffff;
    border-top: 1px solid #e2e2e2;

    :deep(p) {
        margin: 0 0 16px;

        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
