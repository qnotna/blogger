export interface Color {
  hex: string;
  alpha: number;
}

export interface Location {
  x: number;
  y: number;
}

export interface Style {
  fontSize: string;
  color: string;
  opacity: number;
  top: string;
  left: string;
}

export default interface Particle {
  char: string;
  size: number;
  location: Location;
  color: Color;
}
