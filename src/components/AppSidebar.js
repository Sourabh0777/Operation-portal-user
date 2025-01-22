import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'
import { logo } from 'src/assets/brand/logo'
import { sygnet } from 'src/assets/brand/sygnet'
import {
  accountsSidebar,
  adminSidebar,
  clientSidebar,
  companySidebar,
  marketingSidebar,
  operationSidebar,
  salesSidebar,
  writerSidebar,
} from '../_nav'

// Import action creators and selectors from uiSlice
import {
  setSidebarShow,
  toggleSidebarUnfoldable,
  selectSidebarShow,
  selectSidebarUnfoldable,
} from '../redux/fratures/ui/uiSlice'
import { userTypes } from '../utils/userTypes'
import { selectCurrentUserType } from '../redux/fratures/auth/authSlice'

// sidebar nav config
// import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector(selectSidebarUnfoldable)
  const sidebarShow = useSelector(selectSidebarShow)

  // const userType = useSelector(selectCurrentUserType)
  const userType = userTypes.CLIENT

  // Select sidebar items based on userType
  let navigation
  switch (userType) {
    case userTypes.CLIENT:
      navigation = clientSidebar
      break
    default:
      navigation = []
  }
  // eslint-disable-next-line prettier/prettier

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(setSidebarShow(visible))
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} />
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />

        </CSidebarBrand>
        <CCloseButton className="d-lg-none" dark onClick={() => dispatch(setSidebarShow(false))} />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler onClick={() => dispatch(toggleSidebarUnfoldable())} />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
