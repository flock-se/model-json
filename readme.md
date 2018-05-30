# Json Model

Json Model is a simple declarative way of specifying models. These models are converted to json schemas.

## Simple types
There are three types you dan can define in Json Model.
```json
{
  "var1" : "boolean",
  "var2" : "integer",
  "var3" : "string"
}
```  

## Optional types
Every field can be made optional by adding a question mark at the end.
```json
{
  "var1" : "string?"
}
```
## Definitions
Definitions are used reuse sub models.
```json
{
  "var1" : "$submodel",
  "$submodel" : {
    "var2": "string"
  }
}
```  

## Definitions optional
Definitions can also be used as optional fields
```json
{
  "var1" : "$submodel?",
  "$submodel" : {
    "var2": "string?"
  }
}
```  