import UpdateModelPage from "src/modules/common/views/page/update-page";
import Manufacturer from "src/modules/manufacturer/manufacturer-model";

export default function ManufacturerCreatePage() {
  const model = new Manufacturer()

  return <UpdateModelPage model={model} />
}
