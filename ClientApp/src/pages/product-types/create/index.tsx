import UpdateModelPage from "src/modules/common/views/page/update-page";
import ProductType from "src/modules/product-type/product-type-model";

export default function ProductTypeCreatePage() {
  const model = new ProductType()

  return <UpdateModelPage model={model} />
}
