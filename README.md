# EcommerceCMS_Server
<!-- https://calm-retreat-73218.herokuapp.com/ -->
https://ecommerce-server-2.herokuapp.com/

**USER**
-----

**Register**
----
  Registers new user

* **URL**

  /users/register

* **Method:**

  `POST`
  
*  **URL Params**
    None

* **Body/Form Params**<br>
  **Required**
  - `email` : string
  - `password` : string
  - `role`: string (defaults to `user`)


* **Success Response:**

  * **Code:** 201 <br />
    **Content:**<br>
    `{
        "id": 9,
        "email": "jose_mourinho@liverpoolfc.uk",
        "role": "user",
        "updatedAt": "2020-03-03T11:29:45.084Z",
        "createdAt": "2020-03-03T11:29:45.084Z"
    }`
     

* **Error Responses:**

  * **Code:** 400 VALIDATION ERROR<br />
    **Content:**<br>
    `{
    "errors": [
        "EMAIL FORMAT INVALID"
    ]
    }`
    <br>
    **OR**
    `{
    "errors": [
        "EMAIL TAKEN"
    ]
    }`
    <br>
    **OR**
    `{
    "errors": [
        "PASSWORDS MUST BE AT LEAST 6 CHARACTERS"
    ]
    }`

<br>
<hr>
<br>

**Login**
----
  Login user

* **URL**

  /users/login

* **Method:**

  `POST`
  
*  **URL Params**
    None

* **Data Params**
`{ "email" : "john_doe@sample.com", "password" : "johndoe1" }`<br>
  **Required**
  - `email` : string
  - `password` : string


* **Success Response:**

  * **Code:** 200 <br />
    **Content:**<br>
    `{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJjcmlzdGlhbm9fcm9uYWxkb0BsaXZlcnBvb2xmYy51ayIsImlhdCI6MTU4MzIzNzgwOH0.eUjWk-QOFVss77WLfbbqFvt9rKuLNCNk4xEzCSiAdYk"
}`
     

* **Error Responses:**

  * **Code:** 400 WRONG EMAIL/PASSWORD<br />
    **Content:**<br>
    `{
        "message": "WRONG EMAIL/PASSWORD"
    }`


<br>
<hr>
<br>


**Fetch All**
----
  Fetch list of all users

* **URL**

  /users

* **Method:**

  `GET`
  
*  **URL Params**
    None

* **Body/Form Params**<br>
    None


* **Success Response:**

  * **Code:** 200 <br />
    **Content:**<br>
    `{
     [
        {
            "id": 4,
            "email": "user3@mail.com",
            "role": "user",
            "createdAt": "2020-03-31T10:44:22.376Z",
            "updatedAt": "2020-03-31T10:44:22.376Z"
        },
        {
            "id": 1,
            "email": "user@mail.com",
            "role": "user",
            "createdAt": "2020-03-30T15:22:08.871Z",
            "updatedAt": "2020-03-30T15:22:08.871Z"
        },
        {
            "id": 2,
            "email": "user1@mail.com",
            "role": "user",
            "createdAt": "2020-03-30T15:22:30.658Z",
            "updatedAt": "2020-03-30T15:22:30.658Z"
        }
    ]
}`

<br>
<hr>
<br>

**CARTS**
-----------
<hr>

**Fetch Projects**
----
  Returns a list of all projects where currently logged in user is involved.

* **URL**

  /projects/

* **Method:**

  `GET`
  
*  **URL Params**
    None

* **Body/Form Params**<br>
   None

* **Header Params**<br>
   `access_token`: string (required)

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    <br>
    `{
     [
        {
            "ProjectId": 2,
            "UserId": 1,
            "createdAt": "2020-03-30T15:24:12.209Z",
            "updatedAt": "2020-03-30T15:24:12.209Z",
            "Project": {
                "id": 2,
                "UserId": 1,
                "title": "liwetan"
            },
            "User": {
                "id": 1,
                "email": "user@mail.com",
                "location": "-6.1741;106.8296"
            }
        }
    ]
}`
 
