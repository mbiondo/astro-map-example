import { ForceColor, type Properties } from '../types';

export const generateStyles = (
  data: Properties,
  city: string,
  election: string
) => {
  if (city && data.departamen !== city) return null;

  const winner = data[election as keyof Properties];
  const color = ForceColor[winner as keyof typeof ForceColor];
  return {
    fill: color,
    strokeWidth: '2',
    opacity: '0.9',
  };
};
