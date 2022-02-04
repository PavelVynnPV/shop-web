export const GRAPHQL_API = "http://localhost:4000/graphql";
export const GET_CATEGORY = `
    query category{
        categories {
            name
            products {
                id
                name
                inStock
                description
                gallery
                category
                brand
                prices {
                    currency
                    amount
                }
                attributes {
                    id 
                    name
                    type
                    items {
                        displayValue
                        value
                        id
                    }
                }
            }
        }
    }
  `;
  export const GET_CURRENCY = `
    query {
        currencies
    }
  `
export const GET_ID = (id) =>
  `query {
       product (id: "${id}") {
         id
         name
         inStock
         description
         gallery
         category
         brand
         prices {
             currency
             amount
         }
         attributes {
             id 
             name
             type
             items {
                 displayValue
                 value
                 id
             }
         }
       }
     }`;
export const currencySignMap = {
  USD: "$",
  GBP: "￡",
  AUD: "$",
  JPY: "¥",
  RUB: "₽",
};
