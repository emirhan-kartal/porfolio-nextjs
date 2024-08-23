import { Html, Head, Main, NextScript } from "next/document";

import {
    DocumentHeadTags,
    documentGetInitialProps,
} from "@mui/material-nextjs/v14-pagesRouter";

export default function Document(props: any) {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="description"
                    content="Türkiye'de işletmeler için dijital ürünler geliştiren bir yazılım geliştiricisiyim. Özelleştirilmiş yazılım çözümleri ve modern web uygulamalarıyla, işletmenizin dijital dönüşüm sürecine güç katıyorum. Next.js gibi ileri teknoloji araçları kullanarak, yüksek performanslı ve SEO dostu web siteleri tasarlıyorum. Kullanıcı odaklı tasarım ve tam yığın geliştirme konularındaki deneyimimle, iş ihtiyaçlarınıza uygun çözümler sunuyorum. Dijital dünyada öne çıkmak için benimle iletişime geçin."
                />
                <meta
                    name="keywords"
                    content="dijital ürün geliştirme, iş çözümleri, özel yazılım geliştirme, web uygulama geliştirme, Next.js geliştirici, dijital dönüşüm hizmetleri, Next.js SEO optimizasyonu, önyüz geliştirme, tam yığın geliştirme, kullanıcı odaklı tasarım, Türkiye'de dijital ürün geliştirme, İstanbul'da yazılım geliştirme, web tasarım, yazılım geliştirme Türkiye, özel yazılım çözümleri
"
                />
                <DocumentHeadTags {...props} />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

Document.getInitialProps = async (ctx: any) => {
    const initialProps = await documentGetInitialProps(ctx);
    return { ...initialProps };
};
