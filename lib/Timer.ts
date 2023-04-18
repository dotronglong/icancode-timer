import {hrtime} from 'node:process';

/**
 * Timer
 */
export default class Timer {
  private timestamp: number;
  private timestampBigInt: bigint;
  private useHighResolutionTime: boolean;
  private template: string;

  /**
   * Constructor
   * @param {boolean} useHighResolutionTime
   * @param {string} template
   */
  constructor(useHighResolutionTime: boolean = false, template: string = '') {
    this.useHighResolutionTime = useHighResolutionTime;
    if (template.length > 0) {
      this.template = template;
    } else {
      this.template = '{label} completed in {duration} {unit}';
    }
  }

  /**
   * Enable timer
   */
  tick() {
    if (this.useHighResolutionTime) {
      this.timestampBigInt = hrtime.bigint();
    } else {
      this.timestamp = Date.now();
    }
  }

  /**
   * Compute duration since it starts
   * This method can be used multiple time since it is ticked
   * @param {string} label A label for this time
   * @return {string} a string with label and duration
   *                  or number as string if empty
   */
  tock(label: string = ''): string {
    let duration: number | bigint;
    if (this.useHighResolutionTime) {
      const now = hrtime.bigint();
      duration = now - this.timestampBigInt;
      this.timestampBigInt = now;
    } else {
      const now = Date.now();
      duration = now - this.timestamp;
      this.timestamp = now;
    }

    if (label.length > 0) {
      return this.render(
          label, duration, this.useHighResolutionTime ? 'ns' : 'ms',
      );
    } else {
      return duration.toString();
    }
  }

  /**
   * Render message
   * @param {string} label
   * @param {number | bigint} duration
   * @param {string} unit
   * @return {string}
   */
  private render(label: string,
      duration: number | bigint,
      unit: string): string {
    return this.template.replace('{label}', label)
        .replace('{duration}', duration.toString())
        .replace('{unit}', unit);
  }
}
