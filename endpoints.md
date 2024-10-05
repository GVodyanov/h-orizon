## endpoint: "getFieldStats"

REQUEST GET
```json
{
  "fieldCoords": String,
  "vegetaion": [
    {
    "presence" : bool,
    "area" : float,
    }
  ],
  "soil_composition": list
}
```

RESPONSE
```json
{
  "climateModules": [
    {
      "type": Enum["flood", "drought", "rain"],
      "probability": float,
    },
  ],
  "preferredPlants": [
    {
      "name": string,
      "suggestionIndex": float, # From 0-1
    },
  ],
},
```
