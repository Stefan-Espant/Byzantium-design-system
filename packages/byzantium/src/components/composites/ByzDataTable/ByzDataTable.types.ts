export interface ByzColumn<Row = Record<string, unknown>> {
  key:       string
  label:     string
  sortable?: boolean
  width?:    string
  align?:    'left' | 'center' | 'right'
  format?:   (value: unknown, row: Row) => string
}
