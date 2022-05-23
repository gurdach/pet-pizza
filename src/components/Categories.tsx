import React from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: (idx: number) => void;
};

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onChangeCategory }) => {
    console.log("Render Categories. value: ", value);
    return (
      <div className="categories">
        <ul>
          {categories.map((category, idx) => (
            <li
              key={idx}
              className={idx === value ? "active" : ""}
              onClick={() => onChangeCategory(idx)}>
              {category}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
