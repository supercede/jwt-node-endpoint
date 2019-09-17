# jwt-node-endpoint
Using JWT to authenticate users as well as store attendants to restrict access to pages


# Functionalities
* Admin can add a product
* Admin/store attendant can get all products
* Admin/store attendant can get a specific product
* Store attendant can add a sale order
* Admin can get all sale order records

# Endpoints
GET /products  :  Fetch all products
GET /products/<productId> :  Fetch a single product record
GET /sales :  Fetch all sale records
GET /sales/<saleId> : Fetch a single sale record
POST /products : Create a product .
POST /sales:   Create a sale order

To start, run node index.js

* product can accept the following properties: name, category, price, quantity, description, image_url
* sales can accpet only price parameter
* ids are generated on save
* GET individual Products and Sale orders through their ids

# To get admin auth:
On Postman, go to http://localhost:3000/login 
enter {"name": "admin", "password": "admin"}
if the login request is successful, a token is return in the body of the response, copy this.
To enable exclusive admin rights ( so as to add products, get sale order),
go to the route, select header, 
under key, type 'Authorization' as value, type "Bearer " and then paste token and send;

Only users(not admins) can add add a sale order, so to add sale order:
Add name and password to request body along with price,