* **Error Responses:**

  * **Code:** 401 UNAUTHORIZED ACCESS <br />
    **Content:** <br>
    `{
      "errors": [
          "jwt expired"
      ]
    }`


  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    <br>
    `{
    "message": [
        "NOT FOUND"
    ]
    }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    <br>
    `{
    "message": [
        "INTERNAL SERVER ERROR"
    ]
    }`

<br>
<hr>
<br>

**Get All Carts**
----
  Returns all carts based on UserId

* **URL**

  /carts

* **Method:**

  `GET`
  
*  **URL Params**
    None

* **Header Params**<br>
   `access_token`: string (required)

* **Body/Form Params**<br>
   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br>
   `{
    "response": [
        {
            "id": 2,
            "UserId": 4,
            "ProductId": 5,
            "total_qty": 5,
            "createdAt": "2020-04-21T13:32:28.708Z",
            "updatedAt": "2020-04-21T13:32:32.352Z",
            "Product": {
                "id": 5,
                "name": "Vitacimin 1 strip @ tablet",
                "description": "Ascorbic Acid 500mg",
                "category": "otc",
                "image_url": "https://i.imgur.com/gqiwTiz.jpg",
                "price": 2000,
                "stock": 5000,
                "createdAt": "2020-04-21T05:00:42.035Z",
                "updatedAt": "2020-04-21T05:00:42.035Z"
            },
            "User": {
                "id": 4,
                "email": "buyer@mail.com",
                "password": "$2a$10$M37SaolpK59stQo.nzgmPufZl7HCVaKHg7JobB6oZ4wXwAuC/a/yq",
                "role": "user",
                "createdAt": "2020-04-21T13:29:27.599Z",
                "updatedAt": "2020-04-21T13:29:27.599Z"
            }
        },
        {
            "id": 1,
            "UserId": 4,
            "ProductId": 4,
            "total_qty": 5,
            "createdAt": "2020-04-21T13:32:20.750Z",
            "updatedAt": "2020-04-21T13:32:24.632Z",
            "Product": {
                "id": 4,
                "name": "Fucithalmic 10mg",
                "description": "Fusidic acid 1%",
                "category": "prescription",
                "image_url": "https://cdn-image.hipwee.com/wp-content/uploads/2017/09/hipwee-9888267_20170906021736.png",
                "price": 30000,
                "stock": 5000,
                "createdAt": "2020-04-21T04:59:43.075Z",
                "updatedAt": "2020-04-21T04:59:43.075Z"
            },
            "User": {
                "id": 4,
                "email": "buyer@mail.com",
                "password": "$2a$10$M37SaolpK59stQo.nzgmPufZl7HCVaKHg7JobB6oZ4wXwAuC/a/yq",
                "role": "user",
                "createdAt": "2020-04-21T13:29:27.599Z",
                "updatedAt": "2020-04-21T13:29:27.599Z"
            }
        }
    ]
}`
 
* **Error Responses:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** <br>
    `{
      "errors": [
          "jwt expired"
      ]
    }`


  * **Code:** 404 NOT FOUND <br />
    **Content:** <br>
    `{
    "message": "NOT FOUND"
    }`

<br>
<hr>
<br>

**Get All Orders**
----
  Returns all orders/checkedout carts based on UserId

* **URL**

  /carts/orders

* **Method:**

  `GET`
  
*  **URL Params**
    None

* **Header Params**<br>
   `access_token`: string (required)

* **Body/Form Params**<br>
   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br>
   `{
    "response": [
        {
            "id": 2,
            "UserId": 4,
            "ProductId": 5,
            "total_qty": 5,
            "createdAt": "2020-04-21T13:32:28.708Z",
            "updatedAt": "2020-04-21T13:32:32.352Z",
            "Product": {
                "id": 5,
                "name": "Vitacimin 1 strip @ tablet",
                "description": "Ascorbic Acid 500mg",
                "category": "otc",
                "image_url": "https://i.imgur.com/gqiwTiz.jpg",
                "price": 2000,
                "stock": 5000,
                "createdAt": "2020-04-21T05:00:42.035Z",
                "updatedAt": "2020-04-21T05:00:42.035Z"
            },
            "User": {
                "id": 4,
                "email": "buyer@mail.com",
                "password": "$2a$10$M37SaolpK59stQo.nzgmPufZl7HCVaKHg7JobB6oZ4wXwAuC/a/yq",
                "role": "user",
                "createdAt": "2020-04-21T13:29:27.599Z",
                "updatedAt": "2020-04-21T13:29:27.599Z"
            }
        },
        {
            "id": 1,
            "UserId": 4,
            "ProductId": 4,
            "total_qty": 5,
            "createdAt": "2020-04-21T13:32:20.750Z",
            "updatedAt": "2020-04-21T13:32:24.632Z",
            "Product": {
                "id": 4,
                "name": "Fucithalmic 10mg",
                "description": "Fusidic acid 1%",
                "category": "prescription",
                "image_url": "https://cdn-image.hipwee.com/wp-content/uploads/2017/09/hipwee-9888267_20170906021736.png",
                "price": 30000,
                "stock": 5000,
                "createdAt": "2020-04-21T04:59:43.075Z",
                "updatedAt": "2020-04-21T04:59:43.075Z"
            },
            "User": {
                "id": 4,
                "email": "buyer@mail.com",
                "password": "$2a$10$M37SaolpK59stQo.nzgmPufZl7HCVaKHg7JobB6oZ4wXwAuC/a/yq",
                "role": "user",
                "createdAt": "2020-04-21T13:29:27.599Z",
                "updatedAt": "2020-04-21T13:29:27.599Z"
            }
        }
    ]
}`
 
* **Error Responses:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** <br>
    `{
      "errors": [
          "jwt expired"
      ]
    }`


  * **Code:** 404 NOT FOUND <br />
    **Content:** <br>
    `{
    "message": "NOT FOUND"
    }`

<br>
<hr>
<br>


**Create Cart**
----
  Add item to cart. Increase quantity if cart already created

* **URL**

  /projects/

* **Method:**

  `POST`
  
*  **URL Params**
    None

* **Header Params**<br>
   `access_token`: string (required)

* **Body/Form Params**<br>
  `{ "ProductId" : 1 }`<br>
  **Required**
  - `ProductId` : integer

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**<br>
    `[
    1,
    [
        {
            "id": 2,
            "UserId": 4,
            "ProductId": 5,
            "total_qty": 5,
            "createdAt": "2020-04-21T13:32:28.708Z",
            "updatedAt": "2020-04-21T13:32:32.352Z"
        }
    ]
]`
 
* **Error Responses:**

  * **Code:** 401 UNAUTHORIZED<br />
    **Content:** <br>
    `{
      "errors": [
          "jwt expired"
      ]
    }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** <br>
     `{
    "message": [
        "INTERNAL SERVER ERROR"
    ]
    }`
