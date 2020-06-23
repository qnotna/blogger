import { Injectable } from '@angular/core';
import particleModel, { Location, Color } from '../models/particle.model';
import particleSystemConfig from '../config/particle-system.config';

@Injectable({ providedIn: 'root' })
export class ParticleSystemService {
  private mouseStack: Location[] = [];
  particles: Particle[] = [];
  deltaMouse: Location;

  constructor() { }

  /**
   * Event handler for mouse movement detection on canvas.
   * @param event Mouse move event
   */
  onMouseMove(event: MouseEvent): void {
    const mouse = {
      x: event.clientX,
      y: event.clientY,
    } as Location;
    this.delta(mouse);
  }

  /**
   * Calculates the delta (difference between the last two loactions).
   * Always keep only the latest mouse coordinates delta in stack.
   * @param next Next caught mouse location
   */
  delta(next: Location): void {
    this.mouseStack.push({
      x: next.x,
      y: next.y,
    } as Location);
    if (this.mouseStack.length > 1) {
      const previous = this.mouseStack[0];
      this.mouseStack.splice(0, 1);
      this.deltaMouse = {
        x: previous.x - next.x,
        y: previous.y - next.y,
      } as Location;
    }
  }

  /**
   * Creates particles and adds mouse event listeners for window focus changes.
   * @param amount how many particles should be initialized
   * @param minSize minimum particle size in pt
   * @param maxSize maximum particle size in pt
   */
  initParticlesWithSize(amount: number, minSize: number, maxSize: number): void {
    for (let i = 0; i < amount; i += 1) {
      this.particles.push(this.createParticle(minSize, maxSize));
    }
  }

  /**
   * Creates the style for each particle randomly:
   * - src:    0       ... charset.length,
   * - size:   minSize ... maxSize,
   * - x, y:   0       ... canvas size,
   * - alpha:  0       ... 0.5,
   * - color:  orange   |  white            (1:5 chance).
   * Adds the particle to the canvas div and particles list
   * @param minSize minimum particle size in pt
   * @param maxSize maximum particle size in pt
   */
  createParticle(minSize, maxSize): Particle {
    const { icons, colors } = particleSystemConfig;
    return {
      // char: charset.charAt(Math.floor(Math.random() * charset.length)),
      src: icons[Math.floor(Math.random() * icons.length)],
      size: Math.floor(Math.random() * maxSize) + minSize,
      location: {
        x: Math.round(Math.random() * window.innerWidth - 50),
        y: Math.round(Math.random() * window.innerHeight - 50),
      } as Location,
      color: {
        hex: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() + 0.5,
      } as Color,
    } as Particle;
  }

}
