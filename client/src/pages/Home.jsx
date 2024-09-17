import { Link } from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'

const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/post/getPosts`)
      const data = await res.json()
      setPosts(data.posts)
    }
    fetchPosts()
  }, [])
  return (
    <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold lg:text-6xl'>
        Welcome to FilmyNewsNework - Your Gateway to the World of Cinema!
      </h1>
      <p className='text-gray-500 text-xs sm:text-sm'>
        At FilmyNewsNetwork, we’re passionate about movies from Bollywood and
        world cinema's blockbusters to indie gems, cult classics to
        international masterpieces. Whether you're a casual viewer or a devoted
        cinephile, our blog is your go-to destination for insightful reviews,
        boxoffice data, and the latest industry news. Dive deep into the
        artistry of filmmaking, explore behind-the-scenes trivia, and discover
        hidden cinematic treasures.
      </p>
      <Link
        to='/search'
        className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
      >
        View all posts
      </Link>
      <div>
        {' '}
        <CallToAction />{' '}
      </div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link to={'/search'} className='text-lg text-teal-500 hover:underline text-center'>View All Posts</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