<br>
<hr>
<br>


**Add Quantity**
----
  Increase quantity of items in cart by 1

* **URL**

  /carts/:cartId

* **Method:**

  `PUT`
  
*  **URL Params**
    `:cartId` : integer(required)

* **Header Params**<br>
   `access_token`: string (required)

* **Body/Form Params**<br>
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br>
   `{
    "updated": [
        {
            "id": 2,
            "UserId": 4,
            "ProductId": 5,
            "total_qty": 7,
            "createdAt": "2020-04-21T13:32:28.708Z",
            "updatedAt": "2020-04-21T13:39:49.452Z"
        }
    ]
}`
 
* **Error Responses:**

  * **Code:** 401 UNAUTHORIZED<br />
    **Content:** <br>
    `{
      "errors": [
          "jwt expired"
      ]
    }`

  * **Code:** 404 NOT FOUND <br />
    **Content:** <br>
    `{
    "message": "NOT FOUND"
    }`

<br>
<hr>
<br>


**Reduce Quantity**
----
  Reduce quantity of items in cart by 1. Destroys cart if only 1 qty left.

* **URL**

  /carts/:cartId

* **Method:**

  `PUT`
  
*  **URL Params**
    `:cartId` : integer(required)

* **Header Params**<br>
   `access_token`: string (required)

* **Body/Form Params**<br>
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br>
   `{
    "updated": [
        {
            "id": 2,
            "UserId": 4,
            "ProductId": 5,
            "total_qty": 6,
            "createdAt": "2020-04-21T13:32:28.708Z",
            "updatedAt": "2020-04-21T13:39:49.452Z"
        }
    ]
}`
  **OR**
  `null`


