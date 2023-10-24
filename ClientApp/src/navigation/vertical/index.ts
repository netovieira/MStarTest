// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: 'Menu',
    },
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'bxs:dashboard',
    },
    {
      title: 'Entradas',
      path: '/movements/in',
      icon: 'mdi:folder-add',
    },
    {
      title: 'Saídas',
      path: '/movements/out',
      icon: 'mdi:folder-minus',
    },
    {
      sectionTitle: 'Cadastros',
    },
    {
      title: 'Produtos',
      path: '/products',
      icon: 'fluent-mdl2:product',
    },
    {
      title: 'Fabricantes',
      path: '/manufacturers',
      icon: 'ic:round-factory',
    },
    {
      title: 'Locais de estoque',
      path: '/stock',
      icon: 'material-symbols:stockpot',
    },
    {
      title: 'Tipos de produto',
      path: '/product-types',
      icon: 'mingcute:tag-fill',
    },
  ]
}

export default navigation
