import { SearchSVG } from "@/icons";
import SVGButton from "../SVGButton";
import cls from "@/utils/cls";

interface SearchFormProps {
  theme?: "light" | "dark";
}

export default function SearchForm({ theme = "light" }: SearchFormProps) {
  const themeStyles = {
    light: "text-white border-b-white placeholder:text-white",
    dark: "text-black border-b-black placeholder:text-black",
  };

  return (
    <form className="relative flex items-center gap-1">
      <input
        className={cls(
          "border-b-2 bg-transparent pl-1 pr-8 outline-none",
          "placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out",
          "transition-all duration-300 ease-in-out",
          themeStyles[theme],
        )}
        placeholder="Search"
        spellCheck={false}
      />
      <span className="absolute right-2 top-1/2 -translate-y-1/2">
        <SVGButton svg={SearchSVG} size={5} />
      </span>
    </form>
  );
}
