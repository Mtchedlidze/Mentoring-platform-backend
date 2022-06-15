export default () => {
  return {
    port: process.env.PORT,
    microservice: {
      rbmq_url: process.env.RMQ_URL,
    },
  }
}
