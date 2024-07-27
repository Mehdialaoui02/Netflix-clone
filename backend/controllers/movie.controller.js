import { fetchFromTMDB } from "../services/tmdb.service.js"
export async function getTrendingMovie(req, res) {
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/trending/all/day?language=en-US`)
    const randomMovie = data.results[Math.floor(Math.random() * data.results.length)]

    res.status(200).json({ success: true, content: randomMovie })
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}

export async function getMovieTrailers(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos`)

    res.status(200).json({ success: true, content: data.results })
  } catch (error) {
    if (error.message.includes("404")) {
      res.status(404).json({ success: false, message: "Movie not found" })
    }

    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}

export async function getMovieDetails(req, res) {
  const { id: movieId } = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${movieId}`)

    res.status(200).json({ success: true, content: data })
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).json({ success: false, message: "Movie not found" })
    }
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}

export async function getSimilarMovies(req, res) {
  const { id: movieId } = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`)
    res.status(200).json({ success: true, content: data.results })
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}

export async function getMovieByCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
    res.status(200).json({ success: true, content: data.results })
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}