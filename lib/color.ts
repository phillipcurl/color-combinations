import chroma from 'chroma-js';

export const getHslFromHex = (hex: string) => chroma(hex).css('hsl');

// export const getHslFromHex = (hex: string) => {
//   const hsl = chroma(hex).hsl();

//   return `hsl(${hsl[0].toFixed(0)}, ${(hsl[1] * 100).toFixed(2)}%, ${(
//     hsl[2] * 100
//   ).toFixed(2)}%)`;
// };

export const getScalesFromHex = (hex: string) => {
  const lightenedColor = chroma(hex).desaturate(2).brighten(2);
  const scale = chroma.scale([lightenedColor, hex]).colors(10);

  return scale;
};
