import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';

import stateWidthDefaultId from './states-defaultId.json' with { type:  'json'};
import stateWidthAlternateId from './states-stateId.json' with { type:  'json'};

import ProtoJsonDb from './index.js';

describe('PROTO JSON DB', () => {
  it('can be instantiated', () => {
    const { create, update, remove, read, list } = ProtoJsonDb(
      {
        default: stateWidthDefaultId,
        alternative: stateWidthAlternateId,
      },
      {
        alternative: 'stateId',
      }
    );

    assert.equal(typeof create, 'function');
    assert.equal(typeof update, 'function');
    assert.equal(typeof remove, 'function');
    assert.equal(typeof read, 'function');
    assert.equal(typeof list, 'function');

    assert.equal(typeof create('default'), "function");
    assert.equal(typeof update('default'), "function");
    assert.equal(typeof remove('default'), "function");
    assert.equal(typeof read('default'), "function");
    assert.equal(typeof list('default'), "function");
  });

  describe('with the default collection', () => {
    let create, update, remove, read, list;

    beforeEach(() => {
      ({ create, update, remove, read, list } = ProtoJsonDb(
        {
          default: stateWidthDefaultId,
          alternative: stateWidthAlternateId,
        },
        {
          alternative: 'stateId',
        }
      ));
    });

    it('can list the content of the collection', () => {
      const result = list('default')();
      assert.equal(result.length, 4);
      assert.deepEqual(result[2], {
        id: 'tac',
        action: 'tacAction',
        triggers: {
          next: 'toe',
          back: 'tic',
        },
      });
    });

    it('can list the content of the collection', () => {
      const result = list('default')((_) => _.id !== 'initial');
      assert.equal(result.length, 3);
      assert.deepEqual(result[2], {
        action: 'toeAction',
        id: 'toe',
        triggers: {},
      });
    });

    it('can read an entry of the collection', () => {
      const result = read('default')('tac');
      assert.deepEqual(result, {
        id: 'tac',
        action: 'tacAction',
        triggers: {
          next: 'toe',
          back: 'tic',
        },
      });
    });

    it('can remove an entry of the collection', () => {
      remove('default')('tac');
      const result = list('default')();
      assert.equal(result.length, 3);

      assert.deepEqual(result[2], {
        id: 'toe',
        action: 'toeAction',
        triggers: {},
      });
    });

    it('can create a new entry for the collection', () => {
      let result = list('default')();
      assert.equal(result.length, 4);

      create('default')({ id: 'test', action: 'testAction', triggers: {} });

      result = list('default')();
      assert.equal(result.length, 5);

      assert.deepEqual(result[4], {
        action: 'testAction',
        id: 'test',
        triggers: {},
      });
    });

    it('can update an existing entry for the collection', () => {
      let result = list('default')();
      assert.equal(result.length, 4);
      assert.deepEqual(result[3], {
        action: 'toeAction',
        id: 'toe',
        triggers: {},
      });
    
      update('default')('toe', {
        id: 'toe',
        action: 'testAction',
        triggers: { testTrigger: 'test' },
      });

      result = list('default')();
      assert.equal(result.length, 4);

      assert.deepEqual(result[3], {
        action: 'testAction',
        id: 'toe',
        triggers: { testTrigger: 'test' },
      });
    });
  });

  describe('with the alternative collection', () => {
    let create, update, remove, read, list;

    beforeEach(() => {
      ({ create, update, remove, read, list } = ProtoJsonDb(
        {
          default: stateWidthDefaultId,
          alternative: stateWidthAlternateId,
        },
        {
          alternative: 'stateId',
        }
      ));
    });

    it('can create a new entry for the collection', () => {
      let result = list('alternative')();
      assert.equal(result.length, 4);

      create('alternative')({ action: 'testAction', triggers: {} });

      result = list('alternative')();
      assert.equal(result.length, 5);

      assert.equal(result[4].action, 'testAction');
      assert.deepEqual(result[4].triggers, {});
      assert.match(result[4].stateId, /^\d{13}_\d$/);
    });
  });
});
