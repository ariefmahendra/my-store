# Create Product 

```http
POST http://localhost:8083/api/products
```
## Request Body

Content-Type: application/json

```json
{
    "name": "string",
    "price": number,
    "description": "string",
    "quantity": number
}
```

## Response

Content-Type: application/json

Status: 201

```json
{
    "message" : "created",
    "data" : {
        "id": "string",
        "name": "string",
        "price": number,
        "description": "string",
        "quantity": number
    }
}
```

# Get List Product 

```http
GET http://localhost:8083/api/products
```
## Response

Content-Type: application/json

Status: 200

```json
{
    "message" : "success",
    "data" : [
    {
        "id": "string",
        "name": "string",
        "price": number,
        "description": "string",
        "quantity": number
    },
    {
        "id": "string",
        "name": "string",
        "price": number,
        "description": "string",
        "quantity": number
    }]
}
```

# Get Product By Id 

```http
GET http://localhost:8083/api/products/{id}
```
## Response

Content-Type: application/json

Status: 200

```json
{
    "message" : "success",
    "data" : {
        "id": "string",
        "name": "string",
        "price": number,
        "description": "string",
        "quantity": number
    }
}
```

# Update Product

```http
PUT http://localhost:8083/api/products/{id}
```
## Request Body

Content-Type: application/json

```json
{
    "id": "stirng",
    "name": "string",
    "price": number,
    "description": "string",
    "quantity": number
}
```

## Response

Content-Type: application/json

Status: 200

```json
{
    "message" : "success",
    "data" : {
        "id": "string",
        "name": "string",
        "price": number,
        "description": "string",
        "quantity": number
    }
}
```

# Delete Product

```http
DELETE http://localhost:8083/api/products/{id}
```

## Response

Content-Type: application/json

Status: 200

```json
{
    "message" : "success",
}
```