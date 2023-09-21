import { Metadata } from "next";

export const generalMetaData: Metadata = {
    viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
    themeColor: "#000000",
    authors: [
        {
            name: "webXwiz",
            url: "https://webxwiz.com",
        },
        {
            name: "Dmytro Kotykhin",
            url: "https://dmytro-kotykhin.space",
        },
    ],
};

export const generalOpenGraph: {} = {
    type: "website",
    url: "https://www.combinedinitiative.com",
    title: "Combined Initiative",
    description:
        "Combined Initiative.",
    images: "/preview.png",
}

export const generalTwitter: {} = {
    card: "summary_large_image",
    title: "Combined Initiative",
    description:
        "Combined Initiative.",
    images: ["https://pristinefm.com/preview.png"],
}

export const mainPageMetaData: Metadata = {
    title: "Combined Initiative",
    description:
        "Combined Initiative.",
    keywords: [],
    metadataBase: new URL("https://www.combinedinitiative.com"),
    openGraph: generalOpenGraph,
    twitter: generalTwitter,
};

export const eventPage: Metadata = {
    title: "Combined Initiative - About",
    description: "Combined Initiative",
    keywords: [],
    metadataBase: new URL("https://www.combinedinitiative.com/about"),
    openGraph: generalOpenGraph,
    twitter: generalTwitter,
};

export const termsPage: Metadata = {
    title: "Cleaning company - Industries",
    description: "Pristine Cleaning - Your trusted cleaning company partner",
    keywords: [],
    metadataBase: new URL("https://pristinefm.com/industries"),
    openGraph: generalOpenGraph,
    twitter: generalTwitter,
};

export const changeEvent: Metadata = {
    title: "Cleaning company - Services",
    description: "Pristine Cleaning - Your trusted cleaning company partner",
    keywords: [],
    metadataBase: new URL("https://pristinefm.com/service"),
    openGraph: generalOpenGraph,
    twitter: generalTwitter,
};

export const createEvent: Metadata = {
    title: "Cleaning company - Contact",
    description: "Pristine Cleaning - Your trusted cleaning company partner",
    keywords: [],
    metadataBase: new URL("https://pristinefm.com/contact"),
    openGraph: generalOpenGraph,
    twitter: generalTwitter,
};

export const eventsAdmin: Metadata = {
    title: "Cleaning company - Contact",
    description: "Pristine Cleaning - Your trusted cleaning company partner",
    keywords: [],
    metadataBase: new URL("https://pristinefm.com/contact"),
    openGraph: generalOpenGraph,
    twitter: generalTwitter,
};