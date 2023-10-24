import UpdateModelPage from "src/modules/common/views/page/update-page";
import Movement from "src/modules/movement/movement-model";

export default function MovementCreatePage() {
  const model = new Movement()

  return <UpdateModelPage model={model} />
}
