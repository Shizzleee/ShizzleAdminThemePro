import template from './sw-dashboard-index.html.twig'
import {CONFIG_KEY} from "../common/variables"

Shopware.Component.override('sw-dashboard-index', {
    template,

    inject: ['systemConfigApiService'],

    data() {
        return {
            adminWelcomeTitle: null,
            adminWelcomeMessage: null
        }
    },

    async created() {
        await this.loadWelcomeText()
    },

    methods: {
        async loadWelcomeText() {
            try {
                const response = await this.systemConfigApiService.getValues(CONFIG_KEY)
                const adminWelcomeTitle = response[CONFIG_KEY + '.shizzleAdminWelcomeTitle']
                const adminWelcomeMessage = response[CONFIG_KEY + '.shizzleAdminWelcomeMessage']

                if (adminWelcomeTitle) {
                    this.adminWelcomeTitle = adminWelcomeTitle
                }
                if (adminWelcomeMessage) {
                    this.adminWelcomeMessage = adminWelcomeMessage
                }

            } catch (error) {
                console.error("Failed to load admin welcome text:", error)
            }
        }
    }
})
