/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from 'axios'
import { DateTime } from 'luxon'

// Declare the external services here
const SERVICES = [
  {
    name: 'ms-example',
    url: process.env.DEV_URL,
    
  },
  {
    name: 'advisor-core-example',
    url: 'https:url-to-test',
  },
]

async function checkService(name: string, url: string) {

  let status
  let message

  try {
    // Can be used /ping if there is no /health available
    await axios.get(`${url}/health`)
    status = 'OK'
    return { name, url, status, message }

  } catch(err: any) {
    status = 'ERROR'
    message = err.message
    return { name, url, status, message }
  }
}

async function Healthcheck() {

  const servicePromises = SERVICES.map(async (service) => {
    return await checkService(service.name, service.url!)
  })

  const services = await Promise.all(servicePromises)

  // Add connection checks here such as DB, Redis, RMQ, etc
  const connections: any[] = []

  const result = {
    uptime: process.uptime(),
    timestamp: DateTime.now().toISO(),
    connections: connections,
    services: services,
  }

  return result
}

export { Healthcheck }