/* eslint-disable react/jsx-pascal-case */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { FileDrop } from "../../components/drag_and_drop_component/FileDrop";
import { Information_BangHieu } from "../../components/drag_and_drop_component/Information_BangHieu";
import * as ServicePriceApi from "../../network/servicePrice_api";
import * as BangHieuBillApi from "../../network/bangHieuBill_api";
import * as CustomerApi from "../../network/customer_api";
import { ServicePrice } from "../../models/servicePrice";
import { BangHieuBill } from "../../models/bangHieuBill";
import { useForm } from "react-hook-form";
import { Toast } from "bootstrap";
import { Customer as CustomerModel } from "../../models/customer";
import { PasswordInput } from "../../components/PasswordInput";

export function ThemHoaDonMoi_BangHieu() {
  let [cost, setCost] = useState(1);
  let [costFooter, setCostFooter] = useState(1);
  let [costDelivery, setCostDelivery] = useState(1);
  const [servicePrices, setServicePrices] = useState<ServicePrice[]>([]);
  const [customer, setCustomer] = useState<CustomerModel>();
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  const [isExistCustomer, setIsExistCustomer] = useState(false);
  let [idCustomer, setIdCustomer] = useState("");
  let [nameCustomer, setNameCustomer] = useState("");
  const [imageData, setImageData] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  let [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [deposit, setDeposit] = useState(0);
  let [copy, setCopy] = useState(0);
  let [total, setTotal] = useState(0);
  const [amount, setAmount] = useState(1);
  const [materialType, setMaterialType] = useState("");
  const [isTwoFace, setIsTwoFace] = useState(false);
  const [toleNumber, setToleNumber] = useState(0);
  const [hasFooter, setHasFooter] = useState(false);
  const [isDelivery, setIsDelivery] = useState(false);
  const [costIncurred, setCostIncurred] = useState(0);

  async function loadServicePrice() {
    try {
      document.getElementById("trigger")?.click();
      const results = await ServicePriceApi.fetchServicePrices().then(
        (data) => {
          let copyCat: ServicePrice[] = [];
          data.map((item) => {
            copyCat.push({
              serviceName: item.serviceName,
              price: item.price,
              _id: "",
              createdAt: "",
              updatedAt: "",
            });
          });
          setServicePrices(copyCat);
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
    }
  }
  async function loadCustomer() {
    try {
      const results = await CustomerApi.fetchCustomers();
      setCustomers(results);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadServicePrice().then((data) => {
      loadCustomer().then((data) => {
        document.getElementById("closeModal")?.click();
      });
    });
  }, []);

  async function onSubmit(input: BangHieuBillApi.BangHieuBillInput) {
    try {
      await BangHieuBillApi.createBangHieuBill(input);

      const toastLiveExample = document.getElementById("liveToastSuccess");
      if (toastLiveExample) {
        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
      }
    } catch (error) {
      const toastLiveExample = document.getElementById("liveToastFail");
      if (toastLiveExample) {
        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
      }
    }
  }

  async function onSubmitCustomer(input: CustomerApi.CustomerInput) {
    try {
      const result = await CustomerApi.createCustomer(input).then((data) => {
        customers.push({
          name: data.name,
          phoneNumber: data.phoneNumber,
          _id: data._id,
          total: data.total,
          payed: data.payed,
          debt: data.debt,
        });
      });
    } catch (error) {
      const toastLiveExample = document.getElementById("liveToastFail");
      if (toastLiveExample) {
        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
      }
    }
  }

  async function onEditCustomer(input: CustomerApi.CustomerInput) {
    try {
      const result = await CustomerApi.updateCustomer(idCustomer, input);
    } catch (error) {
      const toastLiveExample = document.getElementById("liveToastFail");
      if (toastLiveExample) {
        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
      }
    }
  }

  function processInfoCustomer() {
    handleCalculate();
    handleCustomer();
  }

  function createBill() {
    let input: BangHieuBillApi.BangHieuBillInput = {
      amount: amount,
      idCustomer: idCustomer,
      note: note,
      width: width,
      height: height,
      discount: discount,
      totalPrice: total,
      billPrice: price,
      deposit: deposit,
      state: "Chưa xong",
      image: imageData,
      materialType: materialType,
      isTwoFace: isTwoFace,
      toleNumber: toleNumber,
      hasFooter: hasFooter,
      isDelivery: isDelivery,
      costIncurred: costIncurred,
    };
    onSubmit(input);
  }

  const handleCustomer = () => {
    if (!isExistCustomer) {
      let input: CustomerApi.CustomerInput = {
        name: name,
        phoneNumber: phoneNumber,
        total: total,
        payed: 0,
        debt: total,
      };
      onSubmitCustomer(input).then(() => {
        let index = 0;
        customers.map((item) => {
          if (index === customers.length - 1) {
            idCustomer = item._id;
            index++;
          } else {
            index++;
          }
        });
        createBill();
      });
      setIsExistCustomer(true);
    } else {
      createBill();
      if (nameCustomer !== name) {
        customers.map((customer) => {
          if (customer._id === idCustomer) {
            let input: CustomerApi.CustomerInput = {
              name: name,
              phoneNumber: customer.phoneNumber,
              total: customer.total + total,
              payed: customer.payed,
              debt: customer.debt + total,
            };
            onEditCustomer(input);
          }
        });
      } else {
        customers.map((customer) => {
          if (customer._id === idCustomer) {
            let input: CustomerApi.CustomerInput = {
              name: nameCustomer,
              phoneNumber: customer.phoneNumber,
              total: customer.total + total,
              payed: customer.payed,
              debt: customer.debt + total,
            };
            onEditCustomer(input);
          }
        });
      }
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (width === 0 || height === 0) {
      const toastLiveExample = document.getElementById(
        "liveToastFailDimension"
      );
      if (toastLiveExample) {
        const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
      }
      return;
    }
    processInfoCustomer();
  };
  const handleCalculate = () => {
    let index = 1,
      location = 0;
    if (materialType === "Bạt") {
      if (!isTwoFace) location = 3;
      else location = 4;
    } else {
      if (!isTwoFace && toleNumber === 1) {
        location = 5;
      } else if (isTwoFace && toleNumber === 1) {
        location = 6;
      } else if (isTwoFace && toleNumber === 2) {
        location = 7;
      }
    }
    servicePrices.map((item) => {
      if (index === location) {
        cost = item.price;
        index++;
      } else if (index === 8) {
        costFooter = item.price;
        setCostFooter(item.price);
        index++;
      } else if (index === 9) {
        costDelivery = item.price;
        setCostDelivery(item.price);
        index++;
      } else {
        index++;
      }
    });

    try {
      let addition = 0;
      if (hasFooter) addition += costFooter;
      if (isDelivery) addition += costDelivery;
      price = height * width * cost * amount + addition + costIncurred;
      total =
        height * width * cost * amount + addition + costIncurred - discount;
      copy = height * width * cost * amount + addition + costIncurred;
      setPrice(price);
      setTotal(total);
      setCopy(copy);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCalculateWithDiscount = (value: number) => {
    handleCalculate();
    setTotal(copy - value);
  };

  const handleChangePhone = async (value: string) => {
    let flag = false;
    customers.map((customer) => {
      if (customer.phoneNumber === value) {
        setName(customer.name);
        setNameCustomer(customer.name);
        setIdCustomer(customer._id);
        setIsExistCustomer(true);
        flag = true;
      }
    });
    if (!flag) {
      setName("");
      setNameCustomer("");
      setIdCustomer("");
      setIsExistCustomer(false);
    }
  };

  return (
    <>
      <PasswordInput />
      <button
        type="button"
        id="trigger"
        className="trigger"
        data-bs-toggle="modal"
        data-bs-target="#loadingModal"
      ></button>
      <div
        className="modal fade"
        id="loadingModal"
        aria-labelledby="exampleModalLabel2"
        aria-hidden="false"
      >
        <div className="modal-dialog ">
          <div className="modal-content bg-green">
            <div className="modal-body">
              <div
                className="spinner-border"
                role="status"
                style={{ height: "20px", width: "20px", marginRight: "10px" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              Đang tải dữ liệu ...
            </div>
            <button
              type="button"
              id="closeModal"
              className="trigger"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="mt-1 me-2 fixed-top"
        style={{ top: "60px", right: "110px" }}
      >
        <div
          className="bg-green toast align-items-center toast-container top-0 end-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          id="liveToastSuccess"
        >
          <div className="d-flex">
            <div className="toast-body">Thêm hóa đơn thành công.</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="mt-1 me-2 fixed-top"
        style={{ top: "60px", right: "110px" }}
      >
        <div
          className="bg-red toast align-items-center toast-container top-0 end-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          id="liveToastFail"
        >
          <div className="d-flex">
            <div className="toast-body">
              Thêm hóa đơn thất bại, thông tin lỗi.
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="mt-1 me-2 fixed-top"
        style={{ top: "60px", right: "110px" }}
      >
        <div
          className="bg-red toast align-items-center toast-container top-0 end-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          id="liveToastFailDimension"
        >
          <div className="d-flex">
            <div className="toast-body">Giá trị kích thước không hợp lệ.</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
      <div className="container position-relative">
        <div className="row">
          <div className="col">
            <FileDrop setImageData={setImageData} imageData={""} />
          </div>
          <div className="col" style={{ marginTop: "20px" }}>
            <>
              <Information_BangHieu
                amount={amount}
                price={price}
                total={total}
                name={name}
                toleNumber={toleNumber}
                materialType={materialType}
                isTwoFace={isTwoFace}
                hasFooter={hasFooter}
                isDelivery={isDelivery}
                costIncurred={costIncurred}
                setMaterialType={setMaterialType}
                setIsTwoFace={setIsTwoFace}
                setToleNumber={setToleNumber}
                setHasFooter={setHasFooter}
                setIsDelivery={setIsDelivery}
                setCostIncurred={setCostIncurred}
                setAmount={setAmount}
                setPhoneNumber={setPhoneNumber}
                setName={setName}
                setNote={setNote}
                setHeight={setHeight}
                setWidth={setWidth}
                setPrice={setPrice}
                setDiscount={setDiscount}
                setDeposit={setDeposit}
                handleAdd={handleAdd}
                handleCalculate={handleCalculate}
                handleCalculateWithDiscount={handleCalculateWithDiscount}
                handleChangePhone={handleChangePhone}
              />
            </>
          </div>
        </div>
      </div>
    </>
  );
}
