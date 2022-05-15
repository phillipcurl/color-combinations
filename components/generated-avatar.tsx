// import React from 'react'
// import PropTypes from 'prop-types'

import AvatarBauhaus from './avatar-bauhaus';
import AvatarRing from './avatar-ring';
import AvatarPixel from './avatar-pixel';
import AvatarBeam from './avatar-beam';
import AvatarSunset from './avatar-sunset';
import AvatarMarble from './avatar-marble';

// import { useColor } from '../lib/color-context';

const variants = ['pixel', 'bauhaus', 'ring', 'sunset', 'marble'] as const;

export type Variants = typeof variants[number];

interface AvatarProps {
  variant?: Variants;
  colors?: string[];
  name?: string;
  size?: number;
}

const Avatar = ({
  variant = 'marble',
  name = 'Clara Barton',
  size = 40,
  colors,
  ...props
}: AvatarProps) => {
  // const { state } = useColor();
  // const statefulColors = state.colors;
  const avatarProps = {
    colors: colors,
    name,
    size,
    ...props,
  };
  const checkedVariant = () => {
    if (variants.includes(variant)) {
      return variant;
    }
    return 'marble';
  };
  const avatars = {
    pixel: <AvatarPixel {...avatarProps} />,
    bauhaus: <AvatarBauhaus {...avatarProps} />,
    ring: <AvatarRing {...avatarProps} />,
    // beam: <AvatarBeam {...avatarProps} />,
    sunset: <AvatarSunset {...avatarProps} />,
    marble: <AvatarMarble {...avatarProps} />,
  };
  return avatars[checkedVariant()];
};

export default Avatar;
