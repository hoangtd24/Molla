import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query getProducts($skip: Int, $category: Int) {
    getProducts(skip: $skip, category: $category) {
      id
      name
      price
      newPrice
      images
      discount {
        id
        discount_percent
      }
    }
  }
`;

export const DETAIL_PRODUCT = gql`
  query detailProduct($id: Float!) {
    detailProduct(id: $id) {
      code
      success
      message
      relatedProduct {
        id
        name
        price
        newPrice
        discount {
          discount_percent
        }
        images
      }
      product {
        name
        price
        newPrice
        discount {
          discount_percent
        }
        images
        categories {
          id
          name
        }
        averageRating
        reviews {
          user {
            username
          }
          content
          rating
          like {
            id
          }
          dislike {
            id
          }
        }
      }
    }
  }
`;

export const GET_PRODUCTS_IN_CART = gql`
  query getProductsCart($productIds: [Float!]!) {
    getProductsCart(productIds: $productIds) {
      id
      name
      price
      images
    }
  }
`;

export const FILTER_PRODUCT = gql`
  query filter(
    $page: Int! = 1
    $limit: Int!
    $category: String
    $search: String
    $price: String
    $sale: Boolean
    $top: Boolean
  ) {
    filter(
      page: $page
      limit: $limit
      category: $category
      search: $search
      price: $price
      sale: $sale
      top: $top
    ) {
      total
      pages
      products {
        id
        name
        price
        newPrice
        images
        categories {
          name
        }
        discount {
          id
        }
        averageRating
      }
    }
  }
`;

export const SEARCH_PRODUCT = gql`
  query search(
    $page: Int! = 1
    $limit: Int!
    $search: String
    $price: String
    $sale: Boolean
    $top: Boolean
  ) {
    search(
      page: $page
      limit: $limit
      search: $search
      price: $price
      sale: $sale
      top: $top
    ) {
      total
      pages
      products {
        id
        name
        price
        newPrice
        images
        categories {
          name
        }
        discount {
          id
        }
        averageRating
      }
    }
  }
`;
