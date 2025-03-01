import { CONFIG_KEY } from "./variables"

export async function loadAdminLogo() {
    try {
        const response = await this.systemConfigApiService.getValues(CONFIG_KEY)
        console.log(response)
        const mediaId = response[CONFIG_KEY + '.shizzleAdminLogo']

        if (mediaId) {
            const mediaRepository = this.repositoryFactory.create('media')
            const media = await mediaRepository.get(mediaId, Shopware.Context.api)

            if (media && media.url) {
                this.adminLogoUrl = media.url
            }
        }

    } catch (error) {
        console.error("Failed to load admin logo:", error)
    }
}
