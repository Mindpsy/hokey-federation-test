<script lang="ts" setup>
import { InputText, vTextarea, InputFile, InputSelect } from '~shared/ui'

definePage({
    meta: {
        layout: 'home'
    }
})

const textareaValue = ref('Large text area content')
const selectValue = ref('default_option')

const selectOptions = [
    { value: 'default_option', label: 'Default Option' },
    { value: 'option_select_name', label: 'Option select name' },
    { value: 'option_select_name_2', label: 'Option select name' },
]
</script>

<template>
    <div class="inputs-page">
        <div class="inputs-card">
            <span class="inputs-card-title">Default Preview</span>

            <div class="inputs-grid">
                <InputText
                    label="Input text Default"
                    placeholder="Input placeholder"
                />
                <vTextarea
                    v-model="textareaValue"
                    label="Textarea"
                    :rows="5"
                />
                <InputSelect
                    v-model="selectValue"
                    label="Default Select"
                    placeholder="Default Option"
                    :options="selectOptions"
                />
                <div class="inputs-grid-full">
                    <InputFile
                        label="Default File Upload"
                        placeholder="Choose file"
                    />
                </div>
            </div>
        </div>

        <div class="inputs-card inputs-card--spaced">
            <span class="inputs-card-title">Size Preview</span>
            <div class="inputs-size-row">
                <InputText
                    label="Input Large"
                    placeholder="Input Large"
                    size="lg"
                />
                <InputText
                    label="Input Regular"
                    placeholder="Input Regular"
                    size="md"
                />
                <InputText
                    label="Input Small"
                    placeholder="Input Small"
                    size="sm"
                />
            </div>
            <p class="inputs-size-hint">
                Use <code>size="lg"</code> or <code>size="sm"</code> with <code>size="md"</code> (default) for large or small input box.
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.inputs-page {
    padding: 1.5rem 0;
}

.inputs-card {
    padding: 1.5rem;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);

    &--spaced {
        margin-top: 1.5rem;
    }
}

.inputs-size-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-bottom: 1rem;
}

.inputs-size-hint {
    margin: 0;
    font-size: 0.8125rem;
    color: #b4536b;
}

.inputs-size-hint code {
    padding: 0.15em 0.4em;
    font-size: 0.9em;
    background: #fef2f2;
    border-radius: 4px;
}

.inputs-card-title {
    display: block;
    margin-bottom: 1.25rem;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #6b7280;
}

.inputs-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem 2rem;
    align-items: start;
}

.inputs-grid-full {
    grid-column: 1 / -1;
}

@media (max-width: 639px) {
    .inputs-grid {
        grid-template-columns: 1fr;
    }

    .inputs-size-row {
        grid-template-columns: 1fr;
    }
}
</style>
