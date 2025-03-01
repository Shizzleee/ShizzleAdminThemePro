import { CONFIG_KEY } from "./variables"

export async function applyCustomColors() {
    try {
        const response = await this.systemConfigApiService.getValues(CONFIG_KEY)

        const adminMenuPrimaryColor = response[CONFIG_KEY + '.shizzleAdminMenuPrimaryColor']
        const adminMenuPrimaryColorHover = adjustBrightness(adminMenuPrimaryColor, 0.2)
        const adminMenuSecondaryColor = response[CONFIG_KEY + '.shizzleAdminMenuSecondaryColor']

        document.documentElement.style.setProperty('--shizzle-admin-menu-primary-color', adminMenuPrimaryColor)
        document.documentElement.style.setProperty('--shizzle-admin-menu-secondary-color', adminMenuSecondaryColor)
        document.documentElement.style.setProperty('--shizzle-admin-menu-primary-color-hover', adminMenuPrimaryColorHover)

    } catch (error) {
        console.error("Failed to load custom colors for admin dashboard:", error)
    }
}

function adjustBrightness(hex, percent) {
    hex = hex.replace(/^#/, '')

    let r = parseInt(hex.substring(0, 2), 16)
    let g = parseInt(hex.substring(2, 4), 16)
    let b = parseInt(hex.substring(4, 6), 16)

    r = Math.min(255, Math.max(25, r + (r * percent)))
    g = Math.min(255, Math.max(25, g + (g * percent)))
    b = Math.min(255, Math.max(25, b + (b * percent)))

    return `#${((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)).toString(16).slice(1)}`
}