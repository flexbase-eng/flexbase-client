export interface Project {
    id?: string;
    name?: string;
    description?: string;
    location?: {
        address?: string;
        city?: string;
        postalCode?: string;
        state?: string;
        country?: string;
    };
}
