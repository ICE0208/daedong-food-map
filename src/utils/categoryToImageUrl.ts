// utils/categoryToImageUrl.ts
function categoryToImageUrl(categoryName: string) {
  const categoryList = categoryName
    .split(" > ")
    .reduce((arr, name) => [...arr, ...name.split(",")], new Array<string>())
    .filter((name) => name !== "음식점");

  for (const category of categoryList) {
    const value = imageMap.get(category);
    if (value) return value;
  }

  return DEFAULT_IMAGE;
}

const DEFAULT_IMAGE = "/assets/images/default.png";
const imageMap = new Map<string, string>([
  ["베이커리", "/assets/images/베이커리.png"],
  ["동남아", "/assets/images/동남아.png"],
  ["복어", "/assets/images/복어.png"],
  ["분식", "/assets/images/분식.png"],
  ["술집", "/assets/images/술집.png"],
  ["양식", "/assets/images/양식.png"],
  ["인도", "/assets/images/인도.png"],
  ["중동", "/assets/images/중동.png"],
  ["일식", "/assets/images/일식.png"],
  ["중식", "/assets/images/중식.png"],
  ["치킨", "/assets/images/치킨.png"],
  ["카페", "/assets/images/카페.png"],
  ["탕류", "/assets/images/탕류.png"],
  ["한식", "/assets/images/한식.png"],
  ["식빵", "/assets/images/식빵.png"],
]);

export default categoryToImageUrl;
