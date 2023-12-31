import { ImportMaterialRecord } from "../models/importMaterialRecord";
import "../styles/styles.css";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";
type RecordProps = {
  _id: string;
  note: string;
  price: number;
  date: string;
  updateAt: string;
  select: (item: ImportMaterialRecord) => void;
};
export function RecordItemList({
  _id,
  note,
  price,
  date,
  updateAt,
  select,
}: RecordProps) {
  return (
    <>
      <div
        className="d-flex flex-row justify-content-between align-content-center card p-3 mb-2 scale-hover"
        onClick={() => {
          let input: ImportMaterialRecord = {
            _id: _id,
            note: note,
            price: price,
            createdAt: date,
            updatedAt: updateAt,
          };
          select(input);
        }}
      >
        <span
          className="text-left mt-2"
          style={{ width: "50%", fontWeight: "500" }}
        >
          {note}
        </span>
        <span className="text-left mt-2" style={{ width: "25%" }}>
          {formatCurrency(price)}
        </span>
        <span className="text-left mt-2" style={{ width: "25%" }}>
          {formatDate(date)}
        </span>
      </div>
    </>
  );
}
