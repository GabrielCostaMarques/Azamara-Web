export default function formatShipName(name) {

  if (name === name.toUpperCase()) {
    return name
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  return name;
}