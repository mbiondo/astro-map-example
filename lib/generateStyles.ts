import { ForceColor, type Properties } from '../types';

export const generateStyles = (
  data: Properties,
  section: string,
  city: string,
  election: string
) => {
  if (section && data.section !== section)
    return {
      fill: '#FFFFFF',
      strokeWidth: '2',
      opacity: '0.6',
    };
  if (city && data.departamen !== city)
    return {
      fill: '#FFFFFF',
      strokeWidth: '2',
      opacity: '0.6',
    };
  const winner = data[election as keyof Properties];
  const color = ForceColor[winner as keyof typeof ForceColor];
  return {
    fill: color,
    strokeWidth: '2',
    opacity: '0.6',
  };
};
