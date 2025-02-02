type StoreSetupForm = {
    seller_type?: string;
    name: string;
    website: string;
    city: string;
    state_region: string;
    zipcode: string;
    country: string;
    category: string;
    description: string;
    file?: File[];
};

class StoreSetup {
    s_role?: string;
    user_id?: string;
    name: string;
    website: string;
    city: string;
    state_region: string;
    zipcode: string;
    country: string;
    category: string;
    description: string;
    file?: File[];

    constructor(form: StoreSetupForm) {
        this.s_role = form.seller_type;
        this.name = form.name;
        this.city = form.city;
        this.website = form.website;
        this.zipcode = form.zipcode;
        this.country = form.country;
        this.category = form.category;
        this.state_region = form.state_region
        this.description = form.description;
        this.file = form.file;
    }
}

export {StoreSetup, type StoreSetupForm};
