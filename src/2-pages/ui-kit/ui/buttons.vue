<script setup lang="ts">
import { vButton, ButtonVariants } from '~shared/ui'

definePage({
    meta: {
        layout: 'home',
    }
}
)
</script>

<template>
    <div class="nk-block-head-content">
        <h5 class="title nk-block-title">Example with Variations</h5>
        <p>Bootstrap includes several predefined button styles, each serving its own semantic purpose, with a few extras thrown in for more control.</p>
    </div>
    <div class="nk-block-body">
            <ul class="preview-btn-list">
                <li class="preview-btn-item">
                    <span class="preview-title overline-title">Primary</span>
                    <vButton :variant="ButtonVariants.primary" text="Primary" type="button" height="136" width="187.1406" />
                </li>
                <li class="preview-btn-item">
                    <span class="preview-title overline-title">Secondary</span>
                    <vButton variant="secondary" text="Secondary" />
                </li>
                <li class="preview-btn-item">
                    <span class="preview-title overline-title">Success</span>
                    <vButton variant="success" text="Success" />
                </li>
                <li class="preview-btn-item">
                    <span class="preview-title overline-title">Danger</span>
                    <vButton variant="danger" text="Danger" />
                </li>
                <li class="preview-btn-item">
                    <span class="preview-title overline-title">Warning</span>
                    <vButton variant="warning" text="Warning" />
                </li>
                <li class="preview-btn-item">
                    <span class="preview-title overline-title">Info</span>
                    <vButton variant="info" text="Info" />
                </li>
                <li class="preview-btn-item">
                    <span class="preview-title overline-title">Light</span>
                    <vButton variant="light" text="Light" />
                </li>
                <li class="preview-btn-item">
                    <span class="preview-title overline-title">Dark</span>
                    <vButton variant="dark" text="Dark" />
                </li>
            </ul>
    </div>
</template>

<style scoped lang="scss">
.nk-block-head-content {
    font-family: 'Roboto', sans-serif;

    .title {
        font-weight: 500;
        font-size: 20px;
    }
    p {
        font-weight: 400;
        font-size: 14px;
    }
}

.nk-block-body {
    box-sizing: border-box;
    padding: 20px;
    text-align: start;
    border: 1px solid rgb(219, 223, 234);
    border-radius: 4px;

    .preview-btn-list {
        display: flex;
        flex-wrap: wrap;
        margin: -.75rem;
        list-style: none;
        margin: -.75;
    

        .preview-btn-item {
            box-sizing: border-box;
            width: 25%;
            padding: .75rem;

            .preview-title {
                display: block;
                padding-bottom: 12px;
                text-transform: uppercase;
                color: rgb(128, 148, 174);
            }
        }
    }
}
</style>