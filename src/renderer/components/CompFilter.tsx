import React, { FormEvent, useRef } from "react";
import { connect } from "react-redux";
import {
  // BRAND_ALL,
  // BRAND_WX,
  // BRAND_ZFB,
  BrandFilter,
  // CAT_ALL,
  // CAT_LS,
  // CAT_XQ,
  CatFilter,
  FilterLibrary,
  filterLibrary,
  // STATUS_ALL,
  // STATUS_FAIL,
  // STATUS_SUCCESS,
  StatusFilter,
} from "../../redux/library/actions";
import { AppState } from "../../redux/reducers";

export interface CompFilterProps {
  filters: FilterLibrary;
  dispatchFilterImgs: any;
  visibleImgs: any;
  imgs: any;
}

export function CompFilter(props: CompFilterProps) {
  const filters = useRef<FilterLibrary>(props.filters);

  const handleSubmit = (e: FormEvent) => {
    props.dispatchFilterImgs(filters.current);
    e.preventDefault();
  };

  return (
    <form id={"filter-library"} onSubmit={handleSubmit}>
      <label style={{ margin: 10 }} htmlFor={"brand"}>
        厂商
      </label>
      <select
        id={"brand"}
        defaultValue={props.filters.brand}
        onChange={(e) =>
          (filters.current.brand = e.target.value as BrandFilter)
        }
      >
        <option value={BrandFilter.BRAND_ALL}>全部</option>
        <option value={BrandFilter.BRAND_WX}>微信</option>
        <option value={BrandFilter.BRAND_ZFB}>支付宝</option>
      </select>

      <label style={{ margin: 10 }} htmlFor={"cat"}>
        类别
      </label>
      <select
        defaultValue={props.filters.cat}
        id={"cat"}
        onChange={(e) => (filters.current.cat = e.target.value as CatFilter)}
      >
        <option value={CatFilter.CAT_ALL}>全部</option>
        <option value={CatFilter.CAT_LS}>流水</option>
        <option value={CatFilter.CAT_XQ}>详情</option>
      </select>

      <label style={{ margin: 10 }} htmlFor={"status"}>
        识别状态
      </label>
      <select
        defaultValue={props.filters.status}
        id={"status"}
        onChange={(e) =>
          (filters.current.status = e.target.value as StatusFilter)
        }
      >
        <option value={StatusFilter.STATUS_ALL}>全部</option>
        <option value={StatusFilter.STATUS_SUCCESS}>成功</option>
        <option value={StatusFilter.STATUS_FAIL}>失败</option>
      </select>

      <input type={"submit"} value={"筛选"} style={{ margin: 20 }} />

      <span>
        （{props.visibleImgs.length} / {props.imgs.length}）
      </span>
    </form>
  );
}

const mapState = (state: AppState) => ({
  filters: state.imgs.filter,
  visibleImgs: state.imgs.visibleImgs,
  imgs: state.imgs.imgs,
});

const mapDispatch = {
  dispatchFilterImgs: filterLibrary,
};

export default connect(mapState, mapDispatch)(CompFilter);
