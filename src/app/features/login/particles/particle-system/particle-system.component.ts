import { Component, OnInit } from '@angular/core';
import Particle, { Color, Location } from '../ParticleModel';

@Component({
  selector: 'app-particle-system',
  templateUrl: './particle-system.component.html',
  styleUrls: ['./particle-system.component.scss']
})
export class ParticleSystemComponent implements OnInit {
  particles: Array<Particle>;
  private mouseStack: Array<Location>;
  deltaMouse: Location;

  ngOnInit(): void {
    this.particles = [];
    this.mouseStack = [];
    this.initParticlesWithSize(50, 10, 25);
  }

  /**
   * Event handler for mouse movement detection on canvas.
   * @param event Mouse move event
   */
  onMouseMove(event: MouseEvent): void {
    const mouse = {
      x: event.clientX,
      y: event.clientY
    } as Location;
    this.deltaMouse = this.delta(mouse);
  }

  /**
   * Calculates the delta (difference between the last two loactions).
   * Always keep only the latest mouse coordinates delta in stack.
   * @param next Next caught mouse location
   */
  delta(next: Location) {
    this.mouseStack.push({
      x: next.x,
      y: next.y,
    } as Location);
    if (this.mouseStack.length > 1) {
      const previous = this.mouseStack[0];
      this.mouseStack.splice(0, 1);
      return {
        x: previous.x - next.x,
        y: previous.y - next.y
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
    for (let i = 0; i < amount; i++) {
      this.particles.push(this.createParticle(minSize, maxSize));
    }
  }

  /**
   * Creates the style for each particle randomly:
   * - char:   0       ... charset.length,
   * - size:   minSize ... maxSize,
   * - x, y:   0       ... canvas size,
   * - alpha:  0       ... 0.5,
   * - color:  orange   |  white            (1:5 chance).
   * Adds the particle to the canvas div and particles list
   * @param minSize minimum particle size in pt
   * @param maxSize maximum particle size in pt
   */
  createParticle(minSize, maxSize): Particle {
    let charset = 'AÄÀÁÂÆÃÅĀBCÇĆČDEÉÈÊËĖFGHHIÎÏÍĪÌJKLMNÑŃOÖÔÒÓÕŒØŌPQRSŚŠTUÜÛÙÚŪVWXYŸZß';
    charset += charset.toLowerCase();
    charset += '說文解字注从日在茻中會意茻亦聲औकखगघङचαβγδεζηθλμνξπρσφψω';
    return {
      char: charset.charAt(Math.floor(Math.random() * charset.length)),
      size: Math.floor(Math.random() * maxSize) + minSize,
      location: {
        x: Math.round(Math.random() * window.innerWidth),
        y: Math.round(Math.random() * window.innerHeight)
      } as Location,
      color: {
        hex: Math.random() < 1 / 5 ? 'darkOrange' : 'white',
        alpha: Math.random()
      } as Color
    } as Particle;
  }

}
