# Admin API Spec

## Login Admin

Endpoint : POST /admin/login

Request Body :

```json
{
  "username" : "johndoe@example.com",
  "password" : "pass1234"
}
```

Response Body (Success) : 

```json
{
  "success" : true,
  "message": "Successfully login as admin",
  "data" : {
    "username" : "johndoe@example.com",
    "token" : "uuid",
  }
}
```

## Logout Admin

Endpoint : POST /admin/logout

Cookies :
- auth: token

Response Body (Success) : 

```json
{
  "success" : true,
  "message": "Successfully logout admin"
}
```

## Add New Product

Endpoint : POST /admin/addProduct

Cookies :
- auth: token

Request Body (form-data) :

```json
{
  "name" : "Product 1",
  "description" : "New example product...",
  "price" : "12000",
  "files": "product1.jpg" // files type
}
```

Response Body (Success) : 

```json
{
    "success": true,
    "message": "Add Product Successfully",
    "data": {
        "id": 1,
        "name": "Product 1",
        "description": "New example product...",
        "price": "12000",
        "createdAt": "2024-10-09T12:48:31.000Z",
        "pictures": [
            {
                "id": 1,
                "picture_url": "product1_url.jpg",
                "product_id": 1
            }
        ]
    }
}
```

## Update Product Data

Endpoint : PUT /admin/updateProduct/:id

Cookies :
- auth: token

Request Body (form-data) :

```json
{
  "name" : "Product 1", // optional
  "description" : "New example product...", // optional
  "price" : "12000", // optional
  "files": "product1.jpg" // files type, optional
}
```

Response Body (Success) : 

```json
{
    "success": true,
    "message": "Update Product Successfully",
    "data": {
        "id": 1,
        "name": "Product 1",
        "description": "New example product...",
        "price": "12000",
        "createdAt": "2024-10-09T12:48:31.000Z",
    }
}
```

## Delete Product

Endpoint : DELETE /admin/deleteProduct/:id

Cookies :
- auth: token

Response Body (Success) : 

```json
{
    "success": true,
    "message": "Deleted Product Successfully",
    "data": {
        "id": 13,
        "name": "Product 1",
        "description": "New example product...",
        "price": "12000",
        "createdAt": "2024-10-09T12:48:31.000Z",
    }
}
```

## Confirm User Payment

Endpoint : PUT /admin/confirmPayment/:id

Cookies :
- auth: token

Request Body :

```json
{
    "paymentStatus": "Payment Verified",
    "shipment_status": "On Shipment"
}
```

Response Body (Success) : 

```json
{
    "success": true,
    "message": "Success update payment",
    "data": {
        "id": 1,
        "total_price": 2091045,
        "payment_status": "Payment Verified",
        "shipment_status": "On Shipment",
        "expedition": "JNE",
        "createdAt": "2024-06-05T12:54:53.000Z",
        "user_username": "johndoe"
    }
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