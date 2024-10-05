export default function plantIndexService() {
  // fieldArea
k = 0.36;
// probPrecipitaion
// probDrought
soilHumidity = 0.6;
UVIndex = 0.2;
deltaTemp = 10;

p1 = 0.5;
p2 = 0.25;
p3 = 0.15;
p4 = 0.06;
p5 = 0.04;

compIndex = ((fieldArea * k * probPrecipitation * probDrought * soilHumidity * UVIndex) / deltaTemp * (5 * p1 + 4 * p2 + 3 * p3 + 2 * p4 + p5); 
// sta roba qui sopra dovrebbe fare 0.65

indexOrzo = 0.9;
indexFrumento = 1.5;
indexMais = 0.5;
indexRiso = 0.7;
indexAvena = 1.2;
indexPatate = 1.3;


}
