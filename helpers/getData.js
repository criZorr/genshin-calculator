export default async function getData(url) {
  try {
    let res = await fetch(url),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    return json;
  } catch (err) {
    console.info(
      "^ This error appears because there's no a translation of some of the texts or names: " +
        err,
    );
    return "";
  }
}
