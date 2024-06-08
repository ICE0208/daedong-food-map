// categoryName's example : "음식점 > 일식 > 돈까스,우동"
// result's example : ['음식점', '일식', '돈까스', '우동']
function formatCategoryName(categoryName: string) {
  const result = categoryName
    .split(" > ")
    .reduce((arr, name) => [...arr, ...name.split(",")], new Array<string>())
    .filter((name) => name !== "음식점")
    .map((name) => `#${name}`)
    .join(" ");

  return result;
}

export default formatCategoryName;
