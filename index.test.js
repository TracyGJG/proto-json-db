import { describe, it } from 'node:test';
import assert from 'node:assert';

import stateWidthDefaultId from './states-defaultId.json' with { type:  'json'};
import stateWidthAlternateId from './states-stateId.json' with { type:  'json'};

import ProtoJsonDb from './index.js';

describe('PROTO JSON DB', () => {
  describe('can be instantiated', () => {
    const {create, update, remove, read, list } = ProtoJsonDb(
      {
        default: stateWidthDefaultId,
        alternative: stateWidthAlternateId,
      },
      {
        alternative: 'stateId'
      }
    );

    assert.equal(typeof create, "function");
  });
});
