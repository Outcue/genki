
import { expect } from 'chai';
import { Point } from '../src/Types/Point';

describe('Point', () => {
    it('can be created as empty', () => {
        const point = Point()
        expect(point.x).to.equal(0.0);
        expect(point.y).to.equal(0.0);
    });

    it('can be created with coordinates', () => {
        const point = Point(1.0, 2.0)
        expect(point.x).to.equal(1.0);
        expect(point.y).to.equal(2.0);
    });
});

