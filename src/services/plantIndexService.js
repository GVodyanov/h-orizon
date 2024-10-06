export default function plantIndexService(probFlood, probDrought, deltaTemp) {
  console.table({ probFlood, probDrought, deltaTemp})

  const crops = {
    "Barley": {
      flood: 0.3,
      drought: 0.7,
      temp: 25 // 30°C - 5°C
    },
    "Rice": {
      flood: 0.9,
      drought: 0.4,
      temp: 15 // 35°C - 20°C
    },
    "Potatoes": {
      flood: 0.4,
      drought: 0.5,
      temp: 16 // 24°C - 8°C
    },
    "Wheat": {
      flood: 0.2,
      drought: 0.6,
      temp: 15 // 25°C - 10°C
    },
    "Corn": {
      flood: 0.5,
      drought: 0.6,
      temp: 14 // 32°C - 18°C
    },
    "Oats": {
      flood: 0.3,
      drought: 0.7,
      temp: 19 // 26°C - 7°C
    }
  };

  let suggestedPlants = ['Oats', 'Barley', 'Rice', 'Corn', 'Potatoes', 'Wheat'];

  if (probDrought > 0.15) {
    suggestedPlants = suggestedPlants.filter(plant => plant !== 'Rice' && plant !== 'Corn' && plant !== 'Potatoes' && plant !== 'Wheat');
  }

  if (probFlood > 0.85) {
    suggestedPlants = suggestedPlants.filter(plant => plant !== 'Oats' && plant !== 'Barley' && plant !== 'Potatoes' && plant !== 'Wheat');
  }

  if (deltaTemp > 50) {
    suggestedPlants = suggestedPlants.filter(plant => plant !== 'Rice' && plant !== 'Corn' && plant !== 'Oats' && plant !== 'Wheat' && plant !== 'Barley');
  }

  return suggestedPlants;
}
