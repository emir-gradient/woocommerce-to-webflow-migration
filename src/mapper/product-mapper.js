export class ProductMapper {
  toCreateWebflowProductDto(wooCommerceProduct, wooCommerceStoreCurrencyCode) {
    return {
      product: {
        fields: {
          _draft: true,
          _archived: false,
          name: wooCommerceProduct.name,
          slug: wooCommerceProduct.slug,
          description: this.parseDescriptionStripTags(wooCommerceProduct.description),
        }
      },
      sku: {
        fields: {
          _archived: false,
          _draft: true,
          name: wooCommerceProduct.name,
          slug: wooCommerceProduct.sku,
          'main-image': {
            url: wooCommerceProduct.images[0].url
          },
          price: {
            unit: wooCommerceStoreCurrencyCode,
            value: this.parsePriceToInt(wooCommerceProduct.price),
          }
        },
      }
    };
  }

  parseDescriptionStripTags(description) {
    return description.replace(/<\/?[^>]+(>|$)/g, "");
  }

  parsePriceToInt(price) {
    if (price.indexOf('.') === -1) {
      return parseInt(price) * 100;
    } else {
      const parts = price.split('.');
      if (parts[1].length > 2) {
        parts[1] = parts[1].substring(0, 2);
      } else if (parts[1].length === 1) {
        parts[1] += '0';
      }

      price = parts.join('');

      return parseInt(price);
    }
  }
}
