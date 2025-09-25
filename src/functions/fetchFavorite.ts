const fetchFavorites = async (userId: string) => {
  const res = await fetch("/api/note/get/favorite", {
    method: "POST",
    headers: {"Content-Type": 'Application/json'},
    body: JSON.stringify({ userId })
  })
  const result = await res.json()
  if(result.success) {
    return result.favorites
  } else {
    alert(result.message || "Something went wrong")
  }
}

export default fetchFavorites