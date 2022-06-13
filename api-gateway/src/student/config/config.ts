export default () => {
  return {
    port: process.env.PORT,
    microservice: {
      rbmq_url: process.env.RBMQ_URL,
    },
  }
}
