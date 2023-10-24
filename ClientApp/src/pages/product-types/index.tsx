import ModelList from "src/modules/common/views/list";
import ProductType from "src/modules/product-type/product-type-model";

export default function ProductTypePage() {
  const model = new ProductType()

  return <ModelList model={model} />
}
