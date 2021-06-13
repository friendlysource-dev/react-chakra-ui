import React, {
  createContext,
  FormEvent,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { Form } from '@unform/web'
import { FormHandles, FormHelpers } from '@unform/core'
import { BoxProps } from '@chakra-ui/layout'
import * as Yup from 'yup'
import { BoxOverlaySpinner, Col, BoxOverlay } from '../components'

interface FormContextProps {
  variant: string
}

export interface FormProviderProps {
  container?: BoxProps
  variant?: string
  children?: React.ReactNode
  onStart?: () => any
  validation?: (yup: typeof Yup) => Yup.AnySchema
  isLoading?: boolean
  isDisabled?: boolean
  onSubmit?: (data: any, helpers: FormHelpers, event?: FormEvent) => void
}

export const FormContext = createContext({} as FormContextProps)

export const FormProviderComponent: React.ForwardRefRenderFunction<
  FormHandles,
  FormProviderProps
> = (
  {
    variant: variantValue = 'filled',
    onSubmit,
    onStart,
    validation,
    isLoading,
    isDisabled,
    children
  },
  ref
) => {
  const [variant] = useState(variantValue)
  const formRef = useRef<FormHandles>(null)
  useImperativeHandle(ref, () => formRef.current as FormHandles)

  const [isFormLoading, setFormLoading] = useState(false)

  const onStartHandle = useCallback(async () => {
    if (!onStart) return
    const onStartPromise = Promise.resolve(onStart())
    setFormLoading(true)

    onStartPromise
      .then((data: any) => {
        if (data) {
          formRef.current?.setData(data)
        }
      })
      .finally(() => {
        setFormLoading(false)
      })
  }, [onStart])

  const onValidationHandle = async (data: any, successCallback: () => void) => {
    if (validation) {
      try {
        formRef.current?.setErrors({})
        const schema = validation(Yup)
        await schema.validate(data, {
          abortEarly: false
        })
        successCallback()
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const validationErrors = {}
          error.inner.forEach((error: any) => {
            // @ts-ignore
            validationErrors[error.path] = error.message
          })
          formRef.current?.setErrors(validationErrors)
        }
      }
    }
  }

  const onSubmitHandle = async (
    data: any,
    helpers: FormHelpers,
    e?: FormEvent<Element>
  ) => {
    const submit = () => {
      if (!onSubmit) return
      const onSubmitPromise = Promise.resolve(onSubmit(data, helpers, e))
      setFormLoading(true)
      onSubmitPromise.finally(() => {
        setFormLoading(false)
      })
    }

    // formRef.current?.setErrors({})

    if (validation) {
      onValidationHandle(data, submit)
    } else {
      submit()
    }
  }

  useEffect(() => {
    if (onStart) {
      onStartHandle()
    }
  }, [onStart])

  useEffect(() => {
    setFormLoading(!!isLoading)
  }, [isLoading])

  return (
    <Col pos="relative" opacity={isDisabled ? 0.5 : 1}>
      <FormContext.Provider
        value={{
          variant
        }}
      >
        {isDisabled && <BoxOverlay zIndex={200} />}
        {isFormLoading && <BoxOverlaySpinner zIndex={200} />}
        {/* @ts-ignore */}
        <Form
          onSubmit={onSubmitHandle}
          // @ts-ignore
          ref={formRef}
          style={{ opacity: isFormLoading ? 0.5 : 1 }}
        >
          {children}
        </Form>
      </FormContext.Provider>
    </Col>
  )
}

export const FormProvider = forwardRef(FormProviderComponent)

export function useFormProvider() {
  return useContext(FormContext)
}
