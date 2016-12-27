/*eslint no-console: ['error', { allow: ['info', 'error'] }] */
'use strict';

const convert = (data) => {
  let dataCon = JSON.parse(data);
  dataCon = dataCon.FullDataString.split(',');

  //  convert our date string to be year first.
  // IN: 12/16/2016 02:02:00   =>  OUT: 2016-12-16 02:03:45
  const dateFormatter = (stationDate) => {
    let date = new Date(stationDate);
    date = date.toISOString().substring(0, 19).split('T').join(' ');
    return date;
  };

  //  The values in the FullDataString are all in metric.
  const weatherData = {
    id: 0,
    outTemp: dataCon[0],
    outHum: dataCon[1],
    inTemp: dataCon[2],
    barom: dataCon[3],
    alt: dataCon[4],
    curWindS: dataCon[5],
    curWindG: dataCon[6],
    curWindD: dataCon[7],
    rainTot: dataCon[8],
    windSpeedMin: dataCon[9],
    windSpeedMax: dataCon[10],
    windGustMin: dataCon[11],
    WindGustMax: dataCon[12],
    windDirMin: dataCon[13],
    windDirMax: dataCon[14],
    engMetric: dataCon[15],
    created: dateFormatter(dataCon[16]),
    station: dataCon[17],
    airQualSens: dataCon[18],
    airQualQual: dataCon[19],
  };
  return weatherData;
};

module.exports = convert;
