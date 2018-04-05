import {sinonTest} from "../test-utils/sinonWithTest";
import * as sinon from "sinon";

import randomObjectGenerator from './randomObjectGenerator';

describe("randomObjectGenerator", function () {
    describe('boolean', function () {
        [
            0.5,
            0.51,
            0.6,
            0.9,
            0.999
        ].forEach(anyNumberGreaterThanOrEqualToZeroPointFive =>
            it(`should return true if Math.random() returns ${anyNumberGreaterThanOrEqualToZeroPointFive} which is >=0.5`, sinonTest(function (this: sinon.SinonSandbox) {
                // given
                this.stub(Math, "random").returns(anyNumberGreaterThanOrEqualToZeroPointFive);

                // when
                let generatedBoolean = randomObjectGenerator.boolean();

                // then
                expect(generatedBoolean).toEqual(true);
            }))
        );

        it('should return false if Math.random() returned <0.5', sinonTest(function (this: sinon.SinonSandbox) {
            // given
            let anyNumberSmallerThanZeroPointFive = 0.1;
            this.stub(Math, "random").returns(anyNumberSmallerThanZeroPointFive);

            // when
            let generatedBoolean = randomObjectGenerator.boolean();

            // then
            expect(generatedBoolean).toEqual(false);
        }));
    });
});