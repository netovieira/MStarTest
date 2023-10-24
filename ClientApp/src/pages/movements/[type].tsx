import ModelList from "src/modules/common/views/list";
import Movement from "src/modules/movement/movement-model";

type MovementProps = {
  type: string
}

export async function getServerSideProps({ params }: any) {
  const { type } = params

  return {
    props: {
      type
    }
  }
}

export default function MovementPage({ type } : MovementProps) {

  const model = new Movement(type === 'in' ? 0 : 1)

  return <ModelList model={model} />
}
