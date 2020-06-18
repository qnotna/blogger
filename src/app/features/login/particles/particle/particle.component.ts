import { Component, OnInit, Input, OnChanges } from '@angular/core';
import Particle, { Color, Location, Style } from '../ParticleModel';

@Component({
  selector: 'app-particle',
  templateUrl: './particle.component.html',
  styleUrls: ['./particle.component.scss']
})
export class ParticleComponent implements Particle, OnInit, OnChanges {
  @Input() char: string;
  @Input() size: number;
  @Input() color: Color;
  @Input() location: Location;
  style: Style;

  @Input() deltaMouse: Location;

  ngOnInit(): void {
    console.log('hallo');
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
  update(delta: Location): void {
    if (delta) {
      this.location.x += delta.x * this.color.alpha / 5;
      this.location.y += delta.y * this.color.alpha / 5;
      this.draw();
    }
  }

  /**
   * Draws the particle on the canvas.
   * Checks if the particle is visible to increase performance
   */
  draw(): void {
    if (this.isVisible()) {
      this.style = {
        fontSize: `${this.size}pt`,
        color: this.color.hex,
        opacity: this.color.alpha,
        left: `${this.location.x}pt`,
        top: `${this.location.y}pt`
      } as Style;
    }
  }

  /**
   * Checks particle visibility.
   * @returns whether the particle is visible on the x-Axis
   */
  public isVisibleX(): boolean {
    return this.location.x + 2 * this.size > 0 && this.location.x - 2 * this.size < window.innerWidth;
  }

  /**
   * Checks particle visibility.
   * @returns whether the particle is visible on the y-Axis
   */
  public isVisibleY(): boolean {
    return this.location.y + 2 * this.size > 0 && this.location.y - 2 * this.size < window.innerHeight;
  }

  /**
   * Checks particle visibility.
   * @returns whether the particle is visible on the canvas
   */
  public isVisible(): boolean {
    return this.isVisibleX() && this.isVisibleY();
  }
}
