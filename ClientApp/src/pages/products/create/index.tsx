import UpdateModelPage from "src/modules/common/views/page/update-page";
import Product from "src/modules/product/product-model";

export default function ProductCreatePage() {
  const model = new Product()

  return <UpdateModelPage model={model} />
}
