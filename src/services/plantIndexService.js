export default function plantIndexService(probPrecipitation, probDrought, deltaTemp = 10) {
  let k = 0.36;
  let soilHumidity = 0.6;
  let UVIndex = 0.2;

  let p1 = 0.5;
  let p2 = 0.25;
  let p3 = 0.15;
  let p4 = 0.06;
  let p5 = 0.04;

  console.table({ probPrecipitation, probDrought, deltaTemp, k, soilHumidity, UVIndex })

  let compIndex = (1000 * k * (probPrecipitation + probDrought) * soilHumidity * UVIndex)
    / (deltaTemp * (5 * p1 + 4 * p2 + 3 * p3 + 2 * p4 + p5))

  let indexOrzo = 0.9
  let indexFrumento = 1.5
  let indexMais = 0.5
  let indexRiso = 0.7
  let indexAvena = 1.2
  let indexPatate = 1.3

  return [
    { name: 'orzo', suggestionIndex: indexOrzo * compIndex },
    { name: 'frumento', suggestionIndex: indexFrumento * compIndex },
    { name: 'mais', suggestionIndex: indexMais * compIndex },
    { name: 'riso', suggestionIndex: indexRiso * compIndex },
    { name: 'avena', suggestionIndex: indexAvena * compIndex },
    { name: 'patate', suggestionIndex: indexPatate * compIndex }
  ]
}
