/* eslint-disable react/prop-types */
import React from 'react'
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
} from '@coreui/react'

const ButtonDropdown = ({ colors, actions }) => {
  return (
    <>
      {colors.map((color, index) => (
        <CDropdown variant="btn-group" key={index}>
          <CDropdownToggle color={color}>{color}</CDropdownToggle>
          <CDropdownMenu>
            {actions.map((action, actionIndex) =>
              action.type === 'divider' ? (
                <CDropdownDivider key={actionIndex} />
              ) : (
                <CDropdownItem href={action.href} key={actionIndex}>
                  {action.label}
                </CDropdownItem>
              ),
            )}
          </CDropdownMenu>
        </CDropdown>
      ))}
    </>
  )
}

export default ButtonDropdown
