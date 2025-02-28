import template from './sw-dashboard-index.html.twig';

Shopware.Component.override('sw-dashboard-index', {
    template,

    inject: ['systemConfigApiService'],

    data() {
        return {
            adminWelcomeTitle: null,
            adminWelcomeMessage: null
        };
    },

    async created() {
        await this.loadWelcomeText();
    },

    methods: {
        async loadWelcomeText() {
            try {
                const response = await this.systemConfigApiService.getValues('ShizzleAdminThemePro.config');
                const adminWelcomeTitle = response['ShizzleAdminThemePro.config.shizzleAdminWelcomeTitle'];
                const adminWelcomeMessage = response['ShizzleAdminThemePro.config.shizzleAdminWelcomeMessage'];

                if (adminWelcomeTitle) {
                    this.adminWelcomeTitle = adminWelcomeTitle;
                }
                if (adminWelcomeMessage) {
                    this.adminWelcomeMessage = adminWelcomeMessage;
                }
            } catch (error) {
                console.error("Failed to retrieve admin welcome text:", error);
            }
        }
    }
});
