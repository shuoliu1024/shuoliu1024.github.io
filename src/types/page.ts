export interface BasePageConfig {
    type: 'about' | 'publication' | 'card' | 'text';
    title: string;
    description?: string;
}

export interface PublicationPageConfig extends BasePageConfig {
    type: 'publication';
    source: string;
}

export interface TextPageConfig extends BasePageConfig {
    type: 'text';
    source: string;
}

export interface CardItem {
    title: string;
    subtitle?: string;
    date?: string;
    content?: string;
    tags?: string[];
    link?: string;
    image?: string;
}

export interface CardPageConfig extends BasePageConfig {
    type: 'card';
    items: CardItem[];
}

export interface EducationData {
    type: 'education';
    title?: string;
    items: Array<{
        institution: string;
        degree: string;
        date: string;
        logo?: string;
        details?: string[];
    }>;
}

export interface ExperienceData {
    type: 'experience';
    title?: string;
    items: Array<{
        organization: string;
        group?: string;
        logo?: string;
        roles?: Array<{ title: string; date: string }>;
        bullets?: Array<{ text: string }>;
    }>;
}

export interface AwardsData {
    type: 'awards';
    title?: string;
    items: Array<{
        title: string;
        organization?: string;
        date?: string;
        content?: string;
    }>;
}
