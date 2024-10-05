export default function droughtIndexService (input) {
  const av = 1.6; //average amount of precipitation worlwide - 20%
  let drought = [] //array to set every day as either dry or wet
  let wet
  for (let i = 0; i < input.length; i++ ) {
    wet = input[i]
    if (wet < av)
    {
      drought.push(0)
    }
    else{
      drought.push(1)
    }
  } //a list to set each day as either dry (0) or wet (1)
  let average = []
  for (let j = 0; j < drought.length; j++)
  {
    if (drought[j] == 0)
    {
      average[average.length - 1] += 1
    }
    else
    {
      average.push(0)
    }
  } //counting how long the droughts are
  let sum = 0
  for (let g = 0; g < average.length; g++)
  {
    sum += average[g]
  }
  let averageLen = sum / average.length //average droughts length

  let value = ((averageLen - 0.7) * 100) / 25

  if (value < 0)
  {
    value = 0
  }

  if (value > 100)
  {
    value = 100;
  } //value is the result

  return value
}
