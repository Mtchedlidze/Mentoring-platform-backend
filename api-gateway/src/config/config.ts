export default () => {
  return {
    microservice: {
      rmq_url: process.env.RMQ_URL,
    },
  }
}
