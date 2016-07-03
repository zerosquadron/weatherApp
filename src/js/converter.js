(() => {
  const convert = data => {
    let dataCon = JSON.parse(data);
    dataCon = dataCon.FullDataString.split(',');

    const compare = (a, b) => {
      if (a.length > b.length) {
        return -1;
      }
      if (a.length < b.length) {
        return 1;
      }
      return 0;
    };

    //  convert our date string to be year first.
    const dateFormatter = stationDate => {
      let date = stationDate;
      date = date.split(' ');
      date[0] = date[0].split('/').sort(compare);
      date[0] = date[0].join('-');
      date = date.join(' ');
      return date;
    };

    //  The values in the FullDataString are all in metric.
    const weatherData = {
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
      curDateTime: dateFormatter(dataCon[16]),
      station: dataCon[17],
      CurAirQualSens: dataCon[18],
      CurAirQualQual: dataCon[19],
    };

    return weatherData;
  };
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = convert;
  } else {
    window.convert = convert;
  }
})();