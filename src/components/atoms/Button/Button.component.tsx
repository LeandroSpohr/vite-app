import React from 'react'
import {StyledComponentPropsWithRef} from 'styled-components'
import Button from './Button.style'

interface ButtonInterface extends StyledComponentPropsWithRef<typeof Button> {
  children?: JSX.Element | string
}

const ButtonComponent = ({
  children,
  ...rest
}: ButtonInterface) => (
  <Button {...rest}>
    <label>
      {children}
    </label>
  </Button>
)

export default ButtonComponent