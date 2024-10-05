## endpoint: "getFieldStats"

REQUEST GET
```json
{
  "fieldCoords": String, 
}
```

RESPONSE
```json
{
  "climateModules": [
    {
      "type": Enum["Flood", "Drought", "Rain"],
      "probability": float,
      "preferredPlants": [
        {
          "name": string,
          "suggestionIndex": float, # From 0-1
        },
      ],
    },
  ],
},
```
