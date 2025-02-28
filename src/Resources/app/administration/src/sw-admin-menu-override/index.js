import template from './sw-admin-menu.html.twig';

Shopware.Component.override('sw-admin-menu', {
    template,

    inject: ['systemConfigApiService', 'repositoryFactory'],

    data() {
        return {
            adminLogoUrl: null,
        };
    },

    async created() {
        await this.loadAdminLogo();
    },

    methods: {
        async loadAdminLogo() {
            try {
                const response = await this.systemConfigApiService.getValues('ShizzleAdminThemePro.config');
                const mediaId = response['ShizzleAdminThemePro.config.shizzleAdminLogo'];

                if (mediaId) {
                    const mediaRepository = this.repositoryFactory.create('media');
                    const media = await mediaRepository.get(mediaId, Shopware.Context.api);

                    if (media && media.url) {
                        this.adminLogoUrl = media.url;
                    }
                }
            } catch (error) {
                console.error("Failed to load admin logo:", error);
            }
        }
    }
});
