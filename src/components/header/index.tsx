import { useAtom } from "jotai";
import { useLayoutEffect, useState } from "react";
import { categoriesReducerAtom } from "../../atoms";

export default function Header() {
  const [categories, dispatchCategories] = useAtom(categoriesReducerAtom);

  const [isAllChecked, setIsAllChecked] = useState(true);

  useLayoutEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else throw new Error(`${res.status} | ${res.statusText}`);
      })
      .then((data) => {
        const newCategories: { [key: string]: boolean } = {};
        data.forEach((cate: string) => {
          newCategories[cate] = false;
        });

        // setCategories(newCategories);
        dispatchCategories({ type: "add", target: newCategories });
      });

    return () => {
      //
    };
  }, []);

  // useEffect(() => {
  //   console.log(categories);
  // }, [categories]);

  const clickAll = () => {
    if (!isAllChecked) {
      setIsAllChecked(true);
      dispatchCategories({ type: "reset" });
    }
  };

  const clickItem = (category: string) => {
    // console.log(categories);
    // setCategories((prev) => {
    //   return { ...prev, [category]: !prev[category] };
    // });
    setIsAllChecked(false);
    dispatchCategories({ type: "toggle", target: category });
  };

  return (
    <header>
      <ul className='grid'>
        <li className={"item" + (isAllChecked ? " active" : "")}>
          <button onClick={clickAll}>ALL</button>
        </li>
        {Object.entries(categories).map(([category, active]) => (
          <li key={category} className={"item" + (active ? " active" : "")}>
            <button onClick={() => clickItem(category)}>{category}</button>
          </li>
        ))}
      </ul>
    </header>
  );
}
