# corsproxy-lambda
Lambda Function to allow CORS requests to an API

Edit the `remotehost` value to be the API you want to call

Zip this project up and upload to lambda as a new function

Configure API gateway as a lambda proxy for ANY method with a path of `{PROXY+}`

Make your request to the API Gateway endpoint wiht the stage in the path eg https://a1234b5678.execute-api.eu-west-1.amazonaws.com/cors/v1/endpoint
The code will strip the api stage (eg cors) from the path before making the onward request to the api 
