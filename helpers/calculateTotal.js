export default function calculateTotal(...objects) {
  return objects.reduce((a, b) => {
    for (let key in b) {
      if (b.hasOwnProperty(key)) a[key] = (a[key] || 0) + b[key];
    }
    return a;
  }, {});
}
