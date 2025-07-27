export default function (datasets, ids) {
  const _ids = Object.keys(datasets).reduce(
    (ids_, col) => ({ ...ids_, [col]: ids?.[col] ?? 'id' }),
    {}
  );

  const collections = Object.entries(datasets).reduce(
    (cols, [col, data]) => ({
      ...cols,
      [col]: new Map(data.map((datum) => [datum[_ids[col]], datum])),
    }),
    {}
  );

  return {
    create(coll) {
      return (data) => {
        const id_ =
          data?.[_ids[coll]] ?? `${Date.now()}_${collections[coll].size}`;
        collections[coll].set(id_, { [_ids[coll]]: id_, ...data });
      };
    },
    list(coll) {
      return (predicate = (datum) => datum) =>
        [...collections[coll].entries()]
          .map(([_, datum]) => datum)
          .filter(predicate);
    },
    read(coll) {
      return (id) => collections[coll].get(id);
    },
    remove(coll) {
      return (id) => collections[coll].delete(id);
    },
    update(coll) {
      return (id, data) => collections[coll].set(id, data);
    },
  };
}
