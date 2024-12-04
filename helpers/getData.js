export default async function getData(url) {
  try {
    let res = await fetch(url),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    return json;
  } catch (err) {
    console.log(err);
  }
}
