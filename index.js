export default function (datasets, ids) {
  const _ids = Object.keys(datasets).reduce(
    (ids_, col) => ({ ...ids_, [col]: ids?.[col] ?? 'id' }),
    {}
  );

  // console.table(_ids);

  const collections = Object.entries(datasets).reduce(
    (cols, [col, data]) => ({
      ...cols,
      [col]: new Map(data.map((datum) => [datum[_ids[col]], datum])),
    }),
    {}
  );

  // console.table(Object.keys(collections));
  // console.table([...collections.default.keys()]);
  // console.table([...collections.alternative.keys()]);

  return {
    create(coll) {
      return (data) => {
        const id_ =
          data?.[_ids[coll]] ?? `${Date.now()}_${collections[coll].size}`;
        collections[coll].set(id_, { [_ids[coll]]: id_, ...data });
      };
    },
    update(coll) {
      return (id, data) => collections[coll].set(id, data);
    },
    remove(coll) {
      return (id) => collections[coll].delete(id);
    },
    read(coll) {
      return (id) => collections[coll].get(id);
    },
    list(coll) {
      return (predicate = (datum) => datum) =>
        [...collections[coll].entries()]
          .map(([_, datum]) => datum)
          .filter(predicate);
    },
  };
}
