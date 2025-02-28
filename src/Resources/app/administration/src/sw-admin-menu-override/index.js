import template from './sw-admin-menu.html.twig';
import { loadAdminLogo } from "../common/load-admin-logo";

Shopware.Component.override('sw-admin-menu', {
    template,

    inject: ['systemConfigApiService', 'repositoryFactory'],

    data() {
        return {
            adminLogoUrl: null,
        };
    },

    async created() {
        await loadAdminLogo.call(this);
    },
});
