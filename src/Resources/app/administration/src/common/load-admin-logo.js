export async function loadAdminLogo() {
    try {
        const response = await this.systemConfigApiService.getValues('ShizzleAdminThemePro.config');
        console.log(response);
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
