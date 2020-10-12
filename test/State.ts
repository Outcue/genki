
import { expect } from 'chai';
import { Rect } from '../src/Types/Rect';
import { State } from '../src/Bindings/State';


describe('State', () => {

    it('number can be modified', () => {

        const numberState = State(1)
        expect(numberState.get()).to.equal(1);
        expect(numberState).to.equal(1);

    });

    it('can be created from LTRB', () => {
        const rect = Rect.fromLTRB(1.0, 2.0, 3.0, 4.0)
        expect(rect.left).to.equal(1.0);
        expect(rect.top).to.equal(2.0);
        expect(rect.right).to.equal(3.0);
        expect(rect.bottom).to.equal(4.0);

    });

    it('is valid', () => {
        const rect = Rect.fromLTRB(1.0, 2.0, 3.0, 4.0)
        expect(rect.isValid()).to.be.true
    });

    it('is not valid', () => {
        const rect = Rect.fromLTRB(1.0, 1.0, 0.0, 0.0)
        expect(rect.isValid()).to.be.false
    });
});

