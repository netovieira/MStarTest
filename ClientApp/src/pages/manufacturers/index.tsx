import ModelList from "src/modules/common/views/list";
import Manufacturer from "src/modules/manufacturer/manufacturer-model";


export default function ManufacturerPage() {
  const model = new Manufacturer()

  return <ModelList model={model} />
}
