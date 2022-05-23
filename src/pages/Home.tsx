import React from "react";
import { useSelector } from "react-redux";

import { Categories, Sort, PizzaBlock, Skeleton } from "../components";

import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";
import { selectPizzaData } from "../redux/pizza/selectors";
import { setCategoryId, setCurrentPage } from "../redux/filter/slice";
import { fetchPizzas } from "../redux/pizza/asyncActions";
import { setItems } from "../redux/pizza/slice";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { items, endOfList, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setItems([]));
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? String(categoryId) : "";
    const search = searchValue;

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );
  };

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(2)].map((_, index) => (
    <Skeleton key={index} />
  ));
  console.log("Render Home, pizzas", pizzas.length);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить данные. Попробуйте позже.</p>
        </div>
      ) : (
        <div className="content__items">
          {pizzas.length > 0 ? pizzas : skeletons}
          {status === "loading" && skeletons}
        </div>
      )}

      {endOfList || status === "error" || status === "loading" ? null : (
        <button
          onClick={() => onChangePage(currentPage + 1)}
          className="button button--add"
          style={{
            margin: "30px 0",
          }}>
          <span>Загрузить ещё</span>
        </button>
      )}
    </div>
  );
};

export default Home;
