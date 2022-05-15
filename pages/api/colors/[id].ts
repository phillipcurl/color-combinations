import type { NextApiRequest, NextApiResponse } from 'next';
import colors from '../../../data/colors.json';

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const color = colors.find((color) => color?.id === id);

    res.status(200).json({
      color,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
