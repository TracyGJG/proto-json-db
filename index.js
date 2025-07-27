export default function (datasets, ids) {
  const _ids = Object.keys(datasets).reduce(
    (ids_, col) => ({ ...ids_, [col]: ids?.[col] ?? 'id' }),
    {}
  );

  console.table(_ids);

  const collections = Object.entries(datasets).reduce(
    (cols, [col, data]) => ({
      ...cols,
      [col]: new Map(data.map((datum) => [datum[_ids[col]], datum])),
    }),
    {}
  );

  console.table(Object.keys(collections));
  console.table([...collections.default.keys()]);
  console.table([...collections.alternative.keys()]);

  return {
    create(coll) {
      return (data) => {};
    },
    update(coll) {
      return (id, data) => {};
    },
    remove(coll) {
      return (id) => {};
    },
    read(coll) {
      return (id) => {};
    },
    list(coll) {
      return (predicate) => {};
    },
  };
}
