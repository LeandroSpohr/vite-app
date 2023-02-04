import React from 'react'
import { Typography } from '../../atoms/Typography'

import { Input } from '../../atoms/Input'
import { InputComponentInterface } from '../../atoms/Input/Input.component'
import { FormField } from './FormField.styles'

interface FormFieldComponentInterface extends InputComponentInterface {
  label: string
  otherFormField?: JSX.Element
}

const FormFieldComponent = ({ label, otherFormField, ...rest }: FormFieldComponentInterface) => (
  <FormField>
    <Typography as="h3">{label}</Typography>
    {otherFormField || <Input {...rest} />}
  </FormField>
)


export default FormFieldComponent
