import nextConfig from "../../next.config.mjs";

export default function getRevalidatingPaths(
    idString: string,
    contentType: string
) {
    const urlsToBeRevalidated: string[] = [
        `/${contentType}`,
        `/${contentType}/${idString}`,
    ];
    const defaultLocale = nextConfig.i18n?.defaultLocale;
    nextConfig.i18n?.locales.forEach((locale: any) => {
        if (defaultLocale !== locale) {
            urlsToBeRevalidated.push(`/${locale}/${contentType}/${idString}`);
            urlsToBeRevalidated.push(`/${locale}/${contentType}`);
        }
    });

    return urlsToBeRevalidated;
}
