import UpdateModelPage from "src/modules/common/views/page/update-page";
import Stock from "src/modules/stock/stock-model";

export default function StockCreatePage() {
  const model = new Stock()

  return <UpdateModelPage model={model} />
}
