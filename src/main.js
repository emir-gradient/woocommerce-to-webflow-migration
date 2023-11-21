import { WebflowIntegration } from "./integrations/WebflowIntegration.js";
import { WooCommerceIntegration } from "./integrations/WooCommerceIntegration.js";
import { ApiKeys } from "./constants/api-keys.js";
import { ProductMapper } from "./mapper/product-mapper.js";


async function load() {
  const productSlug = 'shoes';

  const webflowIntegration = new WebflowIntegration(ApiKeys.Webflow);
  const wooCommerceIntegration = new WooCommerceIntegration(
    ApiKeys.WooCommerceConsumerKey,
    ApiKeys.WooCommerceConsumerSecret,
    "http://192.168.1.168:1081");
  const productMapper = new ProductMapper();

  const webflowSite = await webflowIntegration.getFirstSite();

  const wooCommerceProduct = await wooCommerceIntegration.getProduct(productSlug);
  const wooCommerceStoreCurrencyCode = await wooCommerceIntegration.getStoreCurrencyCode();

  const createWebflowProductDto = productMapper.toCreateWebflowProductDto(wooCommerceProduct, wooCommerceStoreCurrencyCode);

  await webflowIntegration.createProduct(webflowSite._id, createWebflowProductDto);
}

load().then(() => {
  console.log("Finished!");
});
