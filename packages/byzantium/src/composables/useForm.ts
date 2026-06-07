import { computed, reactive, ref } from 'vue'
import type { ComputedRef } from 'vue'

export interface FormOptions<T extends Record<string, unknown>> {
  initialValues: T
  validate?: (values: T) => Partial<Record<keyof T, string | undefined>>
  onSubmit: (values: T) => Promise<void>
}

export interface FormReturn<T extends Record<string, unknown>> {
  values: T
  errors:       Partial<Record<keyof T, string | undefined>>
  touched:      Partial<Record<keyof T, boolean>>
  isSubmitting: ReturnType<typeof ref<boolean>>
  isValid:      ComputedRef<boolean>
  isDirty:      ComputedRef<boolean>
  handleSubmit:   () => Promise<void>
  handleReset:    () => void
  setFieldValue:  <K extends keyof T>(field: K, value: T[K]) => void
  setFieldTouched: (field: keyof T) => void
  getFieldProps:  (field: keyof T) => {
    modelValue: T[keyof T]
    'onUpdate:modelValue': (value: T[keyof T]) => void
    onBlur: () => void
  }
}

export function useForm<T extends Record<string, unknown>>(
  options: FormOptions<T>
): FormReturn<T> {
  const { initialValues, validate, onSubmit } = options

  const cloneInitial = (): T => JSON.parse(JSON.stringify(initialValues))

  const values  = reactive<T>(cloneInitial()) as T
  const errors  = reactive<Record<string, string | undefined>>({}) as Partial<Record<keyof T, string | undefined>>
  const touched = reactive<Record<string, boolean>>({})            as Partial<Record<keyof T, boolean>>
  const isSubmitting = ref(false)

  function runValidation(): boolean {
    if (!validate) return true
    const result = validate(values)
    const e = errors as Record<string, string | undefined>
    for (const key in e) delete e[key]
    let valid = true
    for (const key in result) {
      const msg = result[key as keyof T]
      if (msg) { e[key] = msg; valid = false }
    }
    return valid
  }

  const isValid = computed<boolean>(() => Object.values(errors).every((e) => !e))

  const isDirty = computed<boolean>(() =>
    (Object.keys(initialValues) as Array<keyof T>).some(
      (key) => values[key] !== initialValues[key]
    )
  )

  function setFieldValue<K extends keyof T>(field: K, value: T[K]): void {
    (values as Record<keyof T, unknown>)[field] = value
  }

  function setFieldTouched(field: keyof T): void {
    (touched as Record<keyof T, boolean>)[field] = true
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
    const t = touched as Record<string, boolean>
    for (const key in initialValues) t[key] = true
    const valid = runValidation()
    if (!valid) return
    isSubmitting.value = true
    try { await onSubmit(values) } finally { isSubmitting.value = false }
  }

  function handleReset(): void {
    const fresh = cloneInitial()
    const v = values as Record<string, unknown>
    const e = errors  as Record<string, unknown>
    const t = touched as Record<string, unknown>
    for (const key in fresh) v[key] = fresh[key]
    for (const key in e) delete e[key]
    for (const key in t) delete t[key]
  }

  return {
    values,
    errors:  errors  as Partial<Record<keyof T, string | undefined>>,
    touched: touched as Partial<Record<keyof T, boolean>>,
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
