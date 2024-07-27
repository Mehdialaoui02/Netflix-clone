import { fetchFromTMDB } from "../services/tmdb.service.js"
export async function getTrendingTvShow(req, res) {
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/trending/tv/day?language=en-US`)
    const randomTvShow = data.results[Math.floor(Math.random() * data.results.length)]

    res.status(200).json({ success: true, content: randomTvShow })
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}

export async function getTvShowTrailers(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos`)

    res.status(200).json({ success: true, content: data.results })
  } catch (error) {
    if (error.message.includes("404")) {
      res.status(404).json({ success: false, message: "TvShow not found" })
    }

    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}

export async function getTvShowDetails(req, res) {
  const { id: TvShowId } = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${TvShowId}`)

    res.status(200).json({ success: true, content: data })
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).json({ success: false, message: "TvShow not found" })
    }
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}

export async function getSimilarTvShows(req, res) {
  const { id: TvShowId } = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${TvShowId}/similar?language=en-US&page=1`)
    res.status(200).json({ success: true, content: data.results })
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}

export async function getTvShowByCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
    res.status(200).json({ success: true, content: data.results })
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}