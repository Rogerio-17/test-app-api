export function findFirstMissingAlphabetLetter(productNames: string[]): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  
  const usedLetters = new Set(
    productNames
      .map(name => name.charAt(0).toUpperCase())
      .filter(letter => /[A-Z]/.test(letter)) // Apenas letras válidas
  )

  for (const letter of alphabet) {
    if (!usedLetters.has(letter)) {
      return letter
    }
  }

  // Se todas as letras estão sendo usadas, retorna "_"
  return '_'
}