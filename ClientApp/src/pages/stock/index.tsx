import ModelList from "src/modules/common/views/list";
import Stock from "src/modules/stock/stock-model";

export default function StockPage() {
  const model = new Stock()

  return <ModelList model={model} />
}