* **Error Responses:**

  * **Code:** 401 UNAUTHORIZED<br />
    **Content:** <br>
    `{
      "errors": [
          "jwt expired"
      ]
    }`

  * **Code:** 404 NOT FOUND <br />
    **Content:** <br>
    `{
    "message": "NOT FOUND"
    }`

<br>
<hr>
<br>


**Delete Project**
----
  Delete cart by.

* **URL**

  /carts/:id

* **Method:**

  `DELETE`
  
*  **URL Params**
    `:id` : integer(required)

* **Header Params**<br>
   `access_token`: string (required)

* **Body/Form Params**<br>
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "data": 1,
    "message": "Delete Success"
}`
 
* **Error Responses:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** <br>
    `{
      "errors": [
          "jwt expired"
      ]
    }`

  * **Code:** 404 NOT FOUND <br />
    **Content:** <br>
    `{
    "message": "NOT FOUND"
    }`

<br>
<hr>
<br>



<br>
<hr>
<br>

**PRODUCTS**
-----

**Get All Products**
----
  Returns a list of all products

* **URL**

  /products

* **Method:**

  `GET`
  
*  **URL Params**
   None

* **Header Params**<br>
   `access_token`: string (required)

* **Body/Form Params**<br>
   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    <br>
    `{
    "data": [
        {
            "id": 1,
            "name": "Actifed 100ml",
            "description": "Bromhexine HCl 100mg",
            "category": "otc_limited",
            "image_url": "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1539174111/OBT_tpvdcj.png",
            "price": 70000,
            "stock": 5000,
            "createdAt": "2020-04-13T15:13:38.500Z",
            "updatedAt": "2020-04-13T15:13:38.500Z"
        },
        {
            "id": 2,
            "name": "Panadol Cold & Flu",
            "description": "Paracetamol 50mg",
            "category": "otc",
            "image_url": "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1539174094/OBAT_BEBAS_FIX_uphnzj.png",
            "price": 10000,
            "stock": 5000,
            "createdAt": "2020-04-13T15:14:39.572Z",
            "updatedAt": "2020-04-13T15:14:39.572Z"
        },
        {
            "id": 3,
            "name": "Vitacimin",
            "description": "Ascorbic Acid 500mg",
            "category": "herbal",
            "image_url": "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1539174005/JAMU_FIX_c3l0j5.png",
            "price": 2500,
            "stock": 5000,
            "createdAt": "2020-04-13T15:15:20.460Z",
            "updatedAt": "2020-04-13T15:15:20.460Z"
        },
        {
            "id": 4,
            "name": "Bactroban 10g",
            "description": "Mupirocin 2%",
            "category": "prescription",
            "image_url": "https://cdn-image.hipwee.com/wp-content/uploads/2017/09/hipwee-9888267_20170906021736.png",
            "price": 22000,
            "stock": 5000,
            "createdAt": "2020-04-13T15:16:32.476Z",
            "updatedAt": "2020-04-13T15:20:46.033Z"
        }
    ]
}`

* **Error Responses:**
  * **Code:** 401 UNAUTHORIZED<br />
    **Content:** <br>
    `{
      "errors": [
          "jwt expired"
      ]
    }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    <br>
    `{
    "errors": [
        "INTERNAL SERVER ERROR"
    ]
    }`

<br>
<hr>
<br>

**Get One Product**
----
  Searches one product based on ID

* **URL**

  /products/:id

* **Method:**

  `GET`
  
*  **URL Params**
   `:id` (integer)

* **Header Params**<br>
   `access_token`: string (required)

* **Body/Form Params**<br>
   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    <br>
    `{
        "id": 1,
        "name": "Actifed 100ml",
        "description": "Bromhexine HCl 100mg",
        "category": "otc_limited",
        "image_url": "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1539174111/OBT_tpvdcj.png",
        "price": 70000,
        "stock": 5000,
        "createdAt": "2020-04-13T15:13:38.500Z",
        "updatedAt": "2020-04-13T15:13:38.500Z"
    }`

* **Error Responses:**
  * **Code:** 401 UNAUTHORIZED<br />
    **Content:** <br>
    `{
      "errors": [
          "jwt expired"
      ]
    }`

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    <br>
    `{
      "errors": [
          "NOT FOUND"
      ]
    }`

