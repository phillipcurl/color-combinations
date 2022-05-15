import type { NextApiRequest, NextApiResponse } from 'next';
import palettes from '../../../data/combinations.json';

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { limit = 21, skip = 0, numColors, colors } = req.query;
    const skipVal = Number(skip);
    const limitVal = Number(limit);

    const filteredPalettes = palettes.filter((palette) => {
      if (numColors) {
        return palette.colors.length === Number(numColors);
      }
      if (colors) {
        console.log('colors api: ', colors);
        const colorsArr = colors.split(',');
        console.log('colorsArr: ', colorsArr);
        return palette.colors.some((color) => {
          console.log('color: ', colors);
          return colorsArr.some((curr) => {
            console.log('curr: ', curr);
            return curr == color.id;
          });
        });
      }
      return true;
    });
    // .sort((a, b) => b.id - a.id);

    res.status(200).json({
      palettes: filteredPalettes.slice(skipVal, skipVal + limitVal),
      totalCount: filteredPalettes.length,
      hasMore: true,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
