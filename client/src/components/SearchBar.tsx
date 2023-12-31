import "bootstrap";
import { useState } from "react";
import { DecalBillJoinCustomer } from "../models/decallBillJoinCustomer";
import { BangHieuBillJoinCustomer } from "../models/bangHieuBillJoinCustomer";
import { OtherBillJoinCustomer } from "../models/otherBillJoinCustomer";
type SearchBarProps = {
  areaIndex: string;
  listInfo: DecalBillJoinCustomer[];
  copyList: DecalBillJoinCustomer[];
  setList: React.Dispatch<React.SetStateAction<DecalBillJoinCustomer[]>>;
  listInfoBangHieu: BangHieuBillJoinCustomer[];
  copyListBangHieu: BangHieuBillJoinCustomer[];
  setListBangHieu: React.Dispatch<
    React.SetStateAction<BangHieuBillJoinCustomer[]>
  >;
  listInfoOther: OtherBillJoinCustomer[];
  copyListOther: OtherBillJoinCustomer[];
  setListOther: React.Dispatch<React.SetStateAction<OtherBillJoinCustomer[]>>;
};
export function SearchBar({
  areaIndex,
  listInfo,
  copyList,
  setList,
  listInfoBangHieu,
  copyListBangHieu,
  setListBangHieu,
  listInfoOther,
  copyListOther,
  setListOther,
}: SearchBarProps) {
  const filterList = (e: React.FormEvent) => {
    e.preventDefault();
    if (areaIndex === "1" || areaIndex === "2") {
      setList(
        copyList.filter((item) => item.phoneNumber?.includes(searchWord))
      );
    }
    if (areaIndex === "3") {
      setListBangHieu(
        copyListBangHieu.filter((item) =>
          item.phoneNumber?.includes(searchWord)
        )
      );
    } else {
      setListOther(
        copyListOther.filter((item) => item.phoneNumber?.includes(searchWord))
      );
    }
  };
  const [searchWord, setSearchWord] = useState("");
  return (
    <nav>
      <form className="d-flex flex-row mb-3" onSubmit={(e) => filterList(e)}>
        {areaIndex === "1" ? (
          <a
            href={`/hoadon/decal/themhoadon`}
            className="btn btn-outline-secondary mr-10 add-custom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
            Thêm đơn hàng mới
          </a>
        ) : areaIndex === "2" ? (
          <a
            href={`/hoadon/bangron/themhoadon`}
            className="btn btn-outline-secondary mr-10 add-custom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
            Thêm đơn hàng mới
          </a>
        ) : areaIndex === "3" ? (
          <a
            href={`/hoadon/banghieu/themhoadon`}
            className="btn btn-outline-secondary mr-10 add-custom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
            Thêm đơn hàng mới
          </a>
        ) : (
          <a
            href={`/hoadon/khac/themhoadon`}
            className="btn btn-outline-secondary mr-10 add-custom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
            Thêm đơn hàng mới
          </a>
        )}
        <input
          className="form-control mr-sm-2 ml-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
        <button
          className="btn btn-outline-success my-2 my-sm-0 submit-custom mr-3"
          type="submit"
          id="btnSearch"
        >
          Search
        </button>
      </form>
    </nav>
  );
}
