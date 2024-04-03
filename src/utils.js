const textEncoder = new TextEncoder()

export const stringToUnit8Array = content => {
  return textEncoder.encode(content)
}
