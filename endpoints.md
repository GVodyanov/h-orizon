## endpoint: "getFieldStats"

REQUEST GET
```json
{
  "fieldCoords": String,
  "vegetation": [
    {
    "presence" : bool,
    "area" : float,
    }
  ],
  "soilComposition": String
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
