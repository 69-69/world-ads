type StoreSetupForm = {
    seller_type?: string;
    name: string;
    website: string;
    city: string;
    state_region: string;
    address: string;
    zipcode: string;
    country: string;
    category: string;
    description: string;
    logo?: File;
};

class StoreSetup {
    s_role?: string;
    user_id?: string;
    name: string;
    website: string;
    city: string;
    state_region: string;
    address: string;
    zipcode: string;
    country: string;
    category: string;
    description: string;
    logo?: File;

    constructor(form: StoreSetupForm) {
        this.s_role = form.seller_type;
        this.user_id = '';
        this.name = form.name;
        this.city = form.city;
        this.website = form.website;
        this.zipcode = form.zipcode;
        this.country = form.country;
        this.address = form.address;
        this.category = form.category;
        this.state_region = form.state_region
        this.description = form.description;
        this.logo = form.logo;
    }

    // to form data
    toFormData() {
        const formData = new FormData();

        formData.append('s_role', this.s_role || '');
        formData.append('user_id', this.user_id || '');
        formData.append('name', this.name);
        formData.append('city', this.city);
        formData.append('website', this.website);
        formData.append('zipcode', this.zipcode);
        formData.append('country', this.country);
        formData.append('address', this.address);
        formData.append('category', this.category);
        formData.append('state_region', this.state_region);
        formData.append('description', this.description);
        if (this.logo) {
            formData.append('logo', this.logo, this.logo.name);
        }

        return formData;
    }

}

export {StoreSetup, type StoreSetupForm};
