import { BangHieuBillInput } from "../network/bangHieuBill_api";
import { DecalBillInput } from "../network/decalBill_api";
import { OtherBillInput } from "../network/otherBill_api";
import { HoaDonDecal_BangRonProps } from "../pages/Decal/ThemHoaDonMoi_Decal";
import "../styles/styles.css";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";
export function HoaDonItemList(props: HoaDonDecal_BangRonProps) {
  let phone = "";
  if (typeof props.phoneNumber === "string") {
    phone = props.phoneNumber;
  }
  const bill: DecalBillInput = {
    idCustomer: props.idCustomer,
    note: props.note,
    width: props.width,
    height: props.height,
    amount: props.amount,
    discount: props.discount,
    totalPrice: props.total,
    billPrice: props.price,
    deposit: props.deposit,
    state: props.state,
    image: props.image,
  };
  const billBangHieu: BangHieuBillInput = {
    idCustomer: props.idCustomer,
    note: props.note,
    width: props.width,
    height: props.height,
    amount: props.amount,
    discount: props.discount,
    totalPrice: props.total,
    billPrice: props.price,
    deposit: props.deposit,
    state: props.state,
    image: props.image,
    materialType: props.materialType,
    isTwoFace: props.isTwoFace,
    toleNumber: props.toleNumber,
    hasFooter: props.hasFooter,
    isDelivery: props.isDelivery,
    costIncurred: props.costIncurred,
  };
  const billOther: OtherBillInput = {
    idCustomer: props.idCustomer,
    note: props.note,
    amount: props.amount,
    price: props.price,
    billPrice: props.total,
    state: props.state,
    image: props.image,
  };
  return (
    <>
      <div className="d-flex flex-row justify-content-between align-content-center card p-3 mb-2 scale-hover">
        <span className="text-left mt-2" style={{ width: "12%" }}>
          {props.phoneNumber}
        </span>
        <span className="text-left mt-2" style={{ width: "12%" }}>
          {props.name}
        </span>
        <span className="text-left mt-2" style={{ width: "12%" }}>
          {props.note}
        </span>
        <span className="text-left mt-2" style={{ width: "12%" }}>
          {formatDate(props.dateOrder)}
        </span>
        <span className="text-left mt-2" style={{ width: "12%" }}>
          {formatCurrency(props.total)}
        </span>
        <span className="text-left mt-2" style={{ width: "12%" }}>
          {props.state}
        </span>
        <div className="d-flex flex-row" style={{ width: "28%" }}>
          {props.state === "Hoàn thành" || props.state === "Thanh toán" ? (
            <button type="button" className="btn btn-primary m-1">
              Hoàn thành
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-primary m-1"
              onClick={(e) => {
                if (props.typeBill === 1 || props.typeBill === 2) {
                  props.setState(bill, props.id, "Hoàn thành", phone);
                } else if (props.typeBill === 3) {
                  props.setStateBangHieu(
                    billBangHieu,
                    props.id,
                    "Hoàn thành",
                    phone
                  );
                } else {
                  props.setStateOther(billOther, props.id, "Hoàn thành", phone);
                }
              }}
            >
              Hoàn thành
            </button>
          )}
          {props.state === "Thanh toán" ? (
            <button type="button" className="btn btn-success m-1">
              Thanh toán
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-success m-1"
              onClick={(e) => {
                if (props.typeBill === 1 || props.typeBill === 2) {
                  props.setState(bill, props.id, "Thanh toán", "");
                } else if (props.typeBill === 3) {
                  props.setStateBangHieu(
                    billBangHieu,
                    props.id,
                    "Thanh toán",
                    ""
                  );
                } else {
                  props.setStateOther(billOther, props.id, "Thanh toán", "");
                }
              }}
            >
              Thanh toán
            </button>
          )}

          <a
            className="btn btn-info m-1"
            href={`/hoadon/${
              props.typeBill === 1
                ? "decal"
                : props.typeBill === 2
                ? "bangron"
                : props.typeBill === 3
                ? "banghieu"
                : "khac"
            }/suahoadon/${props.id}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pen"
              viewBox="0 0 16 16"
            >
              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
            </svg>
          </a>
          <button
            type="button"
            className="btn btn-danger m-1"
            onClick={(e) => props.deleteBill(props.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
