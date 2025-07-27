# proto-json-db

Prototype utility to provide a DB based on JSON data

## Instantiation

The module exposes a single default factory function. Is should be called with a JS Object usually imported as a JSON file to creeate an in-memory data store. Calling the factory function returns the following methods.

The structure of the JSON file should be as follows:

```js
{
  "collection_name": [
    { collection_object },
    :
  ],
  :
}
```

The JSON file can contain multiple datasets. The datasets replace the array of objects with a `map` object.

An option second parameter can be suppied to override the default key property of `id` on a per-collection basis. This uses an object of key:value pairs where the key is the `collection_name` and the value is the alternative id property name.

### `create(collectionName)(data)`

This operation adds an object (data) to the named collection (collectionName) and assigns a generated key (id), which is returned.

### `list(collectionName)(where)`

Without the optional `where` argument this call retrieves all the objects in the collection. If a predicate function (`where`) is supplied, only those objects that conform to the predicate will be returned in the list.

### `read(collectionName)(id)`

Retrieves the object from the collection with the given id. Null is returned if no object is found for the id.

### `remove(collectionName)(id)`

Removes the object from the collection with the given id. If no object is found for the given id, no error is reported.

### `update(collectionName)(id, data)`

The update operation performs exactly the same as the `create` method but an object is expected to already exist. No error is reported if no object exists for the id. Instead an object will be created.

---
