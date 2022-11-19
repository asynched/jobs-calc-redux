export const redirect = (to: string) => ({
  redirect: {
    destination: to,
    permanent: false,
  },
})
