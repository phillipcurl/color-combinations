import type { NextApiRequest, NextApiResponse } from 'next';
import colors from '../../../data/colors.json';

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { limit = 21, skip = 0 } = req.query;
    const skipVal = Number(skip);
    const limitVal = Number(limit);

    const filteredColors = colors.filter((color) => {
      // if (numColors) {
      //   return palette.colors.length === Number(numColors);
      // }
      return true;
    });
    // .sort((a, b) => b.colors.length - a.colors.length);

    res.status(200).json({
      colors: filteredColors.slice(skipVal, skipVal + limitVal),
      totalCount: filteredColors.length,
      hasMore: true,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
