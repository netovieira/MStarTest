

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UpdateModelPage from "src/modules/common/views/page/update-page";
import ProductType from "src/modules/product-type/product-type-model";

type UpdateProps = {
  id: number
}

export async function getServerSideProps({ params }: any) {
  const { id } = params

  return {
    props: {
      id
    }
  }
}

export default function ProductTypeCreatePage({ id }: UpdateProps) {
  const model = new ProductType()

  const [data, setData] = useState<any>()
  const [fetched, setFetched] = useState<boolean>(false)

  useEffect(() => {
    if(!fetched){
      setFetched(true)
      const promise = model.get(id)
      promise.then(() => setData(model))

      toast.promise(promise, {
        loading: 'Recuperando registro',
        success: 'Registro recuperado',
        error: 'Ocorreu um erro ao recuperar o registro'
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return <UpdateModelPage model={model} data={data} />
}
