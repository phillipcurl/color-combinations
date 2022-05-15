import type { NextApiRequest, NextApiResponse } from 'next';
import palettes from '../../../data/combinations.json';

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const palette = palettes.find((palette) => palette.id == id);

    res.status(200).json({
      palette,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
