export default () => {
  console.log(process.env.RMQ_URL, 'opaa')

  return {
    microservice: {
      rmq_url: process.env.RMQ_URL,
    },
  }
}
