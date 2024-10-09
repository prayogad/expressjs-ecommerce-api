# User API Spec

## Register User

Endpoint : POST /register

Request Body :

```json
{
  "username" : "johndoe@example.com",
  "email" : "johndoe@example.com",
  "password" : "pass1234",
  "phone" : "123456789",
  "address" : "Jakarta, Indonesia.."
}
```

Response Body (Success) : 

```json
{
  "success" : true,
  "message": "Successfully registered as user, you can now login",
  "data" : {
    "username" : "johndoe@example.com",
    "email" : "johndoe@example.com",
  }
}
```

## Login User

Endpoint : POST /login

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
  "message": "Login user successfully",
  "data" : {
    "username" : "johndoe@example.com",
    "token" : "uuid",
  }
}
```

## Logout User

Endpoint : POST /logout

Cookies :
- auth: token

Response Body (Success) : 

```json
{
  "success" : true,
  "message": "Logout user successfully"
}
```

## Update User Data

Endpoint : PUT /update

Cookies :
- auth: token

Request Body :

```json
{
  "username" : "johndoe@example.com", // optional
  "email" : "johndoe@example.com", // optional
  "password" : "pass1234", // optional
  "phone" : "123456789", // optional
  "address" : "Jakarta, Indonesia.." // optional
}
```

Response Body (Success) : 

```json
{
  "success" : true,
  "message": "Successfully updated user data",
  "data" : {
    "username" : "johndoe@example.com",
    "email" : "johndoe@example.com",
    "phone" : "123456789",
    "address" : "Jakarta, Indonesia.."
  }
}
```

## Add Product To Cart

Endpoint : POST /addCart/:productId

Cookies :
- auth: token

Response Body (Success) : 

```json
{
  "success" : true,
  "message": "Success add product to cart",
  "data": {
        "quantity": 4,
        "user_username": "voxxyg",
        "product_id": 12,
        "products": {
            "id": 12,
            "name": "product 1",
            "description": "this product...",
            "price": "12000",
            "createdAt": "2024-05-29T13:50:24.000Z"
        }
    }
}
```

## Fetch User Cart

Endpoint : GET /fetchCart

Cookies :
- auth: token

Response Body (Success) : 

```json
{
  "success" : true,
  "message": "Success fetch cart data",
  "data": [
    {
        "quantity": 4,
        "user_username": "johndoe",
        "product_id": 12,
        "products": {
            "id": 12,
            "name": "product 1",
            "description": "this product...",
            "price": "12000",
            "createdAt": "2024-05-29T13:50:24.000Z"
        }
    },
    {
        "quantity": 4,
        "user_username": "johndoe",
        "product_id": 12,
        "products": {
            "id": 12,
            "name": "product 2",
            "description": "this product...",
            "price": "12000",
            "createdAt": "2024-05-29T13:50:24.000Z"
        }
    }
  ]
}
```

## Update Cart User

Endpoint : PUT /updateCart

Cookies :
- auth: token

Request Body :

```json
{
    "product_id": 12,
    "quantity": 1
}
```

Response Body (Success) : 

```json
{
  "success" : true,
  "message": "Successfuly update cart data",
  "data": {
        "quantity": 4,
        "user_username": "voxxyg",
        "product_id": 12,
        "products": {
            "id": 12,
            "name": "product 1",
            "description": "this product...",
            "price": "12000",
            "createdAt": "2024-05-29T13:50:24.000Z"
        }
    }
}
```

## Delete Cart User

Endpoint : DELETE /deleteCart/:id

Cookies :
- auth: token

Response Body (Success) : 

```json
{
  "success" : true,
  "message": "Successfuly delete cart",
  "data": {
        "quantity": 4,
        "user_username": "voxxyg",
        "product_id": 12
    }
}
```

## Create Payment

Endpoint : POST /addPayment

Cookies :
- auth: token

Request Body :

```json
{
  "expedition" : "JNE",
}
```

Response Body (Success) : 

```json
{
  "success" : true,
  "message": "Successfully add payment",
  "data": {
        "id": 1,
        "total_price": 12000,
        "payment_status": "Waiting Payment",
        "shipment_status": "Verification Process",
        "expedition": "JNE",
        "createdAt": "2024-05-29T13:50:24.000Z",
        "user_username": "johndoe"
  }
}
```

## Show User Payment

Endpoint : GET /showPayment/:userId

Cookies :
- auth: token

Response Body (Success) : 

```json
{
  "success" : true,
  "message": "Successfully fetch payment data",
  "data": [
        {
            "id": 1,
            "total_price": 2091045,
            "payment_status": "Waiting Payment",
            "shipment_status": "Verification Process",
            "expedition": "JNE",
            "createdAt": "2024-06-05T13:00:23.000Z",
            "user_username": "voxxyg",
            "detailPayment": [
                {
                    "payment_id": 2,
                    "product_id": 7,
                    "quantity": 2
                },
                {
                    "payment_id": 2,
                    "product_id": 12,
                    "quantity": 3
                }
            ]
        },
        {
            "id": 2,
            "total_price": 2091045,
            "payment_status": "Waiting Payment",
            "shipment_status": "Verification Process",
            "expedition": "JNE",
            "createdAt": "2024-06-05T12:54:53.000Z",
            "user_username": "voxxyg",
            "detailPayment": [
                {
                    "payment_id": 1,
                    "product_id": 7,
                    "quantity": 2
                },
                {
                    "payment_id": 1,
                    "product_id": 12,
                    "quantity": 3
                }
            ]
        }
    ]
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