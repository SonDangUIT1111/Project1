export interface DecalBill {
    _id: string,
    idCustomer: string,
    note: string,
    width: number,
    height: number,
    amount: number,
    discount: number,
    totalPrice: number,
    billPrice: number,
    deposit: number,
    state: string,
    createdAt: string,
    updatedAt: string,
}