import Author from './author'

type ProjectType = {
  slug: string
  title: string
  date: string
  coverImage: string
  author: Author
  excerpt: string
  tags: string[]
  permalink: string
  githubUrl: string
  images: string[]
  ogImage: {
    url: string
  }
  content: string
}

export default ProjectType
