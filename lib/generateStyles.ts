import { ForceColor, type Properties } from '../types';
const defaultStyle = {
  fill: '#FFFFFF',
  strokeWidth: 2,
  opacity: 0.6,
};

export const generateStyles = (
  data: Properties,
  section: string,
  city: string,
  election: string
) => {
  if (section && data.section !== section) return defaultStyle;
  if (city && data.departamen !== city) return defaultStyle;
  if (!(election in data)) return defaultStyle;

  const winner = data[election as keyof Properties];
  const color = ForceColor[winner as keyof typeof ForceColor];

  return {
    fill: color,
    strokeWidth: 2,
    opacity: 0.6,
  };
};
