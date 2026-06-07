import { computed, reactive, ref } from 'vue'

export interface FormOptions<T extends Record<string, unknown>> {
  initialValues: T
  validate?: (values: T) => Partial<Record<keyof T, string | undefined>>
  onSubmit: (values: T) => Promise<void>
}

export interface FormReturn<T extends Record<string, unknown>> {
  values: T
  errors: Partial<Record<keyof T, string | undefined>>
  touched: Partial<Record<keyof T, boolean>>
  isSubmitting: ReturnType<typeof ref<boolean>>
  isValid: ReturnType<typeof computed<boolean>>
  isDirty: ReturnType<typeof computed<boolean>>
  handleSubmit: () => Promise<void>
  handleReset: () => void
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void
  setFieldTouched: (field: keyof T) => void
  getFieldProps: (field: keyof T) => {
    modelValue: T[keyof T]
    'onUpdate:modelValue': (value: T[keyof T]) => void
    onBlur: () => void
  }
}

export function useForm<T extends Record<string, unknown>>(
  options: FormOptions<T>
): FormReturn<T> {
  const { initialValues, validate, onSubmit } = options

  // Deep-clone the initial values so reactive mutations don't affect them
  const cloneInitial = (): T => JSON.parse(JSON.stringify(initialValues))

  const values = reactive<T>(cloneInitial()) as T
  const errors = reactive<Partial<Record<keyof T, string | undefined>>>({})
  const touched = reactive<Partial<Record<keyof T, boolean>>>({})
  const isSubmitting = ref(false)

  // Run validation and write results into errors
  function runValidation(): boolean {
    if (!validate) return true

    const result = validate(values)

    // Clear all existing errors first
    for (const key in errors) {
      delete errors[key as keyof T]
    }

    let valid = true
    for (const key in result) {
      const msg = result[key as keyof T]
      if (msg) {
        errors[key as keyof T] = msg
        valid = false
      }
    }
    return valid
  }

  const isValid = computed<boolean>(() => {
    return Object.values(errors).every((e) => !e)
  })

  const isDirty = computed<boolean>(() => {
    const initial = initialValues
    return (Object.keys(initial) as Array<keyof T>).some(
      (key) => values[key] !== initial[key]
    )
  })

  function setFieldValue<K extends keyof T>(field: K, value: T[K]): void {
    (values as Record<keyof T, unknown>)[field] = value
  }

  function setFieldTouched(field: keyof T): void {
    touched[field] = true
    runValidation()
  }

  function getFieldProps(field: keyof T) {
    return {
      modelValue: values[field],
      'onUpdate:modelValue': (value: T[keyof T]) => {
        setFieldValue(field as keyof T & string, value as T[keyof T & string])
      },
      onBlur: () => setFieldTouched(field),
    }
  }

  async function handleSubmit(): Promise<void> {
    // Mark all fields as touched
    for (const key in initialValues) {
      touched[key as keyof T] = true
    }

    const valid = runValidation()
    if (!valid) return

    isSubmitting.value = true
    try {
      await onSubmit(values)
    } finally {
      isSubmitting.value = false
    }
  }

  function handleReset(): void {
    const fresh = cloneInitial()
    for (const key in fresh) {
      (values as Record<string, unknown>)[key] = fresh[key]
    }

    for (const key in errors) {
      delete errors[key as keyof T]
    }

    for (const key in touched) {
      delete touched[key as keyof T]
    }
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    handleSubmit,
    handleReset,
    setFieldValue,
    setFieldTouched,
    getFieldProps,
  }
}
