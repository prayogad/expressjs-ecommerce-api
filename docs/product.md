# Product API Spec

## Get All Products

Endpoint : GET /products

Response Body (Success) : 

```json
{
  "success" : true,
  "message": "Successfully fetching all products",
  "data" : [
    {
      "id": 1,
      "name": "product 1",
      "description": "product from database",
      "price": 120000,
      "createdAt": "2024-05-27T12:35:26.000Z",
      "pictures": [
        {
          "id": 11,
          "picture_url": "URL_to_product1.jpg",
          "product_id": 7
        },
        {
          "id": 12,
          "picture_url": "URL_to_product1_2.jpg",
          "product_id": 7
        }
      ]
    },
    {
      "id": 2,
      "name": "product 2",
      "description": "product from database",
      "price": 12000,
      "createdAt": "2024-05-29T13:50:24.000Z",
      "pictures": [
        {
          "id": 17,
          "picture_url": "URL_to_product2.jpg",
          "product_id": 12
        }
      ]
    }
  ]
}
```

## Get Detail Product By Id

Endpoint : GET /products/:id

Response Body (Success) : 

```json
{
  "success" : true,
  "message": "Successfully fetching detail product",
  "data" : {
      "id": 1,
      "name": "product 1",
      "description": "product from database",
      "price": 120000,
      "createdAt": "2024-05-27T12:35:26.000Z",
      "pictures": [
        {
          "id": 11,
          "picture_url": "URL_to_product1.jpg",
          "product_id": 7
        },
        {
          "id": 12,
          "picture_url": "URL_to_product1_2.jpg",
          "product_id": 7
        }
      ]
    },
}
```

## Search Product By Name

Endpoint : GET /searchProduct

Request Body :

```json
{
  "name" : "johndoe@example.com"
}
```

Response Body (Success) : 

```json
{
  "success" : true,
  "message": "Success searching product by name",
  "data" : {
      "id": 1,
      "name": "product 1",
      "description": "product from database",
      "price": 120000,
      "createdAt": "2024-05-27T12:35:26.000Z",
      "pictures": [
        {
          "id": 11,
          "picture_url": "URL_to_product1.jpg",
          "product_id": 7
        },
        {
          "id": 12,
          "picture_url": "URL_to_product1_2.jpg",
          "product_id": 7
        }
      ]
    },
}
```

## Error Response

Response Body (Failed) :

```json
{
  "success" : false,
  "message" : "Unauthorized"
}
```