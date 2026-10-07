import { describe, it, expect } from 'vitest';
import { noop } from './noop';

describe('noop', () => {
  it('should be a function', () => {
    expect(typeof noop).toBe('function');
    expect(noop()).toBeUndefined();
  });
});