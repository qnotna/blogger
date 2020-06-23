import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Color, Location, Style, Particle } from '../models/particle.model';

@Component({
  selector: 'app-particle',
  templateUrl: './particle.component.html',
  styleUrls: ['./particle.component.scss'],
})
export class ParticleComponent implements Particle, OnInit, OnChanges {
  @Input() src: string;
  @Input() size: number;
  @Input() color: Color;
  @Input() location: Location;
  style: Style;

  @Input() deltaMouse: Location;

  ngOnInit(): void {
    this.src = `https://img.icons8.com/${this.color.hex}/${this.src}`;
    this.draw();
  }

  /**
   * If this component registers change, update and reset particle
   */
  ngOnChanges(): void {
    this.update(this.deltaMouse);
  }

  /**
   * Changes the location for every particle by adding the mouse difference.
   * Location change is different for each particle's distance to the screen.
   * Checks if the mouse position has changed to increase performance.
   * @param delta mouse position difference (movement vector)
   */
  public update(delta: Location): void {
    const noDelta = { x: 0, y: 0 } as Location;
    if (delta && delta !== noDelta) {
      this.location.x += delta.x * this.color.alpha / 5;
      this.location.y += delta.y * this.color.alpha / 5;
      this.draw();
    }
  }

  /**
   * Draws the particle on the canvas.
   * Checks if the particle is visible to increase performance
   */
  private draw(): void {
    if (this.isVisible()) {
      this.style = {
        width: `${this.size}px`,
        height: `${this.size}px`,
        opacity: this.color.alpha,
        left: `${this.location.x}px`,
        top: `${this.location.y}px`,
      } as Style;
    }
  }

  /**
   * Checks particle visibility.
   * @returns whether the particle is visible on the x-Axis
   */
  private isVisibleX(): boolean {
    return this.location.x +
    2 * this.size > 0 && this.location.x - 2 * this.size < window.innerWidth;
  }

  /**
   * Checks particle visibility.
   * @returns whether the particle is visible on the y-Axis
   */
  private isVisibleY(): boolean {
    return this.location.y +
    2 * this.size > 0 && this.location.y - 2 * this.size < window.innerHeight;
  }

  /**
   * Checks particle visibility.
   * @returns whether the particle is visible on the canvas
   */
  public isVisible(): boolean {
    return this.isVisibleX() && this.isVisibleY();
  }
}
