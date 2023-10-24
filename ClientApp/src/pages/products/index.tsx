import ModelList from "src/modules/common/views/list";
import Product from "src/modules/product/product-model";

export default function ProductPage() {
  const model = new Product()

  return <ModelList model={model} />
}
