export const languages = (value: string[]): string | undefined => {
  return value.length >= 1 ? '' : 'becomeTutor.languages.emptyField'
}
