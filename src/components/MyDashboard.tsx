// import { useSelector } from "react-redux";
// import { RootState } from "../store/redux";
// import { useEffect, useState } from "react";

// export default function MyDashboard() {
//   const data = useSelector((state: RootState) => state.data.data);
//   const actOrders = useSelector(
//     (state: RootState) => state.orders.activeOrders
//   );
//   const sntOrders = useSelector((state: RootState) => state.orders.sentOrders);
//   const [perName, setPerName] = useState<number | null>(null);
//   const [perColor, setPerColor] = useState<number | null>(null);
//   const [perAmount, setPerAmount] = useState<number | null>(null);
//   const [orderPerProduct, setOrdersPerProduct] = useState<number | null>(null);
//   const [orderItemAmount, setOrderItemAmount] = useState<number | null>(null);
//   const [sentProducts, setSentProducts] = useState<number | null>(null);
//   const [sentPRoductsAmount, setSentProductsAmount] = useState<number | null>(
//     null
//   );
//   const allOrderItems = actOrders.map((item) => item.orderItems).flat();
//   const allSentItems = sntOrders.map((item) => item.orderItems).flat();
//   const allAmount = allOrderItems.map((item) => item.amount);
//   const allSentAmount = allSentItems.map((item) => item.amount);

//   useEffect(() => {
//     setPerName(data.length);
//     const color = data.flatMap((item) => item.itemList);
//     setPerColor(color.length);
//     const amount = color.flatMap((item) => item.size);
//     let sum = amount.reduce((acc, obj) => {
//       for (let key in obj) {
//         if (typeof obj[key] === "number") {
//           acc += obj[key];
//         }
//       }
//       return acc;
//     }, 0);
//     setPerAmount(sum);
//     setOrdersPerProduct(allOrderItems.length);

//     const allAmountNumbers = allAmount.map(Number);
//     setOrderItemAmount(allAmountNumbers.reduce((a, b) => a + b, 0));
//     const allSentAmountNumbers = allSentAmount.map(Number);
//     setSentProductsAmount(allSentAmountNumbers.reduce((a, b) => a + b, 0));
//   }, []);

//   const lado = {
//     "products by name": perName,
//     "products per color": perColor,
//     "products, all amount": perAmount,
//     "orders by product name": orderPerProduct,
//     "order by item amount sum": orderItemAmount,
//     "sent products by name": sentProducts,
//     "sent products amount, sum": sentPRoductsAmount,
//   };

//   return <div>static</div>;
// }
