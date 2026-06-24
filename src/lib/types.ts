export interface NewsPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    category: string;
    author: string;
    cover_image: string | null;
    meta_description: string | null;
    is_published: boolean;
    scheduled_at: string | null;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    created_by: string | null;
    views: number;
}

export interface Alert {
    id: string;
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    cover_image: string | null;
    is_active: boolean;
    is_published: boolean;
    scheduled_at: string | null;
    published_at: string | null;
    expires_at: string | null;
    created_at: string;
    updated_at: string;
    created_by: string | null;
}

export interface Offer {
    id: string;
    title: string;
    description: string;
    percentage_off: number;
    cover_image: string | null;
    is_active: boolean;
    is_published: boolean;
    scheduled_at: string | null;
    published_at: string | null;
    expires_at: string | null;
    created_at: string;
    updated_at: string;
    created_by: string | null;
}

export interface Incident {
    id: string;
    title: string;
    description: string;
    category: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    status: 'pending' | 'in_progress' | 'resolved' | 'closed';
    reported_by: string | null;
    location: string | null;
    is_published: boolean;
    scheduled_at: string | null;
    published_at: string | null;
    resolved_at: string | null;
    created_at: string;
    updated_at: string;
    created_by: string | null;
}
