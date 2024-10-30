import { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { Button, Spinner } from 'flowbite-react'
import CallToAction from '../components/CallToAction'
import CommentSection from '../components/CommentSection'
import PostCard from '../components/PostCard'
import MetaTags from './MetaTags'

const PostPage = () => {
  const { postSlug } = useParams()
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [post, setPost] = useState(location.state?.post || null)
  const [recentPosts, setRecentPosts] = useState(null)

  console.log('post post page', post)

  const description = 'This is post page of movie news and box office data'
  const keywords = 'movienews boxoffice'

  useEffect(() => {
    console.log('this should priunt')
    if (!post) {
      console.log('only call if some issue in stae object from Link')
      const fetchPost = async () => {
        try {
          setLoading(true)
          const res = await fetch(`/api/post/getposts?slug=${postSlug}`)
          const data = await res.json()
          if (!res.ok) {
            setError(true)
            setLoading(false)
            return
          }
          if (res.ok) {
            setPost(data.posts[0])
            setLoading(false)
            setError(false)
          }
        } catch (error) {
          setError(true)
          setLoading(false)
        }
      }
      fetchPost()
    }
  }, [post, postSlug])

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`)
        const data = await res.json()
        if (res.ok) {
          setRecentPosts(data.posts)
        }
      }
      fetchRecentPosts()
    } catch (error) {
      console.log(error.message)
    }
  }, [])

  if (loading && !post)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl'></Spinner>
      </div>
    )
  return (
    <>
      <MetaTags
        title={post.title}
        description={description}
        ogimage={post.image}
        keywords={keywords}
      />
      <main className='p-3 flex-col max-w-6xl mx-auto min-h-screen'>
        <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
          {post && post.title}
        </h1>
        <Link
          className='flex justify-center mt-5'
          to={`/search?category=${post && post.category}`}
        >
          <Button color='gray' pill size='xs'>
            {post && post.category}
          </Button>
        </Link>
        <img
          src={post && post.image}
          alt={post && post.title}
          className='mt-10 p-3 w-[650px] h-[470px] object-cover mx-auto'
        />
        <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
          <span>{post && new Date(post.updatedAt).toLocaleDateString()}</span>
          <span className='italic'>
            {post && (post.content.length / 1000).toFixed(0)} mins read{' '}
          </span>
        </div>
        <div
          className='p-3 max-w-2xl mx-auto w-full post-content break-words overflow-hidden'
          dangerouslySetInnerHTML={{ __html: post && post.content }}
        ></div>
        <div className=''>
          <CallToAction />
        </div>
        <CommentSection postId={post._id} />
        <div className='flex flex-col justify-center items-center mb-5'>
          <h1 className='text-xl mt-5'>Recent articles</h1>
          <div className='flex flex-wrap gap-5 mt-5 justify-center'>
            {recentPosts &&
              recentPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default PostPage
