import Webflow from "webflow-api";

export class WebflowIntegration {
    apiKey = null;
    api = null;

    constructor(apiKey) {
        this.apiKey = apiKey;
        this.api = new Webflow({ token: this.apiKey });
    }

    async getFirstSite() {
        const sites = await this.api.sites();

        return sites.length ? sites[0] : null;
    }

    async createProduct(siteId, createWebflowProductDto) {
       try {
           await this.api.post(`/sites/${siteId}/products`, createWebflowProductDto);
       } catch (e) {
           console.log(e);
       }
    }
}
