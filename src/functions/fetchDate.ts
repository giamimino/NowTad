const fetchDate = async (noteId: string) => {
  const res = await fetch("/api/note/get", {
    method: "POST",
    headers: {"Content-Type": 'Application/json'},
    body: JSON.stringify({ noteId })
  })
  const result = await res.json()
  if(result.success) {
    return result.note
  } else {
    alert(result.message || "Something went wrong")
  }
}

export default fetchDate