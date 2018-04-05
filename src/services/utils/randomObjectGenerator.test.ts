import {sinonTest} from "../test-utils/sinonWithTest";
import * as sinon from "sinon";

import randomObjectGenerator from './randomObjectGenerator';

describe("randomObjectGenerator", function () {
    describe('boolean', function () {
        it('should return true if Math.random() returned >=0.5', sinonTest(function (this: sinon.SinonSandbox) {
            // given
            let anyNumberGreaterThanOrEqualToZeroPointFive = 0.5;
            this.stub(Math, "random").returns(anyNumberGreaterThanOrEqualToZeroPointFive);

            // when
            let generatedBoolean = randomObjectGenerator.boolean();

            // then
            expect(generatedBoolean).toEqual(true);
        }));

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