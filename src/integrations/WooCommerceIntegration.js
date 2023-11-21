import pkg from "@woocommerce/woocommerce-rest-api";
const WooCommerceRestApi = pkg.default;

export class WooCommerceIntegration {
  constructor(consumerKey, consumerSecret, storeUrl) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.storeUrl = storeUrl;

    this.api = new WooCommerceRestApi({
      url: this.storeUrl,
      consumerKey: this.consumerKey,
      consumerSecret: this.consumerSecret,
      version: 'wc/v3'
    });
  }

  async getProduct(slug) {
    const products = await this.api.get('products', {
      slug
    });

    return products.data.length ? products.data[0] : null;
  }

  async getStoreCurrencyCode() {
    const currentCurrency = await this.api.get('data/currencies/current');

    return currentCurrency.data.code;
  }
}
