import { applyCustomColors } from "../common/apply-custom-colors"

Shopware.Component.override('sw-desktop', {
    undefined,

    inject: ['systemConfigApiService'],

    async created() {
        await applyCustomColors.call(this)
    },
})
