import { mockAlerts, mockIncidents, mockNewsPosts, mockOffers } from './mock-data';

type ServiceResponse<T> = { success: true; data: T } | { success: false; data: T };

const publishedNews = () =>
    mockNewsPosts.filter((post) => post.is_published);

export const newsService = {
    async getPublished() {
        return { success: true as const, data: publishedNews() };
    },

    async getBySlug(slug: string) {
        const post = publishedNews().find((item) => item.slug === slug);
        if (!post) {
            return { success: false as const, data: null };
        }
        return { success: true as const, data: post };
    },
};

export const alertsService = {
    async getAll() {
        const data = mockAlerts.filter((alert) => alert.is_active && alert.is_published);
        return { success: true as const, data };
    },
};

export const incidentsService = {
    async getPublished() {
        const data = mockIncidents.filter((incident) => incident.is_published);
        return { success: true as const, data };
    },
};

export const offersService = {
    async getActive() {
        const data = mockOffers.filter((offer) => offer.is_active && offer.is_published);
        return { success: true as const, data };
    },
};

export type { ServiceResponse };
