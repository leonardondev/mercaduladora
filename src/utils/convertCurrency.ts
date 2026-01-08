export function convertToNumber(value: string) {
  value = value.replace(',', '.')

  return Number(value)
}

export function convertToCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}