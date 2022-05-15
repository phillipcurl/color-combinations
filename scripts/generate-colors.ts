const fs = require('fs');
const path = require('path');
const colorsDicts = require('dictionary-of-colour-combinations');
const chroma = require('chroma-js');

const dirPath = path.join(process.cwd(), '/data');

const colors = colorsDicts.map((color: any, index: number) => {
  const chromaColor = chroma(color.hex);
  const lightenedColor = chromaColor.brighten(2);
  const darkenedColor = chromaColor.darken(2);
  // const lightenedColor = chromaColor.desaturate(2).brighten(2);
  const lightScale = chroma
    .scale([lightenedColor.hex(), color.hex])
    .cache(false)
    .correctLightness();

  const darkScale = chroma
    .scale([color.hex, darkenedColor.hex()])
    .cache(false)
    .correctLightness();
  // const scaleClasses = chroma.scale('OrRd').classes(5);
  // console.log('scaleClasses: ', scaleClasses);

  return {
    ...color,
    id: index + 1,
    hsl: chromaColor.hsl(),
    hslCss: chromaColor.css('hsl'),
    lightScale: lightScale.colors(10),
    darkScale: darkScale.colors(10),
    lightContrast: chroma.contrast(color.hex, lightScale.colors(10)[0]),
    darkContrast: chroma.contrast(color.hex, darkScale.colors(10)[9]),
    // scaleClasses: chroma
    //   .scale([lightenedColor, color.hex])
    //   .cache(false)
    //   .classes(5),
    // scaleClasses: lightScale.classes(5),
    // test: chroma.scale('OrRd').classes(5),
    luminance: chromaColor.luminance(),
    temperature: chromaColor.temperature(),
    temperatureColor: chroma.temperature(chromaColor.temperature()).hex(),
  };
});

const map = colors.reduce((map: any, color: any, i: any) => {
  color.combinations.forEach((id: any) => {
    if (map.has(id)) map.get(id).push(i);
    else map.set(id, [i]);
  });
  return map;
}, new Map());

const palettes = [...map.entries()]
  .sort((a, b) => a[0] - b[0])
  .map((e) => e[1])
  .map((palette, index) => {
    const paletteColors = palette.map((curr: any) => ({
      ...colors[curr],
    }));

    const averageLuminance =
      paletteColors.reduce((acc: any, curr: any) => {
        return acc + curr.luminance;
      }, 0) / paletteColors.length;

    const averageTemperature =
      paletteColors.reduce((acc: any, curr: any) => {
        return acc + curr.temperature;
      }, 0) / paletteColors.length;

    return {
      // id: paletteColors.map((curr: any) => curr.id).join(';'),
      id: index + 1,
      colors: paletteColors,
      averageLuminance,
      averageTemperature,
      averageTemperatureColor: chroma.temperature(averageTemperature).hex(),
    };
  });

function main() {
  fs.writeFileSync(path.join(dirPath, '/colors.json'), JSON.stringify(colors));
  fs.writeFileSync(
    path.join(dirPath, '/combinations.json'),
    JSON.stringify(palettes)
  );
}

main();

// console.log('palettes: ', palettes);

module.exports = {};
