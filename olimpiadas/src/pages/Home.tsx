import { Button } from "../ui/components/ui/button"
import { ApiResponse, Event } from "../types/olimpic"

import { useFetch } from "../hooks/fetcher"

const Home = () => {

  const { data, isLoading, error } = useFetch<ApiResponse>()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      <Button>Call Api</Button>
      {data ? data.data.map((event: Event) => (
        <div key={event.id}>
          <h1>{event.day}</h1>
          <p>{event.detailed_event_name}</p>
          <br />
        </div>
      )) : "No data"}
    </>
  )
}

export default Home