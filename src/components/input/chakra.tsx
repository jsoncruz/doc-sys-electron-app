import React, { useRef, useEffect, useImperativeHandle, useCallback, useState } from 'react'

import {
  BoxProps,
  FormHelperText,
  Input as TextInput,
  InputProps as TextInputProps,
  InputRightElement,
  InputLeftElement,
  InputGroupProps,
  InputGroup,
  IconProps,
  Button,
  Icon
} from '@chakra-ui/core'
import { useField } from '@unform/core'

interface InputProps extends TextInputProps {
  name: string;
  containerProps?: BoxProps;
  iconLeft?: IconProps;
}

export interface ImperativeInputProps {
  input: TextInputProps<HTMLInputElement> | null;
  error: BoxProps | null;
}

const Input = React.forwardRef<ImperativeInputProps, InputProps>(({ name, containerProps, iconLeft, ...rest }, ref) => {
  const inputRef = useRef<TextInputProps<HTMLInputElement>>(null)
  const errorRef = useRef<BoxProps>(null)
  const [isVisible, setVisibility] = useState(false)
  const { fieldName, defaultValue, registerField, error, clearError } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current
    })
  }, [fieldName, registerField])

  const handlePasswordVisibility = useCallback(() => {
    if (inputRef.current) {
      setVisibility((old) => !old)
      inputRef.current.type = !isVisible ? 'text' : 'password'
    }
  }, [isVisible])

  useImperativeHandle(ref, () => ({
    input: inputRef.current,
    error: errorRef.current
  }), [])

  return (
    <>
      <InputGroup {...containerProps as InputGroupProps}>
        {iconLeft && (
          <InputLeftElement
            alignItems="center"
            height="100%"
          >
            <Icon {...iconLeft} />
          </InputLeftElement>
        )}
        <TextInput
          id={fieldName}
          ref={inputRef as any}
          defaultValue={defaultValue}
          aria-describedby={`${fieldName}-helper`}
          onFocus={clearError}
          {...({ ...rest, ...(error && { backgroundColor: 'orange.900' }) })}
        />
        {rest.type === 'password' && (
          <InputRightElement
            alignItems="center"
            height="100%"
            justifyContent="flex-end"
            marginTop={rest.marginTop}
          >
            <Button
              size="sm"
              onClick={handlePasswordVisibility}
              height="100%"
              backgroundColor="transparent"
              _hover={{
                backgroundColor: 'transparent',
                boxShadow: 'none'
              }}
            >
              <Icon name={isVisible ? 'view' : 'view-off'} />
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
      {error && (
        <FormHelperText id={`${fieldName}-helper`} color="red.300" textAlign="right" ref={errorRef}>
          {error}
        </FormHelperText>
      )}
    </>
  )
}
)

export default Input
