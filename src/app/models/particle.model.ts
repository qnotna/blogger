export interface Color {
  hex: string;
  alpha: number;
}

export interface Location {
  x: number;
  y: number;
}

export interface Style {
  width: string;
  height: string;
  opacity: number;
  top: string;
  left: string;
}

export interface Particle {
  src: string;
  size: number;
  location: Location;
  color: Color;
}
