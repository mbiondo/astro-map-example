export interface GeoJSONResponse {
  type: string;
  features: Feature[];
}

export interface Feature {
  type: FeatureType;
  geometry: Geometry;
  properties: Properties;
  id: number;
}

export interface Geometry {
  type: GeometryType;
  coordinates: Array<Array<number[]>>;
}

export enum GeometryType {
  Polygon = 'Polygon',
}

export interface Properties {
  ogc_fid: number;
  circuito: null | string;
  departamen: string;
  electores_2023: number | null;
  paso2019_pres_fuerza2: General2019PresFuerza2;
  paso2019_pres_ganador: General2019PresFuerza2;
  paso2023_pres_fuerza2: Paso2023Pres;
  paso2023_pres_ganador: Paso2023Pres;
  general2019_pres_fuerza2: General2019PresFuerza2;
  general2019_pres_ganador: General2019PresFuerza2;
  paso2019_pres_porcentaje_ganador: number;
  paso2023_pres_porcentaje_ganador: number;
  general2019_pres_porcentaje_ganador: number;
  section?: string;
}

export enum General2019PresFuerza2 {
  Fdt = 'FDT',
  Jxc = 'JXC',
  Otros = 'OTROS',
}

export enum Paso2023Pres {
  Jxc = 'JXC',
  Lla = 'LLA',
  Up = 'UP',
}

export enum FeatureType {
  Feature = 'Feature',
}

export enum ForceColor {
  FDT = '#85C1E9',
  JXC = '#F4D03F',
  LLA = '#AF7AC5',
  UP = '#85C1E9',
  OTROS = '#FFFFFF',
}

export enum ForceName {
  FDT = 'Frente de Todos',
  JXC = 'Juntos por el Cambio',
  LLA = 'La Libertad Avanza',
  UP = 'Unite por la Libertad y la Dignidad',
  OTROS = 'Otros',
}