<br>
<hr>
<br>

**Create Product**
----
  Create new product into inventory

* **URL**

  /projects

* **Method:**

  `POST`
  
*  **URL Params**
    None

* **Header Params**<br>
   `access_token`: string (required)

* **Body/Form Params**<br>
  **Required**
  - `name` : string
  - `description`: string
  - `category[otc, otc_limited, prescription, herbal]`: string
  - `stock`: integer
  - `price`: integer

  **Optional**
  - `image_url`: string

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** <br>
    `{
        "id": 1,
        "name": "Actifed 100ml",
        "description": "Bromhexine HCl 100mg",
        "category": "otc_limited",
        "image_url": "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1539174111/OBT_tpvdcj.png",
        "price": 70000,
        "stock": 5000,
        "createdAt": "2020-04-13T15:13:38.500Z",
        "updatedAt": "2020-04-13T15:13:38.500Z"
    }`
 
* **Error Responses:**
  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** <br>
    `{
      "errors": [
        'NAME REQUIRED'
      ]   
    }`
    **OR**
    `{
      "errors": [
        'PLEASE ENTER VALID DRUG CATEGORY'
      ]   
    }`
    **OR**
    `{
      "errors": [
        'PRICE MUST BE NON-NEGATIVE'
      ]   
    }`
    **OR**
    `{
      "errors": [
        'STOCK MUST BE NON-NEGATIVE'
      ]   
    }
  * **Code:** 401 UNAUTHORIZED<br />
    **Content:** <br>
    `{
      "errors": [
          "jwt expired"
      ]
    }`

<br>
<hr>
<br>

**Update Product**
----
  Update product by id

* **URL**

  /products/:id

* **Method:**

  `PUT`
  
*  **URL Params**
  -  `:id` integer

* **Header Params**<br>
   `access_token`: string (required)

* **Body/Form Params**<br>
  **Required**
  - `name` : string
  - `description`: string
  - `category[otc, otc_limited, prescription, herbal]`: string
  - `stock`: integer
  - `price`: integer

  **Optional**
  - `image_url`: string

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br>
    `{
        "id": 1,
        "name": "Actifed 100ml",
        "description": "Bromhexine HCl 100mg",
        "category": "otc_limited",
        "image_url": "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1539174111/OBT_tpvdcj.png",
        "price": 70000,
        "stock": 5000,
        "createdAt": "2020-04-13T15:13:38.500Z",
        "updatedAt": "2020-04-13T15:13:38.500Z"
    }`
 
* **Error Responses:**
  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** <br>
    `{
      "errors": [
        'NAME REQUIRED'
      ]   
    }`
    **OR**
    `{
      "errors": [
        'PLEASE ENTER VALID DRUG CATEGORY'
      ]   
    }`
    **OR**
    `{
      "errors": [
        'PRICE MUST BE NON-NEGATIVE'
      ]   
    }`
    **OR**
    `{
      "errors": [
        'STOCK MUST BE NON-NEGATIVE'
      ]   
    }

  * **Code:** 401 UNAUTHORIZED<br />
    **Content:** <br>
    `{
      "errors": [
          "jwt expired"
      ]
    }`
  * **Code:** 404 NOT FOUND <br />
    **Content:** <br>
    `{
      "errors": [
          "NOT FOUND"
      ]
    }`


<br>
<hr>
<br>

**Delete Product**
----
  Delete product by id.

* **URL**

  /products/:id

* **Method:**

  `PUT`
  
*  **URL Params**
  -  `:id` integer

* **Header Params**<br>
   `access_token`: string (required)

* **Body/Form Params**<br>
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
     "{
      "message": "PRODUCT DROPPED FROM INVENTORY"
    }"
}`
 
* **Error Responses:**
 * **Code:** 401 UNAUTHORIZED<br />
    **Content:** <br>
    `{
      "errors": [
          "jwt expired"
      ]
    }`
  * **Code:** 404 NOT FOUND <br />
    **Content:** <br>
    `{
      "errors": [
          "NOT FOUND"
      ]
    }`
<br>
<hr>
<br>


